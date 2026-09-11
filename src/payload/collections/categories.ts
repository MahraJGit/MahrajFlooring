import type { CollectionConfig } from "payload";

import { anyone, isEditor } from "@/payload/access";
import { slugField } from "@/payload/fields/slug";
import {
  revalidateBlogIndex,
  revalidateBlogIndexAfterDelete,
} from "@/payload/hooks/revalidate";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
    group: "Content",
    components: {
      edit: {
        SaveButton:
          "./src/payload/components/return-to-list-buttons.tsx#SaveAndReturnButton",
      },
    },
  },
  access: {
    create: isEditor,
    read: anyone,
    update: isEditor,
    delete: isEditor,
  },
  hooks: {
    afterChange: [revalidateBlogIndex],
    afterDelete: [revalidateBlogIndexAfterDelete],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField(),
    {
      name: "subtitle",
      type: "text",
      admin: {
        description: "Short line shown under the title on topic cards.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
};
