import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { homeIndustriesCompact } from "@/content/home";

export function IndustriesGrid() {
  return (
    <Section>
      <h2 className="text-center text-3xl font-semibold sm:text-4xl">
        Industries We Serve
      </h2>

      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {homeIndustriesCompact.map(({ slug, label, icon: Icon }) => (
          <li key={slug}>
            <Link
              href={`/industries/${slug}`}
              className="flex h-full flex-col items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-6 text-center transition-all hover:border-brand/40 hover:shadow-sm"
            >
              <Icon className="size-5 text-brand" />
              <span className="text-xs font-medium text-ink">{label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="brandOutline" size="xl">
          <Link href="/industries">Explore Industry Solutions</Link>
        </Button>
      </div>
    </Section>
  );
}
