import type { MetadataRoute } from "next";
import { goalPortfolios } from "@/components/landing/goal-portfolios";

const BASE_URL = "https://thinkfinfinance.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/tools/sip-calculator`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/retirement-calculator`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/child-education-planner`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/tax-calculator`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const goalRoutes: MetadataRoute.Sitemap = goalPortfolios.map((goal) => ({
    url: `${BASE_URL}/goals/${goal.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...goalRoutes];
}
