/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import TopLoader from "@/components/common/top-loader";
import LeadCaptureModal from "@/components/landing/lead-capture-modal";
import WhatsAppButton from "@/components/common/whatsapp-button";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://thinkfinfinance.com"),
  title: {
    default: "ThinkFin",
    template: "%s | ThinkFin",
  },
  description: "Your Path to Financial Freedom Starts Here.",
  openGraph: {
    siteName: "ThinkFin",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "ThinkFin",
  legalName: "ThinkFin Finserve",
  alternateName: "ThinkFin Finserve",
  description: "Goal-based mutual fund investing, insurance, and financial planning.",
  url: "https://thinkfinfinance.com",
  logo: "https://thinkfinfinance.com/icon/icon.png",
  image: "https://thinkfinfinance.com/icon/icon.png",
  telephone: "+91-7503080522",
  email: "info@thinkfinfinance.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Altf Coworking, A-100, Sector 58",
    addressLocality: "Noida",
    postalCode: "201301",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  identifier: {
    "@type": "PropertyValue",
    name: "AMFI ARN",
    value: "ARN-309973",
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
        <link rel="preconnect" href="https://fonts.googleapis.com"  />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
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
