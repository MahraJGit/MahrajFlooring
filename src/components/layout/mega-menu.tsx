"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import type { MegaMenuColumn } from "@/lib/public/services";

export function MegaMenuPanel({ columns }: { columns: MegaMenuColumn[] }) {
  return (
    <Container className="py-8">
      <div className="grid gap-8 lg:grid-cols-4">
        {columns.map((column) => (
          <div key={column.title}>
            <div className="flex items-start gap-2">
              <span
                aria-hidden
                className="mt-1.5 size-2 shrink-0 rotate-45 bg-brand"
              />
              <h3 className="text-sm font-semibold leading-5 text-ink">
                {column.title}
              </h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-body transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t border-border pt-5">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
        >
          View All Services
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </Container>
  );
}
