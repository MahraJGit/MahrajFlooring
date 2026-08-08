import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { QuoteForm } from "@/components/home/quote-form";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { site } from "@/content/site";

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
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-semibold">Talk to a specialist</h2>
            <ul className="mt-8 space-y-6 text-sm">
              <li className="flex gap-4">
                <Phone className="mt-0.5 size-5 shrink-0 text-brand" />
                <a
                  href={site.phoneHref}
                  className="transition-colors hover:text-brand"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-0.5 size-5 shrink-0 text-brand" />
                <span className="flex flex-col gap-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="transition-colors hover:text-brand"
                  >
                    {site.email}
                  </a>
                  <a
                    href={`mailto:${site.salesEmail}`}
                    className="transition-colors hover:text-brand"
                  >
                    {site.salesEmail}
                  </a>
                </span>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.line3}
                </span>
              </li>
            </ul>
          </div>

          <QuoteForm />
        </div>
      </Section>
    </>
  );
}
