import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  UserRound,
} from "lucide-react";

import { QuoteForm } from "@/components/home/quote-form";
import { Media } from "@/components/media";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { projects } from "@/content/home";
import type { ServiceDetail } from "@/content/services";

const advisors = [
  { name: "Jerome Bell", role: "General Manager" },
  { name: "Darrell Steward", role: "Business Developer" },
  { name: "Robert Fox", role: "Technical Developer" },
];

const processSteps = ["Understand", "Assess", "Recommend", "Coordinate", "Delivery"];

export function ServiceAdvisory() {
  return (
    <Section>
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl">Expert Advisory</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-body sm:text-base">
            Our technical team provides detailed subfloor analysis, specification
            support, material guidance, and installation recommendations for
            every project.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {advisors.map((advisor) => (
              <li
                key={advisor.name}
                className="overflow-hidden rounded-md bg-brand/10 text-center"
              >
                <span className="mx-auto mt-5 flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <UserRound className="size-6" />
                </span>
                <div className="mt-4 bg-brand px-3 py-3 text-white">
                  <h3 className="text-sm font-semibold text-white">
                    {advisor.name}
                  </h3>
                  <p className="mt-1 text-[0.6875rem] text-white/80">
                    {advisor.role}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <QuoteForm />
      </div>
    </Section>
  );
}

export function SpaceRequirements() {
  return (
    <Section>
      <SectionHeading
        align="center"
        title="Every Space Has Different Flooring Requirements"
        description="Recommendations are confirmed after site conditions, loads, traffic, compliance, and maintenance expectations are reviewed."
      />

      <div className="mt-10 overflow-x-auto rounded-md border border-border">
        <table className="w-full min-w-[48rem] text-sm">
          <thead className="bg-surface-alt text-xs uppercase tracking-[0.1em] text-body">
            <tr>
              {[
                "Use Case",
                "Recommended",
                "Impact",
                "Slip",
                "Acoustic",
                "Maintenance",
              ].map((heading) => (
                <th key={heading} className="px-5 py-4 text-start font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Home Fitness", "15mm - 20mm", "35%", "R10", "Medium", "Easy"],
              ["Strength Machines", "20mm - 25mm", "48%", "R10", "High", "Easy"],
              ["Free Weights", "30mm - 40mm", "62%", "R11", "High", "Medium"],
              ["Olympic Lifting", "50mm Integrated", "74%", "R11", "Very High", "Medium"],
            ].map((row, index) => (
              <tr
                key={row[0]}
                className={index % 2 === 0 ? "bg-background" : "bg-surface-alt"}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${row[0]}-${cell}`}
                    className={`px-5 py-4 ${
                      cellIndex === 0 ? "font-semibold text-ink" : "text-body"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

export function TechnicalResources() {
  return (
    <>
      <Section tone="alt">
        <SectionHeading
          align="center"
          title="Architectural & Technical Resources"
        />
        <div className="mt-10 grid overflow-hidden rounded-md bg-background md:grid-cols-2">
          {["Download Data Sheet", "Specification & Sample Support"].map(
            (title, index) => (
              <div
                key={title}
                className="border-b border-border p-7 last:border-b-0 md:border-b-0 md:border-e md:last:border-e-0"
              >
                <h3 className="text-xl font-semibold text-ink">{title}</h3>
                <ul className="mt-5 space-y-3">
                  {[
                    "Technical data and test values",
                    "Installation and preparation guidance",
                    "Finish and colour references",
                    "Warranty and care information",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-body"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="brand"
                  size="lg"
                  className="mt-6"
                >
                  <Link href={index === 0 ? "/catalogues" : "/contact"}>
                    {index === 0 ? "Request Sample" : "View further info"}
                  </Link>
                </Button>
              </div>
            )
          )}
        </div>
      </Section>

      <Section tone="brand" spacing="compact">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-white">
              Subfloor Prep & Technical Standards
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">
              Moisture testing, levelling, repairs, adhesive selection, and
              substrate preparation are planned as part of the complete system.
            </p>
          </div>
          <Media
            src="/images/services/rubber-gym-flooring.jpg"
            alt="Technical flooring preparation"
            className="aspect-16/7 rounded-md"
            sizes="(min-width: 768px) 45vw, 90vw"
          />
        </div>
      </Section>
    </>
  );
}

export function ServiceProcess() {
  return (
    <Section>
      <SectionHeading
        align="center"
        title="5 steps commercial project process"
        description="Excellence delivered for the region’s top-tier commercial and fitness destinations."
      />
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((label, index) => (
          <li key={label} className="relative flex flex-col items-center text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Building2 className="size-7" />
              <span className="ms-2 flex size-6 items-center justify-center rounded-full bg-brand text-[0.625rem] font-semibold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold text-ink">{label}</p>
            {index < processSteps.length - 1 ? (
              <ChevronRight className="absolute -end-5 top-8 hidden size-5 text-brand/50 lg:block" />
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function OngoingProjects({ service }: { service: ServiceDetail }) {
  return (
    <Section tone="alt">
      <SectionHeading align="center" title={service.projectsTitle} />
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="overflow-hidden rounded-md border border-border bg-background"
          >
            <Media
              src={project.image}
              alt={project.title}
              className="aspect-4/3"
              sizes="(min-width: 768px) 30vw, 90vw"
            />
            <div className="p-5">
              <h3 className="text-base font-semibold text-ink">
                Project: {project.title}
              </h3>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
              >
                View Detail
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
