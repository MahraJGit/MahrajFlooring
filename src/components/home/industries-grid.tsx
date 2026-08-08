import Link from "next/link";

import { Section } from "@/components/layout/section";
import { industries } from "@/content/home";

export function IndustriesGrid() {
  return (
    <Section>
      <h2 className="text-center text-3xl font-semibold sm:text-4xl">
        Industries We Serve
      </h2>

      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {industries.map(({ slug, label, icon: Icon }) => (
          <li key={slug}>
            <Link
              href={`/industries/${slug}`}
              className="flex h-full flex-col items-center justify-center gap-3 rounded-md border border-border bg-background px-4 py-7 text-center transition-all hover:border-brand/40 hover:shadow-sm"
            >
              <Icon className="size-6 text-brand" />
              <span className="text-sm font-medium text-ink">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
