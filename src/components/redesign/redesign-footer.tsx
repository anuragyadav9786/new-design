import Link from "next/link";
import Image from "next/image";
import AppStoreBadges from "@/components/redesign/app-store-badges";

export default function RedesignFooter() {
  return (
    <footer className="w-full bg-[var(--tf-navy)] py-14">
      <div className="mx-auto max-w-[1280px] px-[5vw]">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-start">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/icon/icon.png" alt="ThinkFin" width={32} height={32} className="h-8 w-8" />
              <span className="text-lg font-bold text-white">ThinkFin</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-white/50">ARN-309973 · AMFI Registered Mutual Fund Distributor</p>
          </div>
          <div className="text-center text-sm text-white/60 sm:text-right">
            <p>Altf Coworking, A-100, Sector 58, Noida 201301</p>
            <p className="mt-1">+91 7503080522 · info@thinkfinfinance.com</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-b border-white/10 py-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/50">Invest on the go with the ThinkFin app.</p>
          <AppStoreBadges />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} ThinkFin. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
