import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import UniversalDownloader from "../../components/downloader/UniversalDownloader";
import {
  Video,
  Music,
  CheckCircle,
  Zap,
  ShieldCheck,
  Film,
  Download,
  HelpCircle,
  Layers,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube Video Downloader (4K, 1080p MP4 & 320kbps MP3)",
  description:
    "Free online YouTube video downloader. Save YouTube videos in 4K, 1440p, 1080p Full HD MP4, or convert to high-bitrate 320kbps MP3 audio with instant preview.",
  alternates: {
    canonical: "https://techscript.is-a.dev/Vortyx/youtube-downloader",
  },
  openGraph: {
    title: "YouTube Video Downloader (4K MP4 & MP3) — Vortyx",
    description:
      "Fast, private YouTube downloader with zero software installation. Save videos, Shorts, audio tracks, and thumbnails directly in your browser.",
    url: "https://techscript.is-a.dev/Vortyx/youtube-downloader",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    q: "How do I download YouTube videos in 1080p or 4K quality?",
    a: "Simply copy the YouTube video link from your browser or the YouTube app, paste it into the box above, and click 'Get Media'. Select your desired resolution (4K, 1440p, 1080p, or 720p) and click 'Save MP4'.",
  },
  {
    q: "Can I download YouTube Shorts with this tool?",
    a: "Yes! Paste any YouTube Shorts URL (e.g. youtube.com/shorts/...) into the downloader, and it will immediately extract the full vertical HD video container without watermarks.",
  },
  {
    q: "How can I convert a YouTube video to MP3 audio?",
    a: "Switch to the 'Audio' tab after resolving your video, or select an audio bitrate (320kbps, 256kbps, 128kbps). The system extracts the pristine audio stream and packages it as an MP3 file.",
  },
  {
    q: "Is any registration or software download required?",
    a: "No. Vortyx runs completely inside your modern web browser. There are no extensions to install, no sign-ups required, and no hidden subscriptions.",
  },
];

export default function YouTubeDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Vortyx YouTube Video Downloader",
        "url": "https://techscript.is-a.dev/Vortyx/youtube-downloader",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-16 max-w-6xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-extrabold uppercase tracking-wider">
          <Film size={14} />
          YouTube Video &amp; Shorts Extractor
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-theme-foreground tracking-tight leading-tight">
          Free <span className="bg-gradient-to-r from-red-500 to-brand-coral bg-clip-text text-transparent">YouTube Video</span> Downloader
        </h1>
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          Download YouTube videos in Ultra HD 4K, 1080p MP4, convert to 320kbps MP3 audio, extract subtitles, and save video thumbnails with verified container validation.
        </p>
      </div>

      {/* Interactive Tool */}
      <Suspense fallback={<div className="p-12 text-center text-sm text-theme-foreground-muted">Loading Downloader...</div>}>
        <UniversalDownloader />
      </Suspense>

      {/* How It Works Guide */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-8 shadow-sm text-left">
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-theme-foreground">How to Download YouTube Videos in 3 Simple Steps</h2>
          <p className="text-xs text-theme-foreground-muted">Follow this quick guide to extract any YouTube video or audio track immediately.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 font-extrabold flex items-center justify-center text-lg">
              1
            </div>
            <h3 className="text-base font-bold text-theme-foreground">Copy YouTube URL</h3>
            <p className="text-xs text-theme-foreground-muted leading-relaxed">
              Open YouTube, navigate to your desired video or Shorts clip, and copy the URL from your browser address bar or the Share menu.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-pink/10 text-brand-pink font-extrabold flex items-center justify-center text-lg">
              2
            </div>
            <h3 className="text-base font-bold text-theme-foreground">Paste &amp; Resolve</h3>
            <p className="text-xs text-theme-foreground-muted leading-relaxed">
              Paste the link into the Vortyx downloader input above and click &quot;Get Media&quot;. Our engine resolves all available streams in seconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 font-extrabold flex items-center justify-center text-lg">
              3
            </div>
            <h3 className="text-base font-bold text-theme-foreground">Save Video or Audio</h3>
            <p className="text-xs text-theme-foreground-muted leading-relaxed">
              Choose your preferred video quality (4K, 1080p, 720p) or MP3 bitrate (320kbps) and save the verified media file directly.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border/40 space-y-2">
          <div className="p-2.5 rounded-xl bg-brand-pink/10 text-brand-pink w-fit">
            <Video size={20} />
          </div>
          <h3 className="text-sm font-bold text-theme-foreground">4K &amp; 1080p Full HD</h3>
          <p className="text-xs text-theme-foreground-muted">Extract native high-frame-rate video with zero compression artifacts.</p>
        </div>

        <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border/40 space-y-2">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 w-fit">
            <Music size={20} />
          </div>
          <h3 className="text-sm font-bold text-theme-foreground">320kbps MP3 Audio</h3>
          <p className="text-xs text-theme-foreground-muted">Isolate audio tracks and convert YouTube streams into standard MP3 format.</p>
        </div>

        <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border/40 space-y-2">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit">
            <Zap size={20} />
          </div>
          <h3 className="text-sm font-bold text-theme-foreground">Range 206 Preview</h3>
          <p className="text-xs text-theme-foreground-muted">Preview video and audio before downloading with instant scrubbing and seeking.</p>
        </div>

        <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border/40 space-y-2">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 w-fit">
            <ShieldCheck size={20} />
          </div>
          <h3 className="text-sm font-bold text-theme-foreground">100% Free &amp; Private</h3>
          <p className="text-xs text-theme-foreground-muted">Zero account requirement, zero tracking, and strict SSRF security defense.</p>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-6 text-left shadow-sm">
        <div className="flex items-center gap-3 border-b border-theme-border/30 pb-4">
          <div className="p-2.5 rounded-2xl bg-red-500/10 text-red-500">
            <HelpCircle size={22} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-theme-foreground">Frequently Asked Questions</h2>
            <p className="text-xs text-theme-foreground-muted">Common questions about downloading YouTube media on Vortyx.</p>
          </div>
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

      {/* Internal Navigation Links */}
      <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-theme-foreground-muted">
        <span>Explore more downloaders:</span>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/video-downloader" className="hover:text-brand-pink transition-colors">Video Downloader</Link>
          <span>&bull;</span>
          <Link href="/audio-downloader" className="hover:text-brand-pink transition-colors">Audio &amp; MP3</Link>
          <span>&bull;</span>
          <Link href="/playlist-downloader" className="hover:text-brand-pink transition-colors">Playlist Downloader</Link>
          <span>&bull;</span>
          <Link href="/instagram-downloader" className="hover:text-brand-pink transition-colors">Instagram Downloader</Link>
          <span>&bull;</span>
          <Link href="/tiktok-downloader" className="hover:text-brand-pink transition-colors">TikTok Downloader</Link>
        </div>
      </div>
    </div>
  );
}
