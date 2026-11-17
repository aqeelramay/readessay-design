/**
 * Centralized API configuration for ReadEssay Public Frontend.
 * Reads NEXT_PUBLIC_API_URL / NEXT_PUBLIC_API_BASE_URL with local fallback.
 */
export const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://localhost:4000/api/v1';

/**
 * Normalizes an API path and returns the fully qualified API URL.
 * e.g. getApiUrl('/services/public') -> 'http://localhost:4000/api/v1/services/public'
 */
export function getApiUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}
