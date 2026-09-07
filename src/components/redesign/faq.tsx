"use client";

import { useRef } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { faqs } from "@/features/marketing/content";

export default function RedesignFaq() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.15 });

  return (
    <section id="faq" ref={ref} className="w-full bg-white py-[100px] sm:py-[140px]">
      <div className="mx-auto max-w-3xl px-[5vw]">
        <h2
          className="text-center text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-tight text-[var(--tf-navy)] transition-all duration-700 ease-[var(--tf-ease)]"
          style={{
            opacity: isIntersecting ? 1 : 0,
            transform: isIntersecting ? "translateY(0)" : "translateY(16px)",
          }}
        >
          Questions, answered.
        </h2>

        <Accordion type="single" collapsible className="mt-14 w-full">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className="transition-all duration-700 ease-[var(--tf-ease)]"
              style={{
                transitionDelay: isIntersecting ? `${i * 60}ms` : "0ms",
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting ? "translateY(0)" : "translateY(10px)",
              }}
            >
              <AccordionItem value={`item-${i}`} className="border-[var(--tf-border)] py-2">
                <AccordionTrigger className="text-left text-[16px] font-semibold text-[var(--tf-navy)] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-[var(--tf-text-secondary)]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
