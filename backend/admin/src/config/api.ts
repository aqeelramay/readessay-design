/**
 * Centralized API configuration for ReadEssay Admin Dashboard.
 * Reads NEXT_PUBLIC_API_URL / NEXT_PUBLIC_API_BASE_URL from environment with fallback to local development URL.
 */
export const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://localhost:4000/api/v1';

/**
 * Normalizes an API path and returns the fully qualified API URL.
 * e.g. getApiUrl('/auth/login') -> 'http://localhost:4000/api/v1/auth/login'
 */
export function getApiUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}
