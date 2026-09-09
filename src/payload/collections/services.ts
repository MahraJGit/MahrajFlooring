import type { CollectionConfig, Field } from "payload";

import { isEditor, publishedOrSignedIn } from "@/payload/access";
import { slugField } from "@/payload/fields/slug";
import {
  revalidateService,
  revalidateServiceAfterDelete,
} from "@/payload/hooks/revalidate";

const isSub = (_: unknown, siblingData: { kind?: string | null }) =>
  siblingData?.kind === "sub";

const isMain = (_: unknown, siblingData: { kind?: string | null }) =>
  siblingData?.kind !== "sub";

function requireWhenSub(message: string) {
  return (value: unknown, { data }: { data?: { kind?: string | null } }) => {
    if (data?.kind === "sub" && (value === undefined || value === null || value === "")) {
      return message;
    }
    return true;
  };
}

const detailTabs: Field = {
  type: "tabs",
  admin: {
    condition: isSub,
  },
  tabs: [
    {
      label: "Listing",
      fields: [
        {
          name: "excerpt",
          type: "textarea",
          maxLength: 300,
          validate: requireWhenSub("Excerpt is required for sub-services."),
          admin: {
            description: "Shown on cards, search results, and meta tags.",
          },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          validate: requireWhenSub("Image is required for sub-services."),
          admin: {
            description: "Card and hero fallback image.",
          },
        },
        {
          name: "relatedServices",
          type: "relationship",
          relationTo: "services",
          hasMany: true,
          filterOptions: ({ id }) => {
            const filters: { kind: { equals: "sub" }; id?: { not_equals: string | number } } = {
              kind: { equals: "sub" },
            };
            if (id) filters.id = { not_equals: id };
            return filters;
          },
          admin: {
            description:
              "Shown in “Explore Our Flooring Services”. Leave empty to auto-pick siblings / other sub-services.",
          },
        },
      ],
    },
    {
      label: "Hero & Overview",
      fields: [
        {
          name: "detailTitle",
          type: "text",
          admin: {
            description: "Breadcrumb label (defaults to title).",
          },
        },
        {
          name: "heroTitle",
          type: "text",
          admin: {
            description: "Main H1 on the detail page.",
          },
        },
        {
          name: "heroDescription",
          type: "textarea",
        },
        {
          name: "overviewTitle",
          type: "text",
        },
        {
          name: "overviewDescription",
          type: "textarea",
        },
        {
          name: "overviewImage",
          type: "upload",
          relationTo: "media",
          admin: {
            description: "Optional. Falls back to the listing image.",
          },
        },
      ],
    },
    {
      label: "Applications Guide",
      fields: [
        {
          name: "guideTitle",
          type: "text",
        },
        {
          name: "guideDescription",
          type: "textarea",
          defaultValue:
            "Every project has unique structural demands. We provide application-specific guidance to protect athletes, users, equipment, and the subfloor.",
        },
        {
          name: "applications",
          type: "array",
          labels: { singular: "Application", plural: "Applications" },
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
            {
              name: "points",
              type: "array",
              fields: [{ name: "label", type: "text", required: true }],
            },
          ],
        },
      ],
    },
    {
      label: "Specs Tables",
      fields: [
        {
          name: "showPerformanceMatrix",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "Show the Thickness & Performance Matrix section.",
          },
        },
        {
          name: "performanceRows",
          type: "array",
          admin: {
            condition: (_, siblingData) =>
              Boolean(siblingData?.showPerformanceMatrix),
          },
          fields: [
            { name: "useCase", type: "text", required: true },
            { name: "recommended", type: "text", required: true },
            { name: "forceReduction", type: "text", required: true },
          ],
        },
        {
          name: "density",
          type: "text",
          admin: {
            condition: (_, siblingData) =>
              Boolean(siblingData?.showPerformanceMatrix),
          },
        },
        {
          name: "warranty",
          type: "text",
          admin: {
            condition: (_, siblingData) =>
              Boolean(siblingData?.showPerformanceMatrix),
          },
        },
        {
          name: "brandingTitle",
          type: "text",
          defaultValue: "Custom Branding & Color",
          admin: {
            condition: (_, siblingData) =>
              Boolean(siblingData?.showPerformanceMatrix),
          },
        },
        {
          name: "brandingDescription",
          type: "textarea",
          admin: {
            condition: (_, siblingData) =>
              Boolean(siblingData?.showPerformanceMatrix),
          },
        },
        {
          name: "showSpaceRequirements",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "Show the space requirements comparison table.",
          },
        },
        {
          name: "spaceRows",
          type: "array",
          admin: {
            condition: (_, siblingData) =>
              Boolean(siblingData?.showSpaceRequirements),
          },
          fields: [
            { name: "useCase", type: "text", required: true },
            { name: "recommended", type: "text", required: true },
            { name: "impact", type: "text", required: true },
            { name: "slip", type: "text", required: true },
            { name: "acoustic", type: "text", required: true },
            { name: "maintenance", type: "text", required: true },
          ],
        },
      ],
    },
    {
      label: "Section Titles",
      fields: [
        { name: "caseStudiesTitle", type: "text" },
        { name: "projectsTitle", type: "text" },
      ],
    },
    {
      label: "SEO",
      fields: [
        {
          name: "seoTitle",
          type: "text",
          admin: {
            description: "Overrides the title in search engines.",
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
};

/**
 * Hierarchical services:
 * - Main service → mega-menu column / organizer (no public detail page)
 * - Sub-service → own `/services/[slug]` detail page
 */
export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Service",
    plural: "Services",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "kind", "parent", "sortOrder", "detailReady", "_status"],
    group: "Content",
    description:
      "Create Main Services to organize the mega menu, then add Sub-services with detail content under each main.",
    listSearchableFields: ["title", "slug"],
    preview: (doc) => {
      if (doc?.kind === "main") return "/services";
      const path =
        typeof doc?.slug === "string" ? `/services/${doc.slug}` : "/services";
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
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        if (data.kind === "main") {
          data.parent = null;
          data.detailReady = false;
        }
        return data;
      },
    ],
    afterChange: [revalidateService],
    afterDelete: [revalidateServiceAfterDelete],
  },
  fields: [
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "sub",
      options: [
        {
          label: "Main service (mega-menu group)",
          value: "main",
        },
        {
          label: "Sub-service (detail page)",
          value: "sub",
        },
      ],
      admin: {
        position: "sidebar",
        description:
          "Main = organizer in the mega menu. Sub = public detail page under a main service.",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField(),
    {
      name: "parent",
      type: "relationship",
      relationTo: "services",
      filterOptions: {
        kind: { equals: "main" },
      },
      admin: {
        position: "sidebar",
        condition: isSub,
        description: "Which main service this sub-service belongs to.",
      },
      validate: (value, { data }) => {
        if (data?.kind === "sub" && !value) {
          return "Select a main service parent.";
        }
        if (data?.kind === "main" && value) {
          return "Main services cannot have a parent.";
        }
        return true;
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description:
          "Lower numbers appear first. For mains: mega-menu column order. For subs: order under that main.",
      },
    },
    {
      name: "showInMegaMenu",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description: "Include this item when building the Services mega menu.",
      },
    },
    {
      name: "detailReady",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        condition: isSub,
        description:
          "When enabled, the full detail layout is shown. When off, visitors see Coming Soon.",
      },
    },
    {
      name: "menuDescription",
      type: "textarea",
      maxLength: 200,
      admin: {
        condition: isMain,
        description: "Optional short note for editors. Not shown on the site.",
      },
    },
    detailTabs,
  ],
};
