import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import UniversalDownloader from "../../components/downloader/UniversalDownloader";
import { Music, Radio, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Spotify Music & Track Matcher (Metadata & Stream Finder) — Vortyx",
  description:
    "Extract Spotify track and playlist metadata, ISRC codes, and find equivalent verified public audio streams for offline listening. Fast and transparent.",
  alternates: {
    canonical: "https://techscript.is-a.dev/Vortyx/spotify-downloader",
  },
  openGraph: {
    title: "Spotify Music & Track Matcher — Vortyx",
    description: "Resolve Spotify track metadata and discover equivalent high-quality streams.",
    url: "https://techscript.is-a.dev/Vortyx/spotify-downloader",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    q: "How does the Spotify stream matching work?",
    a: "Vortyx extracts the official title, artist, album, and ISRC metadata from the Spotify link, then performs confidence-scored search matching against verified public audio sources to deliver the exact equivalent track.",
  },
  {
    q: "Does this bypass Spotify DRM encryption?",
    a: "No. Vortyx respects digital rights management and copyright boundaries. It does not tamper with Spotify DRM; instead, it matches track metadata against public and legal audio representations.",
  },
  {
    q: "Can I match entire Spotify playlists?",
    a: "Yes. Paste any public Spotify playlist URL to parse the tracklist metadata and find stream matches for each individual track.",
  },
];

export default function SpotifyDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Vortyx Spotify Track Matcher",
        "url": "https://techscript.is-a.dev/Vortyx/spotify-downloader",
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
          <Radio size={14} />
          Spotify Metadata &amp; Stream Finder
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-theme-foreground tracking-tight leading-tight">
          Spotify <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Music &amp; Track</span> Matcher
        </h1>
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          Extract Spotify track and playlist metadata, and discover verified equivalent audio streams with confidence scoring.
        </p>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-sm text-theme-foreground-muted">Loading Downloader...</div>}>
        <UniversalDownloader />
      </Suspense>

      {/* Guide */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-8 shadow-sm text-left">
        <h2 className="text-2xl font-extrabold text-theme-foreground">How Spotify Track Matching Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center text-sm">1</span>
            <h3 className="text-base font-bold text-theme-foreground">Copy Spotify Track URL</h3>
            <p className="text-xs text-theme-foreground-muted">Copy the link of any song or public playlist from Spotify.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-brand-pink/10 text-brand-pink font-bold flex items-center justify-center text-sm">2</span>
            <h3 className="text-base font-bold text-theme-foreground">Resolve Metadata</h3>
            <p className="text-xs text-theme-foreground-muted">Vortyx extracts track metadata and queries equivalent public streams.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold flex items-center justify-center text-sm">3</span>
            <h3 className="text-base font-bold text-theme-foreground">Download Verified MP3</h3>
            <p className="text-xs text-theme-foreground-muted">Select the best matched stream and download the audio track.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-6 text-left shadow-sm">
        <div className="flex items-center gap-3 border-b border-theme-border/30 pb-4">
          <HelpCircle size={22} className="text-emerald-400" />
          <h2 className="text-xl font-extrabold text-theme-foreground">Spotify Matcher FAQ</h2>
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
