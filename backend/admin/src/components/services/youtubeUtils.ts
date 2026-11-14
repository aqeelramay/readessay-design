/**
 * Utility functions for parsing and embedding YouTube video URLs
 */

export function parseYouTubeVideoId(url: string): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();

  // Match /embed/ID
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // Match watch?v=ID or &v=ID
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // Match youtu.be/ID
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // Match direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  return null;
}

export function toYouTubeEmbedUrl(url: string): string {
  const id = parseYouTubeVideoId(url);
  if (!id) return url;
  return `https://www.youtube.com/embed/${id}`;
}

export function getYouTubeThumbnailUrl(
  url: string,
  quality: "default" | "mqdefault" | "hqdefault" = "mqdefault"
): string | null {
  const id = parseYouTubeVideoId(url);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}

