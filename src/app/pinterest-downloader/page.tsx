import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import UniversalDownloader from "../../components/downloader/UniversalDownloader";
import { Film, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pinterest Video & Pin Downloader (HD MP4 & High-Res Images) — Vortyx",
  description:
    "Free Pinterest video downloader. Download Pinterest video pins, animated GIFs, and high-resolution images in original HD quality online.",
  alternates: {
    canonical: "https://techscript.is-a.dev/Vortyx/pinterest-downloader",
  },
  openGraph: {
    title: "Pinterest Video & Pin Downloader — Vortyx",
    description: "Download Pinterest videos and high-res pins online.",
    url: "https://techscript.is-a.dev/Vortyx/pinterest-downloader",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    q: "How do I download video pins from Pinterest?",
    a: "Copy the link of any Pinterest video pin, paste it into Vortyx, and click 'Get Media' to download the 1080p or 720p MP4 file.",
  },
  {
    q: "Can I download full-resolution images from Pinterest?",
    a: "Yes. Vortyx extracts the original uncompressed source image for any standard pin.",
  },
];

export default function PinterestDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Vortyx Pinterest Downloader",
        "url": "https://techscript.is-a.dev/Vortyx/pinterest-downloader",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      },
      {
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-16 max-w-6xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-xs font-extrabold uppercase tracking-wider">
          <Film size={14} />
          Pinterest Video &amp; Pin Saver
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-theme-foreground tracking-tight leading-tight">
          Free <span className="bg-gradient-to-r from-red-600 via-pink-500 to-brand-coral bg-clip-text text-transparent">Pinterest Video</span> Downloader
        </h1>
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          Download Pinterest video pins, stories, and high-resolution images in original HD MP4 format.
        </p>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-sm text-theme-foreground-muted">Loading Downloader...</div>}>
        <UniversalDownloader />
      </Suspense>

      {/* FAQs */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-6 text-left shadow-sm">
        <div className="flex items-center gap-3 border-b border-theme-border/30 pb-4">
          <HelpCircle size={22} className="text-red-500" />
          <h2 className="text-xl font-extrabold text-theme-foreground">Pinterest Downloader FAQ</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQ_ITEMS.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
              <h3 className="text-sm font-bold text-theme-foreground">{faq.q}</h3>
              <p className="text-xs text-theme-foreground-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
