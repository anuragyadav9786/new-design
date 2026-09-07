"use client";

import { useEffect, useState } from "react";
import { constants } from "@/components/common/constants";
import GoalCarousel from "@/components/redesign/goal-carousel";

export default function RedesignHero() {
  const [showMutualFundsEyebrow, setShowMutualFundsEyebrow] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowMutualFundsEyebrow(true);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  const scrollToProcess = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[90vh] w-full flex-col justify-center overflow-hidden bg-[var(--tf-bg)] py-20 lg:min-h-[clamp(560px,88vh,880px)] lg:py-[clamp(24px,5vh,80px)]">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-16 px-[5vw] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="animate-fade-up">
          <div className="relative h-7 overflow-hidden">
            <span
              className={`absolute left-0 top-0 inline-block rounded-full bg-[var(--tf-bg-soft)] px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-[var(--tf-blue)] transition-all duration-300 motion-reduce:transition-none ${
                showMutualFundsEyebrow
                  ? "-translate-y-full opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              INVEST WITH PURPOSE
            </span>

            <span
              className={`absolute left-0 top-0 inline-block rounded-full bg-[var(--tf-bg-soft)] px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-[var(--tf-blue)] transition-all duration-300 motion-reduce:transition-none ${
                showMutualFundsEyebrow
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              INVEST IN MUTUAL FUNDS
            </span>
          </div>

          <h1 className="mt-6 font-sans text-[clamp(48px,6vw,88px)] font-bold leading-[1.05] tracking-tight text-[var(--tf-navy)] lg:mt-4 lg:text-[clamp(36px,3vw+2.2vh,80px)]">
            Your Goals.
            <br />
            Your Money.
            <br />
            Your Future.
          </h1>

          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[var(--tf-text-secondary)] lg:mt-4">
            Every investment begins with a reason. Whether you&apos;re building wealth, buying your
            dream home, securing your family&apos;s future, or planning your retirement — start with
            a goal.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 lg:mt-6">
            <a
              href={constants.advisorAppLink}
              className="group inline-flex items-center gap-2 rounded-[var(--tf-radius-btn)] bg-[var(--tf-blue)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_40px_rgba(var(--tf-blue-rgb),0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--tf-blue-hover)]"
            >
              Explore Your Investment Plan
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>

            <button
              type="button"
              onClick={scrollToProcess}
              className="inline-flex items-center gap-2 rounded-[var(--tf-radius-btn)] px-5 py-4 text-[15px] font-semibold text-[var(--tf-navy)] transition-colors duration-200 hover:text-[var(--tf-blue)]"
            >
              How ThinkFin Works
              <span>↓</span>
            </button>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <GoalCarousel />
        </div>
      </div>
    </section>
  );
}
