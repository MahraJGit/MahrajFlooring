import type { Field } from "payload";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * URL slug that fills itself from another field when left blank, so editors
 * never have to think about it but can still override for SEO.
 */
export function slugField(sourceField = "title"): Field {
  return {
    name: "slug",
    type: "text",
    unique: true,
    index: true,
    admin: {
      position: "sidebar",
      description: "Leave blank to generate from the title.",
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (typeof value === "string" && value.trim()) {
            return slugify(value);
          }
          const source = data?.[sourceField];
          if (typeof source === "string" && source.trim()) {
            return slugify(source);
          }
          return value;
        },
      ],
    },
  };
}
