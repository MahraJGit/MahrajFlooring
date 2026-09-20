import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

import { getModels } from "@/lib/db/models";
import { isSafeMediaFilename } from "@/lib/public/media";

export const runtime = "nodejs";

const SIZE_KEYS = ["thumbnail", "card", "hero"] as const;

function s3Enabled() {
  return Boolean(
    process.env.S3_BUCKET?.trim() &&
      process.env.S3_REGION?.trim() &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY
  );
}

function client() {
  return new S3Client({
    region: process.env.S3_REGION,
    followRegionRedirects: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
    },
  });
}

function normalizeFilename(raw: string) {
  let value = raw;
  try {
    value = decodeURIComponent(raw);
  } catch {
    return "";
  }
  return value.trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mimeForFile(
  filename: string,
  doc: Record<string, unknown>
): string {
  if (doc.filename === filename && typeof doc.mimeType === "string") {
    return doc.mimeType;
  }
  const sizes = isRecord(doc.sizes) ? doc.sizes : {};
  for (const key of SIZE_KEYS) {
    const size = sizes[key];
    if (
      isRecord(size) &&
      size.filename === filename &&
      typeof size.mimeType === "string" &&
      size.mimeType
    ) {
      return size.mimeType;
    }
  }
  if (filename.endsWith(".png")) return "image/png";
  if (filename.endsWith(".webp")) return "image/webp";
  if (filename.endsWith(".gif")) return "image/gif";
  if (filename.endsWith(".svg")) return "image/svg+xml";
  return "image/jpeg";
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename: raw } = await context.params;
  const filename = normalizeFilename(raw);

  if (!isSafeMediaFilename(filename)) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (!s3Enabled()) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const { Media } = await getModels();
    const doc = await Media.findOne({
      $or: [
        { filename },
        { "sizes.thumbnail.filename": filename },
        { "sizes.card.filename": filename },
        { "sizes.hero.filename": filename },
      ],
    })
      .select("filename mimeType sizes")
      .lean();

    if (!doc) {
      return new NextResponse("Not found", { status: 404 });
    }

    const result = await client().send(
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: filename,
      })
    );

    if (!result.Body) {
      return new NextResponse("Not found", { status: 404 });
    }

    const body = result.Body.transformToWebStream();
    const contentType =
      result.ContentType || mimeForFile(filename, doc as Record<string, unknown>);

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    const status =
      error &&
      typeof error === "object" &&
      "$metadata" in error &&
      error.$metadata &&
      typeof error.$metadata === "object" &&
      "httpStatusCode" in error.$metadata
        ? Number(error.$metadata.httpStatusCode)
        : 0;
    const name = error instanceof Error ? error.name : "";
    if (name === "NoSuchKey" || name === "NotFound" || status === 404) {
      return new NextResponse("Not found", { status: 404 });
    }
    return new NextResponse("Not found", { status: 404 });
  }
}
