import type { MetadataRoute } from "next";
import { goalPortfolios } from "@/features/goals/portfolio";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/terms-of-service`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/tools/sip-calculator`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/tools/retirement-calculator`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/tools/child-education-planner`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/tools/tax-calculator`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const goalRoutes: MetadataRoute.Sitemap = goalPortfolios.map((goal) => ({
    url: `${siteConfig.url}/goals/${goal.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...goalRoutes];
}
