import * as jose from 'jose';
import type { JWTPayload, TokenPair } from '../types/index.js';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret');
const JWT_REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET || 'default-refresh-secret');

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export async function generateTokens(user: { userId: string; email: string; name?: string }): Promise<TokenPair> {
  const now = Math.floor(Date.now() / 1000);

  const accessToken = await new jose.SignJWT({
    sub: user.userId,
    email: user.email,
    name: user.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET);

  const refreshToken = await new jose.SignJWT({
    sub: user.userId,
    type: 'refresh',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(JWT_REFRESH_SECRET);

  return {
    accessToken,
    refreshToken,
    expiresIn: 15 * 60,
  };
}

export async function verifyAccessToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(token: string): Promise<{ sub: string } | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_REFRESH_SECRET);
    return payload as { sub: string };
  } catch {
    return null;
  }
}

export function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.slice(7);
}
