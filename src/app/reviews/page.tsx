import type { Metadata } from "next";

import { Accreditations } from "@/components/reviews/accreditations";
import { Commitment } from "@/components/reviews/commitment";
import { FeaturedProjects } from "@/components/reviews/featured-projects";
import { ProjectPartners } from "@/components/reviews/project-partners";
import { ReviewForm } from "@/components/reviews/review-form";
import { ReviewsHero } from "@/components/reviews/reviews-hero";
import { Testimonials } from "@/components/reviews/testimonials";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Completed flooring projects across the GCC, paired with technical testimonials from the teams who specified and received them.",
};

export default function ReviewsPage() {
  return (
    <>
      <ReviewsHero />
      <ProjectPartners />
      <FeaturedProjects />
      <Testimonials />
      <Accreditations />
      <Commitment />
      <ReviewForm />
    </>
  );
}
