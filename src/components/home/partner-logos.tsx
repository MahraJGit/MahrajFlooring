import { cn } from "@/lib/utils";

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

export function PartnerLogos({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-hidden motion-reduce:overflow-x-auto", className)}>
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
  );
}
