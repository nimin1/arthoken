import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/content";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import RevealRoot from "@/components/ui/RevealRoot";

const grotesk = localFont({
  src: "../public/fonts/schibsted-grotesk-var.woff2",
  weight: "400 900",
  style: "normal",
  display: "swap",
  variable: "--font-grotesk",
  preload: true,
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

const plexMono = localFont({
  src: [
    { path: "../public/fonts/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-plex-mono",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.titleSuffix}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} · ${site.titleSuffix}`,
    description: site.description,
    url: site.url,
    images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.titleSuffix}`,
    description: site.description,
    images: ["/brand/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1215" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${plexMono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealRoot />
      </body>
    </html>
  );
}
