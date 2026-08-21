import Link from "next/link";
import { ArrowRight, BookOpenText, Mail, Star, UserRoundSearch } from "lucide-react";

import { FeaturedBlogsCarousel } from "@/components/blog/featured-blogs-carousel";
import { SubscribeForm } from "@/components/forms/subscribe-form";
import { Media } from "@/components/media";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { blogPage } from "@/content/blog";

export function FeaturedBlogs() {
  return (
    <Section>
      <SectionHeading align="center" title={blogPage.featured.title} />
      <FeaturedBlogsCarousel articles={blogPage.featured.articles} />
    </Section>
  );
}

export function ExploreByTopic() {
  return (
    <Section>
      <SectionHeading title="Explore by Topic" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {blogPage.topics.map((topic) => (
          <li key={topic.title} className="group relative overflow-hidden rounded-md">
            <Media
              src={topic.image}
              alt={topic.title}
              className="aspect-[6/5] transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 90vw"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-3 text-white">
              <h3 className="text-lg font-semibold text-white">{topic.title}</h3>
              <p className="mt-1 text-xs text-white/75">{topic.subtitle}</p>
              <Link
                href="/services"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-brand"
              >
                Explore this topic
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <Button asChild variant="brand" size="xl">
          <Link href="/blog">View all Categories</Link>
        </Button>
      </div>
    </Section>
  );
}

function WorkingOnCard({ title }: { title: string }) {
  return (
    <div className="group flex h-full flex-col items-center rounded-md border border-border bg-background px-5 py-8 text-center transition-colors hover:border-brand hover:bg-brand">
      <Star className="size-8 fill-brand text-brand transition-colors group-hover:fill-white group-hover:text-white" />
      <p className="mt-4 text-sm font-semibold text-ink transition-colors group-hover:text-white">
        {title}
      </p>
      <p className="mt-1 text-xs text-body transition-colors group-hover:text-white/80">
        Consultation & Design
      </p>
    </div>
  );
}

export function WorkingOnSection() {
  const cards = blogPage.workingOn.cards;

  return (
    <Section tone="alt">
      <SectionHeading
        align="center"
        title={blogPage.workingOn.title}
        description={blogPage.workingOn.description}
      />
      <div className="mt-10 space-y-4">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.slice(0, 3).map((label) => (
            <li key={label}>
              <WorkingOnCard title={label} />
            </li>
          ))}
        </ul>
        <ul className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
          {cards.slice(3).map((label) => (
            <li key={label}>
              <WorkingOnCard title={label} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function LatestInsights() {
  const cards = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    title: "Hospital flooring: Anti-Microbial Sheet Vinyl Standards & Coved Skirting",
    image: "/images/projects/global-tech-hq.jpg",
    readTime: "9 min read",
    date: "May 14, 2026",
  }));

  return (
    <Section>
      <SectionHeading
        align="center"
        title={blogPage.latestInsights.title}
        description={blogPage.latestInsights.description}
      />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <li
            key={card.id}
            className="overflow-hidden rounded-md border border-border bg-background"
          >
            <div className="relative">
              <Media
                src={card.image}
                alt={card.title}
                className="aspect-[16/10]"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              />
              <span className="absolute start-3 top-3 rounded bg-brand px-3 py-1 text-xs font-semibold text-white">
                Category name
              </span>
            </div>
            <div className="p-4">
              <span className="inline-flex size-10 items-center justify-center rounded bg-brand text-white">
                <BookOpenText className="size-5" />
              </span>
              <h3 className="mt-3 text-base font-semibold leading-snug">{card.title}</h3>
              <div className="mt-4 flex gap-2 text-[0.6875rem] text-body">
                <span className="rounded border border-border px-2 py-1">{card.readTime}</span>
                <span className="rounded border border-border px-2 py-1">{card.date}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <Button asChild variant="brand" size="xl">
          <Link href="/blog">View all Blogs</Link>
        </Button>
      </div>
    </Section>
  );
}

export function KnowledgeHubBand() {
  return (
    <Section tone="alt">
      <SectionHeading align="center" title={blogPage.knowledgeHub.title} />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {blogPage.knowledgeHub.cards.map((card) => (
          <li
            key={card}
            className="relative overflow-hidden rounded-md border border-border bg-background p-5"
          >
            <span className="flex size-9 items-center justify-center rounded bg-brand/10 text-brand">
              <BookOpenText className="size-4" />
            </span>
            <h3 className="mt-4 text-xl font-semibold">{card}</h3>
            <p className="mt-2 text-sm text-body">Flooring description will go in here.</p>
            <span
              aria-hidden
              className="absolute -bottom-8 -end-8 size-24 rotate-45 bg-brand/25"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function LessonsAndCta() {
  return (
    <section>
      <div className="grid md:grid-cols-2">
        <Media
          src={blogPage.caseStudy.image}
          alt="Case study preview"
          className="aspect-[4/3] md:aspect-auto md:h-full"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        <div className="bg-ink p-8 text-white lg:p-12">
          <span className="rounded bg-brand px-3 py-1 text-xs font-semibold text-white">
            Case study
          </span>
          <h2 className="mt-5 text-4xl font-semibold leading-tight text-white">
            {blogPage.caseStudy.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            {blogPage.caseStudy.description}
          </p>
          <Button asChild variant="inverse" size="xl" className="mt-6">
            <Link href="/blog">
              Read More
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="bg-brand px-8 py-10 text-white lg:px-12 lg:py-12">
          <span className="flex size-12 items-center justify-center rounded bg-white text-brand">
            <UserRoundSearch className="size-7" />
          </span>
          <h3 className="mt-5 text-4xl font-semibold leading-tight text-white">
            {blogPage.ctaPanels.help.title}
          </h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
            {blogPage.ctaPanels.help.description}
          </p>
          <Button asChild variant="inverse" size="xl" className="mt-6">
            <Link href="/contact#quote-form">Read More</Link>
          </Button>
        </div>

        <div className="bg-charcoal px-8 py-10 text-white lg:px-12 lg:py-12">
          <span className="flex size-12 items-center justify-center rounded bg-white text-brand">
            <Mail className="size-7" />
          </span>
          <h3 className="mt-5 text-4xl font-semibold leading-tight text-white">
            {blogPage.ctaPanels.subscribe.title}
          </h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
            {blogPage.ctaPanels.subscribe.description}
          </p>
          <SubscribeForm
            placeholder={blogPage.ctaPanels.subscribe.placeholder}
            className="mt-6"
          />
        </div>
      </div>
    </section>
  );
}
