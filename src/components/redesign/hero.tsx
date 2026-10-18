"use client";

import { useEffect, useState } from "react";
import GoalCarousel from "@/components/redesign/goal-carousel";
import { trustStats, testimonials } from "@/components/redesign/data";
import { goalPortfolios, type GoalPortfolio } from "@/components/landing/goal-portfolios";
import { trackEvent } from "@/lib/analytics";

const EYEBROW_PHRASE = "GOAL-BASED MUTUAL FUND INVESTING";
const TYPING_SPEED_MS = 55;

const investorsStat = trustStats.find((s) => s.label === "Investors");
const corpusStat = trustStats.find((s) => s.label === "Investments Facilitated");
const trustLine =
  investorsStat && corpusStat
    ? `${investorsStat.prefix}${investorsStat.value}${investorsStat.suffix} investors · ${corpusStat.prefix}${corpusStat.value}${corpusStat.suffix} facilitated`
    : null;

const featuredTestimonial = testimonials[0];
// A hand-picked excerpt (the resolution half of the real quote, not an
// auto-truncation) — splitting the full quote programmatically tends to
// surface the "problem" sentence rather than the reassuring outcome.
const featuredExcerpt = "ThinkFin provided a clear roadmap to invest my hard-earned money safely while ensuring long-term growth.";

export default function RedesignHero() {
  const [displayedText, setDisplayedText] = useState("");
  const [activeGoal, setActiveGoal] = useState<GoalPortfolio>(goalPortfolios[0]);

  // Types the eyebrow phrase once on mount and settles — no looping, no
  // deleting. A perpetually-animating element above the fold quietly
  // competes with the CTA for attention indefinitely; typing once still
  // draws the eye without becoming background noise.
  useEffect(() => {
    if (displayedText === EYEBROW_PHRASE) return undefined;
    const timer = window.setTimeout(() => {
      setDisplayedText(EYEBROW_PHRASE.slice(0, displayedText.length + 1));
    }, TYPING_SPEED_MS);
    return () => window.clearTimeout(timer);
  }, [displayedText]);

  const scrollToTrustBar = () => {
    trackEvent("how_it_works_clicked", { source: "hero" });
    document.getElementById("trust-bar")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMethodology = () => {
    trackEvent("how_it_works_clicked", { source: "hero_methodology_link" });
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePrimaryCta = () => {
    trackEvent("hero_cta_clicked", { cta: "build_my_investment_plan", source: "hero", goal_id: activeGoal.id });
  };

  const isTypingComplete = displayedText === EYEBROW_PHRASE;

  return (
    <section className="relative flex min-h-[90vh] w-full flex-col justify-center overflow-hidden bg-[var(--tf-bg)] py-20 lg:min-h-[clamp(560px,88vh,880px)] lg:py-[clamp(24px,5vh,80px)]">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-16 px-[5vw] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="animate-fade-up">
          <span className="inline-flex min-h-7 items-center rounded-full bg-[var(--tf-bg-soft)] px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-[var(--tf-blue)]">
            {displayedText}
            {!isTypingComplete && (
              <span
                aria-hidden="true"
                className="ml-0.5 inline-block h-3 w-px animate-pulse bg-current motion-reduce:animate-none"
              />
            )}
            <span className="sr-only">{EYEBROW_PHRASE}</span>
          </span>

          <h1 className="mt-6 font-sans text-[clamp(40px,6vw,72px)] font-bold leading-[1.08] tracking-tight text-[var(--tf-navy)] lg:mt-4 lg:text-[clamp(32px,3vw+2vh,68px)]">
            Invest for a goal.
            <br />
            Not just for a return.
          </h1>

          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[var(--tf-text-secondary)] lg:mt-4">
            Tell us your goal, timeline and risk comfort &mdash; get a mutual-fund investment approach built
            around it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6 lg:mt-6">
            <a
              id="hero-cta"
              href="#assessment"
              onClick={handlePrimaryCta}
              className="animate-cta-pulse group inline-flex items-center gap-2 rounded-[var(--tf-radius-btn)] bg-[var(--tf-blue)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_40px_rgba(var(--tf-blue-rgb),0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--tf-blue-hover)]"
            >
              Build My {activeGoal.name} Plan
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>

            <button
              type="button"
              onClick={scrollToMethodology}
              className="text-[15px] font-semibold text-[var(--tf-navy)] underline decoration-[var(--tf-border)] decoration-2 underline-offset-4 transition-colors duration-200 hover:text-[var(--tf-blue)] hover:decoration-[var(--tf-blue)]"
            >
              Explore Methodology
            </button>
          </div>

          <p className="mt-4 text-sm text-[var(--tf-text-secondary)]">
            Free assessment &bull; Takes about 3 minutes &bull; No obligation
          </p>
          {trustLine && <p className="mt-2 text-sm font-medium text-[var(--tf-navy)]/70">{trustLine}</p>}
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <a
            href="#hero-cta"
            className="sr-only focus:not-sr-only focus:absolute focus:z-20 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--tf-navy)] focus:shadow-lg"
          >
            Skip goal carousel
          </a>
          <div aria-live="polite" className="sr-only">
            Showing the {activeGoal.name} plan
          </div>

          <GoalCarousel onActiveChange={setActiveGoal} />

          {featuredTestimonial && (
            <p className="mx-auto mt-5 max-w-[420px] text-center text-[13px] italic leading-relaxed text-[var(--tf-text-secondary)]">
              &ldquo;{featuredExcerpt}&rdquo; &mdash; {featuredTestimonial.name}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTrustBar}
        aria-label="Scroll to explore more"
        className="animate-scroll-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center justify-center text-[var(--tf-text-secondary)] transition-colors duration-200 hover:text-[var(--tf-blue)] motion-reduce:animate-none sm:flex"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
