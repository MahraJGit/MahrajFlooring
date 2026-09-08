import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Media } from "@/components/media";
import { getServices } from "@/content/services";

export const metadata: Metadata = {
  title: "Flooring Solutions",
  description:
    "Specialist flooring systems for commercial gyms, sports venues, healthcare, hospitality, and industrial environments across the GCC.",
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <PageHero
        title="Technical Flooring Categories"
        description="Explore specialist flooring systems selected for performance, safety, durability, and demanding commercial environments across the UAE and GCC."
      />
      <Section>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-background transition-all hover:border-brand/40 hover:shadow-md"
              >
                <Media
                  src={service.image}
                  alt={service.title}
                  className="aspect-[4/3]"
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-base font-semibold leading-snug">
                    {service.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
                    {service.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Explore Solution
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
