import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/capabilities", "/insights", "/company", "/contact"];
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
