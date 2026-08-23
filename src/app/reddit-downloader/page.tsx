import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import UniversalDownloader from "../../components/downloader/UniversalDownloader";
import { Film, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Reddit Video Downloader with Audio (Combined HD MP4) — Vortyx",
  description:
    "Download Reddit videos with audio in 1080p and 720p HD MP4 format. Solves the Reddit separated video/audio issue automatically. 100% free.",
  alternates: {
    canonical: "https://techscript.is-a.dev/Vortyx/reddit-downloader",
  },
  openGraph: {
    title: "Reddit Video Downloader with Audio — Vortyx",
    description: "Download Reddit videos with combined audio streams in HD MP4.",
    url: "https://techscript.is-a.dev/Vortyx/reddit-downloader",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    q: "Why do some Reddit videos normally download without sound?",
    a: "Reddit stores video and audio tracks in separate DASH stream files (v.redd.it). Vortyx automatically merges the video and audio tracks into a unified MP4 file with full sound.",
  },
  {
    q: "Can I download Reddit GIFs and videos from any subreddit?",
    a: "Yes. Any public Reddit post containing a video, clip, or GIF can be resolved and downloaded.",
  },
  {
    q: "Is there any software installation needed?",
    a: "No. Vortyx runs completely online inside your web browser.",
  },
];

export default function RedditDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Vortyx Reddit Video Downloader",
        "url": "https://techscript.is-a.dev/Vortyx/reddit-downloader",
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-600/10 border border-orange-600/20 text-orange-500 text-xs font-extrabold uppercase tracking-wider">
          <Film size={14} />
          Reddit Video &amp; Audio Combiner
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-theme-foreground tracking-tight leading-tight">
          Free <span className="bg-gradient-to-r from-orange-600 via-brand-coral to-brand-pink bg-clip-text text-transparent">Reddit Video</span> Downloader
        </h1>
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          Download Reddit videos with merged audio in 1080p and 720p Full HD MP4 format. No silent videos.
        </p>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-sm text-theme-foreground-muted">Loading Downloader...</div>}>
        <UniversalDownloader />
      </Suspense>

      {/* Guide */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-8 shadow-sm text-left">
        <h2 className="text-2xl font-extrabold text-theme-foreground">How to Download Reddit Videos with Audio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-orange-600/10 text-orange-500 font-bold flex items-center justify-center text-sm">1</span>
            <h3 className="text-base font-bold text-theme-foreground">Copy Reddit Link</h3>
            <p className="text-xs text-theme-foreground-muted">Copy the URL of the Reddit post containing the video.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-brand-pink/10 text-brand-pink font-bold flex items-center justify-center text-sm">2</span>
            <h3 className="text-base font-bold text-theme-foreground">Paste into Vortyx</h3>
            <p className="text-xs text-theme-foreground-muted">Paste the link into the box above to merge video and audio streams.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-sm">3</span>
            <h3 className="text-base font-bold text-theme-foreground">Save Merged MP4</h3>
            <p className="text-xs text-theme-foreground-muted">Download your high-definition video with crystal-clear sound.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-6 text-left shadow-sm">
        <div className="flex items-center gap-3 border-b border-theme-border/30 pb-4">
          <HelpCircle size={22} className="text-orange-500" />
          <h2 className="text-xl font-extrabold text-theme-foreground">Reddit Downloader FAQ</h2>
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
