// No analytics platform is wired up in this codebase yet, so this is a thin,
// dependency-free wrapper rather than a second platform: it calls
// window.gtag if a GA4 snippet is ever added to the layout, and otherwise
// just logs in development. Swap the gtag call for whatever platform is
// eventually chosen without touching call sites.
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", name, params);
    return;
  }
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, params);
  }
}
