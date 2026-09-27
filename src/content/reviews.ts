import {
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  FileCheck2,
  ShieldCheck,
  Star,
  Users,
  HardHat,
  Repeat,
  Headset,
  type LucideIcon,
} from "lucide-react";

export const reviewsHero = {
  image: "/images/projects/what-our-clients-say.png",
  title: "What Our Clients Say About Us",
  description:
    "Real feedback from homeowners, businesses, and contractors who trusted us for durable, high quality flooring across the region.",
};

type HeroMetric = {
  kind: "rating" | "stat" | "verified";
  value: string;
  label: string;
};

export const heroMetrics: HeroMetric[] = [
  {
    kind: "stat",
    value: "150+",
    label: "Completed Projects",
  },
  {
    kind: "stat",
    value: "6 Countries",
    label: "GCC Coverage",
  },
  {
    kind: "stat",
    value: "98%",
    label: "Client Satisfaction Rate",
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
    label: "Average Client Rating",
    value: "4.8",
    note: "Based on verified client reviews",
    icon: Star,
  },
  {
    label: "Industries Served",
    value: "12+",
    note: "From gyms to hospitals to hotels",
    icon: Building2,
  },
  {
    label: "Certified Installers",
    value: "40+",
    note: "Trained professionals on every project",
    icon: HardHat,
  },
  {
    label: "Returning Clients",
    value: "72%",
    note: "Clients who came back for more",
    icon: Users, // Or use `Repeat`
  },
  {
    label: "Safety Compliance",
    value: "100%",
    note: "Every installation meets fire and safety codes",
    icon: ShieldCheck,
  },
  {
    label: "Warranty Support",
    value: "Up to 10 yrs",
    note: "Long term coverage on select systems",
    icon: BadgeCheck,
  },
  {
    label: "Quality Certifications",
    value: "ISO Certified",
    note: "Meeting international safety standards",
    icon: Award,
  },
  {
    label: "After Sales Support",
    value: "24/7",
    note: "Help is available whenever you need it",
    icon: Headset,
  },
];

export type WhyChooseItem = {
  title: string;
  subtitle: string;
};

export const whyChooseIntro = {
  title: "Why Clients Trust Mahraj Flooring",
  description: "Reliable flooring, professional service, and solutions built around your needs.",
};

