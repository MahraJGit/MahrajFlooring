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
  image: "/images/projects/global-tech-hq.jpg",
  title: "Commercial Flooring Solutions Built for Demanding Spaces",
  description:
    "Mahraj Flooring provides commercial flooring solutions for projects where performance, appearance, functionality, and precise installation matter.",
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
  image: "/images/advantage-installation.jpg",
  title: "Complete Flooring Solutions from Start to Finish",
  steps: [
    "Requirements & site assessment",
    "Material selection & specification",
    "Professional preparation & installation",
    "Handover, maintenance & aftercare",
  ],
  objective:
    "To deliver dependable flooring systems through technical planning, proven materials, controlled installation, and clear project documentation.",
};

export type AboutIndustry = {
  title: string;
  image: string;
  size: "small" | "large" | "wide";
};

export const aboutIndustries: AboutIndustry[] = [
  {
    title: "Commercial Vinyl & LVT",
    image: "/images/services/vinyl-flooring.jpg",
    size: "small",
  },
  {
    title: "Carpet & Carpet Tiles",
    image: "/images/services/office-carpet-flooring.jpg",
    size: "large",
  },
  {
    title: "Healthcare & Hygienic",
    image: "/images/services/homogeneous-flooring.jpg",
    size: "small",
  },
  {
    title: "Sports & Fitness",
    image: "/images/services/sports-flooring.jpg",
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
    title: "Architects & Interior Designers",
    description:
      "Technical specifications, acoustic and fire performance data, finish samples, and material guidance for confident project selection.",
    image: "/images/advantage-installation.jpg",
    imageSide: "start" as const,
  },
  {
    title: "Main Contractors, Property Developers & Facility Managers",
    description:
      "Project coordination, schedule adherence, value engineering, controlled installation, documentation, and lifecycle care.",
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
    title: "Technical Consultation",
    description:
      "Practical recommendations based on usage, traffic, substrate, budget, and compliance requirements.",
    icon: Users,
  },
  {
    title: "Specification Support",
    description:
      "Product data, finish options, samples, and submittals prepared for design and approval teams.",
    icon: FileCheck2,
  },
  {
    title: "Site Assessment",
    description:
      "Moisture readings, level checks, measurements, and substrate readiness reviews before installation.",
    icon: Ruler,
  },
  {
    title: "Material Procurement",
    description:
      "Verified commercial materials sourced through established manufacturers and regional partners.",
    icon: Truck,
  },
  {
    title: "Subfloor Preparation",
    description:
      "Levelling, repairs, moisture mitigation, and preparation aligned with manufacturer tolerances.",
    icon: Layers,
  },
  {
    title: "Professional Installation",
    description:
      "Specialist teams delivering controlled fitting, welding, jointing, finishing, and quality checks.",
    icon: Wrench,
  },
  {
    title: "Project Coordination",
    description:
      "Clear sequencing with contractors, consultants, and site teams to protect programme milestones.",
    icon: Handshake,
  },
  {
    title: "Documented Handover",
    description:
      "Care guidance, warranties, certificates, approvals, and maintenance recommendations at completion.",
    icon: ClipboardCheck,
  },
];

export const commercialProcess = [
  { number: "01", label: "Understand", icon: Building2 },
  { number: "02", label: "Assess", icon: Ruler },
  { number: "03", label: "Recommend", icon: FileCheck2 },
  { number: "04", label: "Coordinate", icon: Handshake },
  { number: "05", label: "Delivery", icon: Truck },
];

export const aboutCompliance = [
  { title: "Low-VOC Air Quality Compliance", icon: ShieldCheck },
  { title: "Slip Safety Ratings (R9 to R11+)", icon: Award },
  { title: "UAE Civil Defense Code Alignment", icon: FileCheck2 },
];

export const aboutFaqIntro =
  "Most stock items are available within 3-5 working days. Custom orders or specialised sports flooring typically require 4-6 weeks from manufacture to delivery.";

export const aboutFaqs = [
  {
    question: "Do you provide sub-floor preparation?",
    answer:
      "Yes. Our crews handle moisture testing, levelling, screed correction, repairs, and manufacturer-approved preparation before installation.",
  },
  {
    question: "Are your materials fire-rated?",
    answer:
      "Our commercial ranges include EN 13501-1 classified products, and relevant certificates are supplied with project submittals.",
  },
  {
    question: "Can you support specifications and samples?",
    answer:
      "Yes. We provide technical data, physical samples, finish options, compliance documents, and installation recommendations.",
  },
];

export const aboutCta = {
  image: "/images/advantage-installation.jpg",
  title: "Planning your next Flooring Project?",
  description:
    "Talk to our commercial flooring team about specifications, samples, surveys, and project pricing.",
};
