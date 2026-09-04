import type { MetadataRoute } from "next";
import { getAllNews } from "../lib/news-data";
import { getAllEvents } from "../lib/events-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, events] = await Promise.all([
    getAllNews().catch(() => []),
    getAllEvents().catch(() => []),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/news`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/events`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/board`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const newsRoutes: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${SITE_URL}/news/${item.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((item) => ({
    url: `${SITE_URL}/events/${item.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes, ...eventRoutes];
}
