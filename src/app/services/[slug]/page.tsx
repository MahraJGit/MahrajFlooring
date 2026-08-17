import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComingSoon } from "@/components/layout/coming-soon";
import { PageHero } from "@/components/layout/page-hero";
import { IndustryReviews } from "@/components/reviews/industry-reviews";
import { ServiceHero } from "@/components/services/service-hero";
import {
  ExploreServices,
  ServiceGuide,
  ServiceOverview,
} from "@/components/services/service-overview";
import {
  PerformanceMatrix,
  ServiceCaseStudies,
} from "@/components/services/service-performance";
import {
  OngoingProjects,
  ServiceAdvisory,
  ServiceProcess,
  SpaceRequirements,
  TechnicalResources,
} from "@/components/services/service-support";
import {
  getServiceBySlug,
  getServiceDetail,
  getServices,
} from "@/content/services";

export function generateStaticParams() {
  return getServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return {};

  return {
    title: service.title,
    description: service.excerpt,
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const detail = getServiceDetail(slug);

  if (detail) {
    return (
      <>
        <ServiceHero service={detail} />
        <ExploreServices service={detail} />
        <ServiceOverview service={detail} />
        <ServiceGuide service={detail} />
        <PerformanceMatrix />
        <ServiceCaseStudies service={detail} />
        <ServiceAdvisory />
        <SpaceRequirements />
        <TechnicalResources />
        <ServiceProcess />
        <OngoingProjects service={detail} />
        <IndustryReviews />
      </>
    );
  }

  return (
    <>
      <PageHero
        title={service.title}
        description={service.excerpt}
        breadcrumb={[{ label: "Services", href: "/services" }]}
      />
      <ComingSoon note="Full specifications, thickness options, certifications, and installation details for this system are being prepared." />
    </>
  );
}
