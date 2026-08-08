import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Service" />
      <ComingSoon note="Our terms of service are being reviewed by legal counsel and will be published shortly." />
    </>
  );
}
