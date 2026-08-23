import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F6" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0F12" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Vortyx — Free Online Video Downloader & All-Media Manager (Web & APK)",
    template: "%s | Vortyx Downloader",
  },
  description:
    "Download high-quality videos, audio (MP3 320kbps), reels, and photos from 50+ social portals including YouTube (4K/1080p), Instagram, TikTok (No Watermark), X (Twitter), SoundCloud, Facebook, and Reddit. Free web downloader tool and fast Android APK.",
  keywords: [
    "Vortyx",
    "Online Video Downloader",
    "Free Video Downloader Web",
    "YouTube Video Downloader 1080p 4K",
    "YouTube to MP3 Converter 320kbps",
    "Instagram Reels Downloader",
    "Instagram Story Saver Online",
    "TikTok Video Downloader Without Watermark",
    "Twitter X Video Downloader MP4",
    "SoundCloud to MP3 Downloader",
    "Facebook Video Downloader HD",
    "Reddit Video Downloader with Audio",
    "Pinterest Video Downloader",
    "WhatsApp Status Saver",
    "All Media Downloader APK",
    "No Login Video Downloader",
    "Cobalt Media Resolver",
    "Fast MP4 Video Saver",
    "Offline Media Manager",
  ],
  authors: [{ name: "Vortyx Engineering Team", url: "https://techscript.is-a.dev/Vortyx" }],
  creator: "Vortyx Dev Team",
  publisher: "Vortyx",
  applicationName: "Vortyx Media Downloader",
  metadataBase: new URL("https://techscript.is-a.dev/Vortyx"),
  alternates: {
    canonical: "https://techscript.is-a.dev/Vortyx",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techscript.is-a.dev/Vortyx",
    title: "Vortyx — Universal Media Downloader (Online Web Tool & Android APK)",
    description:
      "Instantly download videos, MP3 music, and photos from YouTube, Instagram Reels, TikTok (no watermark), X/Twitter, and 50+ platforms. High-speed, private, and 100% free.",
    siteName: "Vortyx App & Web Downloader",
    images: [
      {
        url: "icon.png",
        width: 512,
        height: 512,
        alt: "Vortyx App Icon & Web Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vortyx — Universal All-Media Downloader & Player",
    description:
      "Paste any link from YouTube, Instagram, TikTok, SoundCloud, or X to download 1080p MP4 or 320k MP3 directly in your browser or with our native Android app.",
    images: ["icon.png"],
    creator: "@VortyxApp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "googled4c31693a78a0881.html",
  },
  manifest: "/Vortyx/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/Vortyx/icon.png" },
    ],
    shortcut: "/Vortyx/icon.png",
    apple: "/Vortyx/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured Data Schemas
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://techscript.is-a.dev/Vortyx/#webapp",
        name: "Vortyx Web Downloader Hub",
        url: "https://techscript.is-a.dev/Vortyx",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "All (Web Browser, Windows, macOS, Android, iOS, Linux)",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Free universal web media downloader to extract 1080p MP4 video, 320kbps MP3 audio, and images from YouTube, Instagram, TikTok, SoundCloud, X, and 50+ platforms.",
        featureList: [
          "YouTube 4K and 1080p Video Downloads",
          "TikTok Videos Without Watermark",
          "Instagram Reels and Stories Saver",
          "SoundCloud to 320kbps MP3 Music Converter",
          "Live In-Browser Media Preview Player",
          "Zero-Account Privacy Model",
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://techscript.is-a.dev/Vortyx/#androidapp",
        name: "Vortyx Android App",
        operatingSystem: "Android 7.0+",
        applicationCategory: "UtilitiesApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "1280",
          bestRating: "5",
          worstRating: "1",
        },
        fileSize: "9.54MB",
        softwareVersion: "1.0.0",
        downloadUrl:
          "https://github.com/Tcode-Motion/Vortyx/releases/download/v1.0.0/vortyx-v1.0.apk",
      },
      {
        "@type": "WebSite",
        "@id": "https://techscript.is-a.dev/Vortyx/#website",
        url: "https://techscript.is-a.dev/Vortyx",
        name: "Vortyx Media Downloader",
        description: "Official portal and online web downloader for Vortyx.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://techscript.is-a.dev/Vortyx/?url={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "HowTo",
        name: "How to Download Videos and Audio Online with Vortyx",
        description: "Step-by-step guide to download high quality media from any social link using Vortyx.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Copy Media Link",
            text: "Copy the link of any video, reel, song, or photo from YouTube, Instagram, TikTok, X, or SoundCloud.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Paste into Vortyx",
            text: "Paste the URL into the search box of the Vortyx Web Downloader or the Android App.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Select Format",
            text: "Choose between Video (1080p, 720p), Audio (MP3 320k), or Original Image.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Download File",
            text: "Click Download to save the media file directly to your device storage.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I use Vortyx to download videos on my computer or iPhone without the Android app?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! Vortyx includes a full Universal Web Downloader right on this website. You can paste links from YouTube, Instagram, TikTok, X, and SoundCloud directly in your browser on PC, Mac, iPhone, or iPad without downloading any app.",
            },
          },
          {
            "@type": "Question",
            name: "Does Vortyx remove TikTok watermarks?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, Vortyx automatically extracts clean, watermark-free high-definition MP4 streams for TikTok videos and can extract the original audio track to MP3.",
            },
          },
          {
            "@type": "Question",
            name: "Is Vortyx free to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, Vortyx is 100% free for web users and Android users with zero account registration, no email needed, and no hidden subscriptions.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className="h-full antialiased dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-theme-bg text-theme-foreground transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow pt-16 sm:pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
