import { Hono } from 'hono';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db, users } from '../services/db.js';
import { authMiddleware } from '../middleware/auth.js';
import { hashPassword, verifyPassword, validatePassword } from '../services/password.js';
import type { SessionUser } from '../types/index.js';

const app = new Hono();
app.use('/*', authMiddleware);

const updateProfileSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  surname: z.string().max(255).optional(),
  phone: z.string().max(20).optional(),
  locale: z.enum(['ru', 'en', 'kk', 'tr', 'uz']).optional(),
});

// GET /users/profile
app.get('/profile', async (c) => {
  const sessionUser = c.get('user') as SessionUser;

  const user = await db.query.users.findFirst({
    where: eq(users.id, sessionUser.id),
  });

  return c.json({
    user: {
      id: user?.id,
      email: user?.email,
      name: user?.name,
      surname: user?.surname,
      phone: user?.phone,
      avatar: user?.avatar,
      locale: user?.locale,
      emailVerified: user?.emailVerified,
      twoFactorEnabled: user?.twoFactorEnabled,
    },
  });
});

// PATCH /users/profile
app.patch('/profile', async (c) => {
  const sessionUser = c.get('user') as SessionUser;
  const body = await c.req.json();
  const validation = updateProfileSchema.safeParse(body);

  if (!validation.success) {
    return c.json({ error: 'Validation error' }, 400);
  }

  const [updatedUser] = await db.update(users)
    .set({ ...validation.data, updatedAt: new Date() })
    .where(eq(users.id, sessionUser.id))
    .returning();

  return c.json({ user: updatedUser });
});

// POST /users/change-password
app.post('/change-password', async (c) => {
  const sessionUser = c.get('user') as SessionUser;
  const { currentPassword, newPassword } = await c.req.json();

  const user = await db.query.users.findFirst({
    where: eq(users.id, sessionUser.id),
  });

  if (!user?.passwordHash) {
    return c.json({ error: 'User not found' }, 404);
  }

  const valid = await verifyPassword(currentPassword, user.passwordHash);
  if (!valid) {
    return c.json({ error: 'Current password incorrect' }, 400);
  }

  const passwordValidation = validatePassword(newPassword);
  if (!passwordValidation.isValid) {
    return c.json({ error: 'Weak password', details: passwordValidation.errors }, 400);
  }

  const newHash = await hashPassword(newPassword);
  await db.update(users)
    .set({ passwordHash: newHash, updatedAt: new Date() })
    .where(eq(users.id, sessionUser.id));

  return c.json({ success: true });
});

export default app;
