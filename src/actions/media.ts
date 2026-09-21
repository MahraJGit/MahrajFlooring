"use server";

import { createHash } from "node:crypto";

import sharp from "sharp";

import { requireServiceEditor } from "@/lib/cms/permissions";
import { uniqueFilename } from "@/lib/cms/slug";
import { getModels } from "@/lib/db/models";
import { toId } from "@/lib/db/ids";
import { listMedia, type MediaListItem } from "@/lib/media/queries";
import { putObject, s3Enabled } from "@/lib/media/s3";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const SIZES = {
  thumbnail: { width: 400, height: 300 },
  card: { width: 768, height: 480 },
  hero: { width: 1600, height: 900 },
} as const;

function mediaUrl(filename: string) {
  return `/api/media/file/${filename}`;
}

function toItem(doc: {
  _id?: unknown;
  alt?: unknown;
  filename?: unknown;
  mimeType?: unknown;
  filesize?: unknown;
  width?: unknown;
  height?: unknown;
  url?: unknown;
}): MediaListItem {
  return {
    id: toId(doc._id),
    alt: String(doc.alt ?? ""),
    filename: String(doc.filename ?? ""),
    mimeType: String(doc.mimeType ?? ""),
    filesize: Number(doc.filesize ?? 0),
    width: typeof doc.width === "number" ? doc.width : null,
    height: typeof doc.height === "number" ? doc.height : null,
    url: String(doc.url ?? ""),
  };
}

export async function searchMedia(query?: string): Promise<MediaListItem[]> {
  await requireServiceEditor();
  return listMedia(query);
}

export async function uploadMedia(formData: FormData): Promise<
  | { error: string; item?: undefined }
  | { error?: undefined; item: MediaListItem }
> {
  await requireServiceEditor();

  const file = formData.get("file");
  const alt = String(formData.get("alt") ?? "").trim();
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please choose an image to upload." };
  }
  if (!alt) return { error: "Please describe the image for accessibility." };
  if (!ALLOWED.has(file.type)) {
    return { error: "Use a JPG, PNG, WebP, or GIF image." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Images must be 8 MB or smaller." };
  }
  if (!s3Enabled()) {
    return { error: "Image storage is not configured." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const checksum = createHash("sha256").update(buffer).digest("hex");
  const { Media } = await getModels();
  const existing = await Media.findOne({ checksum }).lean();
  if (existing) {
    return { item: toItem(existing) };
  }

  const filename = uniqueFilename(file.name || "image.jpg");
  let meta;
  try {
    meta = await sharp(buffer).metadata();
  } catch {
    return { error: "That file could not be read as an image." };
  }

  const mimeType = file.type;
  const sizes: Record<string, {
    url: string;
    width: number;
    height: number;
    mimeType: string;
    filesize: number;
    filename: string;
  }> = {};

  try {
    await putObject(filename, buffer, mimeType);

    for (const [name, size] of Object.entries(SIZES)) {
      const resized = await sharp(buffer)
        .resize(size.width, size.height, { fit: "cover", position: "centre" })
        .toFormat("jpeg", { quality: 80 })
        .toBuffer();
      const sizedName = `${name}-${filename.replace(/\.[^.]+$/, "")}.jpg`;
      await putObject(sizedName, resized, "image/jpeg");
      const sizedMeta = await sharp(resized).metadata();
      sizes[name] = {
        url: mediaUrl(sizedName),
        width: sizedMeta.width ?? size.width,
        height: sizedMeta.height ?? size.height,
        mimeType: "image/jpeg",
        filesize: resized.length,
        filename: sizedName,
      };
    }
  } catch {
    return { error: "The image could not be stored. Try again in a moment." };
  }

  const created = await Media.create({
    alt,
    caption: "",
    filename,
    mimeType,
    filesize: file.size,
    width: meta.width ?? null,
    height: meta.height ?? null,
    url: mediaUrl(filename),
    thumbnailURL: sizes.thumbnail?.url,
    sizes,
    checksum,
    focalX: 50,
    focalY: 50,
  });

  return { item: toItem(created) };
}
