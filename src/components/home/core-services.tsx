import Link from "next/link";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { coreServices } from "@/content/home";

export function CoreServices() {
  return (
    <Section tone="alt">
      <SectionHeading
        align="center"
        eyebrow="Our Core Services"
        title="Our Core Services"
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {coreServices.map(({ title, subtitle, icon: Icon }, index) => (
          <li
            key={`${title}-${index}`}
            className="rounded-md border border-border bg-background p-6 text-center transition-all hover:border-brand/40 hover:shadow-sm"
          >
            <Icon className="mx-auto size-8 text-brand" />
            <h3 className="mt-4 text-sm font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-xs text-body">{subtitle}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="brandOutline" size="xl">
          <Link href="/services">Explore Industry Solutions</Link>
        </Button>
      </div>
    </Section>
  );
}
