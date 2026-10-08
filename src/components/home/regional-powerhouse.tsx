import { PartnerLogos } from "@/components/home/partner-logos";
import { Section } from "@/components/layout/section";
import { regions } from "@/content/home";
import { site } from "@/content/site";

export function RegionalPowerhouse() {
  return (
    <Section tone="alt">
      <div className="rounded-md border border-border bg-background p-8 lg:p-12">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Our Regional Presence
          </p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Trusted Across the GCC</h2>
        </div>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-body">
                  Where We Operate:
                </h3>
                <ul className="mt-4 space-y-3">
                  {regions.map((region) => (
                    <li key={region} className="flex items-center gap-3 text-sm">
                      <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                      {region}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-body">
                  Regional Footprint
                </h3>
                <div className="overflow-hidden rounded-md border border-border">
                  <iframe
                    title="Mahraj Flooring, B2B Tower, Business Bay, Dubai"
                    src={site.address.mapsEmbed}
                    className="aspect-[16/10] w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
        </div>

        <PartnerLogos className="mt-10 border-t border-border pt-8" />
      </div>
    </Section>
  );
}
