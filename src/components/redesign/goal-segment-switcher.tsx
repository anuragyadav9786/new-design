"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { goalPortfolios } from "@/components/landing/goal-portfolios";
import { constants } from "@/components/common/constants";
import { trackEvent } from "@/lib/analytics";
import { estimateRequiredMonthlySip, formatInr, goalDefaults } from "@/components/redesign/assessment-math";

type GoalId = "retirement" | "education" | "wealth" | "house" | "emergency";

const ALLOCATION_COLORS = ["bg-[var(--tf-blue)]", "bg-[var(--tf-blue-tint)]", "bg-[var(--tf-navy)]"];

export default function GoalSegmentSwitcher() {
  const [activeGoal, setActiveGoal] = useState<GoalId>("retirement");
  const [targetOverride, setTargetOverride] = useState(goalDefaults.retirement.targetAmount);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const goal = goalPortfolios.find((g) => g.id === activeGoal) ?? goalPortfolios[0];
  const defaults = goalDefaults[activeGoal];
  const monthlySip = estimateRequiredMonthlySip(targetOverride, defaults.years, "moderate");

  useEffect(() => {
    setTargetOverride(goalDefaults[activeGoal].targetAmount);
  }, [activeGoal]);

  const selectGoal = (id: GoalId) => {
    setActiveGoal(id);
    trackEvent("goal_card_clicked", { goal_id: id, source: "goal_segment_switcher" });
  };

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const ids = goalPortfolios.map((g) => g.id as GoalId);
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % ids.length;
    else if (e.key === "ArrowLeft") nextIndex = (index - 1 + ids.length) % ids.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = ids.length - 1;

    if (nextIndex !== null) {
      e.preventDefault();
      const nextId = ids[nextIndex];
      selectGoal(nextId);
      tabRefs.current[nextId]?.focus();
    }
  };

  return (
    <section className="w-full bg-white py-[100px] sm:py-[140px]">
      <div className="mx-auto max-w-[1280px] px-[5vw]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-tight text-[var(--tf-navy)]">
            See your plan, by goal.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--tf-text-secondary)]">
            Switch between goals to see how the approach &mdash; and what it could take &mdash; changes.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Investment goals"
          className="mx-auto mt-10 flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl bg-[var(--tf-bg-soft)] p-1.5 sm:max-w-fit"
        >
          {goalPortfolios.map((g, index) => {
            const isActive = g.id === activeGoal;
            return (
              <button
                key={g.id}
                ref={(el) => {
                  tabRefs.current[g.id] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${g.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectGoal(g.id as GoalId)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[var(--tf-navy)] shadow-sm"
                    : "text-[var(--tf-text-secondary)] hover:text-[var(--tf-navy)]"
                }`}
              >
                {g.name}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${goal.id}`}
          aria-labelledby={`tab-${goal.id}`}
          className="mt-10 grid grid-cols-1 gap-8 rounded-[var(--tf-radius-lg)] border border-[var(--tf-border)] p-6 sm:p-10 lg:grid-cols-2 lg:gap-12"
        >
          {/* Left: strategy & breakdown */}
          <div>
            <h3 className="text-2xl font-bold text-[var(--tf-navy)]">{goal.name}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--tf-text-secondary)]">{goal.blurb}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--tf-bg-soft)] px-3.5 py-1.5 text-sm font-semibold text-[var(--tf-navy)]">
                {formatInr(defaults.targetAmount)} target
              </span>
              <span className="rounded-full border border-[var(--tf-border)] px-3.5 py-1.5 text-xs font-medium uppercase tracking-wide text-[var(--tf-text-secondary)]">
                {goal.horizon}
              </span>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-[var(--tf-text)]">Suggested asset allocation</p>
              <div className="mt-2 flex h-3 w-full overflow-hidden rounded-full bg-[var(--tf-bg-soft)]">
                {goal.allocation.map((slice, i) => (
                  <div
                    key={slice.label}
                    className={ALLOCATION_COLORS[i % ALLOCATION_COLORS.length]}
                    style={{ width: `${slice.pct}%` }}
                    title={`${slice.label} ${slice.pct}%`}
                  />
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--tf-text-secondary)]">
                {goal.allocation.map((slice, i) => (
                  <span key={slice.label} className="inline-flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${ALLOCATION_COLORS[i % ALLOCATION_COLORS.length]}`} />
                    {slice.label} {slice.pct}%
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--tf-border)] bg-[var(--tf-bg)] px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--tf-text-secondary)]">
                Benchmark Category
              </span>
              <span className="text-sm font-semibold text-[var(--tf-navy)]">{goal.topFund}</span>
            </div>

            <Link
              href={`${constants.advisorAppLink}?goal=${goal.id}`}
              onClick={() => trackEvent("advisor_contact_clicked", { source: "goal_segment_switcher", goal_id: goal.id })}
              className="group mt-8 inline-flex items-center gap-2 rounded-[var(--tf-radius-btn)] bg-[var(--tf-blue)] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_rgba(var(--tf-blue-rgb),0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--tf-blue-hover)]"
            >
              {goal.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Right: mini calculator / scenario preview */}
          <div className="rounded-[var(--tf-radius-md)] bg-[var(--tf-bg-soft)] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--tf-blue)]">Quick Scenario Preview</p>
            <div className="mt-5 rounded-2xl bg-white p-6 text-center shadow-[0_10px_30px_rgba(var(--tf-navy-rgb),0.06)]">
              <p className="text-xs text-[var(--tf-text-secondary)]">Estimated monthly investment</p>
              <p className="mt-1 text-4xl font-bold text-[var(--tf-blue)]">
                {formatInr(monthlySip)}
                <span className="text-lg font-medium text-[var(--tf-text-secondary)]">*</span>
              </p>
              <p className="mt-1 text-xs text-[var(--tf-text-secondary)]">over {defaults.years} years</p>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label htmlFor="target-corpus-slider" className="text-xs font-semibold uppercase tracking-wide text-[var(--tf-text-secondary)]">
                  Adjust Target Corpus
                </label>
                <span className="text-sm font-semibold text-[var(--tf-navy)]">{formatInr(targetOverride)}</span>
              </div>
              <input
                id="target-corpus-slider"
                type="range"
                min={100000}
                max={50000000}
                step={50000}
                value={targetOverride}
                onChange={(e) => setTargetOverride(Number(e.target.value))}
                className="mt-3 h-2.5 w-full cursor-pointer accent-[var(--tf-blue)]"
              />
            </div>

            <p className="mt-6 text-[11px] leading-relaxed text-[var(--tf-text-secondary)]">
              *Illustrative estimate only, assuming a moderate risk profile. Not a guarantee of returns. For a
              plan based on your own risk comfort, take the full assessment above.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
