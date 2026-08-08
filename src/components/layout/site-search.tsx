"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getServices, megaMenu } from "@/content/services";

const searchIndex = [
  ...getServices().map((service) => ({
    label: service.title,
    href: `/services/${service.slug}`,
    group: "Flooring Solutions",
  })),
  ...megaMenu.flatMap((column) =>
    column.links.map((link) => ({
      label: link.label,
      href: link.href,
      group: column.title,
    }))
  ),
];

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const term = query.trim().toLowerCase();
  const results =
    term.length > 1
      ? searchIndex
          .filter((entry) => entry.label.toLowerCase().includes(term))
          .slice(0, 8)
      : [];

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="text-body">
          <Search className="size-5" />
          <span className="sr-only">Search flooring solutions</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="p-0">
        <SheetHeader className="p-6">
          <SheetTitle className="sr-only">Search</SheetTitle>
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search flooring solutions, materials, applications..."
            className="h-12 text-base"
          />
          {term.length > 1 ? (
            <div className="mt-4">
              {results.length > 0 ? (
                <ul className="divide-y divide-border">
                  {results.map((result) => (
                    <li key={`${result.group}-${result.href}-${result.label}`}>
                      <Link
                        href={result.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between py-3 text-sm text-ink transition-colors hover:text-brand"
                      >
                        {result.label}
                        <span className="text-xs text-body">{result.group}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-3 text-sm text-body">
                  No solutions match &ldquo;{query}&rdquo;.
                </p>
              )}
            </div>
          ) : null}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
