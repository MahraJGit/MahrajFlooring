import type { CollectionConfig } from "payload";

import { anyone, isEditor } from "@/payload/access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Content",
  },
  access: {
    create: isEditor,
    read: anyone,
    update: isEditor,
    delete: isEditor,
  },
  upload: {
    // When S3 is configured the storage adapter overrides this and sets
    // disableLocalStorage automatically.
    staticDir: "public/media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 480, position: "centre" },
      { name: "hero", width: 1600, height: 900, position: "centre" },
    ],
    focalPoint: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Describe the image for screen readers and SEO.",
      },
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
