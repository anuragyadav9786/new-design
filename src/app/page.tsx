import RedesignStyles from "@/components/redesign/redesign-styles";
import RedesignHeader from "@/components/redesign/redesign-header";
import RedesignHero from "@/components/redesign/hero";
import TrustBar from "@/components/redesign/trust-bar";
import ProblemSolution from "@/components/redesign/problem-solution";
import HowItWorks from "@/components/redesign/how-it-works";
import ProductShowcase from "@/components/redesign/product-showcase";
import Ecosystem from "@/components/redesign/ecosystem";
import WhyThinkFin from "@/components/redesign/why-thinkfin";
import Team from "@/components/landing/team";
import GoalGrid from "@/components/redesign/goal-grid";
import RedesignTestimonials from "@/components/redesign/testimonials";
import Insights from "@/components/redesign/insights";
import RedesignFaq from "@/components/redesign/faq";
import FinalCta from "@/components/redesign/final-cta";
import RedesignFooter from "@/components/redesign/redesign-footer";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "ThinkFin — Invest With Purpose",
  description:
    "Your goals. Your money. Your future. A modern, goal-based way to start investing with ThinkFin.",
});

export default function Home() {
  return (
    <div className="redesign-root bg-[var(--tf-bg)]">
      <RedesignStyles />

      <RedesignHeader />
      <main>
        <RedesignHero />
        <TrustBar />
        <ProblemSolution />
        <HowItWorks />
        <ProductShowcase />
        <Ecosystem />
        <WhyThinkFin />
        <Team />
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
