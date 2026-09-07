"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroCarousel from "@/components/landing/hero-carousel";
import { goalPortfolios, type GoalPortfolio } from "@/components/landing/goal-portfolios";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { constants } from "@/components/common/constants";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.1 });
  const [activeGoal, setActiveGoal] = useState<GoalPortfolio>(goalPortfolios[0]);
  const [showMutualFundsEyebrow, setShowMutualFundsEyebrow] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowMutualFundsEyebrow(true);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  const handleActiveChange = useCallback((goal: GoalPortfolio) => {
    setActiveGoal(goal);
    sessionStorage.setItem("lastGoal", goal.id);
  }, []);

  return (
    <section ref={ref} className="relative w-full py-6 md:py-8 bg-card overflow-hidden">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div
          className={cn("mx-auto max-w-3xl text-center animated-component")}
          data-in-view={isIntersecting}
        >
          <div className="relative mx-auto h-5 overflow-hidden">
            <div
              className={cn(
                "absolute inset-x-0 top-0 transition-all duration-300 motion-reduce:transition-none",
                showMutualFundsEyebrow ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
              )}
            >
              <span className="inline-block rounded-lg bg-secondary px-3 py-1 text-xs">Invest with Purpose</span>
            </div>
            <div
              className={cn(
                "absolute inset-x-0 top-0 transition-all duration-300 motion-reduce:transition-none",
                showMutualFundsEyebrow ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              )}
            >
              <span className="inline-block rounded-lg bg-secondary px-3 py-1 text-xs">Invest in Mutual Funds</span>
            </div>
          </div>
          <h1 className="mt-2 font-headline text-2xl font-bold tracking-tighter sm:text-3xl text-gray-900 dark:text-gray-50">
            Map Your Life Goals to the Right Portfolio
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            {"Every milestone needs a different mix of risk and time. We structure your investments around each goal, not just the market."}
          </p>
        </div>

        <div
          className={cn("mt-5 animated-component")}
          style={{ transitionDelay: "150ms" }}
          data-in-view={isIntersecting}
        >
          <HeroCarousel onActiveChange={handleActiveChange} />
        </div>

        <div
          className={cn("mt-4 flex flex-col items-center gap-2 animated-component")}
          style={{ transitionDelay: "250ms" }}
          data-in-view={isIntersecting}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="default">
              <Link href={constants.advisorAppLink}>
                {activeGoal.cta}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="default" variant="outline">
              <Link href="#services">Learn More</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">No spam. No obligation. Just a clear plan.</p>
        </div>
      </div>
    </section>
  );
}
