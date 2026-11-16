import { API_BASE_URL } from '@/config/api';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  lastLoginAt?: string | null;
}

export interface LoginResponse {
  user: {
    id: string;
    username: string;
    fullName: string;
  };
  accessToken: string;
}

export interface AdminProfile {
  id: string;
  username: string;
  fullName: string;
  lastLoginAt: string | null;
}

export interface LogoutResponse {
  message: string;
}

let refreshPromise: Promise<boolean> | null = null;

/**
 * Universal fetch wrapper for ReadEssay Admin.
 * Always includes credentials: 'include' for cross-origin cookie authentication.
 * Automatically performs silent token refresh on 401 responses.
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  skipRefresh = false,
  isRetry = false,
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
  const defaultHeaders: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    Accept: 'application/json',
  };

  const response = await fetch(url, {
    credentials: 'include',
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  const isAuthEndpoint =
    cleanEndpoint.startsWith('/auth/login') ||
    cleanEndpoint.startsWith('/auth/refresh') ||
    cleanEndpoint.startsWith('/auth/logout') ||
    cleanEndpoint.startsWith('/auth/forgot-password') ||
    cleanEndpoint.startsWith('/auth/reset-password');

  // Automatic silent refresh on 401 for non-login/refresh endpoints
  if (response.status === 401 && !skipRefresh && !isRetry && !isAuthEndpoint) {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          await refreshSession();
          return true;
        } catch {
          return false;
        } finally {
          refreshPromise = null;
        }
      })();
    }

    const refreshed = await refreshPromise;
    if (refreshed) {
      return apiRequest<T>(endpoint, options, skipRefresh, true);
    }

    // Refresh failed: Redirect to login if running in browser
    if (
      typeof window !== 'undefined' &&
      !window.location.pathname.startsWith('/login')
    ) {
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = '/login';
    }
  }

  if (!response.ok) {
    let errorData: Record<string, unknown> | string | null = null;
    try {
      errorData = (await response.json()) as Record<string, unknown>;
    } catch {
      errorData = await response.text();
    }

    let message = `Request failed with status ${response.status}`;
    if (typeof errorData === 'object' && errorData !== null) {
      if (Array.isArray(errorData.message)) {
        message = errorData.message.join(', ');
      } else if (typeof errorData.message === 'string') {
        message = errorData.message;
      } else if (typeof errorData.error === 'string') {
        message = errorData.error;
      }
    }
    throw new ApiError(message, response.status, errorData);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
}

/**
 * Super Admin Login: POST /auth/login
 */
export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  return apiRequest<LoginResponse>(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    },
    true, // skip silent refresh on login failure
  );
}

/**
 * Super Admin Profile: GET /auth/me
 */
export async function getMe(): Promise<AdminProfile> {
  return apiRequest<AdminProfile>('/auth/me', {
    method: 'GET',
  });
}

/**
 * Refresh Session: POST /auth/refresh
 */
export async function refreshSession(): Promise<LoginResponse> {
  return apiRequest<LoginResponse>(
    '/auth/refresh',
    {
      method: 'POST',
      body: JSON.stringify({}),
    },
    true, // do not recurse refresh
  );
}

/**
 * Logout Super Admin: POST /auth/logout
 */
export async function logout(): Promise<LogoutResponse> {
  return apiRequest<LogoutResponse>(
    '/auth/logout',
    {
      method: 'POST',
      body: JSON.stringify({}),
    },
    true,
  );
}

/**
 * Request Password Reset Link: POST /auth/forgot-password
 */
export async function forgotPassword(
  username: string,
): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(
    '/auth/forgot-password',
    {
      method: 'POST',
      body: JSON.stringify({ username }),
    },
    true,
  );
}

/**
 * Reset Password with Token: POST /auth/reset-password
 */
export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(
    '/auth/reset-password',
    {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    },
    true,
  );
}
