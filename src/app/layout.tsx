import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import TopLoader from "@/components/common/top-loader";
import LeadCaptureModal from "@/components/landing/lead-capture-modal";
import WhatsAppButton from "@/components/common/whatsapp-button";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { organizationJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: "%s | ThinkFin",
  },
  description: "Your Path to Financial Freedom Starts Here.",
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <Suspense fallback={null}>
          <TopLoader />
        </Suspense>
        {children}
        <Toaster />
        <LeadCaptureModal />
        <WhatsAppButton />
      </body>
    </html>
  );
}
