"use client";

import { useState } from "react";

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

const labelClass =
  "text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-body";

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  // No API to post to yet; swap this for the real submission once the
  // backend endpoint is available.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-start justify-center rounded-md bg-surface-alt p-8 lg:p-10">
        <h3 className="text-xl font-semibold">Request received</h3>
        <p className="mt-3 text-sm leading-relaxed text-body">
          Thank you. Our technical team will review your project brief and
          respond within 24 hours.
        </p>
        <Button
          variant="brandOutline"
          size="xl"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-surface-alt p-8 lg:p-10">
      <h3 className="text-xl font-semibold sm:text-2xl">Get a Technical Quote</h3>
      <p className="mt-2 text-sm leading-relaxed text-body">
        Provide project details and our engineers will contact you within 24
        hours.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="quote-name" className={labelClass}>
              Your Name
            </Label>
            <Input
              id="quote-name"
              name="name"
              required
              autoComplete="name"
              placeholder="John Doe"
              className="h-11 bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quote-company" className={labelClass}>
              Company
            </Label>
            <Input
              id="quote-company"
              name="company"
              autoComplete="organization"
              placeholder="Design Studio"
              className="h-11 bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quote-solution" className={labelClass}>
            Industry Solution
          </Label>
          <Select name="solution" defaultValue={quoteSolutions[0]}>
            <SelectTrigger id="quote-solution" className="h-11 w-full bg-background">
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
          <Label htmlFor="quote-brief" className={labelClass}>
            Project Brief
          </Label>
          <Textarea
            id="quote-brief"
            name="brief"
            required
            rows={4}
            placeholder="Tell us about the area size and requirements..."
            className="bg-background"
          />
        </div>

        <Button type="submit" variant="brand" size="xl" className="w-full">
          Send Quote Request
        </Button>
      </form>
    </div>
  );
}
