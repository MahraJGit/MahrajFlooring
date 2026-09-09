export type MainServiceSeed = {
  slug: string;
  title: string;
  sortOrder: number;
  menuDescription?: string;
};

export type SubServiceSeed = {
  slug: string;
  title: string;
  parentSlug: string;
  excerpt: string;
  image: string;
  sortOrder: number;
  detailReady: boolean;
  showInMegaMenu?: boolean;
  detailTitle?: string;
  heroTitle?: string;
  heroDescription?: string;
  overviewTitle?: string;
  overviewDescription?: string;
  guideTitle?: string;
  caseStudiesTitle?: string;
  projectsTitle?: string;
  applications?: {
    title: string;
    description: string;
    points: string[];
  }[];
  showPerformanceMatrix?: boolean;
  performanceRows?: {
    useCase: string;
    recommended: string;
    forceReduction: string;
  }[];
  density?: string;
  warranty?: string;
  brandingDescription?: string;
  showSpaceRequirements?: boolean;
  spaceRows?: {
    useCase: string;
    recommended: string;
    impact: string;
    slip: string;
    acoustic: string;
    maintenance: string;
  }[];
};

const sharedApplications = [
  {
    title: "High-Impact Areas",
    description:
      "Performance-led systems selected for demanding loads, repeated use, and long service life.",
    points: ["Impact control", "Durable finish"],
  },
  {
    title: "Daily Traffic",
    description:
      "Stable, easy-care surfaces for active commercial environments and continuous operation.",
    points: ["Easy maintenance", "Reliable grip"],
  },
  {
    title: "Functional Zones",
    description:
      "Application-specific finishes aligned with safety, comfort, acoustic, and visual requirements.",
    points: ["Zone resistance", "Seamless transitions"],
  },
];

const sharedPerformanceRows = [
  { useCase: "Home Fitness", recommended: "15mm - 20mm", forceReduction: "35%" },
  {
    useCase: "Strength Machines",
    recommended: "20mm - 25mm",
    forceReduction: "48%",
  },
  { useCase: "Free Weights", recommended: "30mm - 40mm", forceReduction: "62%" },
  {
    useCase: "Olympic Lifting",
    recommended: "50mm Integrated",
    forceReduction: "74%",
  },
];

const sharedSpaceRows = [
  {
    useCase: "Home Fitness",
    recommended: "15mm - 20mm",
    impact: "35%",
    slip: "R10",
    acoustic: "Medium",
    maintenance: "Easy",
  },
  {
    useCase: "Strength Machines",
    recommended: "20mm - 25mm",
    impact: "48%",
    slip: "R10",
    acoustic: "High",
    maintenance: "Easy",
  },
  {
    useCase: "Free Weights",
    recommended: "30mm - 40mm",
    impact: "62%",
    slip: "R11",
    acoustic: "High",
    maintenance: "Medium",
  },
  {
    useCase: "Olympic Lifting",
    recommended: "50mm Integrated",
    impact: "74%",
    slip: "R11",
    acoustic: "Very High",
    maintenance: "Medium",
  },
];

const sharedOverview =
  "Our team supports the full project cycle with site assessment, product selection, technical submittals, preparation, installation, and documented handover.";

function withDetailDefaults(service: SubServiceSeed): SubServiceSeed {
  return {
    ...service,
    heroDescription:
      service.heroDescription ??
      `${service.excerpt} Engineered for GCC commercial environments with documented performance, controlled preparation, and professional installation.`,
    overviewDescription: service.overviewDescription ?? sharedOverview,
  };
}

/** Mega-menu columns / organizers — no public detail pages. */
export const mainServiceSeed: MainServiceSeed[] = [
  {
    slug: "gym-rubber",
    title: "Gym & Rubber",
    sortOrder: 10,
    menuDescription: "Gym flooring, rubber systems, and impact surfaces.",
  },
  {
    slug: "commercial-institutional",
    title: "Commercial & Institutional",
    sortOrder: 20,
    menuDescription: "Vinyl and homogeneous systems for commercial interiors.",
  },
  {
    slug: "carpet-event",
    title: "Carpet & Event",
    sortOrder: 30,
    menuDescription: "Office carpet and temporary event flooring.",
  },
  {
    slug: "sports-outdoor",
    title: "Sports & Outdoor",
    sortOrder: 40,
    menuDescription: "Sports courts, turf, tracks, and outdoor systems.",
  },
];

