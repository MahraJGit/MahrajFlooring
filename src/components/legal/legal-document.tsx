import Link from "next/link";
import { ArrowRight, FileText, Scale } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import type { LegalDocument } from "@/content/legal";

export function LegalHighlights({ document }: { document: LegalDocument }) {
  return (
    <Section spacing="compact">
      <ul className="grid gap-4 sm:grid-cols-3">
        {document.highlights.map((item) => (
          <li
            key={item.label}
            className="rounded-md border border-border bg-background px-5 py-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              {item.label}
            </p>
            <p className="mt-2 text-base font-semibold text-ink">{item.value}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function LegalBody({ document }: { document: LegalDocument }) {
  const Icon = document.slug === "terms" ? Scale : FileText;

  return (
    <Section tone="alt" className="pt-4">
      <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Contents
          </p>
          <nav aria-label="On this page" className="mt-4">
            <ol className="space-y-1">
              {document.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex gap-3 rounded-md px-2 py-2 text-sm text-body transition-colors hover:bg-background hover:text-brand"
                  >
                    <span className="w-6 shrink-0 font-semibold text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-8 hidden rounded-md border border-border bg-background p-5 lg:block">
            <p className="text-sm font-semibold text-ink">Related document</p>
            <Link
              href={document.related.href}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              {document.related.label}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </aside>

        <article className="rounded-md border border-border bg-background p-6 sm:p-8 lg:p-10">
          <div className="flex items-start gap-4 border-b border-border pb-6">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-brand text-white">
              <Icon className="size-6" />
            </span>
            <p className="text-base leading-relaxed text-body">{document.intro}</p>
          </div>

          <div className="divide-y divide-border">
            {document.sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 py-8"
              >
                <h2 className="flex gap-3 text-xl font-semibold sm:text-2xl">
                  <span className="text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-sm leading-relaxed text-body sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets?.length ? (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed text-body sm:text-base"
                      >
                        <span
                          aria-hidden
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-2 rounded-md border border-border bg-surface-alt px-5 py-4 text-sm text-body lg:hidden">
            Also read{" "}
            <Link
              href={document.related.href}
              className="font-semibold text-brand"
            >
              {document.related.label}
            </Link>
          </div>
        </article>
      </div>
    </Section>
  );
}

export function LegalCta() {
  return (
    <section className="bg-background pb-16 md:pb-20 lg:pb-24">
      <Container>
        <div className="grid overflow-hidden rounded-md md:grid-cols-2">
          <div className="bg-brand px-8 py-10 text-white lg:px-12 lg:py-12">
            <h2 className="text-3xl font-semibold leading-tight text-white">
              Need a project-specific agreement?
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              Quotations, warranties, and installation scopes are issued in
              writing for each job. Our team can walk you through documentation
              before work starts.
            </p>
            <Button asChild variant="inverse" size="xl" className="mt-6">
              <Link href="/contact">
                Talk to Our Team
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="bg-charcoal px-8 py-10 text-white lg:px-12 lg:py-12">
            <h2 className="text-3xl font-semibold leading-tight text-white">
              Looking for catalogues instead?
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Browse collections, technical resources, and downloadable product
              documentation from the catalogues library.
            </p>
            <Button asChild variant="brand" size="xl" className="mt-6">
              <Link href="/catalogues">
                View Catalogues
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
