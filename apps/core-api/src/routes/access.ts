import { Hono } from 'hono';
import { z } from 'zod';
import { eq, and } from 'drizzle-orm';
import {
  db,
  users,
  portals,
  portalMembers,
  portalModules,
  portalLimits,
  modulePlans,
} from '../services/db.js';
import { verifyAccessToken, extractBearerToken } from '../services/jwt.js';
import type { AccessCheckResponse } from '../types/index.js';

const app = new Hono();

const accessCheckSchema = z.object({
  portalId: z.string().uuid(),
  moduleId: z.string().min(1),
});

// POST /access/check - Проверка доступа (вызывается другими сервисами)
app.post('/check', async (c) => {
  const token = extractBearerToken(c.req.header('Authorization'));
  if (!token) {
    return c.json<AccessCheckResponse>({ allowed: false, reason: 'No token' }, 401);
  }

  const payload = await verifyAccessToken(token);
  if (!payload) {
    return c.json<AccessCheckResponse>({ allowed: false, reason: 'Invalid token' }, 401);
  }

  const body = await c.req.json();
  const validation = accessCheckSchema.safeParse(body);
  if (!validation.success) {
    return c.json<AccessCheckResponse>({ allowed: false, reason: 'Invalid request' }, 400);
  }

  const { portalId, moduleId } = validation.data;

  // Проверяем пользователя
  const user = await db.query.users.findFirst({
    where: eq(users.id, payload.sub),
  });
  if (!user || user.status !== 'active') {
    return c.json<AccessCheckResponse>({ allowed: false, reason: 'User inactive' });
  }

  // Проверяем портал
  const portal = await db.query.portals.findFirst({
    where: eq(portals.id, portalId),
  });
  if (!portal || (portal.status !== 'active' && portal.status !== 'trial')) {
    return c.json<AccessCheckResponse>({ allowed: false, reason: 'Portal inactive' });
  }

  // Проверяем членство в портале
  const membership = await db.query.portalMembers.findFirst({
    where: and(
      eq(portalMembers.portalId, portalId),
      eq(portalMembers.userId, user.id),
      eq(portalMembers.status, 'active')
    ),
  });
  if (!membership) {
    return c.json<AccessCheckResponse>({ allowed: false, reason: 'Not a member' });
  }

  // Проверяем модуль
  const portalModule = await db.query.portalModules.findFirst({
    where: and(
      eq(portalModules.portalId, portalId),
      eq(portalModules.moduleId, moduleId)
    ),
  });
  if (!portalModule || (portalModule.status !== 'active' && portalModule.status !== 'trial')) {
    return c.json<AccessCheckResponse>({ allowed: false, reason: 'Module not enabled' });
  }

  // Проверяем trial
  if (portalModule.status === 'trial' && portalModule.trialEndsAt) {
    if (new Date(portalModule.trialEndsAt) < new Date()) {
      return c.json<AccessCheckResponse>({ allowed: false, reason: 'Trial expired' });
    }
  }

  // Получаем лимиты
  const limits = await db.query.portalLimits.findFirst({
    where: and(
      eq(portalLimits.portalId, portalId),
      eq(portalLimits.moduleId, moduleId)
    ),
  });

  return c.json<AccessCheckResponse>({
    allowed: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name ?? undefined,
      role: membership.role ?? 'member',
    },
    portal: {
      id: portal.id,
      name: portal.name,
      subdomain: portal.subdomain,
    },
    module: {
      id: moduleId,
      status: portalModule.status ?? 'active',
      limits: limits?.limits as Record<string, number> | undefined,
      usage: limits?.usage as Record<string, number> | undefined,
    },
  });
});

// GET /access/portals - Получить порталы пользователя
app.get('/portals', async (c) => {
  const token = extractBearerToken(c.req.header('Authorization'));
  if (!token) return c.json({ error: 'Unauthorized' }, 401);

  const payload = await verifyAccessToken(token);
  if (!payload) return c.json({ error: 'Invalid token' }, 401);

  const memberships = await db.query.portalMembers.findMany({
    where: and(
      eq(portalMembers.userId, payload.sub),
      eq(portalMembers.status, 'active')
    ),
  });

  const portalList = await Promise.all(
    memberships.map(async (m) => {
      const portal = await db.query.portals.findFirst({
        where: eq(portals.id, m.portalId),
      });
      return portal ? {
        id: portal.id,
        name: portal.name,
        subdomain: portal.subdomain,
        logo: portal.logo,
        role: m.role,
      } : null;
    })
  );

  return c.json({ portals: portalList.filter(Boolean) });
});

export default app;
