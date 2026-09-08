import type { Where } from "payload";

import { getPayloadClient } from "./client";
import { resolveMediaUrl } from "./media-url";
import type { Category, Media, Post } from "@/payload/payload-types";

export type BlogCard = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  readTime: string;
  date: string;
  author: string;
  category: string;
  categorySlug: string;
  href: string;
};

export type BlogCategory = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  image: string;
};

// The Local API runs with overrideAccess: true, so collection access control
// does not apply. Public queries must filter drafts out explicitly.
const publishedOnly: Where = { _status: { equals: "published" } };

function resolveImage(value: Post["coverImage"], size?: "thumbnail" | "card" | "hero") {
  const media = value as Media | null;
  const resolved = resolveMediaUrl(media, size);
  return {
    url: resolved.url || "/images/advantage-installation.jpg",
    alt: resolved.alt,
  };
}

function resolveCategory(value: Post["category"]) {
  const category = value as Category | null;
  return {
    title: category?.title ?? "Insights",
    slug: category?.slug ?? "",
  };
}

function formatDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function toBlogCard(post: Post, imageSize?: "thumbnail" | "card" | "hero"): BlogCard {
  const image = resolveImage(post.coverImage, imageSize ?? "card");
  const category = resolveCategory(post.category);

  return {
    id: String(post.id),
    title: post.title,
    slug: post.slug ?? "",
    excerpt: post.excerpt,
    image: image.url,
    imageAlt: image.alt || post.title,
    readTime: post.readTime ?? "",
    date: formatDate(post.publishedAt),
    author: post.author ?? "By Mahraj Engineering Team",
    category: category.title,
    categorySlug: category.slug,
    href: `/blog/${post.slug ?? ""}`,
  };
}

type ListArgs = {
  page?: number;
  limit?: number;
  categorySlug?: string;
  search?: string;
};

export async function getPosts({
  page = 1,
  limit = 6,
  categorySlug,
  search,
}: ListArgs = {}) {
  const payload = await getPayloadClient();
  const and: Where[] = [publishedOnly];

  if (categorySlug) {
    and.push({ "category.slug": { equals: categorySlug } });
  }

  if (search) {
    and.push({
      or: [{ title: { like: search } }, { excerpt: { like: search } }],
    });
  }

  const result = await payload.find({
    collection: "posts",
    depth: 1,
    page,
    limit,
    sort: "-publishedAt",
    where: { and },
  });

  return {
    docs: result.docs.map((doc) => toBlogCard(doc)),
    page: result.page ?? 1,
    totalPages: result.totalPages,
    totalDocs: result.totalDocs,
  };
}

export async function getFeaturedPosts(limit = 3) {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "posts",
    depth: 1,
    limit,
    sort: "-publishedAt",
    where: { and: [publishedOnly, { featured: { equals: true } }] },
  });

  return result.docs.map((doc) => toBlogCard(doc));
}

export async function getRelatedPosts(
  categorySlug: string,
  excludeId: string,
  limit = 3
) {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "posts",
    depth: 1,
    limit,
    sort: "-publishedAt",
    where: {
      and: [
        publishedOnly,
        { id: { not_equals: excludeId } },
        ...(categorySlug ? [{ "category.slug": { equals: categorySlug } }] : []),
      ],
    },
  });

  return result.docs.map((doc) => toBlogCard(doc));
}

export async function getPostBySlug(slug: string, draft = false) {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "posts",
    depth: 2,
    limit: 1,
    draft,
    where: draft
      ? { slug: { equals: slug } }
      : { and: [publishedOnly, { slug: { equals: slug } }] },
  });

  return result.docs[0] ?? null;
}

export async function getPostSlugs() {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "posts",
    depth: 0,
    pagination: false,
    where: publishedOnly,
    select: { slug: true },
  });

  return result.docs
    .map((doc) => doc.slug)
    .filter((slug): slug is string => Boolean(slug));
}

export async function getCategories(): Promise<BlogCategory[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "categories",
    depth: 1,
    limit: 100,
    sort: "title",
  });

  return result.docs.map((category) => {
    const image = resolveMediaUrl(category.image as Media | null, "card");
    return {
      id: String(category.id),
      title: category.title,
      slug: category.slug ?? "",
      subtitle: category.subtitle ?? "",
      image: image.url,
    };
  });
}
