import type { Media } from "@/payload/payload-types";

type MediaSize = "thumbnail" | "card" | "hero";

function readSizeUrl(media: Media, size: MediaSize) {
  const entry = media.sizes?.[size];
  return typeof entry === "object" && entry && "url" in entry
    ? (entry.url as string | undefined)
    : undefined;
}

export function resolveMediaUrl(
  value: string | Media | null | undefined,
  preferredSize?: MediaSize
) {
  const fallback = "/images/advantage-installation.jpg";

  if (!value) {
    return { url: fallback, alt: "" };
  }

  // Relationship fields can come back as a bare media id when the document
  // was deleted or depth wasn't populated — never pass that to next/image.
  if (typeof value === "string") {
    const looksLikeUrl =
      value.startsWith("/") || /^https?:\/\//.test(value);
    return { url: looksLikeUrl ? value : fallback, alt: "" };
  }

  const sized =
    (preferredSize && readSizeUrl(value, preferredSize)) ||
    readSizeUrl(value, "hero") ||
    readSizeUrl(value, "card") ||
    value.url;

  return {
    url: sized && (sized.startsWith("/") || /^https?:\/\//.test(sized))
      ? sized
      : fallback,
    alt: value.alt ?? "",
  };
}
