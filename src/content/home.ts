import {
  Building2,
  ClipboardCheck,
  Dumbbell,
  GraduationCap,
  HardHat,
  Hotel,
  House,
  Layers,
  PartyPopper,
  SearchCheck,
  Stethoscope,
  Tent,
  Trees,
  Trophy,
  Wrench,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export const heroImage = "/images/hero/hero-gym.jpg";
export const heroVideo = "/videos/hero/hero-video.mp4";

export const heroHighlights = [
  { icon: Layers, label: "Supply" },
  { icon: HardHat, label: "Installation" },
  { icon: ClipboardCheck, label: "Project Support" },
];

export type Industry = {
  slug: string;
  label: string;
  icon: LucideIcon;
};

export const industries: Industry[] = [
  { slug: "gyms", label: "Gyms", icon: Dumbbell },
  { slug: "schools", label: "Schools", icon: GraduationCap },
  { slug: "hospitals", label: "Hospitals", icon: Stethoscope },
  { slug: "offices", label: "Offices", icon: Building2 },
  { slug: "hotels", label: "Hotels", icon: Hotel },
  { slug: "events", label: "Events", icon: PartyPopper },
  { slug: "sports", label: "Sports", icon: Trophy },
  { slug: "landscapes", label: "Landscapes", icon: Trees },
  { slug: "homes", label: "Homes", icon: House },
  { slug: "fairs", label: "Fairs", icon: Tent },
  { slug: "stables", label: "Stables", icon: Warehouse },
];

export const homeIndustriesCompact = industries.slice(0, 8);

export type CoreService = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

export const coreServices: CoreService[] = [
  {
    title: "Consultation & Design",
    subtitle: "Requirements and specification planning",
    icon: Layers,
  },
  {
    title: "Professional Installation",
    subtitle: "Certified floor installation teams",
    icon: HardHat,
  },
  {
    title: "Site Survey & Moisture Testing",
    subtitle: "Sub-floor readiness and technical checks",
    icon: SearchCheck,
  },
  {
    title: "Post Installation Maintenance",
    subtitle: "Care guidance and support planning",
    icon: Wrench,
  },
  {
    title: "Consultation & Design",
    subtitle: "Project scope and usage mapping",
    icon: Layers,
  },
  {
    title: "Professional Installation",
    subtitle: "On-site quality control and delivery",
    icon: HardHat,
  },
  {
    title: "Site Survey & Moisture Testing",
    subtitle: "Technical reports for approval",
    icon: SearchCheck,
  },
  {
    title: "Post Installation Maintenance",
    subtitle: "Lifecycle maintenance programs",
    icon: Wrench,
  },
];

export const advantages = [
  {
    title: "Technical Guidance",
    description:
      "Engineered advice on selecting the right sub-floor and surface material based on usage intensity.",
  },
  {
    title: "Material Selection",
    description:
      "Curated portfolio of ISO-certified materials tested for GCC climatic conditions and durability.",
  },
  {
    title: "Professional Installation",
    description:
      "In-house specialist crews trained in welding, seamless joints, and acoustic underlays.",
  },
];

export type Project = {
  slug: string;
  title: string;
  location: string;
  application: string;
  product: string;
  image: string;
};

export const projects: Project[] = [
  {
    slug: "elite-padel-club",
    title: "Elite Padel Club",
    location: "Riyadh, KSA",
    application: "Sports",
    product: "13mm Monofilament Turf",
    image: "/images/projects/elite-padel-club.jpg",
  },
  {
    slug: "global-tech-hq",
    title: "Global Tech HQ",
    location: "Dubai, UAE",
    application: "Commercial",
    product: "Heavy Duty SPC Planks",
    image: "/images/projects/global-tech-hq.jpg",
  },
  {
    slug: "al-noor-specialist-hospital",
    title: "Al-Noor Specialist Hospital",
    location: "Doha, Qatar",
    application: "Healthcare",
    product: "Homogeneous Medical Vinyl",
    image: "/images/projects/al-noor-specialist-hospital.jpg",
  },
];

export const featuredCaseStudies = [
  {
    slug: "elite-padel-club",
    title: "T9000 Commercial Treadmill",
    price: "AED 12,450.00",
    meta: "Quote required for install",
    badge: "In Stock",
  },
  {
    slug: "global-tech-hq",
    title: "Pro-Series Adjustable Bench",
    price: "AED 2,800.00",
    meta: "Next day delivery",
    badge: "In Stock",
  },
  {
    slug: "al-noor-specialist-hospital",
    title: "Signature Dumbbell Set",
    price: "AED 5,900.00",
    meta: "10KG - 40KG set",
    badge: "In Stock",
  },
] as const;

export const trustPartnerLogos = [
  "NEOM",
  "Aldar",
  "Emaar",
  "ADNOC",
  "SEHA",
  "Qatar Foundation",
  "Majid Al Futtaim",
  "Dubai Sports Council",
];

export const blogHighlights = [
  {
    slug: "lvt-performance-breakdown",
    title: "SPC vs LVT: A Performance Breakdown",
    image: "/images/services/vinyl-flooring.jpg",
  },
  {
    slug: "sports-floor-base-guide",
    title: "Sports Floor Base Requirements",
    image: "/images/projects/elite-padel-club.jpg",
  },
  {
    slug: "office-fitout-material-guide",
    title: "Office Fit-out Material Selection",
    image: "/images/projects/global-tech-hq.jpg",
  },
  {
    slug: "healthcare-hygiene-floors",
    title: "Healthcare Hygiene Flooring Specs",
    image: "/images/projects/al-noor-specialist-hospital.jpg",
  },
  {
    slug: "rubber-gym-thickness-guide",
    title: "Rubber Gym Thickness by Usage",
    image: "/images/services/rubber-gym-flooring.jpg",
  },
  {
    slug: "event-flooring-lead-times",
    title: "Event Flooring Lead Times in the GCC",
    image: "/images/services/exhibition-event-flooring.jpg",
  },
];

export const regions = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Oman & Bahrain",
];

export const faqs = [
  {
    question: "What is the lead time for GCC projects?",
    answer:
      "Most stock items are available within 3-5 working days. Custom orders or specialised sports turf typically require 4-6 weeks from manufacture to port delivery.",
  },
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

export const quoteSolutions = [
  "Commercial Gym",
  "Sports & Padel Courts",
  "Healthcare & Laboratories",
  "Office & Commercial Interiors",
  "Exhibition & Events",
  "Landscape & Artificial Grass",
];
