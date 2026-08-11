"use client";

import { useState } from "react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/components/layout/section";

const labelClass =
  "text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-body";

export function ReviewForm() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Section>
      <div className="rounded-md border border-border bg-surface-alt p-8 lg:p-12">
        {submitted ? (
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">Review received</h2>
            <p className="mt-3 text-sm leading-relaxed text-body">
              Thank you. Our team will review your feedback before it is published
              alongside the related project.
            </p>
            <Button
              variant="brandOutline"
              size="xl"
              className="mt-6"
              onClick={() => setSubmitted(false)}
            >
              Submit another review
            </Button>
          </div>
        ) : (
          <>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Share Your Project Experience
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-body">
                Your feedback helps us maintain technical standards and improve
                the next installation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-3xl space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="review-name" className={labelClass}>
                    Full Name
                  </Label>
                  <Input
                    id="review-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="e.g. Robert Smith"
                    className="h-11 bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-org" className={labelClass}>
                    Organization / Project
                  </Label>
                  <Input
                    id="review-org"
                    name="organization"
                    placeholder="e.g. Sky Tower Sports Hub"
                    className="h-11 bg-background"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className={labelClass}>Rating</p>
                <div className="flex gap-1" role="group" aria-label="Star rating">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const value = index + 1;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        className="rounded-sm p-0.5 text-amber-500 transition-transform hover:scale-110"
                        aria-label={`${value} star${value === 1 ? "" : "s"}`}
                        aria-pressed={rating === value}
                      >
                        <Star
                          className={`size-6 ${value <= rating ? "fill-amber-500" : "fill-transparent text-border"}`}
                        />
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="rating" value={rating} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-feedback" className={labelClass}>
                  Technical Feedback
                </Label>
                <Textarea
                  id="review-feedback"
                  name="feedback"
                  required
                  rows={5}
                  placeholder="Describe the installation quality, material performance, and project support..."
                  className="bg-background"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 text-sm leading-relaxed text-body">
                  <input
                    type="checkbox"
                    name="publish"
                    className="mt-1 size-4 shrink-0 accent-brand"
                  />
                  I consent to having this review published on the Mahraj Flooring
                  site.
                </label>
                <label className="flex items-start gap-3 text-sm leading-relaxed text-body">
                  <input
                    type="checkbox"
                    name="reference"
                    className="mt-1 size-4 shrink-0 accent-brand"
                  />
                  Include my project as a reference for prospective clients.
                </label>
              </div>

              <Button type="submit" variant="brand" size="xl" className="w-full">
                Submit Technical Review
              </Button>
            </form>
          </>
        )}
      </div>
    </Section>
  );
}
