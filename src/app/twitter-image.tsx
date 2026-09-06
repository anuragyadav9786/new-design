import { ImageResponse } from "next/og";
import { OgImageContent, ogImageSize } from "./og-image-content";

export const runtime = "edge";
export const alt = "ThinkFin — Invest With Purpose. Your Goals. Your Money. Your Future.";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(<OgImageContent />, { ...size });
}
