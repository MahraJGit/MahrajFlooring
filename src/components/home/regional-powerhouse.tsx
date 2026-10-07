import { MapPin } from "lucide-react";

import { Media } from "@/components/media";
import { Section } from "@/components/layout/section";
import { regions } from "@/content/home";

const partnerLogos = [
  "62",
  "107",
  "112",
  "113",
  "114",
  "115",
  "116",
  "120",
  "122",
  "123",
  "133",
  "135",
  "136",
  "137",
  "138",
  "139",
];

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
                <div className="relative overflow-hidden rounded-md border border-border">
                  <Media
                    src="/images/gcc-map.jpg"
                    alt="GCC coverage map"
                    className="aspect-[16/10] grayscale"
                    sizes="(min-width: 1024px) 45vw, 90vw"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-white via-white/75 to-white/15"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <p className="flex flex-col items-center gap-2 rounded-md border border-border bg-background/95 px-6 py-4 text-center text-sm font-semibold shadow-sm">
                      <MapPin className="size-5 text-brand" />
                      Active Projects in 12+ Gulf Cities
                    </p>
                  </div>
                </div>
              </div>
        </div>

        <div className="mt-10 overflow-hidden border-t border-border pt-8 motion-reduce:overflow-x-auto">
          <div className="flex w-max animate-partner-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {partnerLogos.map((id) => (
                  <img
                    key={`${copy}-${id}`}
                    src={`/images/partners/${id}.png`}
                    alt=""
                    className="mx-6 h-12 w-auto object-contain"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
