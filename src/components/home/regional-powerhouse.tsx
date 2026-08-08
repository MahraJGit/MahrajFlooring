import { MapPin } from "lucide-react";

import { Media } from "@/components/media";
import { Section } from "@/components/layout/section";
import { regions } from "@/content/home";

export function RegionalPowerhouse() {
  return (
    <Section tone="alt">
      <div className="rounded-md border border-border bg-background p-8 lg:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Regional Powerhouse
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-body">
              From our hubs in the UAE and KSA, we provide seamless supply and
              installation services across the entire GCC region.
            </p>
            <ul className="mt-8 space-y-3">
              {regions.map((region) => (
                <li key={region} className="flex items-center gap-3 text-sm">
                  <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                  {region}
                </li>
              ))}
            </ul>
          </div>

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
    </Section>
  );
}
