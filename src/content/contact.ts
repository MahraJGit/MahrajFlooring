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
    "Contact Our Flooring Engineering Experts: From Specification to Handover.",
};

export const contactIntro = {
  title: "Get in Touch",
  description:
    "Explore specialist flooring systems selected for performance, safety, durability, and demanding commercial environments across the UAE and GCC.",
};

export const contactChannels: ContactChannel[] = [
  {
    title: "WhatsApp",
    description: "Instant messaging for quick queries.",
    action: "Start Chat",
    href: site.whatsapp,
    icon: MessageCircle,
    external: true,
  },
  {
    title: "Direct Line",
    description: "Speak to a technical advisor.",
    action: site.phone,
    href: site.phoneHref,
    icon: Phone,
  },
  {
    title: "Email",
    description: "Detailed inquiries and project specs.",
    action: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    title: "Showroom",
    description: "Detailed inquiries and project specs.",
    action: "Get Direction",
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
  title: "Our Regional Engineering Offices",
  description:
    "Interactive GCC map: Locate our regional offices and contact details.",
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
  "Most stock items are available within 3-5 working days. Custom orders or specialised sports turf typically require 4-6 weeks from manufacture to port delivery.";

export const contactFaqs = [
  {
    question: "Do you provide sub-floor preparation?",
    answer:
      "Yes. Our crews handle moisture testing, levelling, and screed correction before installation so the finished surface meets manufacturer tolerances.",
  },
  {
    question: "Are your materials fire-rated?",
    answer:
      "Our commercial ranges carry EN 13501-1 classification, and we supply full test certificates with every project submittal for civil defence approval.",
  },
];
