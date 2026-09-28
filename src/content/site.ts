export const site = {
  name: "Mahraj Flooring",
  tagline: "Complete Flooring and Fitness Solutions Across the GCC",
  description:
    "Specialist supplier and installer of technical flooring systems for commercial gyms, elite sports venues, healthcare, hospitality and industrial spaces across the UAE and GCC.",
  url: "https://mahrajflooring.com",
  phone: "+97150 882 0457",
  phoneHref: "tel:+97140000000",
  email: "info@mahrajfloors.com",
  salesEmail: "sales@mahrajfloors.com",
  whatsapp: "https://wa.me/97140000000",
  address: {
    line1: "Industrial Area 4, Al Qusais",
    line2: "Dubai, UAE",
    line3: "Office 402, King Fahad Road, Riyadh, KSA",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=Industrial+Area+4+Al+Qusais+Dubai",
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/mahrajflooring/" },
    { label: "YouTube", href: "https://www.youtube.com/@MahrajFlooring" },
    { label: "Facebook", href: "https://www.facebook.com/mahrajflooring/" },
    { label: "X", href: "https://x.com/mahrajflooring" },
  ],
} as const;

export type NavLink = {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
};

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasMegaMenu: true },
  { label: "Catalogues", href: "/catalogues" },
  { label: "Reviews", href: "/reviews" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
];
