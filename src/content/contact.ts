import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";

import { site } from "@/content/site";

export type ContactChannel = {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

export const contactIntro = {
  title: "Get in Touch",
  description:
    "Connecting you directly with our technical specialists for immediate architectural precision and high-stakes decision-making.",
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
    description: "Experience materials in person.",
    action: "Get Directions",
    href: site.address.mapsHref,
    icon: MapPin,
    external: true,
  },
];
