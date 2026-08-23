import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import UniversalDownloader from "../../components/downloader/UniversalDownloader";
import { Music, Headphones, Zap, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Audio & MP3 Downloader (320kbps & High Quality)",
  description:
    "Extract audio and convert video links to high-quality 320kbps MP3 from YouTube, SoundCloud, TikTok, and 35+ platforms. Fast, online, and free.",
  alternates: {
    canonical: "https://techscript.is-a.dev/Vortyx/audio-downloader",
  },
  openGraph: {
    title: "Free Audio & MP3 Downloader (320kbps) — Vortyx",
    description: "Convert video to MP3 and download pristine audio tracks online.",
    url: "https://techscript.is-a.dev/Vortyx/audio-downloader",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    q: "What audio formats and bitrates are supported?",
    a: "Vortyx extracts audio in standard MP3 format at 320kbps, 256kbps, and 128kbps, as well as native M4A/AAC streams where available.",
  },
  {
    q: "Can I extract audio from YouTube videos and TikTok clips?",
    a: "Yes. Paste any YouTube, TikTok, Facebook, or Instagram link, and switch to the 'Audio' tab to extract and download the isolated audio track.",
  },
  {
    q: "Can I download SoundCloud tracks?",
    a: "Yes. SoundCloud tracks and public sets can be downloaded directly in full bitrate MP3 format.",
  },
  {
    q: "Is the audio quality degraded during conversion?",
    a: "No. Vortyx extracts the original audio stream and packages it into a standard MP3 container using FFmpeg with high fidelity settings.",
  },
];

export default function AudioDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Vortyx Audio & MP3 Downloader",
        "url": "https://techscript.is-a.dev/Vortyx/audio-downloader",
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-extrabold uppercase tracking-wider">
          <Headphones size={14} />
          High-Fidelity Audio Extractor
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-theme-foreground tracking-tight leading-tight">
          Free <span className="bg-gradient-to-r from-amber-400 via-brand-coral to-brand-pink bg-clip-text text-transparent">Audio &amp; MP3</span> Downloader
        </h1>
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          Extract high-bitrate 320kbps MP3 audio tracks from YouTube, SoundCloud, TikTok, and 35+ portals with Range preview and lossless stream verification.
        </p>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-sm text-theme-foreground-muted">Loading Downloader...</div>}>
        <UniversalDownloader />
      </Suspense>

      {/* Guide */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-8 shadow-sm text-left">
        <h2 className="text-2xl font-extrabold text-theme-foreground">How to Extract &amp; Download MP3 Audio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 font-bold flex items-center justify-center text-sm">1</span>
            <h3 className="text-base font-bold text-theme-foreground">Copy Media Link</h3>
            <p className="text-xs text-theme-foreground-muted">Copy the URL from YouTube, SoundCloud, TikTok, or any supported social portal.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-brand-coral/10 text-brand-coral font-bold flex items-center justify-center text-sm">2</span>
            <h3 className="text-base font-bold text-theme-foreground">Extract Streams</h3>
            <p className="text-xs text-theme-foreground-muted">Paste the link above and click &quot;Get Media&quot; to isolate the audio stream.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-sm">3</span>
            <h3 className="text-base font-bold text-theme-foreground">Save 320k MP3</h3>
            <p className="text-xs text-theme-foreground-muted">Select your desired bitrate (320k, 256k, 128k) and download the MP3 file.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-6 text-left shadow-sm">
        <div className="flex items-center gap-3 border-b border-theme-border/30 pb-4">
          <HelpCircle size={22} className="text-amber-500" />
          <h2 className="text-xl font-extrabold text-theme-foreground">Audio Downloader FAQ</h2>
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

      <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-theme-foreground-muted">
        <span>Related tools:</span>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/youtube-downloader" className="hover:text-amber-500 transition-colors">YouTube to MP3</Link>
          <span>&bull;</span>
          <Link href="/soundcloud-downloader" className="hover:text-amber-500 transition-colors">SoundCloud Downloader</Link>
          <span>&bull;</span>
          <Link href="/spotify-downloader" className="hover:text-amber-500 transition-colors">Spotify Matcher</Link>
          <span>&bull;</span>
          <Link href="/video-downloader" className="hover:text-amber-500 transition-colors">Video Downloader</Link>
        </div>
      </div>
    </div>
  );
}
