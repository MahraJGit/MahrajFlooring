import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";

import { HashScroll } from "@/components/layout/hash-scroll";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { site } from "@/content/site";
import { getServiceMegaMenu } from "@/lib/public/services";
import "../globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Technical Flooring Solutions Across the GCC`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  verification: {
    google: "rpZe9p8eXf-WBOV9TtiPUPUp6V2aaA4HLqiwuRI7W98",
    other: {
      "msvalidate.01": "45C278E00A6B3DFA26DDE4D4998E6EDB",
    },
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const megaMenu = await getServiceMegaMenu();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-background text-body"
        suppressHydrationWarning
      >
        <HashScroll />
        <SiteHeader megaMenu={megaMenu} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppButton />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "yuvsc8u72z");`}
        </Script>
      </body>
    </html>
  );
}
