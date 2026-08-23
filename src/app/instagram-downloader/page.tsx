import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import UniversalDownloader from "../../components/downloader/UniversalDownloader";
import { Video, HelpCircle, Film, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Instagram Reels & Video Downloader (HD MP4 & Audio) — Vortyx",
  description:
    "Free Instagram video downloader. Download Instagram Reels, videos, IGTV, and stories in full HD MP4 format with audio. Fast, online, and anonymous.",
  alternates: {
    canonical: "https://techscript.is-a.dev/Vortyx/instagram-downloader",
  },
  openGraph: {
    title: "Instagram Reels & Video Downloader — Vortyx",
    description: "Download Instagram Reels, stories, and videos in HD MP4 with original audio.",
    url: "https://techscript.is-a.dev/Vortyx/instagram-downloader",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    q: "How can I download Instagram Reels with audio?",
    a: "Copy the link of any public Instagram Reel (from the 3-dots menu or browser bar), paste it into Vortyx, and click 'Get Media'. It extracts the HD MP4 video with synced original sound.",
  },
  {
    q: "Do I need to log in to my Instagram account?",
    a: "No. Vortyx never requests your Instagram login or credentials. It operates purely on public media streams.",
  },
  {
    q: "Can I download multiple images from an Instagram carousel post?",
    a: "Yes. Vortyx parses carousel posts and presents each full-resolution image and video for individual download.",
  },
];

export default function InstagramDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Vortyx Instagram Downloader",
        "url": "https://techscript.is-a.dev/Vortyx/instagram-downloader",
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-xs font-extrabold uppercase tracking-wider">
          <Film size={14} />
          Instagram Reels &amp; Video Saver
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-theme-foreground tracking-tight leading-tight">
          Free <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">Instagram Video</span> Downloader
        </h1>
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          Download Instagram Reels, stories, and post videos in 1080p Full HD MP4 with original sound. No login required.
        </p>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-sm text-theme-foreground-muted">Loading Downloader...</div>}>
        <UniversalDownloader />
      </Suspense>

      {/* Guide */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-8 shadow-sm text-left">
        <h2 className="text-2xl font-extrabold text-theme-foreground">How to Download Instagram Reels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-500 font-bold flex items-center justify-center text-sm">1</span>
            <h3 className="text-base font-bold text-theme-foreground">Copy Reel Link</h3>
            <p className="text-xs text-theme-foreground-muted">Tap the share button on the Instagram Reel and select &quot;Copy Link&quot;.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 font-bold flex items-center justify-center text-sm">2</span>
            <h3 className="text-base font-bold text-theme-foreground">Paste into Vortyx</h3>
            <p className="text-xs text-theme-foreground-muted">Paste the link into the box above and click &quot;Get Media&quot;.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-sm">3</span>
            <h3 className="text-base font-bold text-theme-foreground">Save HD MP4</h3>
            <p className="text-xs text-theme-foreground-muted">Preview the video with sound and download directly to your device.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-6 text-left shadow-sm">
        <div className="flex items-center gap-3 border-b border-theme-border/30 pb-4">
          <HelpCircle size={22} className="text-pink-500" />
          <h2 className="text-xl font-extrabold text-theme-foreground">Instagram Downloader FAQ</h2>
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
