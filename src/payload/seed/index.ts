import path from "node:path";
import { fileURLToPath } from "node:url";

import config from "@payload-config";
import { getPayload } from "payload";

import { categorySeed, postSeed } from "./data";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../../public");

const fresh = process.argv.includes("--fresh");

const payload = await getPayload({ config });

async function ensureAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    payload.logger.warn(
      "SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set — skipping admin creation. Create the first user at /admin instead."
    );
    return;
  }

  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    payload.logger.info(`Admin ${email} already exists.`);
    return;
  }

  await payload.create({
    collection: "users",
    data: {
      email,
      password,
      name: process.env.SEED_ADMIN_NAME || "Administrator",
      role: "admin",
    },
  });

  payload.logger.info(`Created admin ${email}.`);
}

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
    const id = String(existing.docs[0].id);
    mediaCache.set(publicPath, id);
    return id;
  }

  const created = await payload.create({
    collection: "media",
    data: { alt },
    filePath: path.join(publicDir, publicPath),
  });

  const id = String(created.id);
  mediaCache.set(publicPath, id);
  return id;
}

async function seedCategories() {
  const ids = new Map<string, string>();

  for (const category of categorySeed) {
    const image = await ensureMedia(category.image, category.title);

    const existing = await payload.find({
      collection: "categories",
      where: { slug: { equals: category.slug } },
      limit: 1,
    });

    const data = {
      title: category.title,
      slug: category.slug,
      subtitle: category.subtitle,
      image,
    };

    if (existing.docs.length > 0) {
      const updated = await payload.update({
        collection: "categories",
        id: existing.docs[0].id,
        data,
      });
      ids.set(category.slug, String(updated.id));
    } else {
      const created = await payload.create({ collection: "categories", data });
      ids.set(category.slug, String(created.id));
    }
  }

  payload.logger.info(`Seeded ${ids.size} categories.`);
  return ids;
}

async function seedPosts(categoryIds: Map<string, string>) {
  for (const post of postSeed) {
    const category = categoryIds.get(post.category);
    if (!category) {
      payload.logger.warn(`Missing category ${post.category} for ${post.slug}.`);
      continue;
    }

    const coverImage = await ensureMedia(post.coverImage, post.title);

    const data = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage,
      category,
      readTime: post.readTime,
      publishedAt: new Date(post.publishedAt).toISOString(),
      featured: post.featured,
      author: "By Mahraj Engineering Team",
      _status: "published" as const,
    };

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
        data,
      });
    } else {
      await payload.create({ collection: "posts", data });
    }
  }

  payload.logger.info(`Seeded ${postSeed.length} posts.`);
}

async function clearContent() {
  for (const collection of ["posts", "categories", "media"] as const) {
    await payload.delete({ collection, where: {} });
  }
  payload.logger.info("Cleared existing blog content.");
}

try {
  if (fresh) {
    await clearContent();
  }

  await ensureAdmin();
  const categoryIds = await seedCategories();
  await seedPosts(categoryIds);

  payload.logger.info("Seed complete.");
  process.exit(0);
} catch (error) {
  payload.logger.error(error);
  process.exit(1);
}
