import {
  Ecosystem,
  Faq,
  FinalCta,
  GoalGrid,
  Hero,
  HowItWorks,
  Insights,
  ProblemSolution,
  ProductShowcase,
  Footer,
  Header,
  Team,
  Testimonials,
  TrustBar,
  WhyThinkFin,
  RedesignStyles,
} from "@/components/marketing";
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
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <HowItWorks />
        <ProductShowcase />
        <Ecosystem />
        <WhyThinkFin />
        <Team />
        <GoalGrid />
        <Testimonials />
        <Insights />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
