import { Hono } from 'hono';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { db, users, sessions } from '../services/db.js';
import { hashPassword, verifyPassword, validatePassword } from '../services/password.js';
import { generateTokens, verifyRefreshToken } from '../services/jwt.js';
import { authMiddleware } from '../middleware/auth.js';
import type { SessionUser } from '../types/index.js';

type Variables = {
  user: SessionUser;
};

const app = new Hono<{ Variables: Variables }>();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).optional(),
  surname: z.string().optional(),
  locale: z.enum(['ru', 'en', 'kk', 'tr', 'uz']).default('ru'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// POST /auth/register
app.post('/register', async (c) => {
  const body = await c.req.json();
  const validation = registerSchema.safeParse(body);
  if (!validation.success) {
    return c.json({ error: 'Validation error', details: validation.error.errors }, 400);
  }

  const { email, password, name, surname, locale } = validation.data;

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email.toLowerCase()),
  });
  if (existing) {
    return c.json({ error: 'User already exists' }, 409);
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return c.json({ error: 'Weak password', details: passwordValidation.errors }, 400);
  }

  const passwordHash = await hashPassword(password);

  const [newUser] = await db.insert(users).values({
    email: email.toLowerCase(),
    passwordHash,
    name,
    surname,
    locale,
    status: 'active',
  }).returning();

  const tokens = await generateTokens({
    userId: newUser.id,
    email: newUser.email,
    name: newUser.name ?? undefined,
  });

  return c.json({
    user: { id: newUser.id, email: newUser.email, name: newUser.name },
    tokens,
  }, 201);
});

// POST /auth/login
app.post('/login', async (c) => {
  const body = await c.req.json();
  const validation = loginSchema.safeParse(body);
  if (!validation.success) {
    return c.json({ error: 'Validation error' }, 400);
  }

  const { email, password } = validation.data;

  const user = await db.query.users.findFirst({
    where: eq(users.email, email.toLowerCase()),
  });

  if (!user || !user.passwordHash) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  if (user.status !== 'active') {
    return c.json({ error: 'Account suspended' }, 403);
  }

  const tokens = await generateTokens({
    userId: user.id,
    email: user.email,
    name: user.name ?? undefined,
  });

  await db.update(users).set({
    lastLoginAt: new Date(),
    lastLoginIp: c.req.header('X-Forwarded-For') || 'unknown',
  }).where(eq(users.id, user.id));

  return c.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      locale: user.locale,
    },
    tokens,
  });
});

// POST /auth/refresh
app.post('/refresh', async (c) => {
  const { refreshToken } = await c.req.json();
  if (!refreshToken) {
    return c.json({ error: 'Refresh token required' }, 400);
  }

  const payload = await verifyRefreshToken(refreshToken);
  if (!payload) {
    return c.json({ error: 'Invalid refresh token' }, 401);
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, payload.sub),
  });

  if (!user || user.status !== 'active') {
    return c.json({ error: 'User not found' }, 401);
  }

  const tokens = await generateTokens({
    userId: user.id,
    email: user.email,
    name: user.name ?? undefined,
  });

  return c.json({ tokens });
});

// GET /auth/me
app.get('/me', authMiddleware, async (c) => {
  const user = c.get('user');
  return c.json({ user });
});

// POST /auth/logout
app.post('/logout', authMiddleware, async (c) => {
  return c.json({ success: true, message: 'Logged out' });
});

export default app;
