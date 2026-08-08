import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "What contractors, architects, and facility owners across the GCC say about working with Mahraj Flooring.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        title="Reviews"
        description="What contractors, architects, and facility owners across the GCC say about working with our team."
      />
      <ComingSoon note="Client testimonials are being collected and will be published here." />
    </>
  );
}
