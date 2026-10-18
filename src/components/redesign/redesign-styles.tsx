"use client";

export default function RedesignStyles() {
  return (
    <style jsx global>{`
      .redesign-root,
      .redesign-root * {
        font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif;
      }

      @keyframes redesignFadeUp {
        from {
          opacity: 0;
          transform: translateY(24px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .redesign-root .animate-fade-up {
        animation: redesignFadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }

      @keyframes ctaPulse {
        0%,
        100% {
          box-shadow: 0 10px 40px rgba(var(--tf-blue-rgb), 0.3);
        }
        50% {
          box-shadow: 0 10px 50px rgba(var(--tf-blue-rgb), 0.55);
        }
      }

      /* Runs twice, a beat after load, then settles back to the button's
         static shadow — a one-time nudge toward the primary CTA, not a
         persistent attention-grab. */
      .redesign-root .animate-cta-pulse {
        animation: ctaPulse 1.4s ease-in-out 2;
        animation-delay: 1.5s;
      }

      @keyframes scrollCueBounce {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(6px);
        }
      }

      .redesign-root .animate-scroll-cue {
        animation: scrollCueBounce 1.8s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .redesign-root .animate-fade-up {
          animation: none;
          opacity: 1;
          transform: none;
        }
        .redesign-root * {
          transition-duration: 1ms !important;
          animation-duration: 1ms !important;
        }
      }
    `}</style>
  );
}
