import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";

import { Container } from "@/components/layout/container";
import { blogPage } from "@/content/blog";

function hasPublicAsset(src: string) {
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

export function BlogHero() {
  const showImage = hasPublicAsset(blogPage.hero.image);

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900"
      />
      {showImage ? (
        <Image
          src={blogPage.hero.image}
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
              <span className="text-white">Blogs</span>
            </li>
          </ol>
        </nav>

        <div className="mt-8 max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-4xl font-semibold leading-[1.12] text-white sm:text-5xl">
            {blogPage.hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 text-center md:text-base">
            {blogPage.hero.description}
          </p>
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-3xl items-center gap-3 rounded-full border border-white/20 bg-black/45 p-2 backdrop-blur-sm justify-center">
          <p className="min-w-0 flex-1 truncate px-4 text-sm text-white/80 sm:text-base text-center">
            {blogPage.hero.searchPlaceholder}
          </p>
          <button
            type="button"
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-brand transition-colors hover:bg-brand hover:text-white"
            aria-label="Search blog"
          >
            <Search className="size-5" />
          </button>
        </div>
   
      </Container>
    </section>
  );
}
