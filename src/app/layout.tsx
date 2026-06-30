import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vortyx | Premium All Media Downloader & Manager for Android",
    template: "%s | Vortyx App",
  },
  description:
    "Vortyx is a premium, professional offline-first Android application designed to download, play, and organize video, audio, and images from 50+ social platforms. Free batch downloads, WA status saver, and no login required.",
  keywords: [
    "Vortyx",
    "All Media Downloader",
    "Status Saver",
    "WhatsApp Status Saver",
    "Video Downloader",
    "Music Downloader",
    "Android Downloader APK",
    "Cobalt Downloader",
    "Offline Media Player",
    "Private Downloader",
  ],
  authors: [{ name: "Vortyx Dev Team" }],
  metadataBase: new URL("https://techscript.is-a.dev/Vortyx"), // Fallback canonical base
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techscript.is-a.dev/Vortyx",
    title: "Vortyx | Premium All Media Downloader & Manager",
    description:
      "Professional offline-first utility designed to download and organize video, audio, and images from 50+ social platforms. Features a high-fidelity integrated media player.",
    siteName: "Vortyx App",
    images: [
      {
        url: "/Vortyx/icon.png",
        width: 512,
        height: 512,
        alt: "Vortyx App Icon",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Vortyx | Premium All Media Downloader & Manager",
    description:
      "Professional offline-first utility designed to download and organize video, audio, and images from 50+ social platforms.",
    images: ["/Vortyx/icon.png"],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-theme-bg text-theme-foreground transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow pt-16 sm:pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
