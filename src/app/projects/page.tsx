import type { Metadata } from "next";
import Link from "next/link";

import { Media } from "@/components/media";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { projects } from "@/content/home";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Reference flooring projects delivered across the UAE, Saudi Arabia, and Qatar for sports, commercial, and healthcare clients.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Regional Projects"
        description="A selection of installations delivered for sports, commercial, and healthcare clients across the Gulf."
      />
      <Section>
        <ul className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <Media
                  src={project.image}
                  alt={project.title}
                  className="aspect-[4/3] rounded-md"
                  sizes="(min-width: 768px) 30vw, 90vw"
                />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                  {project.location}
                </p>
                <h2 className="mt-2 text-lg font-semibold transition-colors group-hover:text-brand">
                  {project.title}
                </h2>
                <p className="mt-1.5 text-sm text-body">
                  Application: {project.application} | Product: {project.product}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
