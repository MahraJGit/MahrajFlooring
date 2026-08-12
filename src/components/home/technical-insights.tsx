import Link from "next/link";

import { HomeCarousel } from "@/components/home/home-carousel";
import { Media } from "@/components/media";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { blogHighlights } from "@/content/home";

export function TechnicalInsights() {
  return (
    <Section tone="alt">
      <SectionHeading
        align="center"
        title="Technical Insights & Blog"
        description="Recent, engaging technical articles."
      />

      <HomeCarousel
        className="mt-10"
        itemClassName="w-full md:w-[calc((100%-2.5rem)/3)]"
        prevLabel="Previous insights"
        nextLabel="Next insights"
      >
        {blogHighlights.map((post) => (
          <article key={post.slug}>
            <Media
              src={post.image}
              alt={post.title}
              className="aspect-[16/10] rounded-md"
              sizes="(min-width: 768px) 30vw, 90vw"
            />
            <h3 className="mt-4 text-lg font-semibold text-ink">{post.title}</h3>
            <Button asChild variant="brandDark" className="mt-4">
              <Link href="/blog">Read Full Guide</Link>
            </Button>
          </article>
        ))}
      </HomeCarousel>
    </Section>
  );
}
