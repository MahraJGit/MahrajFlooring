import { ChevronRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import {
  aboutCompliance,
  aboutObjectives,
  commercialProcess,
} from "@/content/about";

export function AboutObjectives() {
  return (
    <Section spacing="none">
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
        {aboutObjectives.map(({ title, description, icon: Icon }, index) => (
          <li
            key={title}
            className={`group min-h-56 border border-border p-7 transition-colors hover:border-brand hover:bg-brand hover:text-white ${
              index < 4 ? "lg:border-b-0" : ""
            }`}
          >
            <span className="flex size-9 items-center justify-center rounded bg-brand/10 text-brand transition-colors group-hover:bg-white/15 group-hover:text-white">
              <Icon className="size-4" />
            </span>
            <h3 className="mt-5 text-base font-semibold text-ink transition-colors group-hover:text-white">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-body transition-colors group-hover:text-white">
              {description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function CommercialProcess() {
  return (
    <Section>
      <SectionHeading
        align="center"
        title="Steps commercial project process"
        description="Excellence delivered for the region’s top-tier business destinations."
      />

      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {commercialProcess.map(({ number, label, icon: Icon }, index) => (
          <li key={number} className="relative flex flex-col items-center text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Icon className="size-7" />
              <span className="ms-2 flex size-6 items-center justify-center rounded-full bg-brand text-[0.625rem] font-semibold text-white">
                {number}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold text-ink">{label}</p>
            {index < commercialProcess.length - 1 ? (
              <ChevronRight className="absolute -end-5 top-8 hidden size-5 text-brand/50 lg:block" />
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function AboutCompliance() {
  return (
    <Section tone="alt">
      <SectionHeading
        align="center"
        title="Regional Compliance & Accreditations"
      />

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {aboutCompliance.map(({ title, icon: Icon }) => (
          <li
            key={title}
            className="relative overflow-hidden rounded-md border border-border bg-background p-6"
          >
            <span className="flex size-9 items-center justify-center rounded bg-brand/10 text-brand">
              <Icon className="size-4" />
            </span>
            <h3 className="mt-4 text-sm font-semibold text-ink">{title}</h3>
            <span
              aria-hidden
              className="absolute -bottom-8 -end-8 size-24 rotate-45 bg-brand"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
