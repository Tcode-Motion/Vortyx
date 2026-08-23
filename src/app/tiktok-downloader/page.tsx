import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import UniversalDownloader from "../../components/downloader/UniversalDownloader";
import { Film, HelpCircle, Sparkles, Music } from "lucide-react";

export const metadata: Metadata = {
  title: "TikTok Video Downloader Without Watermark (HD MP4 & Audio MP3)",
  description:
    "Download TikTok videos without watermark in full HD MP4 format. Extract TikTok audio sound clips online with zero software installation. 100% free.",
  alternates: {
    canonical: "https://techscript.is-a.dev/Vortyx/tiktok-downloader",
  },
  openGraph: {
    title: "TikTok Video Downloader Without Watermark — Vortyx",
    description: "Download clean TikTok videos and audio tracks with zero watermarks.",
    url: "https://techscript.is-a.dev/Vortyx/tiktok-downloader",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    q: "Does this downloader remove the TikTok watermark?",
    a: "Yes. Vortyx retrieves the clean, original high-definition MP4 video stream directly without the bouncing TikTok logo overlay.",
  },
  {
    q: "Can I download TikTok sounds and audio tracks as MP3?",
    a: "Yes. Switch to the 'Audio' tab after parsing any TikTok video URL to save the background music or audio clip as an MP3.",
  },
  {
    q: "Does it work on iPhone and Android mobile devices?",
    a: "Yes. Simply paste the TikTok link into Safari, Chrome, or any mobile browser to download videos straight to your gallery.",
  },
];

export default function TikTokDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Vortyx TikTok Video Downloader",
        "url": "https://techscript.is-a.dev/Vortyx/tiktok-downloader",
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-extrabold uppercase tracking-wider">
          <Film size={14} />
          No-Watermark TikTok Saver
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-theme-foreground tracking-tight leading-tight">
          Free <span className="bg-gradient-to-r from-cyan-400 via-brand-pink to-brand-coral bg-clip-text text-transparent">TikTok Video</span> Downloader
        </h1>
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          Download TikTok videos without watermark in HD MP4 format. Extract trending audio tracks and sounds with high speed.
        </p>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-sm text-theme-foreground-muted">Loading Downloader...</div>}>
        <UniversalDownloader />
      </Suspense>

      {/* Guide */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-8 shadow-sm text-left">
        <h2 className="text-2xl font-extrabold text-theme-foreground">How to Download TikTok Videos Without Watermark</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold flex items-center justify-center text-sm">1</span>
            <h3 className="text-base font-bold text-theme-foreground">Copy TikTok Link</h3>
            <p className="text-xs text-theme-foreground-muted">Tap the share button on TikTok and copy the video URL.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-brand-pink/10 text-brand-pink font-bold flex items-center justify-center text-sm">2</span>
            <h3 className="text-base font-bold text-theme-foreground">Paste Link</h3>
            <p className="text-xs text-theme-foreground-muted">Paste the link into Vortyx and click &quot;Get Media&quot;.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-sm">3</span>
            <h3 className="text-base font-bold text-theme-foreground">Save Clean MP4</h3>
            <p className="text-xs text-theme-foreground-muted">Download the video directly with zero watermark or logo overlay.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-6 text-left shadow-sm">
        <div className="flex items-center gap-3 border-b border-theme-border/30 pb-4">
          <HelpCircle size={22} className="text-cyan-400" />
          <h2 className="text-xl font-extrabold text-theme-foreground">TikTok Downloader FAQ</h2>
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
