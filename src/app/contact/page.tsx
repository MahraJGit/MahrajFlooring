import type { Metadata } from "next";

import { GetInTouch } from "@/components/contact/get-in-touch";
import { QuoteForm } from "@/components/home/quote-form";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Speak with the Mahraj Flooring technical team for product recommendations, samples, site surveys, and project pricing across the GCC.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="Send us your project brief and our engineers will respond within 24 hours with recommendations and indicative pricing."
      />
      <GetInTouch />
      <Section>
        <QuoteForm />
      </Section>
    </>
  );
}
