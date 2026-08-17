"use client";

import { useState } from "react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { quoteSolutions } from "@/content/home";
import { feedbackFormIntro } from "@/content/reviews";

const labelClass =
  "text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-body";

export function ReviewForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Section tone="alt">
      <SectionHeading
        align="center"
        title={feedbackFormIntro.title}
        description={feedbackFormIntro.description}
      />

      <div className="mx-auto mt-10 max-w-3xl rounded-md bg-background p-8 shadow-sm ring-1 ring-border lg:p-10">
        {submitted ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold">Feedback received</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">
              Thank you. Our team will review your feedback before it is published.
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
            <h3 className="text-xl font-semibold uppercase tracking-[0.04em] sm:text-2xl">
              Technical Expertise
            </h3>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="review-name" className={labelClass}>
                    Your Name
                  </Label>
                  <Input
                    id="review-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="John Doe"
                    className="h-11 bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-company" className={labelClass}>
                    Company
                  </Label>
                  <Input
                    id="review-company"
                    name="company"
                    autoComplete="organization"
                    placeholder="Design Studio"
                    className="h-11 bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-phone" className={labelClass}>
                    Phone
                  </Label>
                  <Input
                    id="review-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="111-111-111"
                    className="h-11 bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-email" className={labelClass}>
                    Email
                  </Label>
                  <Input
                    id="review-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="xyz@gmail.com"
                    className="h-11 bg-background"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-solution" className={labelClass}>
                  Industry Solution
                </Label>
                <Select name="solution" defaultValue={quoteSolutions[0]}>
                  <SelectTrigger
                    id="review-solution"
                    className="h-11 w-full bg-background"
                  >
                    <SelectValue placeholder="Select a solution" />
                  </SelectTrigger>
                  <SelectContent>
                    {quoteSolutions.map((solution) => (
                      <SelectItem key={solution} value={solution}>
                        {solution}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-brief" className={labelClass}>
                  Project Brief
                </Label>
                <Textarea
                  id="review-brief"
                  name="brief"
                  required
                  rows={4}
                  placeholder="Tell us about the area size and requirements..."
                  className="bg-background"
                />
              </div>

              <Button type="submit" variant="brand" size="xl" className="w-full">
                Submit
              </Button>
            </form>
          </>
        )}
      </div>
    </Section>
  );
}
