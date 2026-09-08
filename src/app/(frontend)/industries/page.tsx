import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { industries } from "@/content/home";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Flooring systems engineered for gyms, schools, hospitals, offices, hotels, events, sports venues, landscapes, homes, fairs, and stables.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        title="Industries We Serve"
        description="Every sector places different demands on a floor. These are the environments we specify and install for across the GCC."
      />
      <Section>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map(({ slug, label, icon: Icon }) => (
            <li key={slug}>
              <Link
                href={`/industries/${slug}`}
                className="flex h-full flex-col items-center justify-center gap-3 rounded-md border border-border bg-background px-4 py-7 text-center transition-all hover:border-brand/40 hover:shadow-sm"
              >
                <Icon className="size-6 text-brand" />
                <span className="text-sm font-medium text-ink">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
