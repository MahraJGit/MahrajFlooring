import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <ComingSoon note="Our privacy policy is being reviewed by legal counsel and will be published shortly." />
    </>
  );
}
