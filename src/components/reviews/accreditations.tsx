import { ShieldCheck } from "lucide-react";

import { Section } from "@/components/layout/section";
import { accreditations, warrantyCards } from "@/content/reviews";

export function Accreditations() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl">Accredited Excellence</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-body">
            Materials and installation methods are specified against international
            certifications and local civil-defence requirements across the GCC.
          </p>
          <ul className="mt-8 space-y-4">
            {accreditations.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ul className="grid grid-cols-2 gap-3">
          {warrantyCards.map(({ title, icon: Icon }) => (
            <li
              key={title}
              className="flex min-h-36 flex-col items-center justify-center rounded-md border border-border bg-surface-alt px-4 py-6 text-center"
            >
              <Icon className="size-6 text-brand" />
              <span className="mt-3 text-sm font-semibold">{title}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
