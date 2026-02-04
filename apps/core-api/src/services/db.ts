import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@arzancloud/database/schema';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/arzan_core';

const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, { schema });

// Re-export schemas
export const {
  users,
  sessions,
  portals,
  portalMembers,
  portalInvitations,
  portalSettings,
  availableModules,
  modulePlans,
  portalModules,
  portalLimits,
} = schema;
