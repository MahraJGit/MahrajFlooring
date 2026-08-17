import Link from "next/link";
import { BadgeCheck, Scissors } from "lucide-react";

import { Media } from "@/components/media";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { featuredCaseStudies, projects } from "@/content/home";
import type { ServiceDetail } from "@/content/services";

const performanceRows = [
  ["Home Fitness", "15mm - 20mm", "35%"],
  ["Strength Machines", "20mm - 25mm", "48%"],
  ["Free Weights", "30mm - 40mm", "62%"],
  ["Olympic Lifting", "50mm Integrated", "74%"],
];

export function PerformanceMatrix() {
  return (
    <Section>
      <SectionHeading align="center" title="Thickness & Performance Matrix" />

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full min-w-[32rem] text-start text-sm">
              <thead className="bg-surface-alt text-xs uppercase tracking-[0.1em] text-body">
                <tr>
                  <th className="px-5 py-4 text-start font-semibold">Use Case</th>
                  <th className="px-5 py-4 text-start font-semibold">
                    Recommended
                  </th>
                  <th className="px-5 py-4 text-start font-semibold">
                    Force Reduction
                  </th>
                </tr>
              </thead>
              <tbody>
                {performanceRows.map((row, index) => (
                  <tr
                    key={row[0]}
                    className={index % 2 === 0 ? "bg-background" : "bg-surface-alt"}
                  >
                    <th className="px-5 py-4 text-start font-semibold text-ink">
                      {row[0]}
                    </th>
                    <td className="px-5 py-4 text-body">{row[1]}</td>
                    <td className="px-5 py-4 font-medium text-brand">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-md bg-surface-alt p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-body">
                Density
              </p>
              <p className="mt-2 text-lg font-semibold text-ink">1100 kg/m³</p>
            </div>
            <div className="rounded-md bg-surface-alt p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-body">
                Warranty
              </p>
              <p className="mt-2 text-lg font-semibold text-ink">5 - 10 Years</p>
            </div>
          </div>
        </div>

        <div className="rounded-md bg-surface-alt p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <h3 className="text-2xl font-semibold text-ink">
                Custom Branding & Color
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-body">
                Add custom logos, zone markings, and colourways using
                precision-cut inserts and application-specific finishes.
              </p>
            </div>
            <Scissors className="size-12 shrink-0 text-ink" />
          </div>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.12em] text-ink">
            Finish Selector
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {["bg-black", "bg-neutral-600", "bg-red-700", "bg-blue-800", "bg-neutral-500"].map(
              (color) => (
                <span
                  key={color}
                  className={`size-9 rounded-full border-2 border-white ring-1 ring-brand ${color}`}
                />
              )
            )}
          </div>

          <div className="mt-7 flex items-start gap-3 rounded-md bg-background p-4">
            <BadgeCheck className="mt-0.5 size-5 shrink-0 text-brand" />
            <div>
              <p className="text-sm font-semibold text-ink">Logo Inlay Service</p>
              <p className="mt-1 text-xs text-body">
                Available for selected tiles, sheets, tracks, and sports systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function ServiceCaseStudies({
  service,
}: {
  service: ServiceDetail;
}) {
  return (
    <Section tone="alt">
      <SectionHeading
        title={service.caseStudiesTitle}
        description="Selected project systems and commercial equipment delivered across the GCC."
      />

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {featuredCaseStudies.map((study, index) => {
          const project = projects[index];

          return (
            <li
              key={study.slug}
              className="overflow-hidden rounded-md border border-border bg-background"
            >
              <Media
                src={project.image}
                alt={study.title}
                className="aspect-4/3"
                sizes="(min-width: 768px) 30vw, 90vw"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-ink">{study.title}</h3>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <p className="font-heading text-lg font-semibold text-ink">
                    {study.price}
                  </p>
                  <p className="text-xs text-body">{study.meta}</p>
                </div>
                <Button asChild variant="brand" size="lg" className="mt-5 w-full">
                  <Link href={`/projects/${project.slug}`}>
                    View Project Details
                  </Link>
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
