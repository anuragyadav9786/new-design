"use client";

import { useRef } from "react";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const teamMembers = [
  {
    name: "Hony Lt OP Singh Yadav",
    role: "IRDAI Certified Insurance Advisor",
    bio: "Helps investors size the right protection cover for their family before recommending where a single rupee goes toward growth.",
    image: "/our-team/om-prakash.jpg",
  },
  {
    name: "Anurag Singh",
    role: "AMFI Registered Mutual Fund Distributor",
    bio: "Works directly with investors to turn their goals into a structured, goal-based mutual fund portfolio.",
    image: "/our-team/anurag-singh.jpg",
  },
];

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.15 });

  return (
    <section id="team" ref={ref} className="w-full bg-[var(--tf-bg)] py-[100px] sm:py-[140px]">
      <div className="mx-auto max-w-[1280px] px-[5vw]">
        <h2
          className="mx-auto max-w-2xl text-center text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-tight text-[var(--tf-navy)] transition-all duration-700 ease-[var(--tf-ease)]"
          style={{
            opacity: isIntersecting ? 1 : 0,
            transform: isIntersecting ? "translateY(0)" : "translateY(16px)",
          }}
        >
          The people behind your plan.
        </h2>
        <p
          className="mx-auto mt-4 max-w-lg text-center text-[15px] leading-relaxed text-[var(--tf-text-secondary)] transition-all duration-700 ease-[var(--tf-ease)]"
          style={{
            opacity: isIntersecting ? 1 : 0,
            transform: isIntersecting ? "translateY(0)" : "translateY(16px)",
          }}
        >
          Technology builds the platform. These are the certified professionals behind the guidance.
        </p>

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              className="overflow-hidden rounded-[var(--tf-radius-lg)] border border-[var(--tf-border)] bg-white transition-all duration-300 ease-[var(--tf-ease)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(var(--tf-navy-rgb),0.08)]"
              style={{
                transitionDelay: isIntersecting ? `${i * 120}ms` : "0ms",
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <Image
                src={member.image}
                alt={`Photo of ${member.name}`}
                width={400}
                height={400}
                className="aspect-square w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-[var(--tf-navy)]">{member.name}</h3>
                <p className="text-sm font-semibold text-[var(--tf-blue)]">{member.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--tf-text-secondary)]">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
