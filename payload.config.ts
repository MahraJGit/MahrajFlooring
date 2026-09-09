import path from "node:path";
import { fileURLToPath } from "node:url";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Categories } from "./src/payload/collections/categories";
import { Media } from "./src/payload/collections/media";
import { Posts } from "./src/payload/collections/posts";
import { Services } from "./src/payload/collections/services";
import { Users } from "./src/payload/collections/users";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const s3Region = process.env.S3_REGION?.trim();
const s3Bucket = process.env.S3_BUCKET?.trim();

// Uploads go to S3 only when every credential is present, so local development
// works against public/media without any AWS setup.
const s3Enabled = Boolean(
  s3Bucket &&
    s3Region &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY
);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      title: "Mahraj Flooring Admin Panel",
      titleSuffix: " · Mahraj Flooring",
      icons: [
        {
          rel: "icon",
          type: "image/svg+xml",
          url: "/svgs/logo/mahraj-mark.svg",
        },
      ],
    },
    components: {
      graphics: {
        Icon: "./src/payload/components/admin-logo.tsx#AdminIcon",
        Logo: "./src/payload/components/admin-logo.tsx#AdminLogo",
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Services, Posts, Categories, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  typescript: {
    outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
  },
  sharp,
  plugins: [
    s3Storage({
      enabled: s3Enabled,
      collections: {
        // Stream files through /api/media so <img> tags get a normal 200 response
        // instead of a 302 to a signed S3 URL (which often breaks in the browser).
        media: true,
      },
      bucket: s3Bucket || "",
      // Direct browser-to-S3 uploads require CORS rules on the bucket; upload
      // through the server instead so files stay under one origin.
      clientUploads: false,
      config: {
        region: s3Region,
        followRegionRedirects: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
      },
    }),
  ],
});
