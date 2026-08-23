import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://techscript.is-a.dev/Vortyx";
  const routes = [
    // Core Homepage & Product Hub
    { path: "", priority: 1.0, changeFrequency: "daily" as const },

    // Primary High-Intent Feature Tools
    { path: "/video-downloader", priority: 0.95, changeFrequency: "daily" as const },
    { path: "/youtube-downloader", priority: 0.95, changeFrequency: "daily" as const },
    { path: "/audio-downloader", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/playlist-downloader", priority: 0.9, changeFrequency: "weekly" as const },

    // Platform Specific SEO Portals
    { path: "/instagram-downloader", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/tiktok-downloader", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/spotify-downloader", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/soundcloud-downloader", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/facebook-downloader", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/twitter-downloader", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/reddit-downloader", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/pinterest-downloader", priority: 0.85, changeFrequency: "weekly" as const },

    // Discovery, Catalog & App Downloads
    { path: "/providers", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/download", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/features", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/screenshots", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/changelog", priority: 0.75, changeFrequency: "weekly" as const },
    { path: "/support", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },

    // Legal & Policies
    { path: "/privacy", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/disclaimer", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/data-deletion", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/licenses", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
