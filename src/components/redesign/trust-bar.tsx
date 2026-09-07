"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCountUp } from "@/hooks/use-count-up";
import { trustStats } from "@/features/marketing/content";

function StatTile({ stat, isActive }: { stat: (typeof trustStats)[number]; isActive: boolean }) {
  const count = useCountUp(stat.value, isActive && !stat.isText);
  const display = stat.isText ? stat.textValue : `${stat.prefix}${Math.round(count)}${stat.suffix}`;

  return (
    <div className="flex flex-col items-center gap-1.5 px-6 text-center">
      <p className={`font-bold text-[var(--tf-navy)] ${stat.isText ? "text-lg sm:text-xl" : "text-3xl sm:text-4xl"}`}>
        {display}
      </p>
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--tf-text-secondary)] sm:text-sm">{stat.label}</p>
    </div>
  );
}

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.4 });

  return (
    <section ref={ref} className="w-full border-y border-[var(--tf-border)] bg-white py-10">
      <div
        className="mx-auto grid max-w-[1280px] grid-cols-2 gap-y-8 divide-[var(--tf-border)] px-[5vw] transition-all duration-700 ease-[var(--tf-ease)] sm:grid-cols-4 sm:divide-x"
        style={{
          opacity: isIntersecting ? 1 : 0,
          transform: isIntersecting ? "translateY(0)" : "translateY(12px)",
        }}
      >
        {trustStats.map((stat) => (
          <StatTile key={stat.label} stat={stat} isActive={isIntersecting} />
        ))}
      </div>
    </section>
  );
}
