"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { goalPortfolios, type GoalPortfolio } from "@/components/landing/goal-portfolios";
import { goalVisuals } from "@/components/redesign/data";
import { trackEvent } from "@/lib/analytics";

const AUTO_ADVANCE_MS = 4500;
const DRAG_THRESHOLD = 60;
const TAP_THRESHOLD = 8;
const CARD_W = 300;
const CARD_H = "clamp(320px, 48vh, 460px)";

// Only the active card renders (see the render filter below), so a single
// centered offset is the only one ever used.
const ACTIVE_OFFSET = { x: 0, scale: 1, opacity: 1, z: 30 };

function signedDistance(index: number, active: number, length: number) {
  let diff = index - active;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

export default function GoalCarousel({
  onActiveChange,
}: {
  onActiveChange?: (goal: GoalPortfolio) => void;
}) {
  const length = goalPortfolios.length;
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const pressedIndexRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const goTo = useCallback(
    (index: number, source: "card" | "dot" = "dot") => {
      setActive(((index % length) + length) % length);
      if (source === "card") {
        trackEvent("goal_card_clicked", { goal_id: goalPortfolios[index]?.id });
      }
    },
    [length]
  );
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    onActiveChange?.(goalPortfolios[active]);
  }, [active, onActiveChange]);

  useEffect(() => {
    if (isPaused) return undefined;
    const interval = setInterval(() => setActive((c) => (c + 1) % length), AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [isPaused, length]);

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    isDraggingRef.current = true;
    const cardEl = (e.target as HTMLElement).closest<HTMLElement>("[data-goal-index]");
    pressedIndexRef.current = cardEl ? Number(cardEl.dataset.goalIndex) : null;
    setIsPaused(true);
  };

  // Tap-to-select and swipe-to-navigate are both resolved here, from the
  // drag distance alone — not from a separate onClick per card. A card's
  // on-screen position shifts the instant `active` changes, so a native
  // "click" synthesized after a swipe can land on a different card than the
  // one actually pressed and silently undo the swipe. Routing both
  // gestures through one measurement avoids that race entirely.
  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || dragStartX.current === null) {
      setIsPaused(false);
      return;
    }
    const deltaX = e.clientX - dragStartX.current;

    if (Math.abs(deltaX) < TAP_THRESHOLD) {
      if (pressedIndexRef.current !== null && pressedIndexRef.current !== active) {
        goTo(pressedIndexRef.current, "card");
      }
    } else if (deltaX > DRAG_THRESHOLD) {
      prev();
    } else if (deltaX < -DRAG_THRESHOLD) {
      next();
    }

    dragStartX.current = null;
    pressedIndexRef.current = null;
    isDraggingRef.current = false;
    setIsPaused(false);
  };

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goTo(index, "card");
    }
  };

  const FOCUS_RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tf-blue)] focus-visible:ring-offset-2";

  return (
    <div className="w-full">
      <div
        className="relative mx-auto h-[clamp(320px,48vh,460px)] w-full max-w-[720px] touch-pan-y select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => {
          isDraggingRef.current = false;
          dragStartX.current = null;
          pressedIndexRef.current = null;
        }}
      >
        {goalPortfolios.map((goal, index) => {
          const distance = signedDistance(index, active, length);
          if (distance !== 0) return null;
          const style = ACTIVE_OFFSET;
          const Icon = goal.icon;
          const visual = goalVisuals[goal.id];

          return (
            <div
              key={goal.id}
              role="button"
              tabIndex={0}
              data-goal-index={index}
              aria-label={`View ${goal.name} goal`}
              aria-current={true}
              onKeyDown={(e) => handleCardKeyDown(e, index)}
              className={`absolute left-1/2 top-1/2 cursor-default overflow-hidden rounded-[var(--tf-radius-lg)] shadow-[0_10px_40px_rgba(var(--tf-navy-rgb),0.1)] transition-all duration-[600ms] ease-[var(--tf-ease)] ${FOCUS_RING}`}
              style={{
                width: CARD_W,
                height: CARD_H,
                transform: `translate(-50%, -50%) translateX(${style.x}px) scale(${style.scale})`,
                opacity: style.opacity,
                zIndex: style.z,
                background: visual.gradient,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--tf-navy)] via-transparent to-transparent" />

              <div className="absolute left-7 top-7">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  <ShieldCheck className="h-3 w-3" strokeWidth={2} />
                  SEBI Regulated
                </span>
              </div>

              <div className="relative flex h-full flex-col justify-end p-7 text-left">
                <Icon className="mb-3 h-8 w-8 text-white/90" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold text-white">{goal.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75 line-clamp-2">{visual.tagline}</p>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[var(--tf-blue-tint)]">{goal.target}</p>
                  <p className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-white/60">
                    {goal.horizon}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-5 lg:mt-5">
        <button
          type="button"
          aria-label="Previous goal"
          onClick={prev}
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-[var(--tf-border)] bg-white text-[var(--tf-text-secondary)] transition-all duration-200 hover:border-[var(--tf-blue)] hover:text-[var(--tf-blue)] ${FOCUS_RING}`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {goalPortfolios.map((goal, index) => (
            <button
              key={goal.id}
              type="button"
              aria-label={`Go to ${goal.name}`}
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${FOCUS_RING} ${
                index === active ? "w-7 bg-[var(--tf-blue)]" : "w-1.5 bg-[var(--tf-border)]"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next goal"
          onClick={next}
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-[var(--tf-border)] bg-white text-[var(--tf-text-secondary)] transition-all duration-200 hover:border-[var(--tf-blue)] hover:text-[var(--tf-blue)] ${FOCUS_RING}`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
