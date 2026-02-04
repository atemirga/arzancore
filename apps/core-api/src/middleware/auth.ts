import type { Context, Next } from 'hono';
import { eq } from 'drizzle-orm';
import { db, users } from '../services/db.js';
import { verifyAccessToken, extractBearerToken } from '../services/jwt.js';
import type { SessionUser } from '../types/index.js';

export async function authMiddleware(c: Context, next: Next) {
  const token = extractBearerToken(c.req.header('Authorization'));

  if (!token) {
    return c.json({ error: 'Unauthorized', message: 'No token provided' }, 401);
  }

  const payload = await verifyAccessToken(token);
  if (!payload) {
    return c.json({ error: 'Unauthorized', message: 'Invalid or expired token' }, 401);
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, payload.sub),
  });

  if (!user || user.status !== 'active') {
    return c.json({ error: 'Forbidden', message: 'Account is suspended' }, 403);
  }

  const sessionUser: SessionUser = {
    id: user.id,
    email: user.email,
    name: user.name ?? undefined,
    surname: user.surname ?? undefined,
    avatar: user.avatar ?? undefined,
    locale: user.locale ?? 'ru',
    twoFactorEnabled: user.twoFactorEnabled ?? false,
    emailVerified: user.emailVerified ?? false,
  };

  c.set('user', sessionUser);
  await next();
}
