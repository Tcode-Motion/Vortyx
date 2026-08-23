import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import UniversalDownloader from "../../components/downloader/UniversalDownloader";
import { Music, Radio, Headphones, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "SoundCloud to MP3 Downloader (320kbps High Quality Audio) — Vortyx",
  description:
    "Download SoundCloud tracks, songs, and sets to high-quality 320kbps MP3 audio files. Free online SoundCloud downloader with instant stream preview.",
  alternates: {
    canonical: "https://techscript.is-a.dev/Vortyx/soundcloud-downloader",
  },
  openGraph: {
    title: "SoundCloud to MP3 Downloader — Vortyx",
    description: "Download SoundCloud songs and sets in pristine 320kbps MP3 format.",
    url: "https://techscript.is-a.dev/Vortyx/soundcloud-downloader",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    q: "How do I download SoundCloud songs to MP3?",
    a: "Copy the track or set URL from SoundCloud, paste it into the downloader above, and click 'Get Media'. You can preview the track and download it as a 320kbps MP3.",
  },
  {
    q: "Can I download full SoundCloud DJ sets and playlists?",
    a: "Yes. Vortyx parses entire sets and playlists, allowing you to save the whole mix or individual tracks.",
  },
  {
    q: "Is there any loss of audio quality?",
    a: "No. Vortyx downloads the highest available native bitrate stream provided by SoundCloud.",
  },
];

export default function SoundCloudDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Vortyx SoundCloud Downloader",
        "url": "https://techscript.is-a.dev/Vortyx/soundcloud-downloader",
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-extrabold uppercase tracking-wider">
          <Headphones size={14} />
          SoundCloud MP3 Extractor
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-theme-foreground tracking-tight leading-tight">
          Free <span className="bg-gradient-to-r from-orange-500 to-brand-amber bg-clip-text text-transparent">SoundCloud to MP3</span> Downloader
        </h1>
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          Download SoundCloud tracks, remixes, and sets in high-quality 320kbps MP3 audio format with real-time Range preview.
        </p>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-sm text-theme-foreground-muted">Loading Downloader...</div>}>
        <UniversalDownloader />
      </Suspense>

      {/* Guide */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-8 shadow-sm text-left">
        <h2 className="text-2xl font-extrabold text-theme-foreground">How to Download SoundCloud Audio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 font-bold flex items-center justify-center text-sm">1</span>
            <h3 className="text-base font-bold text-theme-foreground">Copy SoundCloud Link</h3>
            <p className="text-xs text-theme-foreground-muted">Copy the URL of the track, remix, or playlist from SoundCloud.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-brand-pink/10 text-brand-pink font-bold flex items-center justify-center text-sm">2</span>
            <h3 className="text-base font-bold text-theme-foreground">Paste into Vortyx</h3>
            <p className="text-xs text-theme-foreground-muted">Paste the link into the box above and click &quot;Get Media&quot;.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-sm">3</span>
            <h3 className="text-base font-bold text-theme-foreground">Save 320k MP3</h3>
            <p className="text-xs text-theme-foreground-muted">Download your high-fidelity MP3 file immediately.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-6 text-left shadow-sm">
        <div className="flex items-center gap-3 border-b border-theme-border/30 pb-4">
          <HelpCircle size={22} className="text-orange-500" />
          <h2 className="text-xl font-extrabold text-theme-foreground">SoundCloud Downloader FAQ</h2>
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
