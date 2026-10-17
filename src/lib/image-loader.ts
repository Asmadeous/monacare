"use client";

/**
 * next/image loader. The placeholder photography is served by Unsplash's image CDN, which resizes on
 * request, so each width is asked for there directly instead of being re-fetched and resized by the
 * Next.js server (which could time out on a slow first fetch and leave a photo blank).
 * Anything else (for example MonaCare's own photos in /public) is served as-is.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    return url.toString();
  }
  return src;
}
