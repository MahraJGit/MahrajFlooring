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
  getServiceSlugs,
} from "@/lib/payload/services";

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) return {};

  return {
    title: service.seoTitle,
    description: service.seoDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  if (service.detailReady) {
    return (
      <>
        <ServiceHero service={service} />
        <ExploreServices service={service} related={service.related} />
        <ServiceOverview service={service} />
        <ServiceGuide service={service} />
        {service.showPerformanceMatrix ? (
          <PerformanceMatrix service={service} />
        ) : null}
        <ServiceCaseStudies service={service} />
        <ServiceAdvisory />
        {service.showSpaceRequirements ? (
          <SpaceRequirements service={service} />
        ) : null}
        <TechnicalResources />
        <ServiceProcess />
        <OngoingProjects service={service} />
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
