"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { X, Check, ShieldCheck, ArrowRight, Landmark, Wallet, TrendingUp } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const withoutItems = ["Too many investment options", "No clear financial direction", "Difficulty understanding risk"];
const withItems = ["Start with your goals", "Understand your horizon", "Take a structured approach"];

const advisors = [
  { name: "Hony Lt OP Singh Yadav", role: "IRDAI Certified", image: "/our-team/om-prakash.jpg" },
  { name: "Anurag Singh", role: "AMFI ARN-309973", image: "/our-team/anurag-singh.jpg" },
];

function cardBaseClass(extra = "") {
  return `rounded-2xl border border-[var(--tf-border)] bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--tf-blue)]/30 hover:shadow-lg ${extra}`;
}

function GoalFirstCard() {
  return (
    <div
      className="md:col-span-2 lg:col-span-2 rounded-2xl border border-white/10 p-7 sm:p-8 text-white"
      style={{ background: "linear-gradient(135deg, var(--tf-navy) 0%, #0F2A54 100%)" }}
    >
      <h3 className="text-xl font-bold">Goal-First Architecture</h3>
      <p className="mt-1.5 text-sm text-white/60">
        Investing should not feel complicated. ThinkFin starts with your goal, not a product.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-white/5 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/40">Ad-Hoc Fund Chasing</p>
          <ul className="space-y-2.5">
            {withoutItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/50 line-through decoration-white/30">
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-[var(--tf-blue)]/15 p-5 ring-1 ring-[var(--tf-blue)]/30">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--tf-blue-tint)]">
            Structured Allocation
          </p>
          <ul className="space-y-2.5">
            {withItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm font-medium text-white">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--tf-blue)]">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function RiskCalibrationCard() {
  const [yearsToGoal, setYearsToGoal] = useState(15);
  const equityPct = Math.round(25 + ((yearsToGoal - 1) / 29) * 60);
  const debtPct = 100 - equityPct;

  return (
    <div className={cardBaseClass()}>
      <h3 className="text-base font-bold text-[var(--tf-navy)]">Zero Guesswork Risk Calibration</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--tf-text-secondary)]">
        As your goal nears, the approach automatically shifts from growth to capital preservation.
      </p>

      <div className="mt-6">
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-[var(--tf-bg-soft)]">
          <div className="bg-[var(--tf-blue)] transition-all duration-300" style={{ width: `${equityPct}%` }} />
          <div className="bg-[var(--tf-blue-tint)] transition-all duration-300" style={{ width: `${debtPct}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs text-[var(--tf-text-secondary)]">
          <span>Equity {equityPct}%</span>
          <span>Debt {debtPct}%</span>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="glide-path-slider" className="text-xs font-semibold uppercase tracking-wide text-[var(--tf-text-secondary)]">
          Years to goal: {yearsToGoal}
        </label>
        <input
          id="glide-path-slider"
          type="range"
          min={1}
          max={30}
          value={yearsToGoal}
          onChange={(e) => setYearsToGoal(Number(e.target.value))}
          className="mt-2 h-2 w-full cursor-pointer accent-[var(--tf-blue)]"
        />
      </div>
    </div>
  );
}

function HumanAdvisoryCard() {
  return (
    <div className={cardBaseClass()}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[var(--tf-navy)]">Certified Human Advisory</h3>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--tf-text-secondary)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Available
        </span>
      </div>
      <p className="mt-1.5 text-sm text-[var(--tf-text-secondary)]">Real people, available for a portfolio review.</p>

      <div className="mt-5 space-y-3">
        {advisors.map((advisor) => (
          <div key={advisor.name} className="flex items-center gap-3">
            <Image
              src={advisor.image}
              alt={advisor.name}
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--tf-navy)]">{advisor.name}</p>
              <p className="text-xs text-[var(--tf-text-secondary)]">{advisor.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DirectRoutingCard() {
  const steps = [
    { icon: Wallet, label: "You" },
    { icon: Landmark, label: "BSE StAR MF / NSE NMF II" },
    { icon: TrendingUp, label: "Your AMC" },
  ];

  return (
    <div className={`md:col-span-2 lg:col-span-2 lg:col-start-2 ${cardBaseClass()}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[var(--tf-navy)]">SEBI Regulated &amp; Direct Routing</h3>
          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[var(--tf-text-secondary)]">
            Your money routes directly to the fund house through SEBI-regulated exchange platforms &mdash; ThinkFin
            never takes custody of your funds.
          </p>
        </div>
        <ShieldCheck className="h-8 w-8 shrink-0 text-[var(--tf-blue)]" strokeWidth={1.5} />
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 sm:gap-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-center gap-2 sm:gap-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--tf-bg-soft)] text-[var(--tf-blue)]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <span className="max-w-[90px] text-[11px] font-medium leading-tight text-[var(--tf-text-secondary)]">
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-[var(--tf-border)]" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BentoValueProps() {
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
          Why investors choose a goal-first approach
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          <GoalFirstCard />
          <RiskCalibrationCard />
          <HumanAdvisoryCard />
          <DirectRoutingCard />
        </div>
      </div>
    </section>
  );
}
