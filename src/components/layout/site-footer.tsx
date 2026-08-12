import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

import { Container } from "@/components/layout/container";
import { site } from "@/content/site";

const productLinks = [
  { label: "Gym Flooring", href: "/services/rubber-gym-flooring" },
  { label: "Sports Turf", href: "/services/artificial-grass" },
  { label: "Hospital Vinyl", href: "/services/homogeneous-flooring" },
  { label: "SPC & LVT", href: "/services/vinyl-flooring" },
];

const serviceLinks = [
  { label: "Installation", href: "/services" },
  { label: "Consultation", href: "/contact" },
  { label: "Site Survey", href: "/contact" },
  { label: "Maintenance", href: "/services" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Careers", href: "/careers" },
];

function LinkedInIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05a4.17 4.17 0 0 1 3.75-2.06c4.01 0 4.75 2.64 4.75 6.07V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4V9Z" />
    </svg>
  );
}

function InstagramIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.25 1.22.59 1.77 1.15.56.55.9 1.11 1.15 1.77.25.64.42 1.36.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43-.25.66-.59 1.22-1.15 1.77-.55.56-1.11.9-1.77 1.15-.64.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.25-.66.59-1.22 1.15-1.77.55-.56 1.11-.9 1.77-1.15.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.98.04-1.5.2-1.86.34-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.36-.3.88-.34 1.86-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.4.98.2 1.5.34 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.14.88.3 1.86.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.98-.04 1.5-.2 1.86-.34.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.36.3-.88.34-1.86.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.98-.2-1.5-.34-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.36-.14-.88-.3-1.86-.34-1.05-.05-1.37-.06-4.04-.06Zm0 3.07a5.13 5.13 0 1 1 0 10.26 5.13 5.13 0 0 1 0-10.26Zm0 1.8a3.33 3.33 0 1 0 0 6.66 3.33 3.33 0 0 0 0-6.66Zm5.34-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
    </svg>
  );
}

function TwitterIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.29 3.9A12.14 12.14 0 0 1 3.15 4.6a4.27 4.27 0 0 0 1.32 5.71 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.97A8.58 8.58 0 0 1 2 18.41 12.11 12.11 0 0 0 8.56 20c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0 0 22.46 6Z" />
    </svg>
  );
}

function YouTubeIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.54 3.7 12 3.7 12 3.7s-7.54 0-9.38.36A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 .14 12c0 1.94.13 3.86.36 5.8a3.02 3.02 0 0 0 2.12 2.14c1.84.36 9.38.36 9.38.36s7.54 0 9.38-.36a3.02 3.02 0 0 0 2.12-2.14c.23-1.94.36-3.86.36-5.8 0-1.94-.13-3.86-.36-5.8ZM9.75 15.52V8.48L15.84 12l-6.09 3.52Z" />
    </svg>
  );
}

const socialIcons = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
  YouTube: YouTubeIcon,
};

export function SiteFooter() {
  return (
    <footer>
      <div className="bg-brand-dark py-4 text-white">
        <Container className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">
            Connect with sales today
          </p>
          <a
            href={site.phoneHref}
            className="font-heading text-lg font-semibold transition-opacity hover:opacity-80"
          >
            {site.phone}
          </a>
        </Container>
      </div>

      <div className="bg-ink py-14 text-white/70">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
            <div>
              <p className="font-heading text-2xl font-bold text-white">
                Mahraj <span className="text-brand">Flooring</span>
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed">
                The leading authority in performance surfaces across the Middle
                East. Providing architect-grade solutions for fitness,
                commercial, and industrial spaces.
              </p>
              <div className="mt-6 flex gap-3">
                {site.social.map((item) => {
                  const Icon = socialIcons[item.label];

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex size-9 items-center justify-center rounded-md border border-white/15 text-white/70 transition-colors hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <Icon className="size-4" />
                      <span className="sr-only">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                Products
              </h3>
              <ul className="mt-5 space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                Services
              </h3>
              <ul className="mt-5 space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                Contact Info
              </h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>
                    {site.address.line1}, {site.address.line2}
                    <br />
                    {site.address.line3}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>
                    <a
                      href={`mailto:${site.email}`}
                      className="transition-colors hover:text-brand"
                    >
                      {site.email}
                    </a>
                    <br />
                    <a
                      href={`mailto:${site.salesEmail}`}
                      className="transition-colors hover:text-brand"
                    >
                      {site.salesEmail}
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
            <p className="text-xs">
              &copy; {new Date().getFullYear()} {site.name}. All Rights
              Reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
