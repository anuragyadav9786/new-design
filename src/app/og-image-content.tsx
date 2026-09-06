import { thinkfinLogoDataUri } from "./logo-data-uri";

export function OgImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "linear-gradient(135deg, #081B33 0%, #0F2A54 55%, #1D5EFF 130%)",
        padding: "80px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
        {/* next/og's ImageResponse (Satori) renders this outside the DOM and only
            understands plain <img>, not next/image — this is not a real page. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thinkfinLogoDataUri} width={64} height={64} alt="" />
        <div style={{ display: "flex", color: "white", fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>
          ThinkFin
        </div>
      </div>
      <div
        style={{
          display: "flex",
          color: "#8FB0FF",
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 24,
        }}
      >
        Invest With Purpose
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: "white",
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -2,
        }}
      >
        <span>Your Goals. Your Money.</span>
        <span>Your Future.</span>
      </div>
    </div>
  );
}

export const ogImageSize = { width: 1200, height: 630 };
