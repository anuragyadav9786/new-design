"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { constants } from "@/components/common/constants";
import AppStoreBadges from "@/components/redesign/app-store-badges";

export default function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-[120px] sm:py-[160px]"
      style={{ background: "linear-gradient(135deg, var(--tf-navy) 0%, #0F2A54 100%)" }}
    >
      <div
        className="mx-auto max-w-[1280px] px-[5vw] text-center transition-all duration-700"
        style={{
          opacity: isIntersecting ? 1 : 0,
          transform: isIntersecting ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <h2 className="mx-auto max-w-2xl text-[clamp(36px,4.5vw,64px)] font-bold leading-tight tracking-tight text-white">
          Your goals deserve a plan.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[17px] text-white/70">
          Take the first step by telling us what you&apos;re working towards.
        </p>
        <a
          href={constants.advisorAppLink}
          className="group mt-10 inline-flex items-center gap-2 rounded-[var(--tf-radius-btn)] bg-[var(--tf-blue)] px-8 py-4 text-[16px] font-semibold text-white shadow-[0_20px_50px_rgba(var(--tf-blue-rgb),0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--tf-blue-secondary)]"
        >
          Start Your Investment Journey
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </a>

        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-white/40">Prefer the app?</p>
          <AppStoreBadges className="justify-center" />
        </div>
      </div>
    </section>
  );
}
