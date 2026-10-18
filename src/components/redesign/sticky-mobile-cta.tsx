"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function StickyMobileCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      const nearFooter =
        document.documentElement.scrollHeight - window.innerHeight - window.scrollY < 300;
      setIsVisible(pastHero && !nearFooter);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-[var(--tf-border)] bg-white/95 px-4 py-2.5 backdrop-blur-md transition-transform duration-300 md:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--tf-navy)]">Ready to plan your goal?</p>
          <p className="text-xs text-[var(--tf-text-secondary)]">Takes ~3 mins &bull; Free</p>
        </div>
        <a
          href="#assessment"
          onClick={() => trackEvent("hero_cta_clicked", { cta: "build_my_investment_plan", source: "sticky_mobile" })}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--tf-blue)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(var(--tf-blue-rgb),0.3)]"
        >
          Start Plan →
        </a>
      </div>
    </div>
  );
}
