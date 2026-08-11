import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { contactChannels, contactIntro } from "@/content/contact";

export function GetInTouch() {
  return (
    <Section tone="alt">
      <SectionHeading
        align="center"
        title={<span className="text-brand">{contactIntro.title}</span>}
        description={contactIntro.description}
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {contactChannels.map(
          ({ title, description, action, href, icon: Icon, external }) => (
            <li key={title}>
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className="group flex h-full flex-col items-center rounded-md border border-border bg-background px-5 py-8 text-center transition-colors hover:border-brand-dark hover:bg-brand-dark hover:text-white"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-surface-alt text-brand transition-colors group-hover:bg-white/15 group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold transition-colors group-hover:text-white">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-body transition-colors group-hover:text-white/75">
                  {description}
                </p>
                <span className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand transition-colors group-hover:text-white">
                  {action}
                </span>
              </a>
            </li>
          )
        )}
      </ul>
    </Section>
  );
}
