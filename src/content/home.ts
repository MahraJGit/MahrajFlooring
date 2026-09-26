import {
  Building2,
  Dumbbell,
  GraduationCap,
  HardHat,
  Headphones,
  Hotel,
  House,
  Layers,
  Package,
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
  { icon: Package, label: "Supply" },
  { icon: Wrench, label: "Install" },
  { icon: Headphones, label: "Support" },
  { icon: HardHat, label: "Compliance"}
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
  { slug: "retail", label: "Retail Stores", icon: Package },
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
    icon: Layers, // 1. Different textures/materials and design planning.
  },
  {
    title: "Site Survey & Moisture Testing",
    subtitle: "Sub-floor readiness and technical checks",
    icon: SearchCheck, // 2. Inspection, testing, and diagnostic checks.
  },
  {
    title: "Material Sourcing & Supply",
    subtitle: "Premium products from trusted global brands",
    icon: Package, // 3. Freight, inventory, and materials boxed ready for delivery.
  },
  {
    title: "Professional Installation",
    subtitle: "Certified floor installation teams",
    icon: Wrench, // 4. Physical, hands-on trade craftsmanship and tools.
  },
  {
    title: "Custom Project Management",
    subtitle: "Coordinated timelines, budgets, and on-site execution.",
    icon: Building2, // 5. Corporate coordination, site oversight, and structures.
  },
  {
    title: "Compliance & Safety Standards",
    subtitle: "Certified systems meeting international regulations.",
    icon: HardHat, // 6. Regulatory site compliance and construction safety.
  },
  {
    title: "Post Installation Maintenance",
    subtitle: "Care guidance and support planning",
    icon: Headphones, // 7. Direct client support, consultations, and care advice.
  },
  {
    title: "Warranty & After Sales Support",
    subtitle: "Long term coverage for peace of mind.",
    icon: Trophy, // 8. Premium quality, gold-standard guarantees, and reassurance.
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
  "Oman",
  "Bahrain",
  "Kuwait",
];

export const faqs = [
  {
    question: "What makes Mahraj Flooring different from other providers?",
    answer:
      "We offer complete end-to-end service from consultation and sourcing to installation and after sales support, all under one roof. This is backed by strong regional experience and certified quality standards across the GCC.",
  },
  {
    question: "Do you offer free consultations?",
    answer:
      "Yes, we provide a free initial consultation to understand your space, requirements, and budget. Our team assesses your project needs before recommending the most suitable flooring solution, ensuring you get the right fit from the start.",
  },
  {
    question: "Is your flooring suitable for heavy equipment and weights?",
    answer:
      "Yes, our gym and industrial flooring options are specifically built to handle heavy loads, dropped weights, and continuous foot traffic. These surfaces are engineered for long term durability, even in high intensity, high traffic environments.",
  },
  {
    question: "Do you offer a warranty on your flooring products?",
    answer:
      "Yes, our flooring solutions come with warranty coverage to give you added peace of mind. The exact terms depend on the specific product and project type, and our team will clarify these details during consultation."
  },
  {
    question: "How do I request a quote?",
    answer: 
      "You can request a quote directly through our website's contact form or by reaching out via phone or email. Once we understand your project, we'll respond with a tailored proposal suited to your space and budget."
  },
  {
    question: "Do you supply flooring outside the UAE?",
    answer:
      "Yes! Mahraj Flooring delivers and installs across Saudi Arabia, Qatar, Oman, and Bahrain, making us a trusted GCC-wide flooring partner."
  }
];

export const quoteSolutions = [
  "Commercial Gym",
  "Sports & Padel Courts",
  "Healthcare & Laboratories",
  "Office & Commercial Interiors",
  "Exhibition & Events",
  "Landscape & Artificial Grass",
];
