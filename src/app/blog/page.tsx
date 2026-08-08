import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical guides, material comparisons, and installation insight from the Mahraj Flooring team.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Blog"
        description="Technical guides, material comparisons, and installation insight from our engineering team."
      />
      <ComingSoon note="Articles are being drafted and will appear here once the content plan is signed off." />
    </>
  );
}
