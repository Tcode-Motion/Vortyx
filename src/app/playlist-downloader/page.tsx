import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import UniversalDownloader from "../../components/downloader/UniversalDownloader";
import { Layers, ListMusic, Zap, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Playlist & Batch Video Downloader — YouTube & SoundCloud",
  description:
    "Download entire YouTube playlists, albums, and SoundCloud sets online. Batch parse media URLs and export in MP4 or MP3 format with high-speed processing.",
  alternates: {
    canonical: "https://techscript.is-a.dev/Vortyx/playlist-downloader",
  },
  openGraph: {
    title: "Playlist & Batch Media Downloader — Vortyx",
    description: "Download full playlists and multi-video collections in high quality.",
    url: "https://techscript.is-a.dev/Vortyx/playlist-downloader",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    q: "How do I download an entire YouTube playlist?",
    a: "Paste the playlist URL (e.g. youtube.com/playlist?list=...) into the downloader above. Vortyx will extract the playlist metadata and list the tracks ready for individual or batch downloading.",
  },
  {
    q: "Can I download playlists as MP3 audio albums?",
    a: "Yes. Switch to the Audio tab to batch-convert playlist videos into MP3 format at 320kbps.",
  },
  {
    q: "Is there a limit on playlist length?",
    a: "Vortyx can parse playlists containing up to 100 tracks per request. For larger sets, you can paste specific track segments.",
  },
];

export default function PlaylistDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Vortyx Playlist Downloader",
        "url": "https://techscript.is-a.dev/Vortyx/playlist-downloader",
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-extrabold uppercase tracking-wider">
          <ListMusic size={14} />
          Batch &amp; Album Downloader
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-theme-foreground tracking-tight leading-tight">
          Free <span className="bg-gradient-to-r from-purple-400 via-brand-pink to-brand-coral bg-clip-text text-transparent">Playlist &amp; Batch</span> Downloader
        </h1>
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          Download full YouTube playlists, music albums, and SoundCloud sets. Batch parse links and export in 1080p MP4 or 320kbps MP3 format.
        </p>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-sm text-theme-foreground-muted">Loading Downloader...</div>}>
        <UniversalDownloader />
      </Suspense>

      {/* Guide */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-8 shadow-sm text-left">
        <h2 className="text-2xl font-extrabold text-theme-foreground">How to Download Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 font-bold flex items-center justify-center text-sm">1</span>
            <h3 className="text-base font-bold text-theme-foreground">Copy Playlist URL</h3>
            <p className="text-xs text-theme-foreground-muted">Copy the link of any public YouTube playlist or SoundCloud set.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-brand-pink/10 text-brand-pink font-bold flex items-center justify-center text-sm">2</span>
            <h3 className="text-base font-bold text-theme-foreground">Batch Parse</h3>
            <p className="text-xs text-theme-foreground-muted">Paste into Vortyx to extract the tracklist and metadata.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-sm">3</span>
            <h3 className="text-base font-bold text-theme-foreground">Export Files</h3>
            <p className="text-xs text-theme-foreground-muted">Save your chosen videos or audio tracks with one click.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-6 text-left shadow-sm">
        <div className="flex items-center gap-3 border-b border-theme-border/30 pb-4">
          <HelpCircle size={22} className="text-purple-400" />
          <h2 className="text-xl font-extrabold text-theme-foreground">Playlist Downloader FAQ</h2>
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
