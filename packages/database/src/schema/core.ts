/**
 * Core Schema - общие таблицы для всех сервисов
 * Это ЕДИНСТВЕННАЯ точка правды о пользователях и порталах
 */

import { pgTable, uuid, varchar, text, timestamp, boolean, jsonb, integer } from 'drizzle-orm/pg-core';

// ========== ПОЛЬЗОВАТЕЛИ ==========
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 50 }),

  passwordHash: text('password_hash'),

  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  avatar: text('avatar'),

  emailVerified: boolean('email_verified').default(false),
  phoneVerified: boolean('phone_verified').default(false),

  // 2FA
  totpSecret: text('totp_secret'),
  totpEnabled: boolean('totp_enabled').default(false),

  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ========== ПОРТАЛЫ (ТЕНАНТЫ) ==========
export const portals = pgTable('portals', {
  id: uuid('id').defaultRandom().primaryKey(),

  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(), // subdomain

  ownerId: uuid('owner_id').references(() => users.id).notNull(),

  // Настройки
  settings: jsonb('settings').$type<{
    timezone?: string;
    language?: string;
    currency?: string;
    logo?: string;
  }>(),

  // Лимиты (общие для всех модулей)
  limits: jsonb('limits').$type<{
    maxUsers?: number;
    maxStorage?: number; // bytes
  }>(),

  isActive: boolean('is_active').default(true),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ========== ПОЛЬЗОВАТЕЛИ ПОРТАЛА ==========
export const portalUsers = pgTable('portal_users', {
  id: uuid('id').defaultRandom().primaryKey(),

  portalId: uuid('portal_id').references(() => portals.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),

  role: varchar('role', { length: 50 }).default('member'), // owner, admin, member

  // Доступ к модулям
  moduleAccess: jsonb('module_access').$type<{
    messenger?: boolean;
    crm?: boolean;
    med?: boolean;
    shop?: boolean;
  }>(),

  invitedBy: uuid('invited_by').references(() => users.id),
  invitedAt: timestamp('invited_at'),
  joinedAt: timestamp('joined_at').defaultNow(),

  isActive: boolean('is_active').default(true),
});

// ========== ДОСТУПНЫЕ МОДУЛИ ==========
export const modules = pgTable('modules', {
  id: varchar('id', { length: 50 }).primaryKey(), // 'messenger', 'crm', 'med', 'shop'

  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),

  // Pricing
  basePrice: integer('base_price').default(0), // cents/month

  isActive: boolean('is_active').default(true),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ========== ПОДПИСКИ НА МОДУЛИ ==========
export const portalModules = pgTable('portal_modules', {
  id: uuid('id').defaultRandom().primaryKey(),

  portalId: uuid('portal_id').references(() => portals.id, { onDelete: 'cascade' }).notNull(),
  moduleId: varchar('module_id', { length: 50 }).references(() => modules.id).notNull(),

  // План
  plan: varchar('plan', { length: 50 }).default('free'), // free, starter, pro, enterprise

  // Лимиты специфичные для модуля
  limits: jsonb('limits').$type<Record<string, number>>(),

  // Stripe
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),

  status: varchar('status', { length: 20 }).default('active'), // active, trial, canceled, past_due

  trialEndsAt: timestamp('trial_ends_at'),
  currentPeriodEnd: timestamp('current_period_end'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ========== СОБЫТИЯ МЕЖДУ СЕРВИСАМИ ==========
export const crossServiceEvents = pgTable('cross_service_events', {
  id: uuid('id').defaultRandom().primaryKey(),

  portalId: uuid('portal_id').references(() => portals.id).notNull(),

  sourceModule: varchar('source_module', { length: 50 }).notNull(), // откуда событие
  targetModule: varchar('target_module', { length: 50 }).notNull(), // куда направлено

  eventType: varchar('event_type', { length: 100 }).notNull(), // 'new_lead', 'message_received', etc.

  payload: jsonb('payload').$type<Record<string, any>>().notNull(),

  status: varchar('status', { length: 20 }).default('pending'), // pending, processed, failed
  processedAt: timestamp('processed_at'),
  error: text('error'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Types
export type User = typeof users.$inferSelect;
export type Portal = typeof portals.$inferSelect;
export type PortalUser = typeof portalUsers.$inferSelect;
export type Module = typeof modules.$inferSelect;
export type PortalModule = typeof portalModules.$inferSelect;
export type CrossServiceEvent = typeof crossServiceEvents.$inferSelect;
