import type { Where } from "payload";

import { getPayloadClient } from "./client";
import { resolveMediaUrl } from "./media-url";
import type { Media, Service } from "@/payload/payload-types";

export type ServiceCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  href: string;
  parentId: string | null;
  parentTitle: string | null;
};

export type ServiceGroup = {
  id: string;
  slug: string;
  title: string;
  sortOrder: number;
  children: ServiceCard[];
};

export type ServiceApplication = {
  title: string;
  description: string;
  points: string[];
};

export type PerformanceRow = {
  useCase: string;
  recommended: string;
  forceReduction: string;
};

export type SpaceRow = {
  useCase: string;
  recommended: string;
  impact: string;
  slip: string;
  acoustic: string;
  maintenance: string;
};

export type ServiceDetailView = ServiceCard & {
  detailReady: boolean;
  detailTitle: string;
  heroTitle: string;
  heroDescription: string;
  overviewTitle: string;
  overviewDescription: string;
  overviewImage: string;
  guideTitle: string;
  guideDescription: string;
  applications: ServiceApplication[];
  showPerformanceMatrix: boolean;
  performanceRows: PerformanceRow[];
  density: string;
  warranty: string;
  brandingTitle: string;
  brandingDescription: string;
  showSpaceRequirements: boolean;
  spaceRows: SpaceRow[];
  caseStudiesTitle: string;
  projectsTitle: string;
  related: ServiceCard[];
  siblings: ServiceCard[];
  seoTitle: string;
  seoDescription: string;
};

export type MegaMenuColumn = {
  title: string;
  href?: string;
  links: { label: string; href: string }[];
};

export type SearchEntry = {
  label: string;
  href: string;
  group: string;
};

const publishedOnly: Where = { _status: { equals: "published" } };
const publishedSub: Where = {
  and: [publishedOnly, { kind: { equals: "sub" } }],
};
const publishedMain: Where = {
  and: [publishedOnly, { kind: { equals: "main" } }],
};

function resolveImage(
  value: Service["image"] | Service["overviewImage"],
  size?: "thumbnail" | "card" | "hero"
) {
  const media = value as Media | null | undefined;
  if (!media || typeof media === "string" || typeof media === "number") {
    return { url: "/images/advantage-installation.jpg", alt: "" };
  }
  const resolved = resolveMediaUrl(media, size);
  return {
    url: resolved.url || "/images/advantage-installation.jpg",
    alt: resolved.alt,
  };
}

function resolveParent(value: Service["parent"]) {
  if (!value || typeof value === "string" || typeof value === "number") {
    return { id: value ? String(value) : null, title: null as string | null };
  }
  return { id: String(value.id), title: value.title ?? null };
}

export function toServiceCard(
  service: Service,
  imageSize?: "thumbnail" | "card" | "hero"
): ServiceCard {
  const image = resolveImage(service.image, imageSize ?? "card");
  const parent = resolveParent(service.parent);

  return {
    id: String(service.id),
    slug: service.slug ?? "",
    title: service.title,
    excerpt: service.excerpt ?? "",
    image: image.url,
    imageAlt: image.alt || service.title,
    href: `/services/${service.slug ?? ""}`,
    parentId: parent.id,
    parentTitle: parent.title,
  };
}

function toDetailView(
  service: Service,
  related: ServiceCard[],
  siblings: ServiceCard[]
): ServiceDetailView {
  const card = toServiceCard(service, "hero");
  const overview = resolveImage(service.overviewImage ?? service.image, "card");

  return {
    ...card,
    detailReady: Boolean(service.detailReady),
    detailTitle: service.detailTitle || service.title,
    heroTitle: service.heroTitle || service.title,
    heroDescription: service.heroDescription || service.excerpt || "",
    overviewTitle:
      service.overviewTitle ||
      `Complete ${service.title} Support - From Specification to Installation`,
    overviewDescription:
      service.overviewDescription ||
      "Our team supports the full project cycle with site assessment, product selection, technical submittals, preparation, installation, and documented handover.",
    overviewImage: overview.url,
    guideTitle: service.guideTitle || `The ${service.title} Guide`,
    guideDescription:
      service.guideDescription ||
      "Every project has unique structural demands. We provide application-specific guidance to protect athletes, users, equipment, and the subfloor.",
    applications: (service.applications ?? []).map((application) => ({
      title: application.title,
      description: application.description,
      points: (application.points ?? []).map((point) => point.label),
    })),
    showPerformanceMatrix: Boolean(service.showPerformanceMatrix),
    performanceRows: (service.performanceRows ?? []).map((row) => ({
      useCase: row.useCase,
      recommended: row.recommended,
      forceReduction: row.forceReduction,
    })),
    density: service.density || "1100 kg/m³",
    warranty: service.warranty || "5 - 10 Years",
    brandingTitle: service.brandingTitle || "Custom Branding & Color",
    brandingDescription:
      service.brandingDescription ||
      "Add custom logos, zone markings, and colourways using precision-cut inserts and application-specific finishes.",
    showSpaceRequirements: Boolean(service.showSpaceRequirements),
    spaceRows: (service.spaceRows ?? []).map((row) => ({
      useCase: row.useCase,
      recommended: row.recommended,
      impact: row.impact,
      slip: row.slip,
      acoustic: row.acoustic,
      maintenance: row.maintenance,
    })),
    caseStudiesTitle: service.caseStudiesTitle || `${service.title} Case Studies`,
    projectsTitle: service.projectsTitle || `${service.title} Ongoing Projects`,
    related,
    siblings,
    seoTitle: service.seoTitle || service.title,
    seoDescription: service.seoDescription || service.excerpt || "",
  };
}

