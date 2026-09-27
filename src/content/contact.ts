import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";

import { site } from "@/content/site";

export type ContactChannel = {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  note?: string;
};

export const contactHero = {
  image: "/images/contact/contact-hero.jpg",
  deviceImage: "/images/contact/moisture-meter.png",
  title:
    "Let's Talk About the Flooring Your Project Needs",
};

export const contactIntro = {
  title: "Start the Conversation",
  description:
    "Whether it's a quick question or a full project brief, our team is ready to help you find the right flooring solution.",
};

export const contactChannels: ContactChannel[] = [
  {
    title: "WhatsApp",
    description: "Quick questions? Message us and get a reply in minutes.",
    action: "Start Chat",
    href: site.whatsapp,
    icon: MessageCircle,
    external: true,
  },
  {
    title: "Direct Line",
    description: "Speak directly with a technical advisor about your project.",
    action: site.phone,
    href: site.phoneHref,
    icon: Phone,
  },
  {
    title: "Email",
    description: "Send us your project details, and we'll get back with a plan.",
    action: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    title: "Visit Us",
    description: "Come see and feel our materials before you decide.",
    action: "Get Directions",
    href: site.address.mapsHref,
    icon: MapPin,
    external: true,
    note: "Opening Hours: 09am - 07:00pm",
  },
];

export const currentLocation = {
  title: "Current Location",
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.1987654321!2d55.3815!3d25.2769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sAl%20Qusais%20Industrial%20Area!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae",
};

export const regionalOfficesIntro = {
  title: "Find Us Across the Region",
  description:
    "Our regional teams work close to your project, ready to support you onsite whenever needed.",
};

export type RegionalOffice = {
  slug: string;
  title: string;
  tone: "brand" | "navy";
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  hours: string;
  mapsHref: string;
};

export const regionalOffices: RegionalOffice[] = [
  {
    slug: "dubai",
    title: "Dubai Headquarters",
    tone: "brand",
    address: `${site.address.line1}, ${site.address.line2}`,
    phone: site.phone,
    phoneHref: site.phoneHref,
    email: site.email,
    hours: "9:00am - 7:00pm",
    mapsHref: site.address.mapsHref,
  },
  {
    slug: "riyadh",
    title: "Riyadh Regional Office",
    tone: "navy",
    address: "Al Murooj, Prince Turki St, Al Olaya, Riyadh 12212, Saudi Arabia",
    phone: site.phone,
    phoneHref: site.phoneHref,
    email: site.email,
    hours: "9:00am - 7:00pm",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=Al+Murooj+Prince+Turki+St+Al+Olaya+Riyadh",
  },
];

export const contactFaqIntro =
  "Got a question before reaching out? Here are quick answers on pricing, timelines, and how we work.";

export const contactFaqs = [
  {
    question: "How fast can I get a quote?",
    answer:
      "We usually respond within 24 hours of your inquiry. For urgent projects, mention your timeline, and we'll prioritize accordingly.",
  },
  {
    question: "Do I need to visit your office to get started?",
    answer:
      "No! You can start the process online or by phone. A site visit is only needed once we move into detailed planning.",
  },
  {
    question: "How long does delivery take?",
    answer: 
      "Most stock items arrive within 3–5 working days. Custom orders or specialized flooring can take 4–6 weeks from manufacture to delivery."
  },
  {
    question: "Can you handle urgent or fast turnaround projects?",
    answer: 
      "In many cases, yes. Let us know your deadline early so we can confirm what's realistically possible."
  },
  {
    question: "How do you calculate project cost?",
    answer:
      "Cost depends on material, area size, and site conditions. We provide a detailed quote after understanding your project."
  }
];
