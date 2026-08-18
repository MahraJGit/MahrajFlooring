import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 font-heading text-xl font-bold tracking-tight sm:text-2xl",
        onDark ? "text-white" : "text-ink",
        className
      )}
    >
      <span className="relative size-7 shrink-0 sm:size-8">
        <Image
          src="/svgs/logo/mahraj-mark.svg"
          alt="Mahraj Flooring mark"
          fill
          sizes="32px"
          className="object-contain"
        />
      </span>
      <span>
        Mahraj <span className="text-brand">Flooring</span>
      </span>
    </Link>
  );
}
