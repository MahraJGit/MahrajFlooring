import type { Metadata } from "next";

import {
  LegalBody,
  LegalCta,
  LegalHighlights,
} from "@/components/legal/legal-document";
import { LegalHero } from "@/components/legal/legal-hero";
import { termsDocument } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: termsDocument.description,
};

export default function TermsPage() {
  return (
    <>
      <LegalHero document={termsDocument} />
      <LegalHighlights document={termsDocument} />
      <LegalBody document={termsDocument} />
      <LegalCta />
    </>
  );
}
