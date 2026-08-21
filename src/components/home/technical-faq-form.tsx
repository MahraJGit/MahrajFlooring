import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Section } from "@/components/layout/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs as defaultFaqs } from "@/content/home";

type FaqItem = {
  question: string;
  answer: string;
};

export function TechnicalFaqForm({
  formIdPrefix = "home",
  faqs = defaultFaqs,
  faqIntro = "Most stock items are available within 3-5 working days. Custom orders or specialised sports turf typically require 4-6 weeks from manufacture to port delivery.",
  formTitle = "Technical Expertise",
}: {
  formIdPrefix?: string;
  faqs?: FaqItem[];
  faqIntro?: string;
  formTitle?: string;
}) {
  return (
    <Section
      id="quote-form"
      tone="alt"
      spacing="none"
      className="scroll-mt-28"
    >
      <div className="grid items-start gap-6 py-12 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">FAQ</h2>
          <p className="mt-4 text-sm leading-relaxed text-body">{faqIntro}</p>

          <Accordion
            type="single"
            collapsible
            defaultValue={faqs[0]?.question}
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
          <h3 className="text-xl font-semibold uppercase tracking-[0.04em] sm:text-2xl">
            {formTitle}
          </h3>
          <EnquiryForm idPrefix={formIdPrefix} className="mt-6" />
        </div>
      </div>
    </Section>
  );
}
