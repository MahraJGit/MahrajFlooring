import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight, Search } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cataloguePage } from "@/content/catalogues";

function hasPublicAsset(src: string) {
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

export function CatalogueHero() {
  const showImage = hasPublicAsset(cataloguePage.hero.image);

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900"
      />
      {showImage ? (
        <Image
          src={cataloguePage.hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
      ) : null}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/25"
      />

      <Container className="flex min-h-[28rem] flex-col justify-center py-16 lg:min-h-[32rem] lg:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/75">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5" />
              <span className="text-white">{cataloguePage.hero.breadcrumb}</span>
            </li>
          </ol>
        </nav>

        <div className="mt-8 max-w-xl">
          <h1 className="font-heading text-4xl font-semibold leading-[1.12] text-white sm:text-5xl whitespace-pre-line">
            {cataloguePage.hero.title}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
            {cataloguePage.hero.description}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="brand" size="xl">
            <Link href="/contact#quote-form">Request a Quote</Link>
          </Button>
          <Button
            asChild
            size="xl"
            className="border-white/15 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          >
            <Link href="/contact#get-in-touch">Talk to Our Team</Link>
          </Button>
        </div>
      </Container>

      {/* Search + filter bar pinned at bottom */}
      <div className="border-t border-white/10 bg-black/60 backdrop-blur-sm">
        <Container className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:gap-6">
          <form
            role="search"
            className="flex flex-1 items-center gap-3 rounded-full border border-white/20 bg-black/45 p-2"
          >
            <input
              type="search"
              name="q"
              placeholder={cataloguePage.hero.searchPlaceholder}
              aria-label="Search catalogues"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/60 sm:text-base"
            />
            <button
              type="submit"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark"
              aria-label="Search"
            >
              <Search className="size-5" />
            </button>
          </form>

          <div className="flex flex-wrap gap-4 lg:gap-6">
            {cataloguePage.filterDropdowns.map((filter) => (
              <div key={filter.label} className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-white/60">{filter.label}</span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-sm text-white"
                >
                  {filter.placeholder}
                  <ChevronDown className="size-3.5 text-white/60" />
                </button>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
