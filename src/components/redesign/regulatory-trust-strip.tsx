"use client";

import { useRef } from "react";
import { BadgeCheck, ShieldCheck, Landmark, Lock } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const pillars = [
  {
    icon: BadgeCheck,
    label: "AMFI Registered Mutual Fund Distributor",
    detail: "ARN-309973",
  },
  {
    icon: ShieldCheck,
    label: "IRDAI Certified Protection Guidance",
    detail: "Verified regulatory advisory",
  },
  {
    icon: Landmark,
    label: "SEBI Compliant Execution Architecture",
    detail: "Transacted via BSE StAR MF / NSE NMF II",
  },
  {
    icon: Lock,
    label: "Bank-Grade 256-Bit SSL Encryption",
    detail: "Data protection & privacy first",
  },
];

export default function RegulatoryTrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full border-y border-[var(--tf-border)] bg-[var(--tf-navy)]/[0.03] py-6"
    >
      <div
        className="mx-auto grid max-w-[1280px] grid-cols-1 gap-y-5 divide-[var(--tf-border)] px-[5vw] transition-all duration-700 ease-[var(--tf-ease)] sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:divide-x"
        style={{
          opacity: isIntersecting ? 1 : 0,
          transform: isIntersecting ? "translateY(0)" : "translateY(10px)",
        }}
      >
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div key={pillar.label} className="flex items-start gap-2.5 lg:pl-6 lg:first:pl-0">
              <Icon className="mt-0.5 h-[19px] w-[19px] shrink-0 text-[var(--tf-blue)]" strokeWidth={1.75} />
              <div className="min-w-0 leading-tight">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--tf-text-secondary)]">
                  {pillar.label}
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-[var(--tf-text-secondary)]/70">
                  {pillar.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
