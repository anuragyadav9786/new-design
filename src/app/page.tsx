import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RedesignStyles from "@/components/redesign/redesign-styles";
import RedesignHeader from "@/components/redesign/redesign-header";
import RedesignHero from "@/components/redesign/hero";
import TrustBar from "@/components/redesign/trust-bar";
import RegulatoryTrustStrip from "@/components/redesign/regulatory-trust-strip";
import GoalSegmentSwitcher from "@/components/redesign/goal-segment-switcher";
import HowItWorks from "@/components/redesign/how-it-works";
import AssessmentSection from "@/components/redesign/assessment-section";
import Personalization from "@/components/redesign/personalization";
import Team from "@/components/landing/team";
import BentoValueProps from "@/components/redesign/bento-value-props";
import ProductShowcase from "@/components/redesign/product-showcase";
import Ecosystem from "@/components/redesign/ecosystem";
import RedesignTestimonials from "@/components/redesign/testimonials";
import Insights from "@/components/redesign/insights";
import RedesignFaq from "@/components/redesign/faq";
import FinalCta from "@/components/redesign/final-cta";
import RedesignFooter from "@/components/redesign/redesign-footer";
import StickyMobileCta from "@/components/redesign/sticky-mobile-cta";

// Self-hosted via next/font instead of a render-blocking Google Fonts
// <link> — the hero H1 is this page's LCP element, so this directly
// improves LCP/CLS rather than just being a nicety.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ThinkFin | Goal-Based Investment Planning",
  description:
    "Plan your investments around your financial goals, timeline and risk profile with ThinkFin. Start a free investment assessment.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ThinkFin | Goal-Based Investment Planning",
    description:
      "Plan your investments around your financial goals, timeline and risk profile with ThinkFin. Start a free investment assessment.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThinkFin | Goal-Based Investment Planning",
    description:
      "Plan your investments around your financial goals, timeline and risk profile with ThinkFin. Start a free investment assessment.",
  },
};

export default function Home() {
  return (
    <div className={`redesign-root bg-[var(--tf-bg)] ${inter.variable}`}>
      <RedesignStyles />

      <RedesignHeader />
      <main>
        <RedesignHero />
        <TrustBar />
        <RegulatoryTrustStrip />
        <GoalSegmentSwitcher />
        <HowItWorks />
        <AssessmentSection />
        <Personalization />
        <Team />
        <BentoValueProps />
        <ProductShowcase />
        <Ecosystem />
        <RedesignTestimonials />
        <Insights />
        <RedesignFaq />
        <FinalCta />
      </main>
      <RedesignFooter />
      <StickyMobileCta />
    </div>
  );
}
