"use client";

import { useEffect, useState } from "react";
import GoalCarousel from "@/components/redesign/goal-carousel";
import { trackEvent } from "@/lib/analytics";

const eyebrowPhrases = ["INVEST WITH PURPOSE", "INVEST FOR YOUR GOALS"];
const typingSpeed = 85;
const deletingSpeed = 45;
const pauseAfterTyping = 2200;
const pauseAfterDeleting = 450;

export default function RedesignHero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = eyebrowPhrases[phraseIndex];
    const isComplete = displayedText === currentPhrase;
    const isEmpty = displayedText.length === 0;

    const delay = isDeleting
      ? deletingSpeed
      : isComplete
        ? pauseAfterTyping
        : typingSpeed;

    const timer = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setPhraseIndex((currentIndex) => (currentIndex + 1) % eyebrowPhrases.length);
        return;
      }

      setDisplayedText((currentText) =>
        isDeleting
          ? currentText.slice(0, -1)
          : currentPhrase.slice(0, currentText.length + 1)
      );
    }, isDeleting && isEmpty ? pauseAfterDeleting : delay);

    return () => window.clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex]);

  const scrollToProcess = () => {
    trackEvent("how_it_works_clicked", { source: "hero" });
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePrimaryCta = () => {
    trackEvent("hero_cta_clicked", { cta: "get_my_investment_plan", source: "hero" });
  };

  return (
    <section className="relative flex min-h-[90vh] w-full flex-col justify-center overflow-hidden bg-[var(--tf-bg)] py-20 lg:min-h-[clamp(560px,88vh,880px)] lg:py-[clamp(24px,5vh,80px)]">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-16 px-[5vw] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="animate-fade-up">
          <span className="inline-flex min-h-7 items-center rounded-full bg-[var(--tf-bg-soft)] px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-[var(--tf-blue)]">
            {displayedText}
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block h-3 w-px animate-pulse bg-current motion-reduce:animate-none"
            />
            <span className="sr-only">{eyebrowPhrases[phraseIndex]}</span>
          </span>

          <h1 className="mt-6 font-sans text-[clamp(40px,6vw,72px)] font-bold leading-[1.08] tracking-tight text-[var(--tf-navy)] lg:mt-4 lg:text-[clamp(32px,3vw+2vh,68px)]">
            Invest for a goal.
            <br />
            Not just for a return.
          </h1>

          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[var(--tf-text-secondary)] lg:mt-4">
            Whether it&apos;s your first ₹1 Crore, your child&apos;s education, your retirement or your next big
            milestone — tell us your goal, timeline and risk comfort, and get a clear investment approach built
            around it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 lg:mt-6">
            <a
              href="#assessment"
              onClick={handlePrimaryCta}
              className="group inline-flex items-center gap-2 rounded-[var(--tf-radius-btn)] bg-[var(--tf-blue)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_40px_rgba(var(--tf-blue-rgb),0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--tf-blue-hover)]"
            >
              Get My Investment Plan
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>

            <button
              type="button"
              onClick={scrollToProcess}
              className="inline-flex items-center gap-2 rounded-[var(--tf-radius-btn)] px-5 py-4 text-[15px] font-semibold text-[var(--tf-navy)] transition-colors duration-200 hover:text-[var(--tf-blue)]"
            >
              See How It Works
              <span>↓</span>
            </button>
          </div>

          <p className="mt-4 text-sm text-[var(--tf-text-secondary)]">
            Free assessment &bull; Takes about 3 minutes &bull; No obligation
          </p>
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <GoalCarousel />
        </div>
      </div>
    </section>
  );
}
