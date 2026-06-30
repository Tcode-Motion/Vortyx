import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vortyx All Media Downloader",
    short_name: "Vortyx",
    description: "Premium All Media Downloader & Offline Manager for Android",
    start_url: "/",
    display: "standalone",
    background_color: "#0F0F12",
    theme_color: "#FA3E25",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
