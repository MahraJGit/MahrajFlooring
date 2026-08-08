import { Advantage } from "@/components/home/advantage";
import { FaqQuote } from "@/components/home/faq-quote";
import { FlooringCategories } from "@/components/home/flooring-categories";
import { Hero } from "@/components/home/hero";
import { IndustriesGrid } from "@/components/home/industries-grid";
import { RegionalPowerhouse } from "@/components/home/regional-powerhouse";
import { RegionalProjects } from "@/components/home/regional-projects";
import { ResourcesBand } from "@/components/home/resources-band";

export default function Home() {
  return (
    <>
      <Hero />
      <FlooringCategories />
      <IndustriesGrid />
      <Advantage />
      <RegionalProjects />
      <ResourcesBand />
      <RegionalPowerhouse />
      <FaqQuote />
    </>
  );
}
