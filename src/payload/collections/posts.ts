import type { CollectionConfig } from "payload";

import { isEditor, publishedOrSignedIn } from "@/payload/access";
import { slugField } from "@/payload/fields/slug";
import {
  revalidatePost,
  revalidatePostAfterDelete,
} from "@/payload/hooks/revalidate";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    group: "Content",
    preview: (doc) => {
      const path = typeof doc?.slug === "string" ? `/blog/${doc.slug}` : "/blog";
      return `/preview?${new URLSearchParams({ path })}`;
    },
  },
  access: {
    create: isEditor,
    read: publishedOrSignedIn,
    update: isEditor,
    delete: isEditor,
  },
  versions: {
    drafts: {
      autosave: { interval: 800 },
    },
    maxPerDoc: 20,
  },
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidatePostAfterDelete],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField(),
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "excerpt",
              type: "textarea",
              required: true,
              maxLength: 300,
              admin: {
                description: "Shown on cards and in search results.",
              },
            },
            {
              name: "content",
              type: "richText",
              admin: {
                description: "The article body.",
              },
            },
          ],
        },
        {
          label: "Media",
          fields: [
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              required: true,
            },
          ],
        },
        {
          label: "Meta",
          fields: [
            {
              name: "seoTitle",
              type: "text",
              admin: {
                description: "Overrides the post title in search engines.",
              },
            },
            {
              name: "seoDescription",
              type: "textarea",
              maxLength: 200,
            },
          ],
        },
      ],
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "author",
      type: "text",
      defaultValue: "By Mahraj Engineering Team",
      admin: { position: "sidebar" },
    },
    {
      name: "readTime",
      type: "text",
      admin: {
        position: "sidebar",
        description: "For example: 9 min read",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly", displayFormat: "MMM d, yyyy" },
      },
      hooks: {
        beforeChange: [
          ({ value, siblingData }) => {
            if (siblingData?._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Show this post in the Featured Blogs carousel.",
      },
    },
  ],
};
