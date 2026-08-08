import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Mahraj Flooring supplies and installs performance surfaces for fitness, commercial, and industrial spaces across the UAE, Saudi Arabia, Qatar, Oman, and Bahrain.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Mahraj Flooring"
        description="The leading authority in performance surfaces across the Middle East, providing architect-grade solutions for fitness, commercial, and industrial spaces."
      />
      <ComingSoon note="Company history, certifications, and team profiles are being written." />
    </>
  );
}
