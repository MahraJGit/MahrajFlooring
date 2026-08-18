"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FeaturedArticle = {
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  date: string;
  author: string;
  href: string;
};

export function FeaturedBlogsCarousel({
  articles,
}: {
  articles: FeaturedArticle[];
}) {
  const [index, setIndex] = useState(0);
  const current = articles[index];

  function prev() {
    setIndex((value) => (value - 1 + articles.length) % articles.length);
  }

  function next() {
    setIndex((value) => (value + 1) % articles.length);
  }

  return (
    <>
      <article className="mt-10 grid items-center gap-7 rounded-md border border-border bg-background p-5 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
        <div className="relative overflow-hidden rounded-md">
          <Image
            src={current.image}
            alt={current.title}
            width={1280}
            height={800}
            className="h-auto w-full object-cover"
            sizes="(min-width: 1024px) 45vw, 90vw"
          />
          <span className="absolute start-3 top-3 rounded bg-brand px-3 py-1 text-xs font-semibold text-white">
            Featured Blog
          </span>
          <div className="absolute inset-x-0 bottom-0 flex gap-2 p-3 text-[0.6875rem] text-white/90">
            <span className="rounded bg-black/55 px-2 py-1">{current.readTime}</span>
            <span className="rounded bg-black/55 px-2 py-1">{current.date}</span>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-semibold leading-tight">{current.title}</h3>
          <p className="mt-4 text-base leading-relaxed text-body">{current.excerpt}</p>
          <p className="mt-5 text-sm font-semibold text-ink">{current.author}</p>
          <Button asChild variant="brand" size="xl" className="mt-5">
            <Link href={current.href}>Read More</Link>
          </Button>
        </div>
      </article>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={prev}
          className="inline-flex size-8 items-center justify-center rounded-full border border-border text-body transition-colors hover:border-brand hover:text-brand"
          aria-label="Previous featured blog"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex gap-2">
          {articles.map((article, dotIndex) => (
            <button
              key={article.title}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Go to featured blog ${dotIndex + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                dotIndex === index ? "w-8 bg-brand" : "w-6 bg-border hover:bg-brand/50"
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="inline-flex size-8 items-center justify-center rounded-full border border-border text-body transition-colors hover:border-brand hover:text-brand"
          aria-label="Next featured blog"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </>
  );
}
