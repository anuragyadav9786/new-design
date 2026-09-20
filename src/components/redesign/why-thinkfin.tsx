"use client";

import { useRef } from "react";
import { Target, ShieldAlert, BarChart3, Users } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const reasons = [
  { icon: Target, title: "Goal First", description: "We begin with what you’re trying to achieve." },
  {
    icon: ShieldAlert,
    title: "Risk Aware",
    description: "Your investment approach should reflect your ability and willingness to take risk.",
  },
  {
    icon: BarChart3,
    title: "Data Guided",
    description: "Investment decisions should be supported by relevant data and analysis.",
  },
  {
    icon: Users,
    title: "Human Support",
    description: "Technology helps simplify the process. A human helps you navigate important decisions.",
  },
];

export default function WhyThinkFin() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.2 });

  return (
    <section ref={ref} className="w-full bg-white py-[100px] sm:py-[140px]">
      <div className="mx-auto max-w-[1280px] px-[5vw]">
        <h2
          className="mx-auto max-w-3xl text-center text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-tight text-[var(--tf-navy)] transition-all duration-700 ease-[var(--tf-ease)]"
          style={{
            opacity: isIntersecting ? 1 : 0,
            transform: isIntersecting ? "translateY(0)" : "translateY(16px)",
          }}
        >
          Why investors choose a goal-first approach
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="rounded-[var(--tf-radius-lg)] border border-[var(--tf-border)] bg-white p-7 transition-all duration-700 ease-[var(--tf-ease)]"
                style={{
                  transitionDelay: isIntersecting ? `${i * 100}ms` : "0ms",
                  opacity: isIntersecting ? 1 : 0,
                  transform: isIntersecting ? "translateY(0)" : "translateY(16px)",
                }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[var(--tf-radius-xs)] bg-[var(--tf-bg-soft)] text-[var(--tf-blue)]">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-base font-bold text-[var(--tf-navy)]">{reason.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--tf-text-secondary)]">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
