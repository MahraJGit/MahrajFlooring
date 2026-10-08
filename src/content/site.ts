export const site = {
  name: "Mahraj Flooring",
  tagline: "Complete Flooring and Fitness Solutions Across the GCC",
  description:
    "Specialist supplier and installer of technical flooring systems for commercial gyms, elite sports venues, healthcare, hospitality and industrial spaces across the UAE and GCC.",
  url: "https://mahrajflooring.com",
  phone: "+97150 882 0457",
  phoneHref: "tel:+971508820457",
  email: "bthomas@mahraj.com",
  whatsapp: "https://wa.me/971508820457",
  address: {
    line1: "22nd Floor, B2B Tower",
    line2: "Business Bay, Dubai, UAE",
    // line3: "Office 402, King Fahad Road, Riyadh, KSA",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=B2B+Tower+Business+Bay+Dubai",
    mapsEmbed:
      "https://maps.google.com/maps?q=B2B+Tower+Business+Bay+Dubai&z=16&output=embed",
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
