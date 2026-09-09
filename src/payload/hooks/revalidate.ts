import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

/**
 * Purges the static cache for blog/services routes after an edit so published
 * changes appear without a redeploy. Wrapped in try/catch because the same
 * hooks run from the seed script, which executes outside a Next.js request scope.
 */
async function purge(paths: string[], layoutPaths: string[] = []) {
  try {
    const { revalidatePath } = await import("next/cache");
    for (const path of paths) {
      revalidatePath(path);
    }
    for (const path of layoutPaths) {
      revalidatePath(path, "layout");
    }
  } catch {
    // Running outside Next (e.g. `payload run`) — nothing to revalidate.
  }
}

const blogPaths = ["/blog"];
const servicePaths = ["/services", "/"];

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

export const revalidateService: CollectionAfterChangeHook = async ({ doc }) => {
  const paths = [...servicePaths];
  if (doc?.kind === "sub" && typeof doc?.slug === "string" && doc.slug) {
    paths.push(`/services/${doc.slug}`);
  }
  await purge(paths, ["/"]);
  return doc;
};

export const revalidateServiceAfterDelete: CollectionAfterDeleteHook = async ({
  doc,
}) => {
  const paths = [...servicePaths];
  if (doc?.kind === "sub" && typeof doc?.slug === "string" && doc.slug) {
    paths.push(`/services/${doc.slug}`);
  }
  await purge(paths, ["/"]);
  return doc;
};
