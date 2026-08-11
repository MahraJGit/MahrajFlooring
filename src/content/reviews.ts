import {
  Award,
  GraduationCap,
  Headset,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { projects } from "@/content/home";

export const reviewsHero = {
  image: "/images/projects/global-tech-hq.jpg",
  title: "Trusted Through Completed Work and Responsive Support",
  description:
    "Every installation is specified, installed, and handed over with the same technical standard — so the finished floor and the people who specified it both stand up to scrutiny.",
};

export type Partner = {
  name: string;
  category: string;
};

export const partners: Partner[] = [
  { name: "NEOM", category: "Sports & Fitness" },
  { name: "Aldar", category: "Commercial" },
  { name: "Emaar", category: "Hospitality" },
  { name: "Qatar Foundation", category: "Education" },
  { name: "SEHA", category: "Healthcare" },
  { name: "ADNOC", category: "Industrial" },
  { name: "Dubai Sports Council", category: "Sports & Fitness" },
  { name: "Majid Al Futtaim", category: "Retail" },
  { name: "King Abdullah Sports City", category: "Sports & Fitness" },
  { name: "Cleveland Clinic Abu Dhabi", category: "Healthcare" },
];

export type ProjectReview = {
  projectSlug: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
  date: string;
  source: string;
};

export const projectReviews: ProjectReview[] = [
  {
    projectSlug: "elite-padel-club",
    quote:
      "Surface pace and shock absorption were within spec on day one. The crew coordinated around an occupied club without delaying the opening fixture list.",
    author: "James Dalton",
    role: "Senior Project Manager",
    company: "Elite Padel Club",
    initials: "JD",
    rating: 5,
    date: "March 2024",
    source: "Google",
  },
  {
    projectSlug: "global-tech-hq",
    quote:
      "Acoustic-rated LVT across three floors, installed overnight so the fit-out never stopped. Submittals and fire certificates arrived with the first delivery.",
    author: "Aisha Rahman",
    role: "Fit-out Lead",
    company: "Global Tech HQ",
    initials: "AR",
    rating: 5,
    date: "January 2024",
    source: "LinkedIn",
  },
  {
    projectSlug: "al-noor-specialist-hospital",
    quote:
      "Homogeneous vinyl welded to a clinical finish, anti-slip ratings documented for every zone. The handover pack was complete enough for our infection-control audit.",
    author: "Dr. Maha Khalil",
    role: "Facilities Director",
    company: "Al-Noor Specialist Hospital",
    initials: "MK",
    rating: 5,
    date: "August 2023",
    source: "Direct",
  },
];

export function getReviewForProject(slug: string) {
  return projectReviews.find((review) => review.projectSlug === slug);
}

export function getReviewedProjects() {
  return projects.map((project) => ({
    ...project,
    review: getReviewForProject(project.slug),
  }));
}

export const accreditations = [
  "ISO 9001:2015 Quality Management",
  "EN 13501-1 Fire Class Certified",
  "LEED & Estidama Compliant",
];

export const warrantyCards = [
  { title: "5-Year Standard Warranty", icon: ShieldCheck },
  { title: "10-Year Project Warranty", icon: Award },
  { title: "Fire Safety Verified", icon: ShieldCheck },
  { title: "Manufacturer Authorized", icon: Award },
];

export const commitments: {
  title: string;
  description: string;
  href: string;
  action: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Technical Support",
    description:
      "Specification advice from engineers who have installed the same systems across gyms, hospitals, and sports venues in the GCC.",
    href: "/contact",
    action: "Consult an Engineer",
    icon: Headset,
  },
  {
    title: "Maintenance Training",
    description:
      "On-site handover sessions so your facilities team knows how to clean, repair, and extend the life of the finished surface.",
    href: "/contact",
    action: "Request Training",
    icon: GraduationCap,
  },
  {
    title: "Rapid Response",
    description:
      "Regional crews in the UAE and KSA for snagging, repairs, and phased installations that cannot wait on a long mobilisation.",
    href: "/contact",
    action: "Talk to Support",
    icon: Rocket,
  },
];
