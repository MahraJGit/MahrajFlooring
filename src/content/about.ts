import {
  Award,
  Building2,
  ClipboardCheck,
  FileCheck2,
  Handshake,
  Layers,
  Ruler,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const aboutHero = {
  image: "/images/about/about-hero.png",
  title: "Flooring Solutions Designed Around Real-World Performance",
  description:
    "We bring together technical planning, quality materials, and skilled installation to create flooring that performs reliably across demanding environments.",
};

export const aboutPartners = [
  "NEOM",
  "Aldar",
  "Emaar",
  "ADNOC",
  "SEHA",
  "Qatar Foundation",
];

export const aboutOverview = {
  image: "/images/advantage-installation.png",
  title: "From First Idea to Final Floor",
  steps: [
    "Understand the Space",
    "Choose the Right Materials",
    "Prepare and Install with Care",
    "Finish with Confidence",
  ],
  objective:
    "We keep flooring projects simple and reliable, with results that last. From our first talk to the final handover, we focus on good work, honest communication, and quality you can count on.",
};

export type AboutIndustry = {
  title: string;
  image: string;
  size: "small" | "large" | "wide";
};

export const aboutIndustries: AboutIndustry[] = [
  {
    title: "Commercial Vinyl & LVT",
    image: "/images/services/commercial-vinyl&LVT.png",
    size: "small",
  },
  {
    title: "Carpet & Carpet Tiles",
    image: "/images/services/carpet&carpet-tiles.png",
    size: "large",
  },
  {
    title: "Healthcare & Hygienic",
    image: "/images/projects/al-noor-specialist-hospital.jpg",
    size: "small",
  },
  {
    title: "Sports & Fitness",
    image: "/images/services/gym-fitness-industry.png",
    size: "wide",
  },
  {
    title: "SPC & Rigid Core",
    image: "/images/projects/global-tech-hq.jpg",
    size: "small",
  },
  {
    title: "Subfloor & Preparation",
    image: "/images/advantage-installation.jpg",
    size: "small",
  },
];

export const aboutAudiences = [
  {
    title: "Built for Designers Who Care About the Details",
    description:
      "We treat your design vision like our own. Finish samples, technical data, honest guidance, whatever you need to specify with confidence, and see it built exactly as drawn.",
    image: "/images/advantage-installation.jpg",
    imageSide: "start" as const,
  },
  {
    title: "Flooring That Keeps Your Project on Track",
    description:
      "Tight schedules don't rattle us. We show up on time, keep you in the loop, and hand over flooring that's tested, documented, and ready for years of use, no surprises down the line.",
    image: "/images/projects/global-tech-hq.jpg",
    imageSide: "end" as const,
  },
];

export type Objective = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const aboutObjectives: Objective[] = [
  {
    title: "Honest Advice",
    description:
      "We listen first, then recommend flooring that truly fits your space, budget, and daily use.",
    icon: Users,
  },
  {
    title: "Clear Specs",
    description:
      "You get full product data, finishes, and samples ready for approval before any work begins.",
    icon: FileCheck2,
  },
  {
    title: "Site Checks",
    description:
      "We test moisture, levels, and the subfloor closely to confirm your space is ready to build on.",
    icon: Ruler,
  },
  {
    title: "Trusted Sourcing",
    description:
      "Every material we use comes from trusted manufacturers, checked before it reaches your site.",
    icon: Truck,
  },
  {
    title: "Strong Base",
    description:
      "We level, repair, and prepare sub-floors so your finished floor stays strong for years to come.",
    icon: Layers,
  },
  {
    title: "Skilled Hands",
    description:
      "Our trained teams handle every fit, weld, and finish, checked closely at each step of the work.",
    icon: Wrench,
  },
  {
    title: "Smooth Coordination",
    description:
      "We stay in sync with your contractors and team, so project timelines never slip out of place.",
    icon: Handshake,
  },
  {
    title: "Full Handover",
    description:
      "You receive warranties, certificates, and care tips, everything you need right after we leave.",
    icon: ClipboardCheck,
  },
];

export const commercialProcess = [
  { number: "01", label: "Start With the Bigger Picture", icon: Building2 },
  { number: "02", label: "Cut Through the Confusion", icon: Ruler },
  { number: "03", label: "Solve Problems Before They Grow", icon: FileCheck2 },
  { number: "04", label: "Keep Everyone on the Same Page", icon: Handshake },
  { number: "05", label: "Make the Final Result Feel Easy", icon: Truck },
];

export const aboutCompliance = [
  { title: "Fire Safety & Flame Resistance", icon: ShieldCheck },
  { title: "Hygiene & Antimicrobial Standards", icon: Award },
  { title: "International Product Standards", icon: FileCheck2 },
];

export const aboutFaqIntro =
  "Answers to what clients most often ask us about our process, materials, and service across the region.";

export const aboutFaqs = [
  {
    question: "Can you work in a space that's still occupied?",
    answer:
      "Yes! We plan installation around your working hours and, where needed, complete sections at a time so daily operations aren't disrupted.",
  },
  {
    question: "Do you offer flooring samples before we commit?",
    answer:
      "Yes! We provide physical samples so you can check color, texture, and finish in your actual space before ordering.",
  },
  {
    question: "How long does an average commercial floor last?",
    answer:
      "This depends on the material and traffic level, but most of our commercial flooring is built to perform well for 10 years or more.",
  },
  {
    question: "What happens if there's a moisture issue in the subfloor?",
    answer:
      "We test for moisture before work begins. If levels are too high, we apply the right treatment before any flooring is installed.",
  },
  {
    question: "What's included in your project management service?",
    answer:
      "We manage timelines, budgets, and onsite teams, so you deal with one point of contact instead of juggling multiple vendors yourself.",
  },
  {
    question: "What should we prepare before your team arrives onsite?",
    answer:
      "We'll share a simple checklist beforehand, usually just clearing the area and confirming access for our team.",
  },
];

export const aboutCta = {
  image: "/images/advantage-installation.jpg",
  title: "Ready to Start Your Flooring Project?",
  description:
    "Let's talk about your space, your timeline, and the flooring that fits both. Our team is ready to guide you from the first question to the final walkthrough.",
};