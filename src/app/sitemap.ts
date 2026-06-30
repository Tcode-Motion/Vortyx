import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://techscript.is-a.dev/Vortyx";
  const routes = [
    "",
    "/features",
    "/screenshots",
    "/download",
    "/about",
    "/support",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/data-deletion",
    "/licenses",
    "/changelog",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/download" ? 0.9 : 0.7,
  }));
}
