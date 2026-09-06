"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { constants } from "@/components/common/constants";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#ecosystem", label: "Services" },
  { href: "#testimonials", label: "Stories" },
  { href: "#faq", label: "FAQ" },
];

export default function RedesignHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--tf-border)] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-[5vw]">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/icon/icon.png" alt="ThinkFin" width={36} height={36} className="h-9 w-9" priority />
          <span className="text-lg font-bold tracking-tight text-[var(--tf-text)]">ThinkFin</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--tf-text-secondary)] md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-[var(--tf-text)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={constants.advisorAppLink}
            className="group inline-flex items-center gap-1.5 rounded-[var(--tf-radius-sm)] bg-[var(--tf-blue)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(var(--tf-navy-rgb),0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--tf-blue-hover)] sm:px-5"
          >
            Start Investing
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-[var(--tf-radius-xs)] text-[var(--tf-navy)] transition-colors duration-200 hover:bg-[var(--tf-bg-soft)] md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden border-t border-[var(--tf-border)] bg-white transition-all duration-300 ease-[var(--tf-ease)] md:hidden"
        style={{ maxHeight: isMenuOpen ? 260 : 0 }}
      >
        <nav className="flex flex-col gap-1 px-[5vw] py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-[var(--tf-radius-xs)] px-3 py-3 text-[15px] font-medium text-[var(--tf-text)] transition-colors duration-200 hover:bg-[var(--tf-bg-soft)] hover:text-[var(--tf-blue)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
