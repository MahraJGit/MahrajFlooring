import type { Metadata } from "next";

import { CatalogueHero } from "@/components/catalogues/catalogue-hero";
import {
  TopicFilters,
  FeaturedCollection,
  ExploreCollections,
  ChooseByMatters,
  FindByIndustry,
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

export default function CataloguesPage() {
  return (
    <>
      <CatalogueHero />
      <TopicFilters />
      <FeaturedCollection />
      <ExploreCollections />
      <ChooseByMatters />
      <FindByIndustry />
      <ResourceCenter />
      <RealProjects />
      <TestimonialBand />
      <SizingGuide />
      <CatalogueCta />
      <CatalogueFaq />
    </>
  );
}
