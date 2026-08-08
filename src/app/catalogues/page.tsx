import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Catalogues",
  description:
    "Download Mahraj Flooring product catalogues, technical data sheets, and finish references.",
};

export default function CataloguesPage() {
  return (
    <>
      <PageHero
        title="Catalogues"
        description="Product catalogues, technical data sheets, and finish references for specification and tender submittals."
      />
      <ComingSoon note="Catalogue listings and downloadable data sheets are next in the build queue." />
    </>
  );
}
