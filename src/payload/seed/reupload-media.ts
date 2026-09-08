import path from "node:path";
import { fileURLToPath } from "node:url";

import config from "@payload-config";
import { getPayload } from "payload";

import { categorySeed, postSeed } from "./data";

/**
 * Clears media records and re-uploads seed images into the configured storage
 * (S3 or local). Use after fixing S3 credentials/region when the bucket is
 * empty but Mongo still has media documents.
 */
const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../../public");

const payload = await getPayload({ config });

const mediaCache = new Map<string, string>();

async function ensureMedia(publicPath: string, alt: string) {
  const cached = mediaCache.get(publicPath);
  if (cached) return cached;

  const filename = path.basename(publicPath);
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    await payload.delete({
      collection: "media",
      id: existing.docs[0].id,
    });
  }

  const created = await payload.create({
    collection: "media",
    data: { alt },
    filePath: path.join(publicDir, publicPath),
  });

  const id = String(created.id);
  mediaCache.set(publicPath, id);
  payload.logger.info(`Uploaded ${filename} → ${created.url}`);
  return id;
}

try {
  payload.logger.info("Re-uploading seed media to storage…");

  for (const category of categorySeed) {
    const image = await ensureMedia(category.image, category.title);
    const existing = await payload.find({
      collection: "categories",
      where: { slug: { equals: category.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      await payload.update({
        collection: "categories",
        id: existing.docs[0].id,
        data: {
          title: category.title,
          subtitle: category.subtitle,
          image,
        },
      });
    }
  }

  for (const post of postSeed) {
    const coverImage = await ensureMedia(post.coverImage, post.title);
    const existing = await payload.find({
      collection: "posts",
      where: { slug: { equals: post.slug } },
      limit: 1,
      draft: true,
    });

    if (existing.docs.length > 0) {
      await payload.update({
        collection: "posts",
        id: existing.docs[0].id,
        data: { coverImage },
        draft: false,
      });
    }
  }

  payload.logger.info("Media re-upload complete.");
  process.exit(0);
} catch (error) {
  payload.logger.error(error);
  process.exit(1);
}
