import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import { slugify } from "@/lib/cms/slug";
import { getModels } from "@/lib/db/models";
import { getServices } from "@/lib/public/services";

/**
 * Drop service PDFs in public/catalogues.
 * A file named with the service slug (padel-court.pdf) or the service title
 * (Padel Court.pdf) is linked automatically. The aliases below cover the
 * catalogue filenames that add words like "catalogue" or "catalog".
 */
const CATALOGUE_DIR = path.join(process.cwd(), "public", "catalogues");

const FILE_ALIASES: Record<string, string> = {
  "rubber-gym-flooring-catalogue": "rubber-gym-flooring",
  "vinyl-flooring-catalogue": "vinyl-flooring",
  "homogeneous-flooring-for-schools-and-hospitals": "homogeneous-flooring",
  "kids-play-area-flooring": "play-area-kids",
  "sbr-flooring-system": "sbr-rubber-gym-flooring",
  "artificial-grass-flooring-catalog": "artificial-grass",
  "sports-flooring-catalog": "sports-flooring",
  "exhibition-flooring-catalog": "exhibition-flooring",
};

const FILE_IMAGES: Record<string, string> = {
  "office-carpet-flooring-catalogue": "/images/services/office-carpet-flooring.jpg",
  "gym-equipment-fitness-machines-catalogue": "/images/services/gym-fitness-industry.png",
  "stable-farm-rubber-flooring-catalog": "/images/services/stable-farm-flooring.jpg",
};

export type CatalogueCollection = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string | null;
  pdfHref: string;
  pdfName: string;
  fileSizeLabel: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  const megabytes = bytes / (1024 * 1024);
  return `${megabytes >= 10 ? Math.round(megabytes) : megabytes.toFixed(1)} MB`;
}

function catalogueKey(filename: string) {
  return slugify(filename.replace(/\.pdf$/i, ""));
}

function displayTitle(filename: string) {
  return filename
    .replace(/\.pdf$/i, "")
    .replace(/\s+(catalogue|catalog)$/i, "")
    .trim();
}

function findService(
  file: string,
  services: Awaited<ReturnType<typeof getServices>>,
  used: Set<string>
) {
  const key = catalogueKey(file);
  const alias = FILE_ALIASES[key];
  const stripped = key.replace(/-(catalogue|catalog)$/i, "");

  return services.find((item) => {
    if (used.has(item.slug)) return false;
    return (
      item.slug === alias ||
      item.slug === key ||
      item.slug === stripped ||
      slugify(item.title) === key ||
      slugify(item.title) === stripped
    );
  });
}

function applicationTags(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (isRecord(item) && typeof item.title === "string" ? item.title.trim() : ""))
    .filter(Boolean)
    .slice(0, 3);
}

export async function getCatalogueCollections(): Promise<CatalogueCollection[]> {
  if (!existsSync(CATALOGUE_DIR)) return [];

  const files = readdirSync(CATALOGUE_DIR)
    .filter((file) => file.toLowerCase().endsWith(".pdf"))
    .sort((a, b) => a.localeCompare(b));
  if (files.length === 0) return [];

  const [services, { Service }] = await Promise.all([
    getServices(200),
    getModels(),
  ]);
  const extras = (await Service.find({ _status: "published" })
    .select("slug applications")
    .lean()) as Array<{ slug?: string; applications?: unknown }>;

  const tagsBySlug = new Map<string, string[]>();
  for (const doc of extras) {
    if (typeof doc.slug !== "string") continue;
    tagsBySlug.set(doc.slug, applicationTags(doc.applications));
  }

  const used = new Set<string>();

  const matched = files.flatMap((file) => {
    const key = catalogueKey(file);
    const service = findService(file, services, used);
    const stats = statSync(path.join(CATALOGUE_DIR, file));
    const pdfHref = `/catalogues/${encodeURIComponent(file)}`;
    const fileSizeLabel = `PDF · ${formatBytes(stats.size)}`;

    if (!service) {
      const title = displayTitle(file);
      return [
        {
          slug: key || file,
          title,
          description: `Download the ${title} catalogue for specifications, finishes, and project guidance.`,
          image: FILE_IMAGES[key] ?? "/images/advantage-installation.jpg",
          tags: [],
          href: null,
          pdfHref,
          pdfName: file,
          fileSizeLabel,
        },
      ];
    }

    used.add(service.slug);
    const tags = [
      ...(service.parentTitle ? [service.parentTitle] : []),
      ...(tagsBySlug.get(service.slug) ?? []),
    ].filter((tag, index, list) => tag && list.indexOf(tag) === index).slice(0, 4);

    return [
      {
        slug: service.slug,
        title: service.title,
        description:
          service.excerpt ||
          `Download the ${service.title} catalogue for specifications, finishes, and project guidance.`,
        image: service.image,
        tags,
        href: service.href,
        pdfHref,
        pdfName: file,
        fileSizeLabel,
      },
    ];
  });

  const order = new Map(services.map((service, index) => [service.slug, index]));
  return matched.sort((a, b) => {
    const aOrder = order.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
    const bOrder = order.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.title.localeCompare(b.title);
  });
}
