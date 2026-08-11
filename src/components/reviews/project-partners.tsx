import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { partners } from "@/content/reviews";

export function ProjectPartners() {
  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow="Global Partnerships"
        title="Approved Project Partners"
        description="Consultants, developers, and operators we supply and install for across the GCC."
      />

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {partners.map((partner) => (
          <li
            key={partner.name}
            className="flex min-h-24 flex-col items-center justify-center rounded-md border border-border bg-background px-4 py-6 text-center"
          >
            <span className="text-sm font-semibold text-ink">{partner.name}</span>
            <span className="mt-1 text-[0.6875rem] uppercase tracking-[0.14em] text-body">
              {partner.category}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
