export type Service = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
};

const services: Service[] = [
  {
    slug: "rubber-gym-flooring",
    title: "Rubber Gym Flooring",
    excerpt:
      "Commercial gyms, home gyms, fitness studios, and free weight areas.",
    image: "/images/services/rubber-gym-flooring.jpg",
  },
  {
    slug: "vinyl-flooring",
    title: "Vinyl Flooring",
    excerpt:
      "Durable flooring for offices, homes, retail spaces, and hospitality interiors.",
    image: "/images/services/vinyl-flooring.jpg",
  },
  {
    slug: "homogeneous-flooring",
    title: "Homogeneous Flooring",
    excerpt:
      "Hygienic flooring for hospitals, clinics, laboratories, and educational facilities.",
    image: "/images/services/homogeneous-flooring.jpg",
  },
  {
    slug: "office-carpet-flooring",
    title: "Office Carpet Flooring",
    excerpt:
      "Carpet tiles and woven carpet solutions for offices, hotels, and banquet halls.",
    image: "/images/services/office-carpet-flooring.jpg",
  },
  {
    slug: "exhibition-event-flooring",
    title: "Exhibition & Event",
    excerpt:
      "Practical temporary flooring for exhibitions, trade shows, and display spaces.",
    image: "/images/services/exhibition-event-flooring.jpg",
  },
  {
    slug: "sports-flooring",
    title: "Sports Flooring",
    excerpt:
      "Professional surfaces for badminton, basketball, padel, and indoor courts.",
    image: "/images/services/sports-flooring.jpg",
  },
  {
    slug: "artificial-grass",
    title: "Artificial Grass",
    excerpt:
      "Landscape grass and sports turf for villas, schools, and football facilities.",
    image: "/images/services/artificial-grass.jpg",
  },
  {
    slug: "sbr-epdm",
    title: "SBR & EPDM",
    excerpt:
      "Impact resistant rubber surfaces for playgrounds and running tracks.",
    image: "/images/services/sbr-epdm.jpg",
  },
  {
    slug: "kids-play-area",
    title: "Kids Play Area",
    excerpt:
      "Safe and colourful flooring for nurseries, schools, and indoor play centres.",
    image: "/images/services/kids-play-area.jpg",
  },
  {
    slug: "stable-farm-flooring",
    title: "Stable & Farm",
    excerpt:
      "Durable rubber flooring designed for stables, barns, and animal care.",
    image: "/images/services/stable-farm-flooring.jpg",
  },
];

export function getServices() {
  return services;
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export type MegaMenuColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export const megaMenu: MegaMenuColumn[] = [
  {
    title: "Gym & Rubber",
    links: [
      { label: "Rubber Gym Flooring", href: "/services/rubber-gym-flooring" },
      { label: "Tiles", href: "/services/rubber-gym-flooring#tiles" },
      { label: "Rolls", href: "/services/rubber-gym-flooring#rolls" },
      { label: "Mats", href: "/services/rubber-gym-flooring#mats" },
      { label: "Training Turf", href: "/services/artificial-grass#training-turf" },
      { label: "SBR", href: "/services/sbr-epdm#sbr" },
      { label: "EPDM", href: "/services/sbr-epdm#epdm" },
    ],
  },
  {
    title: "Commercial & Institutional",
    links: [
      { label: "Vinyl", href: "/services/vinyl-flooring" },
      { label: "Sheet", href: "/services/vinyl-flooring#sheet" },
      { label: "LVT", href: "/services/vinyl-flooring#lvt" },
      { label: "LVP", href: "/services/vinyl-flooring#lvp" },
      { label: "SPC", href: "/services/vinyl-flooring#spc" },
      { label: "Homogeneous", href: "/services/homogeneous-flooring" },
      { label: "Healthcare", href: "/services/homogeneous-flooring#healthcare" },
      { label: "Education", href: "/services/homogeneous-flooring#education" },
    ],
  },
  {
    title: "Carpet & Event",
    links: [
      { label: "Office Tiles", href: "/services/office-carpet-flooring#tiles" },
      { label: "Broadloom", href: "/services/office-carpet-flooring#broadloom" },
      { label: "Wall to Wall", href: "/services/office-carpet-flooring#wall-to-wall" },
      { label: "Hotel", href: "/services/office-carpet-flooring#hotel" },
      { label: "Banquet", href: "/services/office-carpet-flooring#banquet" },
      { label: "Exhibition", href: "/services/exhibition-event-flooring" },
      { label: "Event", href: "/services/exhibition-event-flooring#event" },
      { label: "Temp Vinyl", href: "/services/exhibition-event-flooring#temp-vinyl" },
    ],
  },
  {
    title: "Sports & Outdoor",
    links: [
      { label: "Sports Flooring", href: "/services/sports-flooring" },
      { label: "Badminton", href: "/services/sports-flooring#badminton" },
      { label: "Basketball", href: "/services/sports-flooring#basketball" },
      { label: "Padel", href: "/services/sports-flooring#padel" },
      { label: "Tennis", href: "/services/sports-flooring#tennis" },
      { label: "Tracks", href: "/services/sbr-epdm#tracks" },
      { label: "Artificial Grass", href: "/services/artificial-grass" },
      { label: "Football", href: "/services/artificial-grass#football" },
      { label: "Landscape", href: "/services/artificial-grass#landscape" },
    ],
  },
];
