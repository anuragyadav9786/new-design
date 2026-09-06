"use client";

import { useRef } from "react";
import Link from "next/link";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { goalPortfolios } from "@/components/landing/goal-portfolios";
import { goalVisuals } from "@/components/redesign/data";
import { constants } from "@/components/common/constants";

const ALLOCATION_COLORS = ["bg-white", "bg-[var(--tf-blue-tint)]", "bg-white/30"];

export default function GoalGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <section ref={ref} className="w-full bg-[var(--tf-bg)] py-[100px] sm:py-[140px]">
      <div className="mx-auto max-w-[1280px] px-[5vw]">
        <h2
          className="mx-auto max-w-2xl text-center text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-tight text-[var(--tf-navy)] transition-all duration-700 ease-[var(--tf-ease)]"
          style={{
            opacity: isIntersecting ? 1 : 0,
            transform: isIntersecting ? "translateY(0)" : "translateY(16px)",
          }}
        >
          What are you investing for?
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {goalPortfolios.map((goal, i) => {
            const Icon = goal.icon;
            const visual = goalVisuals[goal.id];
            return (
              <Link
                key={goal.id}
                href={`${constants.advisorAppLink}?goal=${goal.id}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-[var(--tf-radius-md)] transition-[opacity,transform] duration-700 ease-[var(--tf-ease)]"
                style={{
                  transitionDelay: isIntersecting ? `${i * 70}ms` : "0ms",
                  opacity: isIntersecting ? 1 : 0,
                  transform: isIntersecting ? "translateY(0)" : "translateY(16px)",
                }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 ease-[var(--tf-ease)] group-hover:scale-110"
                  style={{ background: visual.gradient }}
                />
                <div className="absolute inset-0 bg-[var(--tf-navy)]/0 transition-colors duration-300 group-hover:bg-[var(--tf-navy)]/40" />
                <Icon
                  className="absolute right-3 top-3 h-6 w-6 text-white/80 transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={1.5}
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-sm font-bold text-white sm:text-base">{goal.name}</h3>

                  <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-[140px] group-hover:opacity-100">
                    <p className="text-[11px] leading-snug text-white/75 line-clamp-1">{visual.tagline}</p>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold text-[var(--tf-blue-tint)]">{goal.target}</p>
                      <p className="shrink-0 text-[9px] font-medium uppercase tracking-wide text-white/60">
                        {goal.horizon}
                      </p>
                    </div>

                    <div className="mt-2 flex h-1 w-full overflow-hidden rounded-full bg-white/15">
                      {goal.allocation.map((slice, i) => (
                        <div
                          key={slice.label}
                          className={ALLOCATION_COLORS[i % ALLOCATION_COLORS.length]}
                          style={{ width: `${slice.pct}%` }}
                          title={`${slice.label} ${slice.pct}%`}
                        />
                      ))}
                    </div>
                    <p className="mt-1 flex flex-wrap gap-x-1.5 text-[9px] text-white/60">
                      {goal.allocation.map((slice) => (
                        <span key={slice.label}>
                          {slice.label} {slice.pct}%
                        </span>
                      ))}
                    </p>

                    <p className="mt-2 truncate text-[10px] text-white/70">
                      <span className="text-white/45">Top pick </span>
                      {goal.topFund}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-white">
                      Start plan
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
