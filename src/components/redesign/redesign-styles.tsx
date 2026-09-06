"use client";

export default function RedesignStyles() {
  return (
    <style jsx global>{`
      .redesign-root {
        /* Color tokens */
        --tf-bg: #f7f8fa;
        --tf-white: #ffffff;
        --tf-navy: #081b33;
        --tf-navy-rgb: 8, 27, 51;
        --tf-blue: #1d5eff;
        --tf-blue-rgb: 29, 94, 255;
        --tf-blue-hover: #164fdb;
        --tf-blue-secondary: #4a7dff;
        --tf-blue-secondary-rgb: 74, 125, 255;
        --tf-bg-soft: #eef3ff;
        --tf-blue-tint: #8fb0ff;
        --tf-text: #111827;
        --tf-text-secondary: #667085;
        --tf-border: #e6eaf0;

        /* Radius tokens */
        --tf-radius-xs: 10px;
        --tf-radius-sm: 12px;
        --tf-radius-btn: 14px;
        --tf-radius-md: 20px;
        --tf-radius-lg: 24px;

        /* Motion tokens */
        --tf-ease: cubic-bezier(0.22, 1, 0.36, 1);
        --tf-duration-hover: 250ms;
        --tf-duration-section: 650ms;

        /* Spacing tokens */
        --tf-section-space: clamp(100px, 12vw, 160px);
        --tf-container-pad: 5vw;
      }

      .redesign-root,
      .redesign-root * {
        font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
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
