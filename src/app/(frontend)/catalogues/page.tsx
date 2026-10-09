import type { Metadata } from "next";

import { CatalogueHero } from "@/components/catalogues/catalogue-hero";
import {
  CatalogueSearchResults,
  TopicFilters,
  // FeaturedCollection,
  ExploreCollections,
  ChooseByMatters,
  FindByIndustry,
  RealProjects,
  TestimonialBand,
  SizingGuide,
  CatalogueCta,
} from "@/components/catalogues/catalogue-sections";
import { TechnicalFaqForm } from "@/components/home/technical-faq-form";
import { cataloguePage } from "@/content/catalogues";
import { getCatalogueCollections } from "@/lib/public/catalogues";

export const metadata: Metadata = {
  title: "Catalogues",
  description:
    "Download Mahraj Flooring product catalogues, technical data sheets, and finish references.",
};

function firstValue(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw?.trim();
  return trimmed || undefined;
}

export default async function CataloguesPage({
  searchParams,
}: PageProps<"/catalogues">) {
  const params = await searchParams;
  const query = firstValue(params.q);
  const catalogues = await getCatalogueCollections();

  return (
    <>
      <CatalogueHero query={query} />
      <CatalogueSearchResults query={query} catalogues={catalogues} />
      <TopicFilters />
      {/* <FeaturedCollection query={query} /> */}
      <ExploreCollections query={query} catalogues={catalogues} />
      <ChooseByMatters />
      <FindByIndustry query={query} />
      <RealProjects query={query} />
      <TestimonialBand />
      <SizingGuide />
      <CatalogueCta />
      <TechnicalFaqForm
        formIdPrefix="catalogue"
        faqs={cataloguePage.faqs}
        faqIntro={cataloguePage.faqIntro}
      />
    </>
  );
}
