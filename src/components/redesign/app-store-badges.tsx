const APP_STORE_URL = "https://apps.apple.com/us/app/sip-karo-by-thinkfin/id6766828877";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.rabbitinvest.sipkarobythinkfin&pcampaignid=web_share";

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M16.36 1.5c.11 1.02-.29 2.02-.9 2.75-.63.76-1.67 1.35-2.68 1.27-.13-1 .35-2.04.94-2.72.66-.77 1.8-1.34 2.64-1.3ZM19.9 17.44c-.36.83-.53 1.2-.99 1.94-.64 1.03-1.55 2.32-2.67 2.33-1 .01-1.26-.65-2.61-.64-1.36 0-1.64.65-2.65.66-1.12.01-1.98-1.17-2.62-2.2-1.8-2.9-1.99-6.31-.88-8.13.79-1.29 2.03-2.05 3.2-2.05 1.19 0 1.94.66 2.92.66.96 0 1.54-.66 2.92-.66 1.04 0 2.14.57 2.92 1.55-2.57 1.41-2.15 5.08.46 6.54Z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M4.5 2.5c-.4.3-.7.8-.7 1.4v16.2c0 .6.3 1.1.7 1.4l9.6-9.5-9.6-9.5Z" fill="#00D2FF" />
      <path d="M17.6 9.4 14.1 12l-9.6-9.5c.15-.1.32-.2.5-.24.34-.1.75-.06 1.13.16l11.5 6.6v.38Z" fill="#00E676" />
      <path d="M17.6 14.6 14.1 12l3.5-2.6 2.63 1.5c.7.4.7 1.4 0 1.8l-2.63 1.5v-.2Z" fill="#FFC107" />
      <path d="M4.5 21.5c.15.1.32.18.5.23.34.1.75.05 1.13-.17l11.5-6.6-3.5-2.6-9.63 9.14Z" fill="#FF3D00" />
    </svg>
  );
}

const badgeClassName =
  "group inline-flex items-center gap-2.5 rounded-[var(--tf-radius-btn)] border border-white/15 bg-white/[0.06] px-4 py-2.5 text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.12]";

export default function AppStoreBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={badgeClassName}>
        <AppleGlyph />
        <span className="text-left leading-tight">
          <span className="block text-[10px] text-white/60">Download on the</span>
          <span className="block text-sm font-semibold">App Store</span>
        </span>
      </a>
      <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={badgeClassName}>
        <PlayGlyph />
        <span className="text-left leading-tight">
          <span className="block text-[10px] text-white/60">GET IT ON</span>
          <span className="block text-sm font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
