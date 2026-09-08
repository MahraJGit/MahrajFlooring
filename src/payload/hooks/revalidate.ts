import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

/**
 * Purges the static cache for blog routes after an edit so published changes
 * appear without a redeploy. Wrapped in try/catch because the same hooks run
 * from the seed script, which executes outside a Next.js request scope.
 */
async function purge(paths: string[]) {
  try {
    const { revalidatePath } = await import("next/cache");
    for (const path of paths) {
      revalidatePath(path);
    }
  } catch {
    // Running outside Next (e.g. `payload run`) — nothing to revalidate.
  }
}

const blogPaths = ["/blog"];

export const revalidatePost: CollectionAfterChangeHook = async ({ doc }) => {
  const paths = [...blogPaths];
  if (typeof doc?.slug === "string" && doc.slug) {
    paths.push(`/blog/${doc.slug}`);
  }
  await purge(paths);
  return doc;
};

export const revalidatePostAfterDelete: CollectionAfterDeleteHook = async ({
  doc,
}) => {
  const paths = [...blogPaths];
  if (typeof doc?.slug === "string" && doc.slug) {
    paths.push(`/blog/${doc.slug}`);
  }
  await purge(paths);
  return doc;
};

export const revalidateBlogIndex: CollectionAfterChangeHook = async ({ doc }) => {
  await purge(blogPaths);
  return doc;
};

export const revalidateBlogIndexAfterDelete: CollectionAfterDeleteHook = async ({
  doc,
}) => {
  await purge(blogPaths);
  return doc;
};
