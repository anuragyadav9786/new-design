import type { Metadata } from "next";
import RedesignStyles from "@/components/redesign/redesign-styles";
import RedesignHeader from "@/components/redesign/redesign-header";
import RedesignHero from "@/components/redesign/hero";
import TrustBar from "@/components/redesign/trust-bar";
import ProblemSolution from "@/components/redesign/problem-solution";
import HowItWorks from "@/components/redesign/how-it-works";
import AssessmentSection from "@/components/redesign/assessment-section";
import Personalization from "@/components/redesign/personalization";
import Team from "@/components/landing/team";
import WhyThinkFin from "@/components/redesign/why-thinkfin";
import ProductShowcase from "@/components/redesign/product-showcase";
import Ecosystem from "@/components/redesign/ecosystem";
import GoalGrid from "@/components/redesign/goal-grid";
import RedesignTestimonials from "@/components/redesign/testimonials";
import Insights from "@/components/redesign/insights";
import RedesignFaq from "@/components/redesign/faq";
import FinalCta from "@/components/redesign/final-cta";
import RedesignFooter from "@/components/redesign/redesign-footer";

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
    <div className="redesign-root bg-[var(--tf-bg)]">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <RedesignStyles />

      <RedesignHeader />
      <main>
        <RedesignHero />
        <TrustBar />
        <ProblemSolution />
        <HowItWorks />
        <AssessmentSection />
        <Personalization />
        <Team />
        <WhyThinkFin />
        <ProductShowcase />
        <Ecosystem />
        <GoalGrid />
        <RedesignTestimonials />
        <Insights />
        <RedesignFaq />
        <FinalCta />
      </main>
      <RedesignFooter />
    </div>
  );
}
