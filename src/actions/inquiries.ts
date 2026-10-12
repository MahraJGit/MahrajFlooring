"use server";

import { site } from "@/content/site";
import { sendInquiryEmail } from "@/lib/email/send-inquiry";
import {
  hasErrors,
  validateEmail,
  validateEnquiry,
  type EnquiryValues,
} from "@/lib/form-validation";

export type InquiryResult = { ok: true } | { ok: false; error: string };

const FAILED = `We couldn't send your message just now. Please email ${site.inquiryEmail} and our team will help you directly.`;

function clean(value: unknown) {
  return String(value ?? "").trim();
}

export async function submitEnquiry(input: {
  source: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  solution: string;
  brief: string;
  website?: string;
  requirePhone?: boolean;
}): Promise<InquiryResult> {
  if (clean(input.website)) {
    return { ok: true };
  }

  const values: EnquiryValues = {
    name: clean(input.name),
    company: clean(input.company),
    email: clean(input.email),
    phone: clean(input.phone),
    solution: clean(input.solution),
    brief: clean(input.brief),
  };

  const errors = validateEnquiry(values, {
    requirePhone: input.requirePhone !== false,
  });
  if (hasErrors(errors)) {
    return { ok: false, error: "Please check the form and try again." };
  }

  const source = clean(input.source) || "Website enquiry";

  try {
    const sent = await sendInquiryEmail({
      source,
      subject: `${source} — ${values.name}`,
      replyTo: values.email,
      fields: [
        { label: "Form", value: source },
        { label: "Name", value: values.name },
        { label: "Company", value: values.company || "Not provided" },
        { label: "Phone", value: values.phone || "Not provided" },
        { label: "Email", value: values.email },
        { label: "Industry solution", value: values.solution },
        { label: "Project brief", value: values.brief },
      ],
    });
    if (!sent.ok) return { ok: false, error: FAILED };
    return { ok: true };
  } catch (error) {
    console.error("Inquiry email failed", error);
    return { ok: false, error: FAILED };
  }
}

export async function submitSubscription(input: {
  source: string;
  email: string;
  website?: string;
}): Promise<InquiryResult> {
  if (clean(input.website)) {
    return { ok: true };
  }

  const email = clean(input.email);
  const error = validateEmail(email);
  if (error) return { ok: false, error };

  const source = clean(input.source) || "Newsletter signup";

  try {
    const sent = await sendInquiryEmail({
      source,
      subject: `${source} — ${email}`,
      replyTo: email,
      fields: [
        { label: "Form", value: source },
        { label: "Email", value: email },
      ],
    });
    if (!sent.ok) return { ok: false, error: FAILED };
    return { ok: true };
  } catch (error) {
    console.error("Subscription email failed", error);
    return { ok: false, error: FAILED };
  }
}
