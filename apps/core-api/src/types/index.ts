export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  surname?: string;
  avatar?: string;
  locale: string;
  twoFactorEnabled: boolean;
  emailVerified: boolean;
}

export interface JWTPayload {
  sub: string;
  email: string;
  name?: string;
  iat: number;
  exp: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AccessCheckResponse {
  allowed: boolean;
  reason?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    role: string;
  };
  portal?: {
    id: string;
    name: string;
    subdomain: string;
  };
  module?: {
    id: string;
    status: string;
    plan?: string;
    limits?: Record<string, number>;
    usage?: Record<string, number>;
  };
}
