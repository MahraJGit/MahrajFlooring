import config from "@payload-config";
import { getPayload } from "payload";

/**
 * Clears CMS content for QA / local resets without removing admin users.
 *
 * Usage:
 *   npm run reset:blog
 *   npm run reset:services
 *   npm run reset:content
 *   npm run reset:content -- --media   (also delete Media uploads)
 */

const args = process.argv.slice(2);
const resetBlog = args.includes("--blog") || args.includes("--all");
const resetServices = args.includes("--services") || args.includes("--all");
const resetMedia = args.includes("--media");

if (!resetBlog && !resetServices && !resetMedia) {
  console.error(`
Usage:
  npm run reset:blog
  npm run reset:services
  npm run reset:content
  npm run reset:content -- --media
`);
  process.exit(1);
}

const payload = await getPayload({ config });

async function clearCollection(
  collection: "posts" | "categories" | "services" | "media"
) {
  const before = await payload.find({
    collection,
    limit: 1,
    depth: 0,
  });

  await payload.delete({
    collection,
    where: {},
  });

  payload.logger.info(
    `Cleared ${collection} (previously ~${before.totalDocs} docs).`
  );
}

try {
  if (resetBlog) {
    // Posts first (they reference categories), then categories.
    await clearCollection("posts");
    await clearCollection("categories");
  }

  if (resetServices) {
    // Delete all services (subs + mains). Parent links are cleared with the docs.
    await clearCollection("services");
  }

  if (resetMedia) {
    await clearCollection("media");
  }

  payload.logger.info("Reset complete. Admin users were not changed.");
  process.exit(0);
} catch (error) {
  payload.logger.error(error);
  process.exit(1);
}
