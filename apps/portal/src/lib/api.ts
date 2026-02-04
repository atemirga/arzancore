import { API_URL } from './constants';

// Types
export interface User {
  id: string;
  email: string;
  name?: string;
  surname?: string;
  avatar?: string;
  locale: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
}

export interface Portal {
  id: string;
  name: string;
  subdomain: string;
  logo?: string;
  status: 'active' | 'trial' | 'suspended';
  trialEndsAt?: string;
  role: string;
  isOwner: boolean;
  modules?: PortalModule[];
}

export interface PortalModule {
  id: string;
  moduleId: string;
  name: string;
  icon: string;
  status: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
  locale?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreatePortalData {
  name: string;
  subdomain: string;
  locale?: string;
}

export interface InviteData {
  email: string;
  role?: 'admin' | 'member';
}

// API Client
class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('accessToken');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401 && this.token) {
        const refreshed = await this.tryRefreshToken();
        if (refreshed) {
          (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
          const retryResponse = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
          if (retryResponse.ok) {
            return retryResponse.json();
          }
        }
        this.setToken(null);
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
      throw new Error(data.error || data.message || 'API Error');
    }

    return data;
  }

  private async tryRefreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${API_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const { tokens } = await response.json();
        this.setToken(tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        return true;
      }
    } catch {
      // Ignore
    }
    return false;
  }

  // Auth
  async register(data: RegisterData) {
    return this.request<{ user: User; tokens: TokenPair }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginData) {
    return this.request<{ user: User; tokens: TokenPair }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout() {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } finally {
      this.setToken(null);
      localStorage.removeItem('refreshToken');
    }
  }

  async getMe() {
    return this.request<{ user: User }>('/api/auth/me');
  }

  // Portals
  async getPortals() {
    return this.request<{ portals: Portal[] }>('/api/portals');
  }

  async createPortal(data: CreatePortalData) {
    return this.request<{ portal: Portal }>('/api/portals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPortal(id: string) {
    return this.request<{ portal: Portal; userRole: string }>(`/api/portals/${id}`);
  }

  async updatePortal(id: string, data: Partial<Portal>) {
    return this.request<{ portal: Portal }>(`/api/portals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getPortalMembers(id: string) {
    return this.request<{ members: any[] }>(`/api/portals/${id}/members`);
  }

  async inviteMember(portalId: string, data: InviteData) {
    return this.request<{ invitation: any }>(`/api/portals/${portalId}/invite`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async removeMember(portalId: string, memberId: string) {
    return this.request(`/api/portals/${portalId}/members/${memberId}`, {
      method: 'DELETE',
    });
  }

  // Modules
  async getModules() {
    return this.request<{ modules: any[] }>('/api/modules');
  }

  async activateModule(portalId: string, moduleId: string, planId?: string) {
    return this.request(`/api/portals/${portalId}/modules`, {
      method: 'POST',
      body: JSON.stringify({ moduleId, planId }),
    });
  }

  // User Profile
  async getProfile() {
    return this.request<{ user: User }>('/api/users/profile');
  }

  async updateProfile(data: Partial<User>) {
    return this.request<{ user: User }>('/api/users/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/api/users/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }
}

export const api = new ApiClient();
