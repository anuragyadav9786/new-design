"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const investors = [
  { label: "Investor A", age: 28, goal: "₹1 Crore", time: "10 years", risk: "High", result: "Equity-oriented approach" },
  { label: "Investor B", age: 38, goal: "Child's education", time: "12 years", risk: "Moderate", result: "Diversified growth approach" },
  { label: "Investor C", age: 52, goal: "Retirement", time: "8 years", risk: "Moderate/Lower", result: "More balanced approach" },
];

export default function Personalization() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.15 });

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
          There&apos;s no one-size-fits-all investment plan.
        </h2>
        <p
          className="mx-auto mt-4 max-w-lg text-center text-[15px] leading-relaxed text-[var(--tf-text-secondary)] transition-all duration-700 ease-[var(--tf-ease)]"
          style={{
            opacity: isIntersecting ? 1 : 0,
            transform: isIntersecting ? "translateY(0)" : "translateY(16px)",
          }}
        >
          The same goal, at a different age, time horizon or risk comfort, can lead to a very different approach.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {investors.map((investor, i) => (
            <div
              key={investor.label}
              className="rounded-[var(--tf-radius-lg)] border border-[var(--tf-border)] bg-white p-7 transition-all duration-700 ease-[var(--tf-ease)]"
              style={{
                transitionDelay: isIntersecting ? `${i * 100}ms` : "0ms",
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <p className="text-sm font-semibold text-[var(--tf-blue)]">{investor.label}</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[var(--tf-text-secondary)]">Age</dt>
                  <dd className="font-medium text-[var(--tf-navy)]">{investor.age}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--tf-text-secondary)]">Goal</dt>
                  <dd className="font-medium text-[var(--tf-navy)]">{investor.goal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--tf-text-secondary)]">Time</dt>
                  <dd className="font-medium text-[var(--tf-navy)]">{investor.time}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--tf-text-secondary)]">Risk</dt>
                  <dd className="font-medium text-[var(--tf-navy)]">{investor.risk}</dd>
                </div>
              </dl>
              <div className="mt-5 rounded-[var(--tf-radius-xs)] bg-[var(--tf-bg-soft)] px-4 py-3 text-center text-sm font-semibold text-[var(--tf-blue)]">
                {investor.result}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[var(--tf-text-secondary)]">
          Illustrative examples only &mdash; not personalised advice. Take the assessment above for an approach
          based on your own goal and situation.
        </p>
      </div>
    </section>
  );
}
