import type { Metadata } from "next";

import { ContactHero } from "@/components/contact/contact-hero";
import { CurrentLocation } from "@/components/contact/current-location";
import { GetInTouch } from "@/components/contact/get-in-touch";
import { RegionalOffices } from "@/components/contact/regional-offices";
import { TechnicalFaqForm } from "@/components/home/technical-faq-form";
import { contactFaqs, contactFaqIntro } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Speak with the Mahraj Flooring technical team for product recommendations, samples, site surveys, and project pricing across the GCC.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <GetInTouch />
      <CurrentLocation />
      <RegionalOffices />
      <TechnicalFaqForm
        formIdPrefix="contact"
        faqs={contactFaqs}
        faqIntro={contactFaqIntro}
      />
    </>
  );
}
