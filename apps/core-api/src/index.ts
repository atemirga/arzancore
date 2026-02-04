import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import authRoutes from './routes/auth.js';
import accessRoutes from './routes/access.js';
import portalsRoutes from './routes/portals.js';
import usersRoutes from './routes/users.js';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: (origin) => {
    if (origin?.includes('localhost')) return origin;
    if (origin?.endsWith('.arzancloud.com')) return origin;
    return process.env.CORS_ORIGIN || '*';
  },
  credentials: true,
}));

// Health check
app.get('/health', (c) => c.json({ status: 'ok', service: 'core-api' }));

// API info
app.get('/', (c) => c.json({
  name: 'Arzan Core API',
  version: '0.1.0',
  endpoints: {
    auth: '/api/auth',
    access: '/api/access',
    portals: '/api/portals',
    users: '/api/users',
  },
}));

// Routes
app.route('/api/auth', authRoutes);
app.route('/api/access', accessRoutes);
app.route('/api/portals', portalsRoutes);
app.route('/api/users', usersRoutes);

// 404
app.notFound((c) => c.json({ error: 'Not Found' }, 404));

// Error handler
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

// Start server
const port = parseInt(process.env.PORT || '3001', 10);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`🚀 Core API running on http://localhost:${info.port}`);
});

export default app;