export const whyChooseItems: WhyChooseItem[] = [
  { title: "Quality Materials", subtitle: "Durable flooring options" },
  { title: "Professional Installation", subtitle: "Precise floor installation" },
  { title: "Expert Guidance", subtitle: "Practical flooring advice" },
  { title: "Site Assessment ", subtitle: "Thorough site evaluation" },
  { title: "Clear Process", subtitle: "Simple project planning" },
  { title: "Reliable Aftercare", subtitle: "Ongoing support" },
  { title: "Versatile Solutions", subtitle: "Flooring for every space" },
  { title: "GCC Experience", subtitle: "Regional flooring expertise"},
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
  // GYM
  {
    industry: "Gym",
    name: "Faisal Al-Harbi",
    rating: "4.9",
    quote:
      "We were concerned that dropped weights would create too much noise, but the rubber flooring reduced it much better than we expected.",
    projectImage: "/images/services/rubber-gym-flooring.jpg",
    extraViews: 2,
  },
  {
    industry: "Gym",
    name: "Khalid Al-Thani",
    rating: "5.0",
    quote:
      "We checked three vendors before choosing Mahraj. Their pricing was fair, and we never felt pushed to pay for something we didn’t need.",
    projectImage: "/images/services/rubber-gym-flooring.jpg",
    extraViews: 2,
  },
  {
    industry: "Gym",
    name: "Ahmed Al-Kuwari",
    rating: "4.8",
    quote:
      "Our old floor started cracking around the squat racks within a year. But the new flooring has stayed in great shape despite heavy daily use.",
    projectImage: "/images/services/rubber-gym-flooring.jpg",
    extraViews: 2,
  },
  {
    industry: "Gym",
    name: "Nasser Al Rashid",
    rating: "5.0",
    quote:
      "The installation team arrived on time every day and cleaned everything before leaving. That level of care honestly surprised us.",
    projectImage: "/images/services/rubber-gym-flooring.jpg",
    extraViews: 2,
  },
  {
    industry: "Gym",
    name: "Saeed Al-Mazrouei",
    rating: "4.9",
    quote:
      "We had plenty of questions before making a decision, and the team took the time to answer every one without rushing us.",
    projectImage: "/images/services/rubber-gym-flooring.jpg",
    extraViews: 2,
  },

  // SCHOOL
  {
    industry: "School",
    name: "Abdulrahman Al-Qahtani",
    rating: "4.9",
    quote:
      "Our hundreds of students use these halls every day, but even after six months, the flooring still looks almost new.",
    projectImage: "/images/services/vinyl-flooring.jpg",
    extraViews: 1,
  },
  {
    industry: "School",
    name: "Sara Al-Khalifa",
    rating: "5.0",
    quote:
      "Honestly, the timing couldn’t have been better. They completed the installation during our two week school break, so we came back to fresh floors without any disruption to classes.",
    projectImage: "/images/services/vinyl-flooring.jpg",
    extraViews: 1,
  },
  {
    industry: "School",
    name: "Rashid Al-Hajri",
    rating: "4.8",
    quote:
      "We were working on five buildings at the same time, but the team kept everything well organized and made things easy for our maintenance staff.",
    projectImage: "/images/services/vinyl-flooring.jpg",
    extraViews: 1,
  },
  {
    industry: "School",
    name: "Noor Al-Marri",
    rating: "5.0",
    quote:
      "We appreciated that they didn’t simply recommend the most expensive option. They understood our budget and gave us practical choices that worked for the school.",
    projectImage: "/images/services/vinyl-flooring.jpg",
    extraViews: 1,
  },
  {
    industry: "School",
    name: "Faisal Al-Dosari",
    rating: "4.9",
    quote:
      "The new flooring has made the corridors look much fresher, and even the classrooms feel warmer and more welcoming now.",
    projectImage: "/images/services/vinyl-flooring.jpg",
    extraViews: 1,
  },

  // HOSPITAL
  {
    industry: "Hospital",
    name: "Dr. Khalid Al-Nuaimi",
    rating: "5.0",
    quote:
      "Infection control was our top priority, and the team understood this from the start without needing repeated explanations.",
    projectImage: "/images/projects/al-noor-specialist-hospital.jpg",
    extraViews: 3,
  },
  {
    industry: "Hospital",
    name: "Reem Al-Qahtani",
    rating: "4.9",
    quote:
      "The finishing around the doorways is really neat. Everything feels smooth and well fitted, with no awkward gaps. It’s a small detail, but it makes the whole floor look much more professional.",
    projectImage: "/images/projects/al-noor-specialist-hospital.jpg",
    extraViews: 3,
  },
  {
    industry: "Hospital",
    name: "Aisha Al-Mansoori",
    rating: "4.8",
    quote:
      "Our hospital stays busy around the clock, so we were worried about disruption. But the team managed the installation smoothly without affecting patient care.",
    projectImage: "/images/projects/al-noor-specialist-hospital.jpg",
    extraViews: 3,
  },
  {
    industry: "Hospital",
    name: "Mohammed Al-Hinai",
    rating: "5.0",
    quote:
      "Honestly, we got the best of both worlds. The flooring looks great, feels practical for everyday use, and we didn’t have to sacrifice one for the other.",
    projectImage: "/images/projects/al-noor-specialist-hospital.jpg",
    extraViews: 3,
  },
  {
    industry: "Hospital",
    name: "Fatima Al-Kuwari",
    rating: "4.9",
    quote:
      "Even after the project was finished, they were quick to answer our questions whenever we needed help. That follow-up really stood out.",
    projectImage: "/images/projects/al-noor-specialist-hospital.jpg",
    extraViews: 3,
  },

  // OFFICES (kept as "Offices" to match your existing filter keys)
  {
    industry: "Offices",
    name: "Layla Al-Mazrouei",
    rating: "5.0",
    quote:
      "We wanted our office to feel modern and welcoming instead of cold and overly corporate. The new flooring added just the right amount of warmth while still looking professional.",
    projectImage: "/images/projects/global-tech-hq.jpg",
    extraViews: 2,
  },
  {
    industry: "Offices",
    name: "Abdullah Al-Salem",
    rating: "4.9",
    quote:
      "There were so many flooring choices that we didn’t know where to start. But the team made the selection process much simpler for us.",
    projectImage: "/images/projects/global-tech-hq.jpg",
    extraViews: 2,
  },
  {
    industry: "Offices",
    name: "Dana Al-Khatib",
    rating: "5.0",
    quote:
      "Our office gets heavy foot traffic every day, but the flooring still looks great after months of regular use. We haven’t noticed any signs of wear.",
    projectImage: "/images/projects/global-tech-hq.jpg",
    extraViews: 2,
  },
  {
    industry: "Offices",
    name: "Rashid Al-Maktoum",
    rating: "4.8",
    quote:
      "We received regular updates throughout the project, so we always knew what was happening and what to expect next.",
    projectImage: "/images/projects/global-tech-hq.jpg",
    extraViews: 2,
  },
  {
    industry: "Offices",
    name: "Turki Al-Otaibi",
    rating: "4.9",
    quote:
      "We thought the installation would be messy and disruptive, but the whole project was surprisingly clean, quiet, and well managed.",
    projectImage: "/images/projects/global-tech-hq.jpg",
    extraViews: 2,
  },

  // HOTELS
  {
    industry: "Hotels",
    name: "Noor Al-Sabah",
    rating: "4.9",
    quote:
      "We weren’t sure how to match the new flooring with our existing interiors, but the team got the color and texture just right.",
    projectImage: "/images/services/office-carpet-flooring.jpg",
    extraViews: 1,
  },
  {
    industry: "Hotels",
    name: "Khalifa Al-Mohannadi",
    rating: "5.0",
    quote:
      "Our lobby renovation had a very tight deadline, but the team stayed on schedule and coordinated everything so well that our guests barely noticed the work.",
    projectImage: "/images/services/office-carpet-flooring.jpg",
    extraViews: 1,
  },
  {
    industry: "Hotels",
    name: "Maryam Al-Shamsi",
    rating: "4.8",
    quote:
      "We wanted the space to feel warm and welcoming, not too commercial. The finished flooring gave us exactly the look we were hoping for.",
    projectImage: "/images/services/office-carpet-flooring.jpg",
    extraViews: 1,
  },
  {
    industry: "Hotels",
    name: "Bader Al-Qahtani",
    rating: "5.0",
    quote:
      "We get a lot of guests walking through this area every day, but the flooring still looks fresh and polished. It’s holding up really well so far.",
    projectImage: "/images/services/office-carpet-flooring.jpg",
    extraViews: 1,
  },
  {
    industry: "Hotels",
    name: "Laila Al-Mahmoud",
    rating: "5.0",
    quote:
      "They understood that our lobby is part of the guest experience, not just another construction area. That attention really came through in the final result.",
    projectImage: "/images/services/office-carpet-flooring.jpg",
    extraViews: 1,
  },

  // EVENTS
  {
    industry: "Events",
    name: "Faisal Al-Kaabi",
    rating: "5.0",
    quote:
      "Our exhibition deadline was extremely tight, but the flooring arrived and was installed right on schedule. Everything went smoothly without any last minute issues.",
    projectImage: "/images/services/exhibition-event-flooring.jpg",
    extraViews: 2,
  },
  {
    industry: "Events",
    name: "Sara Al-Rashid",
    rating: "4.9",
    quote:
      "Honestly, the flooring made our booth come together so much better. It looked clean, felt professional, and took one big task off our team’s plate.",
    projectImage: "/images/services/exhibition-event-flooring.jpg",
    extraViews: 2,
  },
  {
    industry: "Events",
    name: "Yousef Al-Ansari",
    rating: "5.0",
    quote:
      "We got several compliments on our booth, and honestly, the flooring pulled the whole setup together. It looked clean, professional, and better than we expected.",
    projectImage: "/images/services/exhibition-event-flooring.jpg",
    extraViews: 2,
  },
  {
    industry: "Events",
    name: "Mariam Al-Dhaheri",
    rating: "4.8",
    quote:
      "Event deadlines can be stressful, but the installation team stayed focused and kept everything moving according to schedule.",
    projectImage: "/images/services/exhibition-event-flooring.jpg",
    extraViews: 2,
  },
  {
    industry: "Events",
    name: "Nasser Al-Rawahi",
    rating: "5.0",
    quote:
      "We only needed the flooring for a temporary setup, but the finished look felt much more premium than we expected.",
    projectImage: "/images/services/exhibition-event-flooring.jpg",
    extraViews: 2,
  },

  // SPORTS
  {
    industry: "Sports",
    name: "Saif Al-Mazrouei",
    rating: "5.0",
    quote:
      "We needed a training surface that could handle daily use, not one that only looked good at first. And thanks to Mahraj, it has performed exactly as we hoped.",
    projectImage: "/images/projects/elite-padel-club.jpg",
    extraViews: 2,
  },
  {
    industry: "Sports",
    name: "Hamza Al-Kuwari",
    rating: "5.0",
    quote:
      "Before recommending anything, the team asked how we actually use the space. It felt like genuine advice rather than someone simply trying to make a sale.",
    projectImage: "/images/projects/elite-padel-club.jpg",
    extraViews: 2,
  },
  {
    industry: "Sports",
    name: "Ahmed Al-Busaidi",
    rating: "4.8",
    quote:
      "We had training sessions running during the installation, but the team worked around our schedule and avoided any conflicts.",
    projectImage: "/images/projects/elite-padel-club.jpg",
    extraViews: 2,
  },
  {
    industry: "Sports",
    name: "Rayan Al-Sabah",
    rating: "5.0",
    quote:
      "The surface feels comfortable even during long training sessions. Our athletes noticed the improvement almost as soon as we started using it.",
    projectImage: "/images/projects/elite-padel-club.jpg",
    extraViews: 2,
  },
  {
    industry: "Sports",
    name: "Mohammed Al-Dosari",
    rating: "4.9",
    quote:
      "Everything was planned properly from the beginning. It never felt like the installation was being rushed or fitted into our schedule at the last minute.",
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
  title: "We'd Love to Hear From You",
  description: "Share your project details and experience, it helps us serve you and future clients better.",
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
  title: "The Journey Behind Every Great Review",
};

export const projectExperienceSteps = [
  {
    number: "01",
    title: "We Listen First",
    description:
      "Every project starts with real conversations about your space, budget, and goals, means no assumptions, no rushed pitches.",
  },
  {
    number: "02",
    title: "We Recommend Honestly",
    description:
      "Clients tell us they trust our advice because we explain trade-offs clearly instead of just pushing the priciest option.",
  },
  {
    number: "03",
    title: "We Deliver As Promised",
    description:
      "On-time installs, clean job sites, and clear communication, the details our reviews mention again and again.",
  },
  {
    number: "04",
    title: "We Stay Available After",
    description:
      "Support doesn't end at handover. Many of our best reviews come from clients we've helped months later too.",
  },
];

export const reviewsFaqIntro =
  "Quick answers to the questions we hear most about materials, delivery, installation, and support.";

export const reviewsFaqs = [
  {
    question: "Do you provide sub-floor preparation?",
    answer:
      "Yes! Our crews at Mahraj Flooring handle moisture testing, levelling, and screed correction before installation. This sub-floor prep ensures the finished surface meets manufacturer tolerances and lasts longer under daily use.",
  },
  {
    question: "Can we visit completed projects before specifying?",
    answer:
      "Yes, we can arrange site visits to our completed installations so you can see the finish quality, material durability, and workmanship firsthand. Many clients find this helpful before finalizing their flooring specification.",
  },
  {
    question: "Do you offer a warranty?",
    answer:
      "Yes, all flooring installed by Mahraj Flooring comes with warranty coverage. Exact terms vary depending on the product type and project scope, and our team will confirm full details during your consultation.",
  },
  {
    question: "Can you match our existing flooring?",
    answer:
      "In most cases, yes. Simply bring us a sample, and our material specialists will find the closest match in color, texture, and finish, helping you maintain a consistent look across your space.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Getting a quote from Mahraj Flooring is simple, just fill out our contact form or reach out directly. Our team will review your project requirements and respond with a tailored, transparent quote.",
  },
];

export const reviewsCta = {
  image: "/images/advantage-installation.jpg",
  title: "Like What Our Clients Are Saying?",
  description: "Bring the same quality, care, and support to your next flooring project. Our team is ready to help you get started.",
};
