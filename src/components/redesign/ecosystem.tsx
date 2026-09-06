"use client";

import { useRef } from "react";
import { TrendingUp, ShieldCheck, Compass } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ecosystemPillars } from "@/components/redesign/data";

const icons: Record<string, typeof TrendingUp> = {
  invest: TrendingUp,
  protect: ShieldCheck,
  plan: Compass,
};

export default function Ecosystem() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.15 });

  return (
    <section id="ecosystem" ref={ref} className="w-full bg-[var(--tf-bg)] py-[100px] sm:py-[140px]">
      <div className="mx-auto max-w-[1280px] px-[5vw]">
        <h2 className="mx-auto max-w-2xl text-center text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-tight text-[var(--tf-navy)]">
          Everything your financial life needs.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ecosystemPillars.map((pillar, i) => {
            const Icon = icons[pillar.key];
            return (
              <div
                key={pillar.key}
                className="group relative overflow-hidden rounded-[var(--tf-radius-lg)] border border-[var(--tf-border)] bg-white p-8 transition-all duration-300 ease-[var(--tf-ease)] hover:-translate-y-1.5 hover:border-[var(--tf-blue)]/30 hover:shadow-[0_20px_60px_rgba(var(--tf-navy-rgb),0.1)]"
                style={{
                  transitionDelay: isIntersecting ? `${i * 100}ms` : "0ms",
                  opacity: isIntersecting ? 1 : 0,
                  transform: isIntersecting ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div className="absolute inset-0 -z-10 bg-[var(--tf-bg-soft)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex h-12 w-12 items-center justify-center rounded-[var(--tf-radius-btn)] bg-[var(--tf-bg-soft)] text-[var(--tf-blue)]">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-[var(--tf-navy)]">{pillar.title}</h3>
                <p className="mt-2 text-[15px] font-medium text-[var(--tf-text-secondary)]">{pillar.tagline}</p>
                <p className="mt-4 max-h-0 overflow-hidden text-sm leading-relaxed text-[var(--tf-text-secondary)] opacity-0 transition-all duration-300 group-hover:mt-4 group-hover:max-h-20 group-hover:opacity-100">
                  {pillar.detail}
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-[var(--tf-blue)]">
                  Learn more
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
