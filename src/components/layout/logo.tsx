import Link from "next/link";

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
        "font-heading text-xl font-bold tracking-tight sm:text-2xl",
        onDark ? "text-white" : "text-ink",
        className
      )}
    >
      Mahraj <span className="text-brand">Flooring</span>
    </Link>
  );
}
