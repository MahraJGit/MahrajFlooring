import Link from "next/link";

import { Media } from "@/components/media";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { getReviewedProjects } from "@/content/reviews";

export function FeaturedProjects() {
  const items = getReviewedProjects();
  const [featured, ...rest] = items;

  if (!featured) return null;

  return (
    <Section id="completed-projects">
      <SectionHeading
        align="center"
        title="From Specification to Handover"
        description="Each completed project below is paired with the client review that followed installation. Project pages can hold a full case study later without changing this layout."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-5">
        <ProjectCard project={featured} featured />
        <div className="grid gap-4 lg:col-span-2">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: ReturnType<typeof getReviewedProjects>[number];
  featured?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative overflow-hidden rounded-md ${featured ? "min-h-[22rem] lg:col-span-3 lg:min-h-[32rem]" : "min-h-[15rem]"}`}
    >
      <Media
        src={project.image}
        alt={project.title}
        className="absolute inset-0 size-full"
        sizes={featured ? "(min-width: 1024px) 55vw, 90vw" : "(min-width: 1024px) 30vw, 90vw"}
        priority={featured}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          {project.application}
        </p>
        <h3 className="mt-2 font-heading text-xl font-semibold text-white sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-white/70">
          {project.location} · {project.product}
        </p>
      </div>
    </Link>
  );
}
