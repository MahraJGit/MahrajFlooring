"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { MegaMenuPanel } from "@/components/layout/mega-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteSearch } from "@/components/layout/site-search";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { mainNav, site } from "@/content/site";
import { cn } from "@/lib/utils";

function TopBar() {
  return (
    <div className="hidden border-b border-border bg-surface-alt md:block">
      <Container className="flex h-9 items-center justify-end gap-6">
        <a
          href={site.phoneHref}
          className="flex items-center gap-1.5 text-xs text-body transition-colors hover:text-brand"
        >
          <Phone className="size-3.5" />
          {site.phone}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="flex items-center gap-1.5 text-xs text-body transition-colors hover:text-brand"
        >
          <Mail className="size-3.5" />
          {site.email}
        </a>
      </Container>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 bg-background">
      <TopBar />
      <div className="relative border-b border-border">
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Logo />

          <NavigationMenu
            viewport={false}
            className="static hidden lg:flex"
            delayDuration={100}
          >
            <NavigationMenuList className="gap-0.5">
              {mainNav.map((item) =>
                item.hasMegaMenu ? (
                  <NavigationMenuItem key={item.href} className="static">
                    <NavigationMenuTrigger
                      className={cn(
                        "text-[0.9375rem] font-medium text-ink",
                        isActive(item.href) && "text-brand"
                      )}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="start-0 top-full w-full rounded-none border-t border-border bg-popover p-0 shadow-lg group-data-[viewport=false]/navigation-menu:mt-0 group-data-[viewport=false]/navigation-menu:rounded-none md:w-full">
                      <MegaMenuPanel />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      asChild
                      active={isActive(item.href)}
                      className={cn(
                        "h-9 px-2.5 text-[0.9375rem] font-medium text-ink data-active:bg-transparent",
                        isActive(item.href) && "text-brand"
                      )}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-1">
            <SiteSearch />
            <Button asChild variant="brand" className="hidden h-10 px-4 sm:inline-flex">
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <MobileNav />
          </div>
        </Container>
      </div>
    </header>
  );
}
