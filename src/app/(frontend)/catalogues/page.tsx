import type { Metadata } from "next";

import { CatalogueHero } from "@/components/catalogues/catalogue-hero";
import {
  TopicFilters,
  FeaturedCollection,
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
      <RealProjects />
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