/** Published sub-services for listing cards / home teasers. */
export async function getServices(limit = 100): Promise<ServiceCard[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "services",
    depth: 1,
    limit,
    sort: "sortOrder",
    where: publishedSub,
  });

  return result.docs.map((doc) => toServiceCard(doc));
}

/** Listing page: main services with nested published sub-services. */
export async function getServiceGroups(): Promise<ServiceGroup[]> {
  const payload = await getPayloadClient();

  const [mains, subs] = await Promise.all([
    payload.find({
      collection: "services",
      depth: 0,
      limit: 50,
      sort: "sortOrder",
      where: publishedMain,
    }),
    payload.find({
      collection: "services",
      depth: 1,
      limit: 200,
      sort: "sortOrder",
      where: publishedSub,
    }),
  ]);

  const childrenByParent = new Map<string, ServiceCard[]>();

  for (const sub of subs.docs) {
    const card = toServiceCard(sub);
    const parentId = card.parentId;
    if (!parentId) continue;
    const list = childrenByParent.get(parentId) ?? [];
    list.push(card);
    childrenByParent.set(parentId, list);
  }

  return mains.docs
    .map((main) => ({
      id: String(main.id),
      slug: main.slug ?? "",
      title: main.title,
      sortOrder: main.sortOrder ?? 0,
      children: childrenByParent.get(String(main.id)) ?? [],
    }))
    .filter((group) => group.children.length > 0);
}

export async function getServiceBySlug(
  slug: string
): Promise<ServiceDetailView | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "services",
    depth: 1,
    limit: 1,
    where: {
      and: [publishedSub, { slug: { equals: slug } }],
    },
  });

  const service = result.docs[0];
  if (!service) return null;

  const parent = resolveParent(service.parent);
  let related: ServiceCard[] = [];
  const relatedField = service.relatedServices;

  if (Array.isArray(relatedField) && relatedField.length > 0) {
    related = relatedField
      .filter((item): item is Service => typeof item === "object" && item !== null)
      .filter((item) => item._status === "published" && item.kind === "sub")
      .slice(0, 3)
      .map((item) => toServiceCard(item));
  }

  let siblings: ServiceCard[] = [];
  if (parent.id) {
    const siblingResult = await payload.find({
      collection: "services",
      depth: 1,
      limit: 12,
      sort: "sortOrder",
      where: {
        and: [
          publishedSub,
          { parent: { equals: parent.id } },
          { slug: { not_equals: slug } },
        ],
      },
    });
    siblings = siblingResult.docs.map((doc) => toServiceCard(doc));
  }

  if (related.length === 0) {
    related = siblings.slice(0, 3);
  }

  if (related.length === 0) {
    const others = await payload.find({
      collection: "services",
      depth: 1,
      limit: 3,
      sort: "sortOrder",
      where: {
        and: [publishedSub, { slug: { not_equals: slug } }],
      },
    });
    related = others.docs.map((doc) => toServiceCard(doc));
  }

  return toDetailView(service, related, siblings);
}

/** Only sub-services get public detail routes. */
export async function getServiceSlugs(): Promise<string[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "services",
    depth: 0,
    limit: 200,
    select: { slug: true },
    where: publishedSub,
  });

  return result.docs
    .map((doc) => doc.slug)
    .filter((slug): slug is string => Boolean(slug));
}

/**
 * Mega menu is derived from Main → Sub hierarchy.
 * No separate menu global to keep in sync.
 */
export async function getServiceMegaMenu(): Promise<MegaMenuColumn[]> {
  const payload = await getPayloadClient();

  const [mains, subs] = await Promise.all([
    payload.find({
      collection: "services",
      depth: 0,
      limit: 50,
      sort: "sortOrder",
      where: {
        and: [publishedMain, { showInMegaMenu: { equals: true } }],
      },
    }),
    payload.find({
      collection: "services",
      depth: 0,
      limit: 200,
      sort: "sortOrder",
      where: {
        and: [publishedSub, { showInMegaMenu: { equals: true } }],
      },
      select: {
        title: true,
        slug: true,
        parent: true,
        sortOrder: true,
      },
    }),
  ]);

  const linksByParent = new Map<string, { label: string; href: string }[]>();

  for (const sub of subs.docs) {
    const parentId =
      typeof sub.parent === "object" && sub.parent
        ? String(sub.parent.id)
        : sub.parent
          ? String(sub.parent)
          : null;
    if (!parentId || !sub.slug) continue;
    const list = linksByParent.get(parentId) ?? [];
    list.push({
      label: sub.title,
      href: `/services/${sub.slug}`,
    });
    linksByParent.set(parentId, list);
  }

  return mains.docs
    .map((main) => ({
      title: main.title,
      links: linksByParent.get(String(main.id)) ?? [],
    }))
    .filter((column) => column.links.length > 0);
}

export async function getServiceSearchIndex(): Promise<SearchEntry[]> {
  const [groups, megaMenu] = await Promise.all([
    getServiceGroups(),
    getServiceMegaMenu(),
  ]);

  const fromGroups = groups.flatMap((group) =>
    group.children.map((service) => ({
      label: service.title,
      href: service.href,
      group: group.title,
    }))
  );

  // Mega menu labels match groups; prefer group-based index to avoid duplicates.
  if (fromGroups.length > 0) return fromGroups;

  return megaMenu.flatMap((column) =>
    column.links.map((link) => ({
      label: link.label,
      href: link.href,
      group: column.title,
    }))
  );
}
