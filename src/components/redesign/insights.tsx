"use client";

import { useRef } from "react";
import Link from "next/link";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { insights } from "@/components/redesign/data";

export default function Insights() {
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
          Make better financial decisions.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {insights.map((article, i) => (
            <Link
              key={article.title}
              href={article.href}
              className="group rounded-[var(--tf-radius-lg)] border border-[var(--tf-border)] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--tf-blue)]/30 hover:shadow-[0_20px_50px_rgba(var(--tf-navy-rgb),0.08)]"
              style={{
                transitionDelay: isIntersecting ? `${i * 100}ms` : "0ms",
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <span className="inline-block rounded-full bg-[var(--tf-bg-soft)] px-3 py-1 text-xs font-semibold text-[var(--tf-blue)]">
                {article.category}
              </span>
              <h3 className="mt-4 text-lg font-bold leading-snug text-[var(--tf-navy)]">{article.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--tf-text-secondary)]">{article.description}</p>
              <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[var(--tf-blue)]">
                Read more
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
