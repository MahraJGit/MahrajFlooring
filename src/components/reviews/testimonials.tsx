import Link from "next/link";
import { Star } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { getReviewedProjects, projectReviews } from "@/content/reviews";

export function Testimonials() {
  const reviewed = getReviewedProjects();

  return (
    <Section tone="alt">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Social Proof"
          title="Technical Project Testimonials"
          description="Measured feedback from site engineers, architects, and facilities managers across the GCC."
        />
        <p className="shrink-0 text-sm font-medium text-brand">
          <span className="font-heading text-2xl font-semibold text-ink">4.9</span>
          <span className="ms-2 text-body">average from {projectReviews.length}+ project reviews</span>
        </p>
      </div>

      <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reviewed.map((project) => {
          const review = project.review;
          if (!review) return null;

          return (
            <li
              key={review.projectSlug}
              className="flex h-full flex-col rounded-md border border-border bg-background p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`size-3.5 ${index < review.rating ? "fill-amber-500 text-amber-500" : "text-border"}`}
                    />
                  ))}
                </span>
                <span className="text-xs text-body">{review.date}</span>
              </div>

              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-ink italic">
                “{review.quote}”
              </blockquote>

              <div className="mt-6 flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                  {review.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{review.role}</p>
                  <p className="text-xs text-body">{review.company}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
                >
                  View project
                </Link>
                <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-body">
                  {review.source}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
