import {
  BadgeCheck,
  FileSignature,
  HandCoins,
  Lock,
  Mail,
  ShieldCheck,
  Truck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalKeyPoint = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type LegalDocument = {
  slug: "terms" | "privacy-policy";
  title: string;
  breadcrumb: string;
  description: string;
  lastUpdated: string;
  highlights: { label: string; value: string }[];
  keyPointsTitle: string;
  keyPointsDescription: string;
  keyPoints: LegalKeyPoint[];
  intro: string;
  sections: LegalSection[];
  related: { label: string; href: string };
};

export const termsDocument: LegalDocument = {
  slug: "terms",
  title: "Terms of Service",
  breadcrumb: "Terms of Service",
  description:
    "The conditions that govern use of the Mahraj Flooring website, catalogues, quotations, and commercial flooring services across the UAE and GCC.",
  lastUpdated: "19 August 2026",
  highlights: [
    { label: "Effective", value: "19 August 2026" },
    { label: "Applies to", value: "Website, quotes & projects" },
    { label: "Governing law", value: "United Arab Emirates" },
  ],
  keyPointsTitle: "The short version",
  keyPointsDescription:
    "A plain-language summary of the points that matter most on a live project. The full terms below remain the binding version.",
  keyPoints: [
    {
      icon: FileSignature,
      title: "Your signed quote wins",
      description:
        "Where a quotation, purchase order, or contract conflicts with this page, the project document takes precedence.",
    },
    {
      icon: HandCoins,
      title: "Website prices are indicative",
      description:
        "Rates, lead times, and stock shown online are a guide. Only a written quotation is firm, and only for the period stated on it.",
    },
    {
      icon: Truck,
      title: "Site readiness affects programme",
      description:
        "Moisture, levels, and access must meet manufacturer requirements. If they do not, installation may pause pending a variation.",
    },
    {
      icon: BadgeCheck,
      title: "Warranties need correct care",
      description:
        "Product and workmanship warranties apply when the floor is used and maintained as set out in the handover guide.",
    },
  ],
  intro:
    "These Terms of Service (“Terms”) apply when you visit mahrajflooring.com, download catalogues, request a quotation, or engage Mahraj Flooring for supply, specification, or installation. Project-specific quotations, purchase orders, and signed contracts take precedence where they conflict with this page.",
  related: { label: "Privacy Policy", href: "/privacy-policy" },
  sections: [
    {
      id: "acceptance",
      title: "Acceptance of these Terms",
      paragraphs: [
        "By accessing this website or submitting a project enquiry you confirm that you have read these Terms and agree to be bound by them. If you are acting on behalf of a company, consultant, or contractor, you represent that you have authority to bind that organisation.",
        "We may update these Terms from time to time. The “Last updated” date at the top of this page changes when we do. Continued use of the website after an update constitutes acceptance of the revised Terms.",
      ],
    },
    {
      id: "definitions",
      title: "Definitions",
      paragraphs: [
        "The following terms are used throughout this page with the meanings given here.",
      ],
      bullets: [
        "“We”, “us”, “our” means Mahraj Flooring and its authorised regional offices.",
        "“You”, “client” means the person or organisation browsing the website, requesting a quotation, or engaging us for works.",
        "“Works” means supply, subfloor preparation, installation, and related services described in a quotation or contract.",
        "“Project documents” means the quotation, specification, drawings, purchase order, and any signed contract for a given job.",
      ],
    },
    {
      id: "services",
      title: "What we provide",
      paragraphs: [
        "Mahraj Flooring supplies and installs technical flooring systems for commercial, fitness, sports, healthcare, hospitality, and industrial environments across the UAE and GCC. Website content is provided to help specifiers, contractors, and project owners understand typical systems, applications, and documentation.",
      ],
      bullets: [
        "Product information, catalogues, and technical resources for specification support",
        "Consultation, site survey, and quotation services",
        "Supply of flooring materials and related accessories",
        "Professional installation, subfloor preparation, and project handover support",
      ],
    },
    {
      id: "quotes",
      title: "Quotations, specifications, and orders",
      paragraphs: [
        "Prices, lead times, and availability shown on the website or in catalogues are indicative only. A formal quotation is valid only for the period stated on the quote and is based on the drawings, quantities, and site conditions you provide.",
        "Orders become binding when we issue written confirmation or you accept a quotation in writing. Changes to quantities, product selection, or programme after confirmation may affect price and delivery.",
        "Colour samples, photography, and digital renders are a guide. Batch variation, lighting, and subfloor condition can affect the finished appearance. Always approve physical samples for critical spaces.",
      ],
    },
    {
      id: "payment",
      title: "Pricing, payment, and invoicing",
      paragraphs: [
        "Unless the quotation states otherwise, prices exclude VAT and any other applicable duties, which are added at the prevailing rate. Payment terms, deposit requirements, and milestone stages are set out in the project documents.",
        "Where a deposit is required, materials are ordered only after it is received. Late payment may delay delivery or installation and, where a contract provides for it, attract interest or suspension of works until the account is brought current.",
      ],
    },
    {
      id: "delivery",
      title: "Delivery, risk, and title",
      paragraphs: [
        "Delivery dates are estimates based on manufacturer lead times, shipping, and customs clearance. We keep you informed of material changes but are not liable for consequential loss caused by delays outside our control.",
        "Risk in materials passes to you on delivery to site or to a nominated store. Title passes only once payment has been received in full. You are responsible for secure, dry, and level storage once materials are on site.",
      ],
    },
    {
      id: "installation",
      title: "Site access and installation",
      paragraphs: [
        "Where we install, you are responsible for providing safe access, power, storage, and a programme that allows the specified curing and acclimatisation periods. Existing services, moisture readings, and structural defects must be disclosed before work starts.",
        "Subfloor moisture, levelling tolerance, and cleanliness are critical to performance. If site conditions fall outside the manufacturer’s requirements, we may pause installation and issue a variation until the substrate is ready.",
      ],
    },
    {
      id: "variations",
      title: "Variations, delays, and cancellation",
      paragraphs: [
        "Any change to scope, product, area, or sequencing is handled as a written variation showing the cost and programme effect. Verbal instructions on site are confirmed in writing before they are actioned.",
        "If a project is postponed or cancelled after materials have been ordered, you remain responsible for non-returnable items, restocking charges levied by the manufacturer, and work already completed. Bespoke or cut-to-size products are generally non-returnable.",
      ],
    },
    {
      id: "warranties",
      title: "Warranties and aftercare",
      paragraphs: [
        "Manufacturer product warranties apply according to the system specified. Installation workmanship warranties, where offered, are stated in the project documents and require that the floor is used and maintained as recommended.",
        "Warranties do not cover damage from misuse, incorrect cleaning chemicals, unauthorised repairs, movement of the building, water ingress from other trades, or failure to follow the maintenance guide provided at handover.",
        "Report suspected defects promptly and in writing so that we can inspect the floor before further wear or remedial work affects the assessment.",
      ],
    },
    {
      id: "website",
      title: "Use of the website",
      paragraphs: [
        "You may browse, download catalogues for project use, and submit enquiries. You must not misuse the site, attempt to access restricted systems, scrape content at scale, or present our materials as your own specification library.",
        "We aim to keep the website available and accurate but do not guarantee uninterrupted access. Pages, product data, and downloads may change as ranges are updated.",
      ],
    },
    {
      id: "ip",
      title: "Intellectual property",
      paragraphs: [
        "All trademarks, photography, drawings, catalogues, and written content on this website remain the property of Mahraj Flooring or our licensors. You may share pages and documents for legitimate project communication but may not reproduce them commercially, resell them, or remove attribution without written consent.",
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      paragraphs: [
        "Drawings, tender information, and pricing exchanged during a project are treated as confidential and shared internally only with the people who need them to deliver the works. We ask the same of clients in respect of our rates and technical proposals.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      paragraphs: [
        "Website information is provided in good faith for general guidance. It is not a substitute for a site-specific specification, moisture survey, or structural assessment. We are not liable for decisions made solely on website content.",
        "To the fullest extent permitted by applicable law, our liability for any claim arising from website use is limited to the amount you paid us (if any) for the relevant service. Liability connected to a project is governed by the project documents.",
        "Nothing in these Terms excludes liability that cannot be excluded under UAE law, including liability for fraud or for personal injury caused by negligence.",
      ],
    },
    {
      id: "indemnity",
      title: "Indemnity",
      paragraphs: [
        "You agree to indemnify us against claims arising from your misuse of the website, breach of these Terms, or provision of inaccurate site information that leads to loss, rework, or third-party claims.",
      ],
    },
    {
      id: "force-majeure",
      title: "Force majeure",
      paragraphs: [
        "Neither party is liable for failure or delay caused by events beyond reasonable control, including extreme weather, port or customs disruption, manufacturer shutdown, utility failure, civil disturbance, or changes in law. Affected obligations are suspended for the duration of the event and the programme is extended accordingly.",
      ],
    },
    {
      id: "third-parties",
      title: "Third-party links and partners",
      paragraphs: [
        "The website may link to maps, social platforms, or manufacturer resources. Those sites have their own terms and we are not responsible for their content or availability.",
        "We may involve authorised partners, logistics providers, or specialist installers to deliver a project. They remain bound by the confidentiality and quality requirements we set for the engagement.",
      ],
    },
    {
      id: "general",
      title: "Severability and entire agreement",
      paragraphs: [
        "If any provision of these Terms is found unenforceable, the remaining provisions continue in force. A delay in enforcing a right is not a waiver of it.",
        "Together with the applicable project documents, these Terms form the entire agreement between us regarding website use and supersede earlier discussions on that subject.",
      ],
    },
    {
      id: "law",
      title: "Governing law",
      paragraphs: [
        "These Terms are governed by the laws of the United Arab Emirates. Courts of Dubai shall have exclusive jurisdiction over disputes arising from website use, unless a signed project contract specifies another venue.",
      ],
    },
    {
      id: "contact-terms",
      title: "Questions about these Terms",
      paragraphs: [
        "If you need clarification before placing an order, contact our commercial team at info@mahrajfloors.com or call +971 4 000 0000. Written project documents always take priority for live installations.",
      ],
    },
  ],
};

export const privacyDocument: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  breadcrumb: "Privacy Policy",
  description:
    "How Mahraj Flooring collects, uses, and protects personal information submitted through our website, quotations, and project communications.",
  lastUpdated: "19 August 2026",
  highlights: [
    { label: "Effective", value: "19 August 2026" },
    { label: "Data we hold", value: "Enquiry & project records" },
    { label: "Requests", value: "info@mahrajfloors.com" },
  ],
  keyPointsTitle: "The short version",
  keyPointsDescription:
    "A plain-language summary of how we handle your information. The full policy below sets out the detail.",
  keyPoints: [
    {
      icon: UserCheck,
      title: "We collect what you send us",
      description:
        "Name, company, contact details, and the project information you enter into an enquiry or quotation form.",
    },
    {
      icon: ShieldCheck,
      title: "Used to deliver your project",
      description:
        "Quotations, surveys, installation coordination, and aftercare. We never sell personal information to third parties.",
    },
    {
      icon: Lock,
      title: "Shared only where needed",
      description:
        "With installation crews, logistics partners, manufacturers for warranties, and the providers that host our systems.",
    },
    {
      icon: Mail,
      title: "You stay in control",
      description:
        "Ask us to access, correct, or delete your data, or unsubscribe from insights at any time using the link in every email.",
    },
  ],
  intro:
    "This Privacy Policy explains what personal data we collect when you use mahrajflooring.com, request a quote, subscribe to insights, or work with us on a flooring project. We process information in line with applicable UAE data protection requirements and only for the purposes described below.",
  related: { label: "Terms of Service", href: "/terms" },
  sections: [
    {
      id: "who-we-are",
      title: "Who is responsible for your data",
      paragraphs: [
        "Mahraj Flooring is the controller of personal data submitted through this website and related enquiry channels. Our principal place of business is Industrial Area 4, Al Qusais, Dubai, UAE, with additional regional offices as listed on the Contact page.",
        "For privacy requests, email info@mahrajfloors.com with the subject line “Privacy request”. We will respond within a reasonable period.",
      ],
    },
    {
      id: "what-we-collect",
      title: "Information we collect",
      paragraphs: [
        "We collect information you choose to give us and limited technical data needed to operate the website securely.",
      ],
      bullets: [
        "Identity and contact details: name, company, email address, phone number",
        "Project details: solution type, location, area size, and message content from forms",
        "Newsletter details if you subscribe to flooring insights",
        "Technical data: IP address, browser type, device, and pages visited",
        "Communication records from email, WhatsApp, or phone where you contact our team",
      ],
    },
    {
      id: "how-we-collect",
      title: "How we collect it",
      paragraphs: [
        "Personal data reaches us through a small number of predictable routes.",
      ],
      bullets: [
        "Directly from you when you submit a form, email, call, or message us",
        "Automatically through cookies and server logs as you browse the website",
        "From colleagues on your project team, such as a main contractor sharing consultant details",
        "From publicly available business sources when we verify company information",
      ],
    },
    {
      id: "how-we-use",
      title: "How we use your information",
      paragraphs: [
        "We use personal data only where we have a legitimate need connected to our flooring business.",
      ],
      bullets: [
        "Responding to quotations, site surveys, and technical questions",
        "Preparing specifications, proposals, and project documentation",
        "Delivering materials, coordinating installation, and providing aftercare",
        "Sending requested catalogues or insight emails",
        "Improving website performance, security, and content relevance",
        "Meeting legal, accounting, and warranty record-keeping duties",
      ],
    },
    {
      id: "legal-basis",
      title: "Our basis for processing",
      paragraphs: [
        "Depending on the situation, we rely on your consent (for example, newsletter subscriptions), the need to take steps before or during a contract (quotations and installations), our legitimate interest in running and securing the business, or a legal obligation such as tax and record-keeping duties.",
        "Where processing relies on consent, you can withdraw it at any time without affecting processing already carried out.",
      ],
    },
    {
      id: "marketing",
      title: "Marketing and communication preferences",
      paragraphs: [
        "We send flooring insights and catalogue updates only to people who asked for them or who are working with us on a project where the content is relevant.",
        "Every marketing email includes an unsubscribe link. Opting out of marketing does not stop essential project communication such as delivery notices or installation scheduling.",
      ],
    },
    {
      id: "sharing",
      title: "Who we share data with",
      paragraphs: [
        "We do not sell personal information. We share it only with parties who help us deliver the service you requested, under appropriate confidentiality arrangements.",
      ],
      bullets: [
        "Installation crews, logistics partners, and authorised regional offices",
        "Manufacturers when a warranty registration or technical query requires it",
        "IT, hosting, email, and analytics providers that process data on our instructions",
        "Professional advisors and authorities where required by law",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and similar technologies",
      paragraphs: [
        "We may use essential cookies to keep the site working and optional analytics cookies to understand which pages are useful to specifiers and project teams. You can control cookies through your browser settings. Blocking some cookies may affect search or form behaviour.",
      ],
    },
    {
      id: "retention",
      title: "How long we keep data",
      paragraphs: [
        "Enquiry data is kept for as long as needed to complete the conversation and any resulting project, then for a further period required for warranties, accounting, and dispute handling. Newsletter data is kept until you unsubscribe. Technical logs are retained only as long as needed for security and diagnostics.",
      ],
    },
    {
      id: "security",
      title: "How we protect data",
      paragraphs: [
        "We use reasonable organisational and technical measures to protect personal data against unauthorised access, loss, or misuse, including access controls, reputable hosting, and staff handling rules.",
        "No internet transmission is completely secure. Please avoid sending sensitive payment details through unsolicited email, and contact us directly if you are asked for payment information you did not expect.",
      ],
    },
    {
      id: "breach",
      title: "If something goes wrong",
      paragraphs: [
        "If a security incident affects personal data in a way that is likely to create a risk to you, we will investigate promptly, take steps to contain it, and notify affected individuals and any relevant authority where the law requires it.",
      ],
    },
    {
      id: "rights",
      title: "Your choices and rights",
      paragraphs: [
        "Subject to applicable law, you may ask us to access, correct, or delete personal data we hold about you, to restrict or object to certain processing, or to stop using it for marketing.",
        "We may need to verify your identity before fulfilling a request, and we may retain limited records where we have a legal obligation to do so. If you are not satisfied with our response, you may raise the matter with the relevant supervisory authority.",
      ],
    },
    {
      id: "international",
      title: "International transfers",
      paragraphs: [
        "Because we operate across the GCC and work with cloud and manufacturer partners, your data may be processed outside the country where you submitted it. We take steps to ensure recipients protect it consistently with this Policy.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "This website is intended for commercial clients, consultants, and contractors. We do not knowingly collect personal data from children. If you believe a child has provided us with information, contact us and we will delete it.",
      ],
    },
    {
      id: "updates",
      title: "Changes to this Policy",
      paragraphs: [
        "We may update this Privacy Policy to reflect new services, tools, or legal requirements. The latest version will always be published on this page with an updated date.",
      ],
    },
    {
      id: "contact-privacy",
      title: "Contact us about privacy",
      paragraphs: [
        "For questions or requests relating to personal data, email info@mahrajfloors.com, call +971 4 000 0000, or write to Mahraj Flooring, Industrial Area 4, Al Qusais, Dubai, UAE.",
      ],
    },
  ],
};
