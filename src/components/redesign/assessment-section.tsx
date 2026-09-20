"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { goalPortfolios } from "@/components/landing/goal-portfolios";
import { constants } from "@/components/common/constants";
import { captureLead } from "@/app/actions/capture-lead";
import { trackEvent } from "@/lib/analytics";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import {
  RISK_PROFILES,
  estimateRequiredMonthlySip,
  formatInr,
  goalDefaults,
  type RiskKey,
} from "@/components/redesign/assessment-math";

const RISK_OPTIONS: { key: RiskKey; label: string; description: string }[] = [
  { key: "low", label: "Lower Risk", description: "I prefer stability, even if growth is slower." },
  { key: "moderate", label: "Moderate Risk", description: "I’m comfortable with some ups and downs for better growth." },
  { key: "high", label: "Higher Risk", description: "I can stay invested through volatility for long-term growth." },
];

type Stage = "intro" | "goal" | "target" | "horizon" | "risk" | "result" | "done";
const QUESTION_STAGES: Stage[] = ["goal", "target", "horizon", "risk"];

export default function AssessmentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const [stage, setStage] = useState<Stage>("intro");
  const [goalId, setGoalId] = useState<string | null>(null);
  const [target, setTarget] = useState(1000000);
  const [years, setYears] = useState(10);
  const [risk, setRisk] = useState<RiskKey | null>(null);
  const [lead, setLead] = useState({ name: "", email: "" });
  const [leadError, setLeadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasFiredStart = useRef(false);
  const hasFiredCompleted = useRef(false);
  const hasFiredLeadStart = useRef(false);

  const selectedGoal = goalPortfolios.find((g) => g.id === goalId);
  const stageIndex = QUESTION_STAGES.indexOf(stage);

  const startAssessment = () => {
    trackEvent("assessment_started");
    setStage("goal");
  };

  const selectGoal = (id: string) => {
    trackEvent("assessment_goal_selected", { goal_id: id });
    setGoalId(id);
    const defaults = goalDefaults[id];
    if (defaults) {
      setTarget(defaults.targetAmount);
      setYears(defaults.years);
    }
    setStage("target");
  };

  const goBack = () => {
    const prevIndex = stageIndex - 1;
    setStage(prevIndex >= 0 ? QUESTION_STAGES[prevIndex] : "intro");
  };

  const goNext = () => {
    const nextIndex = stageIndex + 1;
    setStage(nextIndex < QUESTION_STAGES.length ? QUESTION_STAGES[nextIndex] : "result");
  };

  const selectRisk = (key: RiskKey) => {
    setRisk(key);
    setStage("result");
  };

  useEffect(() => {
    if (stage === "result" && !hasFiredCompleted.current) {
      hasFiredCompleted.current = true;
      trackEvent("assessment_completed", { goal_id: goalId, risk });
      trackEvent("investment_plan_viewed", { goal_id: goalId });
    }
  }, [stage, goalId, risk]);

  useEffect(() => {
    if (isIntersecting && !hasFiredStart.current && stage === "intro") {
      // Only marks the section as viewed; assessment_started still fires on
      // the explicit "Start" click below, not merely on scroll-into-view.
      hasFiredStart.current = true;
    }
  }, [isIntersecting, stage]);

  const riskProfile = risk ? RISK_PROFILES[risk] : null;
  const monthlyInvestment = risk ? estimateRequiredMonthlySip(target, years, risk) : 0;

  const handleLeadChange = (field: "name" | "email", value: string) => {
    if (!hasFiredLeadStart.current) {
      hasFiredLeadStart.current = true;
      trackEvent("lead_form_started", { goal_id: goalId });
    }
    setLead((prev) => ({ ...prev, [field]: value }));
    setLeadError(null);
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lead.name.trim().length < 2) {
      setLeadError("Please enter your name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(lead.email.trim())) {
      setLeadError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    trackEvent("lead_form_submitted", { goal_id: goalId, risk });

    try {
      await captureLead({
        name: lead.name,
        email: lead.email,
        goal: goalId ?? "unspecified",
        source: "assessment_section",
      });
    } catch (error) {
      console.error("Lead capture failed:", error);
    }

    setIsSubmitting(false);
    setStage("done");

    window.setTimeout(() => {
      const params = new URLSearchParams({ name: lead.name, email: lead.email });
      if (goalId) params.set("goal", goalId);
      params.set("horizon", String(years));
      if (risk) params.set("risk", risk);
      window.location.href = `${constants.advisorAppLink}?${params.toString()}`;
    }, 1800);
  };

  return (
    <section
      id="assessment"
      ref={sectionRef}
      className="w-full bg-white py-[100px] sm:py-[140px]"
    >
      <div className="mx-auto max-w-3xl px-[5vw]">
        {stage === "intro" && (
          <div
            className="mx-auto max-w-2xl text-center transition-all duration-700 ease-[var(--tf-ease)]"
            style={{
              opacity: isIntersecting ? 1 : 0,
              transform: isIntersecting ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--tf-bg-soft)] px-4 py-1.5 text-xs font-semibold tracking-[0.1em] text-[var(--tf-blue)]">
              <Sparkles className="h-3.5 w-3.5" /> FREE INVESTMENT ASSESSMENT
            </span>
            <h2 className="mt-6 text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-tight text-[var(--tf-navy)]">
              What could your investment plan look like?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-[var(--tf-text-secondary)]">
              Answer a few simple questions about your goal, timeline and risk preference. We&apos;ll help you
              understand the investment approach that may fit your situation.
            </p>
            <button
              type="button"
              onClick={startAssessment}
              className="group mt-8 inline-flex items-center gap-2 rounded-[var(--tf-radius-btn)] bg-[var(--tf-blue)] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_10px_40px_rgba(var(--tf-blue-rgb),0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--tf-blue-hover)]"
            >
              Start My Free Assessment
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <p className="mt-3 text-sm text-[var(--tf-text-secondary)]">3 minutes &bull; Free &bull; No obligation</p>
          </div>
        )}

        {stage !== "intro" && stage !== "done" && (
          <div className="mx-auto max-w-xl">
            {stage !== "result" && (
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--tf-bg-soft)]">
                  <div
                    className="h-full rounded-full bg-[var(--tf-blue)] transition-all duration-500 ease-out"
                    style={{ width: `${((stageIndex + 1) / QUESTION_STAGES.length) * 100}%` }}
                  />
                </div>
                <span className="shrink-0 text-xs font-medium text-[var(--tf-text-secondary)]">
                  Step {stageIndex + 1} of {QUESTION_STAGES.length}
                </span>
              </div>
            )}

            {stage === "goal" && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-[var(--tf-navy)] sm:text-2xl">What are you investing for?</h3>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {goalPortfolios.map((goal) => {
                    const Icon = goal.icon;
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => selectGoal(goal.id)}
                        className="flex items-center gap-3 rounded-[var(--tf-radius-sm)] border border-[var(--tf-border)] p-4 text-left transition-colors duration-200 hover:border-[var(--tf-blue)] hover:bg-[var(--tf-bg-soft)]"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--tf-radius-xs)] bg-[var(--tf-bg-soft)] text-[var(--tf-blue)]">
                          <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} />
                        </div>
                        <p className="text-sm font-semibold text-[var(--tf-navy)]">{goal.name}</p>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={goBack}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--tf-text-secondary)] transition-colors hover:text-[var(--tf-navy)]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </button>
              </div>
            )}

            {stage === "target" && selectedGoal && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-[var(--tf-navy)] sm:text-2xl">
                  What amount are you aiming for?
                </h3>
                <p className="mt-1.5 text-sm text-[var(--tf-text-secondary)]">Your goal: {selectedGoal.name}</p>
                <div className="mt-6 space-y-4">
                  <input
                    type="range"
                    min={100000}
                    max={50000000}
                    step={50000}
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                    className="h-3 w-full cursor-pointer accent-[var(--tf-blue)]"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[var(--tf-navy)]">{formatInr(target)}</span>
                    <span className="text-xs text-[var(--tf-text-secondary)]">Drag to adjust</span>
                  </div>
                  <button
                    type="button"
                    onClick={goNext}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[var(--tf-radius-btn)] bg-[var(--tf-blue)] py-4 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[var(--tf-blue-hover)]"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={goBack}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--tf-text-secondary)] transition-colors hover:text-[var(--tf-navy)]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </button>
              </div>
            )}

            {stage === "horizon" && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-[var(--tf-navy)] sm:text-2xl">Over how many years?</h3>
                <div className="mt-6 space-y-4">
                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="h-3 w-full cursor-pointer accent-[var(--tf-blue)]"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[var(--tf-navy)]">
                      {years} {years === 1 ? "Year" : "Years"}
                    </span>
                    <span className="text-xs text-[var(--tf-text-secondary)]">Drag to adjust</span>
                  </div>
                  <button
                    type="button"
                    onClick={goNext}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[var(--tf-radius-btn)] bg-[var(--tf-blue)] py-4 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[var(--tf-blue-hover)]"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={goBack}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--tf-text-secondary)] transition-colors hover:text-[var(--tf-navy)]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </button>
              </div>
            )}

            {stage === "risk" && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-[var(--tf-navy)] sm:text-2xl">
                  How do you feel about market ups and downs?
                </h3>
                <div className="mt-6 space-y-3">
                  {RISK_OPTIONS.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => selectRisk(option.key)}
                      className="flex w-full items-center justify-between rounded-[var(--tf-radius-sm)] border border-[var(--tf-border)] p-4 text-left transition-colors duration-200 hover:border-[var(--tf-blue)] hover:bg-[var(--tf-bg-soft)]"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[var(--tf-navy)]">{option.label}</p>
                        <p className="mt-0.5 text-xs text-[var(--tf-text-secondary)]">{option.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[var(--tf-border)]" />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={goBack}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--tf-text-secondary)] transition-colors hover:text-[var(--tf-navy)]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </button>
              </div>
            )}
          </div>
        )}

        {stage === "result" && selectedGoal && riskProfile && (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-[var(--tf-radius-lg)] border border-[var(--tf-bg-soft)] bg-[var(--tf-bg-soft)] p-6 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--tf-blue)]">
                Your Illustrative Plan
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-[var(--tf-text-secondary)]">Your Goal</p>
                  <p className="mt-1 text-base font-semibold text-[var(--tf-navy)]">{selectedGoal.name}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--tf-text-secondary)]">Time Horizon</p>
                  <p className="mt-1 text-base font-semibold text-[var(--tf-navy)]">{years} Years</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--tf-text-secondary)]">Risk Profile</p>
                  <p className="mt-1 text-base font-semibold text-[var(--tf-navy)]">{riskProfile.label}</p>
                </div>
              </div>

              <div className="mt-8 rounded-[var(--tf-radius-md)] bg-white p-6 text-center shadow-[0_10px_30px_rgba(var(--tf-navy-rgb),0.06)]">
                <p className="text-sm text-[var(--tf-text-secondary)]">Your estimated monthly investment</p>
                <p className="mt-1 text-4xl font-bold text-[var(--tf-blue)]">
                  {formatInr(monthlyInvestment)}
                  <span className="text-lg font-medium text-[var(--tf-text-secondary)]">*</span>
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-[var(--tf-text)]">Suggested investment approach</p>
                <div className="mt-2 flex h-3 w-full overflow-hidden rounded-full bg-white">
                  <div className="bg-[var(--tf-blue)]" style={{ width: `${riskProfile.allocation.equity}%` }} />
                  <div className="bg-[var(--tf-blue-tint)]" style={{ width: `${riskProfile.allocation.debt}%` }} />
                  <div className="bg-[var(--tf-navy)]" style={{ width: `${riskProfile.allocation.gold}%` }} />
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--tf-text-secondary)]">
                  <span>Equity {riskProfile.allocation.equity}%</span>
                  <span>Debt {riskProfile.allocation.debt}%</span>
                  <span>Gold {riskProfile.allocation.gold}%</span>
                </div>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-[var(--tf-text-secondary)]">
                *This is an illustrative assessment and not a guarantee of returns or a substitute for personalised
                financial advice. Mutual fund investments are subject to market risks; returns are not guaranteed.
              </p>
            </div>

            <div className="mt-10 rounded-[var(--tf-radius-lg)] border border-[var(--tf-border)] p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[var(--tf-navy)]">Want your complete investment plan?</h3>
              <p className="mt-1.5 text-sm text-[var(--tf-text-secondary)]">
                Share your details and a ThinkFin advisor will follow up with your full, personalised investment
                plan.
              </p>

              <form onSubmit={submitLead} noValidate className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={lead.name}
                  onChange={(e) => handleLeadChange("name", e.target.value)}
                  className="h-12 w-full rounded-[var(--tf-radius-xs)] border border-[var(--tf-border)] px-4 text-[15px] text-[var(--tf-text)] placeholder:text-[var(--tf-text-secondary)] focus:border-[var(--tf-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--tf-bg-soft)]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={lead.email}
                  onChange={(e) => handleLeadChange("email", e.target.value)}
                  className="h-12 w-full rounded-[var(--tf-radius-xs)] border border-[var(--tf-border)] px-4 text-[15px] text-[var(--tf-text)] placeholder:text-[var(--tf-text-secondary)] focus:border-[var(--tf-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--tf-bg-soft)]"
                />
                {leadError && <p className="text-xs text-red-500">{leadError}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[var(--tf-radius-btn)] bg-[var(--tf-blue)] text-[15px] font-semibold text-white shadow-[0_10px_30px_rgba(var(--tf-blue-rgb),0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--tf-blue-hover)] disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Send My Investment Plan"}
                </button>
                <p className="text-center text-xs text-[var(--tf-text-secondary)]">
                  No spam. No obligation. Just a clear plan.
                </p>
              </form>
            </div>
          </div>
        )}

        {stage === "done" && (
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--tf-bg-soft)] text-[var(--tf-blue)]">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-[var(--tf-navy)]">Thanks, {lead.name.split(" ")[0] || "there"}!</h3>
            <p className="mt-2 text-[var(--tf-text-secondary)]">
              We&apos;ve saved your details. Taking you to complete your investment plan with a ThinkFin advisor
              now&hellip;
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
