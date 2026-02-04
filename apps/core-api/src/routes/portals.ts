import { Hono } from 'hono';
import { z } from 'zod';
import { eq, and } from 'drizzle-orm';
import crypto from 'crypto';
import {
  db,
  portals,
  portalMembers,
  portalSettings,
  portalInvitations,
  users,
} from '../services/db.js';
import { authMiddleware } from '../middleware/auth.js';
import type { SessionUser } from '../types/index.js';

type Variables = {
  user: SessionUser;
};

const app = new Hono<{ Variables: Variables }>();
app.use('/*', authMiddleware);

const createPortalSchema = z.object({
  name: z.string().min(1).max(255),
  subdomain: z.string().min(3).max(63).regex(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/),
  locale: z.enum(['ru', 'en', 'kk', 'tr', 'uz']).default('ru'),
});

// GET /portals - Список порталов пользователя
app.get('/', async (c) => {
  const user = c.get('user');

  const memberships = await db.query.portalMembers.findMany({
    where: and(
      eq(portalMembers.userId, user.id),
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
        status: portal.status,
        role: m.role,
        isOwner: portal.ownerId === user.id,
      } : null;
    })
  );

  return c.json({ portals: portalList.filter(Boolean) });
});

// POST /portals - Создать портал
app.post('/', async (c) => {
  const user = c.get('user');
  const body = await c.req.json();
  const validation = createPortalSchema.safeParse(body);

  if (!validation.success) {
    return c.json({ error: 'Validation error', details: validation.error.errors }, 400);
  }

  const { name, subdomain, locale } = validation.data;

  const existing = await db.query.portals.findFirst({
    where: eq(portals.subdomain, subdomain.toLowerCase()),
  });
  if (existing) {
    return c.json({ error: 'Subdomain taken' }, 409);
  }

  const [newPortal] = await db.insert(portals).values({
    ownerId: user.id,
    name,
    subdomain: subdomain.toLowerCase(),
    status: 'trial',
    trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    settings: { locale, timezone: 'Asia/Almaty', currency: 'USD' },
  }).returning();

  await db.insert(portalMembers).values({
    portalId: newPortal.id,
    userId: user.id,
    role: 'owner',
    status: 'active',
    joinedAt: new Date(),
  });

  return c.json({ portal: newPortal }, 201);
});

// GET /portals/:id - Детали портала
app.get('/:id', async (c) => {
  const user = c.get('user');
  const portalId = c.req.param('id');

  const membership = await db.query.portalMembers.findFirst({
    where: and(
      eq(portalMembers.portalId, portalId),
      eq(portalMembers.userId, user.id),
      eq(portalMembers.status, 'active')
    ),
  });

  if (!membership) {
    return c.json({ error: 'Access denied' }, 403);
  }

  const portal = await db.query.portals.findFirst({
    where: eq(portals.id, portalId),
  });

  return c.json({ portal, userRole: membership.role });
});

// GET /portals/:id/members - Участники портала
app.get('/:id/members', async (c) => {
  const user = c.get('user');
  const portalId = c.req.param('id');

  const membership = await db.query.portalMembers.findFirst({
    where: and(
      eq(portalMembers.portalId, portalId),
      eq(portalMembers.userId, user.id)
    ),
  });

  if (!membership) {
    return c.json({ error: 'Access denied' }, 403);
  }

  const members = await db.query.portalMembers.findMany({
    where: eq(portalMembers.portalId, portalId),
  });

  const memberDetails = await Promise.all(
    members.map(async (m) => {
      const memberUser = await db.query.users.findFirst({
        where: eq(users.id, m.userId),
      });
      return {
        id: m.id,
        userId: m.userId,
        email: memberUser?.email,
        name: memberUser?.name,
        role: m.role,
        status: m.status,
      };
    })
  );

  return c.json({ members: memberDetails });
});

// POST /portals/:id/invite - Пригласить участника
app.post('/:id/invite', async (c) => {
  const user = c.get('user');
  const portalId = c.req.param('id');
  const { email, role = 'member' } = await c.req.json();

  const membership = await db.query.portalMembers.findFirst({
    where: and(
      eq(portalMembers.portalId, portalId),
      eq(portalMembers.userId, user.id)
    ),
  });

  if (!membership || !['owner', 'admin'].includes(membership.role ?? '')) {
    return c.json({ error: 'Permission denied' }, 403);
  }

  const token = crypto.randomBytes(32).toString('hex');

  const [invitation] = await db.insert(portalInvitations).values({
    portalId,
    email: email.toLowerCase(),
    role,
    token: token.slice(-10),
    tokenHash: crypto.createHash('sha256').update(token).digest('hex'),
    invitedBy: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  }).returning();

  return c.json({
    invitation: {
      id: invitation.id,
      email: invitation.email,
      inviteLink: `${process.env.APP_URL}/invite/${token}`,
    },
  }, 201);
});

export default app;
