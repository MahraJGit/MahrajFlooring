import type { Metadata } from "next";

import { CatalogueHero } from "@/components/catalogues/catalogue-hero";
import {
  CatalogueSearchResults,
  TopicFilters,
  FeaturedCollection,
  ExploreCollections,
  ChooseByMatters,
  ResourceCenter,
  RealProjects,
  TestimonialBand,
  SizingGuide,
  CatalogueCta,
  CatalogueFaq,
} from "@/components/catalogues/catalogue-sections";

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

  return (
    <>
      <CatalogueHero query={query} />
      <CatalogueSearchResults query={query} />
      <TopicFilters />
      <FeaturedCollection query={query} />
      <ExploreCollections query={query} />
      <ChooseByMatters />
      <ResourceCenter query={query} />
      <RealProjects query={query} />
      <TestimonialBand />
      <SizingGuide />
      <CatalogueCta />
      <CatalogueFaq />
    </>
  );
}
