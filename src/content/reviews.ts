import {
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  FileCheck2,
  ShieldCheck,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";

export const reviewsHero = {
  image: "/images/projects/global-tech-hq.jpg",
  title: "Trusted by Businesses Across the GCC",
  description:
    "Building GCC technical flooring infrastructure with transparency, quality-verified documentation, and expert installation support for high-stakes environments.",
};

export const heroMetrics = [
  {
    kind: "rating" as const,
    value: "4.6",
    label: "client rating",
  },
  {
    kind: "stat" as const,
    value: "120+",
    label: "GCC clients",
  },
  {
    kind: "verified" as const,
    value: "Verified",
    label: "Client feedback",
  },
];

export type TrustMetric = {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
};

export const trustMetrics: TrustMetric[] = [
  {
    label: "Overall Rating",
    value: "4.9",
    note: "Verified Data Required",
    icon: Star,
  },
  {
    label: "GCC Clients",
    value: "120+",
    note: "Verified Data Required",
    icon: Users,
  },
  {
    label: "Completed Projects",
    value: "100",
    note: "Verified Data Required",
    icon: Briefcase,
  },
  {
    label: "Verified Reviews",
    value: "820",
    note: "Verified Data Required",
    icon: BadgeCheck,
  },
  {
    label: "Repeat Clients",
    value: "68%",
    note: "Verified Data Required",
    icon: Building2,
  },
  {
    label: "Warranty Coverage",
    value: "10 yr",
    note: "Verified Data Required",
    icon: ShieldCheck,
  },
  {
    label: "Certified Systems",
    value: "ISO",
    note: "Verified Data Required",
    icon: Award,
  },
  {
    label: "Handover Packs",
    value: "100%",
    note: "Verified Data Required",
    icon: FileCheck2,
  },
];

export type WhyChooseItem = {
  title: string;
  subtitle: string;
};

export const whyChooseIntro = {
  title: "Why Clients Choose Mahraj Flooring",
  description: "Based on 820 customer feedback",
};

export const whyChooseItems: WhyChooseItem[] = [
  { title: "Overall Rating", subtitle: "Consultation & Design" },
  { title: "Overall Rating", subtitle: "Professional Installation" },
  { title: "Overall Rating", subtitle: "Site Survey & Testing" },
  { title: "Overall Rating", subtitle: "Material Selection" },
  { title: "Overall Rating", subtitle: "Project Documentation" },
  { title: "Overall Rating", subtitle: "Aftercare Support" },
  { title: "Overall Rating", subtitle: "Regional Coverage" },
];

export type IndustryReview = {
  industry: string;
  name: string;
  rating: string;
  quote: string;
  projectImage: string;
  extraViews: number;
};

export const industryReviewFilters = [
  "Gym",
  "School",
  "Hospital",
  "Offices",
  "Hotels",
  "Events",
  "Sports",
];

export const industryReviews: IndustryReview[] = [
  {
    industry: "Gym",
    name: "Esther Allison",
    rating: "4.9",
    quote:
      "Flooring Solutions delivered a precise rubber gym install with clean edges, consistent thickness, and clear moisture reports before handover. The team coordinated around our opening schedule without delaying fit-out.",
    projectImage: "/images/services/rubber-gym-flooring.jpg",
    extraViews: 2,
  },
  {
    industry: "School",
    name: "Omar Al Harbi",
    rating: "4.8",
    quote:
      "We needed durable vinyl across classrooms and corridors. Installation was phased overnight, and the documentation pack was ready for our facilities audit on day one.",
    projectImage: "/images/services/vinyl-flooring.jpg",
    extraViews: 1,
  },
  {
    industry: "Hospital",
    name: "Dr. Maha Khalil",
    rating: "5.0",
    quote:
      "Homogeneous vinyl welded to a clinical finish, anti-slip ratings documented for every zone. The handover pack was complete enough for our infection-control audit.",
    projectImage: "/images/projects/al-noor-specialist-hospital.jpg",
    extraViews: 3,
  },
  {
    industry: "Offices",
    name: "Aisha Rahman",
    rating: "4.9",
    quote:
      "Acoustic-rated LVT across three floors, installed overnight so the fit-out never stopped. Submittals and fire certificates arrived with the first delivery.",
    projectImage: "/images/projects/global-tech-hq.jpg",
    extraViews: 2,
  },
  {
    industry: "Hotels",
    name: "James Dalton",
    rating: "4.7",
    quote:
      "Guest-area flooring held up through soft opening and peak season. Colour matching across suites was exact, and snagging was closed within one site visit.",
    projectImage: "/images/services/office-carpet-flooring.jpg",
    extraViews: 1,
  },
  {
    industry: "Events",
    name: "Layla Hassan",
    rating: "4.8",
    quote:
      "Temporary event flooring arrived on time, looked premium under lights, and was removed cleanly with no substrate damage. Ideal partner for short-run venues.",
    projectImage: "/images/services/exhibition-event-flooring.jpg",
    extraViews: 2,
  },
  {
    industry: "Sports",
    name: "Khalid Mansour",
    rating: "5.0",
    quote:
      "Surface pace and shock absorption were within spec on day one. The crew coordinated around an occupied club without delaying the opening fixture list.",
    projectImage: "/images/projects/elite-padel-club.jpg",
    extraViews: 2,
  },
];

export const solutionFeedbackFilters = [
  "Vinyl",
  "Sheet",
  "LVT",
  "LVP",
  "SPC",
  "Homogeneous",
  "Healthcare",
];

export type SolutionProject = {
  slug: string;
  title: string;
  location: string;
  category: string;
  image: string;
  rating: number;
};

export const solutionProjects: SolutionProject[] = [
  {
    slug: "elite-padel-club",
    title: "Elite Padel Club",
    location: "Riyadh, KSA",
    category: "SPC",
    image: "/images/projects/elite-padel-club.jpg",
    rating: 5,
  },
  {
    slug: "global-tech-hq",
    title: "Global Tech HQ",
    location: "Dubai, UAE",
    category: "LVT",
    image: "/images/projects/global-tech-hq.jpg",
    rating: 5,
  },
  {
    slug: "al-noor-specialist-hospital",
    title: "Al-Noor Specialist Hospital",
    location: "Doha, Qatar",
    category: "Healthcare",
    image: "/images/projects/al-noor-specialist-hospital.jpg",
    rating: 5,
  },
  {
    slug: "vinyl-commercial-fitout",
    title: "Commercial Fit-out Suite",
    location: "Abu Dhabi, UAE",
    category: "Vinyl",
    image: "/images/services/vinyl-flooring.jpg",
    rating: 4,
  },
  {
    slug: "homogeneous-clinic",
    title: "Clinic Corridor Upgrade",
    location: "Jeddah, KSA",
    category: "Homogeneous",
    image: "/images/services/homogeneous-flooring.jpg",
    rating: 5,
  },
  {
    slug: "lvp-office-wing",
    title: "Office Wing Refresh",
    location: "Sharjah, UAE",
    category: "LVP",
    image: "/images/services/office-carpet-flooring.jpg",
    rating: 4,
  },
];

export const feedbackFormIntro = {
  title: "Share your feedback with us",
  description: "Tell us about your project experience and help other teams specify with confidence.",
};

export const trustedByIntro =
  "Trusted by Businesses, Consultants & Project Teams Across the GCC";

export const trustedByLogos = [
  "NEOM",
  "Aldar",
  "Emaar",
  "ADNOC",
  "SEHA",
  "Qatar Foundation",
];

export const projectExperienceIntro = {
  title: "More Than Flooring - A Complete Project Experience",
};

export const projectExperienceSteps = [
  {
    number: "01",
    title: "Understand Your Requirements",
    description:
      "We map usage intensity, sub-floor conditions, and specification targets before recommending a system.",
  },
  {
    number: "02",
    title: "Specify the Right System",
    description:
      "Material selection is backed by performance data, fire ratings, and GCC climate suitability.",
  },
  {
    number: "03",
    title: "Install with Technical Control",
    description:
      "Certified crews manage moisture testing, preparation, installation, and documented quality checks.",
  },
  {
    number: "04",
    title: "Handover and Aftercare",
    description:
      "You receive a complete handover pack plus guidance for cleaning, maintenance, and long-term care.",
  },
];

export const reviewsFaqIntro =
  "Most stock items are available within 3-5 working days. Custom orders or specialised sports turf typically require 4-6 weeks from manufacture to port delivery.";

export const reviewsFaqs = [
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
  {
    question: "Can we visit completed projects before specifying?",
    answer:
      "Yes. Where client permissions allow, we arrange site references across gyms, offices, healthcare, and sports venues in the UAE and KSA.",
  },
];

export const reviewsCta = {
  image: "/images/advantage-installation.jpg",
  title: "Planning your next Flooring Project?",
  description: "Speak with our technical team for recommendations, samples, and project pricing.",
};
