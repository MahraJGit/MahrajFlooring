import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { commitments } from "@/content/reviews";

export function Commitment() {
  return (
    <Section tone="alt">
      <SectionHeading
        align="center"
        eyebrow="Service Promise"
        title="The Mahraj Commitment"
        description="Support does not end at handover. These are the teams and processes that stay on the project after the floor is down."
      />

      <ul className="mt-12 grid gap-10 md:grid-cols-3">
        {commitments.map(({ title, description, href, action, icon: Icon }) => (
          <li key={title}>
            <Icon className="size-6 text-brand" />
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">{description}</p>
            <Link
              href={href}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              {action}
              <ArrowRight className="size-3.5" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
