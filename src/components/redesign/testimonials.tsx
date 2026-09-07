"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { testimonials } from "@/features/marketing/content";

export default function RedesignTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.15 });
  const scrollByCard = (direction: 1 | -1) => { scrollRef.current?.scrollBy({ left: direction * 380, behavior: "smooth" }); };
  return (
    <section id="testimonials" ref={ref} className="w-full bg-white py-[100px] sm:py-[140px]">
      <div className="mx-auto max-w-[1280px] px-[5vw]">
        <div className="flex flex-col items-center justify-between gap-6 transition-all duration-700 ease-[var(--tf-ease)] sm:flex-row sm:items-end" style={{ opacity: isIntersecting ? 1 : 0, transform: isIntersecting ? "translateY(0)" : "translateY(16px)" }}>
          <h2 className="text-center text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-tight text-[var(--tf-navy)] sm:text-left">Trusted with important<br />financial decisions.</h2>
          <div className="flex gap-3">
            <button type="button" aria-label="Previous testimonial" onClick={() => scrollByCard(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--tf-border)] text-[var(--tf-text-secondary)] transition-colors duration-200 hover:border-[var(--tf-blue)] hover:text-[var(--tf-blue)]"><ChevronLeft className="h-4 w-4" /></button>
            <button type="button" aria-label="Next testimonial" onClick={() => scrollByCard(1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--tf-border)] text-[var(--tf-text-secondary)] transition-colors duration-200 hover:border-[var(--tf-blue)] hover:text-[var(--tf-blue)]"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div ref={scrollRef} className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((t, i) => (
            <div key={t.name} className="w-[320px] shrink-0 snap-center rounded-[var(--tf-radius-lg)] border border-[var(--tf-border)] bg-[var(--tf-bg)] p-8 transition-all duration-700 ease-[var(--tf-ease)] sm:w-[380px]" style={{ transitionDelay: isIntersecting ? `${150 + i * 100}ms` : "0ms", opacity: isIntersecting ? 1 : 0, transform: isIntersecting ? "translateY(0)" : "translateY(16px)" }}>
              <div className="flex items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--tf-navy)] text-sm font-semibold text-white">{t.initials}</div><div><p className="text-sm font-semibold text-[var(--tf-text)]">{t.name}</p><p className="text-xs text-[var(--tf-text-secondary)]">{t.role}</p></div></div>
              <div className="mt-3 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>{Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} className="h-4 w-4" fill={starIndex < t.rating ? "var(--tf-blue)" : "none"} stroke="var(--tf-blue)" strokeWidth={1.5} />)}</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--tf-text)]">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
