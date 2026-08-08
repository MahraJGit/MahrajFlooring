import { cva, type VariantProps } from "class-variance-authority";

import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

const sectionVariants = cva("", {
  variants: {
    tone: {
      default: "bg-background",
      alt: "bg-surface-alt",
      charcoal: "bg-charcoal text-white",
      brand: "bg-brand-dark text-white",
    },
    spacing: {
      default: "py-16 md:py-20 lg:py-24",
      compact: "py-10 md:py-12",
      none: "",
    },
  },
  defaultVariants: {
    tone: "default",
    spacing: "default",
  },
});

export function Section({
  className,
  containerClassName,
  tone,
  spacing,
  children,
  ...props
}: React.ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & {
    containerClassName?: string;
  }) {
  return (
    <section
      className={cn(sectionVariants({ tone, spacing }), className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
