import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Media } from "@/components/media";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { getServices } from "@/content/services";

export function FlooringCategories() {
  const services = getServices();

  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow="Our Flooring Solutions"
        title="Technical Flooring Categories"
        description="Explore specialist flooring systems selected for performance, safety, durability, and demanding commercial environments across the UAE and GCC."
        action={
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
          >
            View All Flooring Solutions
            <ArrowRight className="size-4" />
          </Link>
        }
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
                sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold leading-snug">
                  {service.title}
                </h3>
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

      <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-md border border-border bg-background p-8 lg:flex-row lg:items-center lg:p-10">
        <div className="max-w-xl">
          <h3 className="text-2xl font-semibold sm:text-[1.75rem]">
            Not Sure Which Flooring System You Need?
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-body">
            Speak with our flooring specialists for product recommendations,
            technical specifications, samples, and project pricing.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="brandDark" size="xl">
            <Link href="/contact">Speak With a Specialist</Link>
          </Button>
          <Button asChild variant="brandOutline" size="xl">
            <Link href="/contact?request=samples">Request Flooring Samples</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
