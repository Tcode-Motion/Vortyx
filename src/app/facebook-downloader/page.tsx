import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import UniversalDownloader from "../../components/downloader/UniversalDownloader";
import { Film, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Facebook Video Downloader (Full HD 1080p MP4) — Vortyx",
  description:
    "Download Facebook videos, Reels, and public clips in 1080p Full HD MP4 format. Free online Facebook downloader with fast and private extraction.",
  alternates: {
    canonical: "https://techscript.is-a.dev/Vortyx/facebook-downloader",
  },
  openGraph: {
    title: "Facebook Video Downloader (Full HD MP4) — Vortyx",
    description: "Download Facebook videos and Reels online in Full HD MP4.",
    url: "https://techscript.is-a.dev/Vortyx/facebook-downloader",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    q: "How do I download Facebook videos in Full HD?",
    a: "Copy the link of any public Facebook video or Reel, paste it into the downloader above, and click 'Get Media'. Choose 1080p or 720p and click 'Save MP4'.",
  },
  {
    q: "Can I download Facebook Reels and Watch clips?",
    a: "Yes. Vortyx supports all Facebook video formats including Reels, Watch videos, group videos, and public timeline clips.",
  },
  {
    q: "Does this require logging in to Facebook?",
    a: "No. Vortyx works completely anonymously without asking for your Facebook account or credentials.",
  },
];

export default function FacebookDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Vortyx Facebook Video Downloader",
        "url": "https://techscript.is-a.dev/Vortyx/facebook-downloader",
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-extrabold uppercase tracking-wider">
          <Film size={14} />
          Facebook HD Video Saver
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-theme-foreground tracking-tight leading-tight">
          Free <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-brand-coral bg-clip-text text-transparent">Facebook Video</span> Downloader
        </h1>
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          Download Facebook videos and Reels in 1080p Full HD MP4 format. Extract audio tracks and save clips with high speed and zero login.
        </p>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-sm text-theme-foreground-muted">Loading Downloader...</div>}>
        <UniversalDownloader />
      </Suspense>

      {/* Guide */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-8 shadow-sm text-left">
        <h2 className="text-2xl font-extrabold text-theme-foreground">How to Download Facebook Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 font-bold flex items-center justify-center text-sm">1</span>
            <h3 className="text-base font-bold text-theme-foreground">Copy Facebook Video Link</h3>
            <p className="text-xs text-theme-foreground-muted">Tap the share button on Facebook and copy the link to the video.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-brand-pink/10 text-brand-pink font-bold flex items-center justify-center text-sm">2</span>
            <h3 className="text-base font-bold text-theme-foreground">Paste into Vortyx</h3>
            <p className="text-xs text-theme-foreground-muted">Paste the link in the box above and click &quot;Get Media&quot;.</p>
          </div>
          <div className="p-6 rounded-2xl bg-theme-surface-elevated border border-theme-border/30 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-sm">3</span>
            <h3 className="text-base font-bold text-theme-foreground">Download 1080p MP4</h3>
            <p className="text-xs text-theme-foreground-muted">Save your high-definition video directly to your storage.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-6 text-left shadow-sm">
        <div className="flex items-center gap-3 border-b border-theme-border/30 pb-4">
          <HelpCircle size={22} className="text-blue-400" />
          <h2 className="text-xl font-extrabold text-theme-foreground">Facebook Downloader FAQ</h2>
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
