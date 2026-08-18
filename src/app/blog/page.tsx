import type { Metadata } from "next";

import { BlogHero } from "@/components/blog/blog-hero";
import {
  ExploreByTopic,
  FeaturedBlogs,
  KnowledgeHubBand,
  LatestInsights,
  LessonsAndCta,
  WorkingOnSection,
} from "@/components/blog/blog-sections";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical guides, material comparisons, and installation insight from the Mahraj Flooring team.",
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <FeaturedBlogs />
      <ExploreByTopic />
      <WorkingOnSection />
      <LatestInsights />
      <KnowledgeHubBand />
      <LessonsAndCta />
    </>
  );
}
