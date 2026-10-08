import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

import { Container } from "@/components/layout/container";
import { site } from "@/content/site";

const exploreLinks = [
  { label: "Services", href: "/services" },
  { label: "Catalogues", href: "/catalogues" },
  { label: "Projects", href: "/projects" },
  { label: "Industries", href: "/industries" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Request a Quote", href: "/contact#quote-form" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

function InstagramIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.25 1.22.59 1.77 1.15.56.55.9 1.11 1.15 1.77.25.64.42 1.36.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43-.25.66-.59 1.22-1.15 1.77-.55.56-1.11.9-1.77 1.15-.64.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.25-.66.59-1.22 1.15-1.77.55-.56 1.11-.9 1.77-1.15.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.98.04-1.5.2-1.86.34-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.36-.3.88-.34 1.86-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.98.2 1.5.34 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.14.88.3 1.86.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.98-.04 1.5-.2 1.86-.34.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.36.3-.88.34-1.86.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.98-.2-1.5-.34-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.36-.14-.88-.3-1.86-.34-1.05-.05-1.37-.06-4.04-.06Zm0 3.07a5.13 5.13 0 1 1 0 10.26 5.13 5.13 0 0 1 0-10.26Zm0 1.8a3.33 3.33 0 1 0 0 6.66 3.33 3.33 0 0 0 0-6.66Zm5.34-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
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

function FacebookIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M14.5 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.1C12.2 3 11 4.4 11 6.6v1.9H9v2.8h2V21h3.5v-9.7h2.3l.4-2.8h-2.7Z" />
    </svg>
  );
}

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.6 3H20.4L13.9 10.4 21.5 21h-6.2l-4.3-6.6L6 21H3.2l7-8.1L2.7 3h6.3l3.9 6.1L17.6 3Zm-1.1 16.2h1.6L7.6 4.7H5.9l10.6 14.5Z" />
    </svg>
  );
}

const socialIcons = {
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
  Facebook: FacebookIcon,
  X: XIcon,
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
              <Link
                href="/"
                className="font-heading text-2xl font-bold text-white transition-opacity hover:opacity-80"
              >
                Mahraj <span className="text-brand">Flooring</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed">
                Trusted flooring partner across the GCC, offering durable solutions for homes, 
                gyms, hospitals, offices, hotels, schools, and more.
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
                Explore
              </h3>
              <ul className="mt-5 space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
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
                Company
              </h3>
              <ul className="mt-5 space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
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
                  <a
                    href={site.address.mapsHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-colors hover:text-brand"
                  >
                    {site.address.line1}, {site.address.line2}
                    {/* {site.address.line3} */}
                  </a>
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
