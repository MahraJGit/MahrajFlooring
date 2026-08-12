import { Section } from "@/components/layout/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { faqs, quoteSolutions } from "@/content/home";

const labelClass =
  "text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-body";

export function TechnicalFaqForm() {
  return (
    <Section tone="alt" spacing="none">
      <div className="grid items-start gap-6 py-12 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">FAQ</h2>
          <p className="mt-4 text-sm leading-relaxed text-body">
            Most stock items are available within 3-5 working days. Custom orders
            or specialised sports turf typically require 4-6 weeks from
            manufacture to port delivery.
          </p>

          <Accordion
            type="single"
            collapsible
            defaultValue={faqs[0].question}
            className="mt-7"
          >
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="py-4 text-start text-base font-medium text-ink hover:no-underline data-[state=open]:text-brand">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-body">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="rounded-md bg-background p-8 shadow-sm ring-1 ring-border">
          <h3 className="text-2xl font-semibold">Technical Expertise</h3>
          <form className="mt-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="home-name" className={labelClass}>
                  Your Name
                </Label>
                <Input
                  id="home-name"
                  placeholder="John Doe"
                  className="h-11 bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="home-company" className={labelClass}>
                  Company
                </Label>
                <Input
                  id="home-company"
                  placeholder="Design Studio"
                  className="h-11 bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="home-solution" className={labelClass}>
                Industry Solution
              </Label>
              <Select defaultValue={quoteSolutions[0]}>
                <SelectTrigger id="home-solution" className="h-11 w-full bg-background">
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
              <Label htmlFor="home-brief" className={labelClass}>
                Project Brief
              </Label>
              <Textarea
                id="home-brief"
                rows={4}
                placeholder="Tell us about the area size and requirements..."
                className="bg-background"
              />
            </div>

            <Button type="submit" variant="brand" size="xl" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
}
