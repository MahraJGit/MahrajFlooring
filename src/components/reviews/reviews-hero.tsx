import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { reviewsHero } from "@/content/reviews";

function hasPublicAsset(src: string) {
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

export function ReviewsHero() {
  const showImage = hasPublicAsset(reviewsHero.image);

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900"
      />
      {showImage ? (
        <Image
          src={reviewsHero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
      ) : null}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/25"
      />

      <Container className="flex min-h-[28rem] flex-col justify-center py-20 lg:min-h-[32rem] lg:py-24">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl font-semibold leading-[1.1] text-white sm:text-5xl">
            {reviewsHero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
            {reviewsHero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="brand" size="xl">
              <a href="#completed-projects">View Our Projects</a>
            </Button>
            <Button asChild variant="inverseOutline" size="xl">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