/**
 * Sub-services under each main. Each has its own `/services/[slug]` page.
 * Former hash-only mega-menu items are real documents (Coming Soon until detailReady).
 */
export const subServiceSeed: SubServiceSeed[] = [
  // Gym & Rubber
  withDetailDefaults({
    slug: "rubber-gym-flooring",
    title: "Rubber Gym Flooring",
    parentSlug: "gym-rubber",
    excerpt:
      "Commercial gyms, home gyms, fitness studios, and free weight areas.",
    image: "images/services/rubber-gym-flooring.jpg",
    sortOrder: 10,
    detailReady: true,
    detailTitle: "Rubber Gym Flooring",
    heroTitle: "Rubber Gym Flooring Built for Impact, Grip, and Daily Use",
    overviewTitle:
      "Complete Rubber Gym Flooring Support - From Specification to Installation",
    guideTitle: "The Rubber Gym Flooring Guide",
    caseStudiesTitle: "Rubber Gym Flooring Case Studies",
    projectsTitle: "Rubber Gym Flooring Ongoing Projects",
    applications: sharedApplications,
    showPerformanceMatrix: true,
    performanceRows: sharedPerformanceRows,
    density: "1100 kg/m³",
    warranty: "5 - 10 Years",
    brandingDescription:
      "Add custom logos, zone markings, and colourways using precision-cut inserts and application-specific finishes.",
    showSpaceRequirements: true,
    spaceRows: sharedSpaceRows,
  }),
  withDetailDefaults({
    slug: "gym-tiles",
    title: "Tiles",
    parentSlug: "gym-rubber",
    excerpt: "Modular rubber tiles for gyms, studios, and free-weight zones.",
    image: "images/services/rubber-gym-flooring.jpg",
    sortOrder: 20,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "gym-rolls",
    title: "Rolls",
    parentSlug: "gym-rubber",
    excerpt: "Rubber rolls for continuous coverage in commercial fitness spaces.",
    image: "images/services/rubber-gym-flooring.jpg",
    sortOrder: 30,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "gym-mats",
    title: "Mats",
    parentSlug: "gym-rubber",
    excerpt: "Protective gym mats for equipment zones and training areas.",
    image: "images/services/rubber-gym-flooring.jpg",
    sortOrder: 40,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "training-turf",
    title: "Training Turf",
    parentSlug: "gym-rubber",
    excerpt: "Indoor training turf for sled work, agility, and functional zones.",
    image: "images/services/artificial-grass.jpg",
    sortOrder: 50,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "sbr",
    title: "SBR",
    parentSlug: "gym-rubber",
    excerpt: "SBR rubber surfaces for impact absorption and durable underlays.",
    image: "images/services/sbr-epdm.jpg",
    sortOrder: 60,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "epdm",
    title: "EPDM",
    parentSlug: "gym-rubber",
    excerpt: "EPDM granules and systems for colourful, resilient surfaces.",
    image: "images/services/sbr-epdm.jpg",
    sortOrder: 70,
    detailReady: false,
  }),

  // Commercial & Institutional
  withDetailDefaults({
    slug: "vinyl-flooring",
    title: "Vinyl",
    parentSlug: "commercial-institutional",
    excerpt:
      "Durable flooring for offices, homes, retail spaces, and hospitality interiors.",
    image: "images/services/vinyl-flooring.jpg",
    sortOrder: 10,
    detailReady: true,
    detailTitle: "Vinyl Flooring",
    heroTitle: "Vinyl Flooring Built for Durable Commercial Interiors",
    overviewTitle:
      "Complete Vinyl Flooring Support - From Specification to Installation",
    guideTitle: "The Commercial Vinyl Flooring Guide",
    caseStudiesTitle: "Vinyl Flooring Case Studies",
    projectsTitle: "Vinyl Flooring Ongoing Projects",
    applications: sharedApplications,
    showPerformanceMatrix: true,
    performanceRows: sharedPerformanceRows,
    showSpaceRequirements: true,
    spaceRows: sharedSpaceRows,
  }),
  withDetailDefaults({
    slug: "vinyl-sheet",
    title: "Sheet",
    parentSlug: "commercial-institutional",
    excerpt: "Sheet vinyl for seamless, hygienic commercial installations.",
    image: "images/services/vinyl-flooring.jpg",
    sortOrder: 20,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "lvt",
    title: "LVT",
    parentSlug: "commercial-institutional",
    excerpt: "Luxury vinyl tile for realistic design with commercial durability.",
    image: "images/services/vinyl-flooring.jpg",
    sortOrder: 30,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "lvp",
    title: "LVP",
    parentSlug: "commercial-institutional",
    excerpt: "Luxury vinyl plank systems for offices and hospitality interiors.",
    image: "images/services/vinyl-flooring.jpg",
    sortOrder: 40,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "spc",
    title: "SPC",
    parentSlug: "commercial-institutional",
    excerpt: "Rigid SPC flooring for high-traffic commercial environments.",
    image: "images/services/vinyl-flooring.jpg",
    sortOrder: 50,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "homogeneous-flooring",
    title: "Homogeneous",
    parentSlug: "commercial-institutional",
    excerpt:
      "Hygienic flooring for hospitals, clinics, laboratories, and educational facilities.",
    image: "images/services/homogeneous-flooring.jpg",
    sortOrder: 60,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "healthcare-flooring",
    title: "Healthcare",
    parentSlug: "commercial-institutional",
    excerpt: "Healthcare-grade flooring for clinical and care environments.",
    image: "images/services/homogeneous-flooring.jpg",
    sortOrder: 70,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "education-flooring",
    title: "Education",
    parentSlug: "commercial-institutional",
    excerpt: "Durable flooring systems for schools, campuses, and academies.",
    image: "images/services/homogeneous-flooring.jpg",
    sortOrder: 80,
    detailReady: false,
  }),

  // Carpet & Event
  withDetailDefaults({
    slug: "office-carpet-flooring",
    title: "Office Tiles",
    parentSlug: "carpet-event",
    excerpt:
      "Carpet tiles and woven carpet solutions for offices, hotels, and banquet halls.",
    image: "images/services/office-carpet-flooring.jpg",
    sortOrder: 10,
    detailReady: true,
    detailTitle: "Office Tiles",
    heroTitle: "Office Carpet Tiles Built for Comfort, Acoustics, and Daily Use",
    overviewTitle:
      "Complete Office Tile Support - From Specification to Installation",
    guideTitle: "The Office Carpet Tile Guide",
    caseStudiesTitle: "Office Tile Case Studies",
    projectsTitle: "Office Tile Ongoing Projects",
    applications: sharedApplications,
    showPerformanceMatrix: true,
    performanceRows: sharedPerformanceRows,
    showSpaceRequirements: true,
    spaceRows: sharedSpaceRows,
  }),
  withDetailDefaults({
    slug: "broadloom",
    title: "Broadloom",
    parentSlug: "carpet-event",
    excerpt: "Broadloom carpet for continuous coverage in commercial interiors.",
    image: "images/services/office-carpet-flooring.jpg",
    sortOrder: 20,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "wall-to-wall",
    title: "Wall to Wall",
    parentSlug: "carpet-event",
    excerpt: "Wall-to-wall carpet systems for offices and hospitality spaces.",
    image: "images/services/office-carpet-flooring.jpg",
    sortOrder: 30,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "hotel-carpet",
    title: "Hotel",
    parentSlug: "carpet-event",
    excerpt: "Hotel corridor and guest-area carpet systems.",
    image: "images/services/office-carpet-flooring.jpg",
    sortOrder: 40,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "banquet-carpet",
    title: "Banquet",
    parentSlug: "carpet-event",
    excerpt: "Banquet and event-hall carpet for high-traffic gatherings.",
    image: "images/services/office-carpet-flooring.jpg",
    sortOrder: 50,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "exhibition-event-flooring",
    title: "Exhibition",
    parentSlug: "carpet-event",
    excerpt:
      "Practical temporary flooring for exhibitions, trade shows, and display spaces.",
    image: "images/services/exhibition-event-flooring.jpg",
    sortOrder: 60,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "event-flooring",
    title: "Event",
    parentSlug: "carpet-event",
    excerpt: "Temporary event flooring for short-term installations.",
    image: "images/services/exhibition-event-flooring.jpg",
    sortOrder: 70,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "temp-vinyl",
    title: "Temp Vinyl",
    parentSlug: "carpet-event",
    excerpt: "Temporary vinyl systems for exhibitions and display stands.",
    image: "images/services/exhibition-event-flooring.jpg",
    sortOrder: 80,
    detailReady: false,
  }),

  // Sports & Outdoor
  withDetailDefaults({
    slug: "sports-flooring",
    title: "Sports Flooring",
    parentSlug: "sports-outdoor",
    excerpt:
      "Professional surfaces for badminton, basketball, padel, and indoor courts.",
    image: "images/services/sports-flooring.jpg",
    sortOrder: 10,
    detailReady: true,
    detailTitle: "Sports Flooring",
    heroTitle: "Sports Flooring Built for Grip, Response, and Competition",
    overviewTitle:
      "Complete Sports Flooring Support - From Specification to Installation",
    guideTitle: "The Sports Flooring Guide",
    caseStudiesTitle: "Sports Flooring Case Studies",
    projectsTitle: "Sports Flooring Ongoing Projects",
    applications: sharedApplications,
    showPerformanceMatrix: true,
    performanceRows: sharedPerformanceRows,
    showSpaceRequirements: true,
    spaceRows: sharedSpaceRows,
  }),
  withDetailDefaults({
    slug: "badminton-flooring",
    title: "Badminton",
    parentSlug: "sports-outdoor",
    excerpt: "Court systems specified for badminton play and club facilities.",
    image: "images/services/sports-flooring.jpg",
    sortOrder: 20,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "basketball-flooring",
    title: "Basketball",
    parentSlug: "sports-outdoor",
    excerpt: "Basketball court surfaces for schools, clubs, and arenas.",
    image: "images/services/sports-flooring.jpg",
    sortOrder: 30,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "padel-flooring",
    title: "Padel",
    parentSlug: "sports-outdoor",
    excerpt: "Padel court flooring for clubs and commercial sports facilities.",
    image: "images/services/sports-flooring.jpg",
    sortOrder: 40,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "tennis-flooring",
    title: "Tennis",
    parentSlug: "sports-outdoor",
    excerpt: "Tennis court surfaces for clubs and multi-sport venues.",
    image: "images/services/sports-flooring.jpg",
    sortOrder: 50,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "running-tracks",
    title: "Tracks",
    parentSlug: "sports-outdoor",
    excerpt: "Running track systems for schools and athletic facilities.",
    image: "images/services/sbr-epdm.jpg",
    sortOrder: 60,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "artificial-grass",
    title: "Artificial Grass",
    parentSlug: "sports-outdoor",
    excerpt:
      "Landscape grass and sports turf for villas, schools, and football facilities.",
    image: "images/services/artificial-grass.jpg",
    sortOrder: 70,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "football-turf",
    title: "Football",
    parentSlug: "sports-outdoor",
    excerpt: "Football turf systems for pitches and training grounds.",
    image: "images/services/artificial-grass.jpg",
    sortOrder: 80,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "landscape-grass",
    title: "Landscape",
    parentSlug: "sports-outdoor",
    excerpt: "Landscape artificial grass for villas, parks, and commercial grounds.",
    image: "images/services/artificial-grass.jpg",
    sortOrder: 90,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "kids-play-area",
    title: "Kids Play Area",
    parentSlug: "sports-outdoor",
    excerpt:
      "Safe and colourful flooring for nurseries, schools, and indoor play centres.",
    image: "images/services/kids-play-area.jpg",
    sortOrder: 100,
    detailReady: false,
  }),
  withDetailDefaults({
    slug: "stable-farm-flooring",
    title: "Stable & Farm",
    parentSlug: "sports-outdoor",
    excerpt:
      "Durable rubber flooring designed for stables, barns, and animal care.",
    image: "images/services/stable-farm-flooring.jpg",
    sortOrder: 110,
    detailReady: false,
  }),
];
