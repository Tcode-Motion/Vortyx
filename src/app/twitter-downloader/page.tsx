import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import UniversalDownloader from "../../components/downloader/UniversalDownloader";
import { Film, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "X / Twitter Video Downloader (HD MP4 & GIF Saver) — Vortyx",
  description:
    "Free Twitter (X) video downloader. Download videos and animated GIFs from X posts in 1080p, 720p, and high-definition MP4 format with audio.",
  alternates: {
    canonical: "https://techscript.is-a.dev/Vortyx/twitter-downloader",
  },
  openGraph: {
    title: "X (Twitter) Video Downloader — Vortyx",
    description: "Download videos and GIFs from X/Twitter in HD MP4.",
    url: "https://techscript.is-a.dev/Vortyx/twitter-downloader",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    q: "How do I download videos from X (formerly Twitter)?",
    a: "Copy the link of the X/Twitter post containing the video, paste it into Vortyx, and click 'Get Media'. Choose your preferred MP4 resolution and save the file.",
  },
  {
    q: "Can I save animated GIFs from X?",
    a: "Yes. Twitter converts GIFs into looped MP4 video containers, which Vortyx extracts and saves directly.",
  },
  {
    q: "Does this work on mobile and desktop?",
    a: "Yes. Vortyx runs on any web browser on Android, iPhone, iPad, Windows, and Mac.",
  },
];

export default function TwitterDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Vortyx Twitter Video Downloader",
        "url": "https://techscript.is-a.dev/Vortyx/twitter-downloader",
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-theme-surface border border-theme-border/60 text-theme-foreground text-xs font-extrabold uppercase tracking-wider">
          <Film size={14} />
          X (Twitter) Video &amp; GIF Extractor
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-theme-foreground tracking-tight leading-tight">
          Free <span className="bg-gradient-to-r from-theme-foreground via-brand-pink to-brand-coral bg-clip-text text-transparent">X / Twitter Video</span> Downloader
        </h1>
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          Download high-definition MP4 videos and animated GIFs from X (Twitter) posts with fast processing and zero login.
        </p>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-sm text-theme-foreground-muted">Loading Downloader...</div>}>
        <UniversalDownloader />
      </Suspense>

      {/* Guide */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-8 shadow-sm text-left">
        <h2 className="text-2xl font-extrabold text-theme-foreground">How to Download Twitter Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-theme-surface text-theme-foreground font-bold flex items-center justify-center text-sm">1</span>
            <h3 className="text-base font-bold text-theme-foreground">Copy Post URL</h3>
            <p className="text-xs text-theme-foreground-muted">Copy the tweet/post link from the X app or web browser.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-brand-pink/10 text-brand-pink font-bold flex items-center justify-center text-sm">2</span>
            <h3 className="text-base font-bold text-theme-foreground">Paste into Vortyx</h3>
            <p className="text-xs text-theme-foreground-muted">Paste the link into the downloader above and click &quot;Get Media&quot;.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-sm">3</span>
            <h3 className="text-base font-bold text-theme-foreground">Download Video</h3>
            <p className="text-xs text-theme-foreground-muted">Save your clean HD MP4 video file immediately.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-6 text-left shadow-sm">
        <div className="flex items-center gap-3 border-b border-theme-border/30 pb-4">
          <HelpCircle size={22} className="text-brand-pink" />
          <h2 className="text-xl font-extrabold text-theme-foreground">Twitter Downloader FAQ</h2>
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
