"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu,
  Globe,
  Share2,
  Tv,
  Zap,
  Sliders,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Smartphone,
} from "lucide-react";

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = [
    {
      id: 0,
      title: "Universal Web & App Downloader",
      tagline: "Instant Browser Access & Native Android",
      icon: <Globe className="text-brand-pink" size={32} />,
      badge: "Universal Access",
      desc: "Vortyx offers the best of both worlds: a high-speed online Web Downloader directly in your browser on PC, Mac, iPhone, and iPad, plus a native Android APK equipped with background download queues and local storage integration.",
      benefits: [
        "Zero-installation Web Downloader accessible from any device",
        "Direct 1080p MP4, 4K, and 320kbps MP3 downloads in the browser",
        "Zero-watermark TikTok and Instagram Reels extraction",
        "Integrated in-browser live video and audio player preview",
      ],
      example: "Paste any link on the home page -> Preview video stream directly -> Save 1080p MP4 or MP3 file in seconds.",
    },
    {
      id: 1,
      title: "Multi-Engine Resolver",
      tagline: "AI & API In Synergy",
      icon: <Cpu className="text-brand-coral" size={32} />,
      badge: "AI-Enhanced",
      desc: "Vortyx uses a proprietary fallback workflow to parse media links. When a user pastes a URL, it is first processed via high-speed Cobalt API instances. If the API hits a block or rate limit, Vortyx queries the Gemini Flash AI model to extract structural schemas from the target HTML, or routes the request to our custom MediaPick scraper.",
      benefits: [
        "Unmatched link resolution success rates (99.8% uptime)",
        "Bypasses complex JavaScript-heavy anti-scraping walls",
        "Supports playlist and catalog extraction automatically",
        "Constant serverless definition updates behind the scenes",
      ],
      example: "Paste a protected short-video link -> Vortyx resolves direct CDN stream -> Downloads 1080p MP4 in seconds.",
    },
    {
      id: 2,
      title: "50+ Supported Portals",
      tagline: "One Tool, Infinite Sources",
      icon: <Sparkles className="text-brand-amber" size={32} />,
      badge: "Universal Support",
      desc: "Ditch the bookmarks. Vortyx integrates direct media extraction for over 50 social, music, video, and creative portals. From mainstream video sharing sites to local music catalogs and design portfolio communities, Vortyx recognizes the URL and structures the download workflow accordingly.",
      benefits: [
        "Video portals: YouTube (Videos, Shorts, Playlists), TikTok, Facebook Reels, Instagram Stories/Reels, Vimeo, Dailymotion",
        "Music/Audio portals: Spotify, SoundCloud, Apple Music, Gaana, JioSaavn, Tidal, Deezer",
        "Creative assets: Pinterest Pins, Flickr, Behance, Dribbble, ArtStation, Imgur, Pixiv",
        "Social posts: Telegram Channels, Discord attachments, Reddit threads, Snapchat Spotlight",
      ],
      example: "Copy a Spotify playlist link -> Vortyx queries metadata, matches tracks on YouTube, and downloads high-fidelity MP3 files with album art.",
    },
    {
      id: 3,
      title: "WhatsApp Status Saver",
      tagline: "100% Offline, Zero Data Usage",
      icon: <Share2 className="text-emerald-400" size={32} />,
      badge: "Privacy Focused",
      desc: "Unlike online status savers that require you to upload cookies or links, Vortyx's WhatsApp Status Saver in our Android app works entirely locally on your device. By securely requesting authorization to the Android documents tree, the app scans WhatsApp and WhatsApp Business status caches directly.",
      benefits: [
        "Saves image and video statuses in original quality",
        "Requires zero network connection to function",
        "Completely private—the poster never knows you saved their status",
        "Supports quick share and set-as-wallpaper directly from the app",
      ],
      example: "Open WhatsApp to load statuses -> Open Vortyx Saver Tab -> Instantly download or share any status to your device.",
    },
    {
      id: 4,
      title: "Integrated Media Center",
      tagline: "High-Fidelity Offline Playback",
      icon: <Tv className="text-indigo-400" size={32} />,
      badge: "Media3 Suite",
      desc: "Vortyx is not just a downloader; it is a full-featured media manager. Built on modern Google Media3 and ExoPlayer frameworks, it delivers highly optimized local audio and video playback, complete with system Media Session integration.",
      benefits: [
        "Video player with fluid swipe gesture controls and Picture-in-Picture (PiP) multitasking",
        "Background music player service running asynchronously via System Foreground Service",
        "Full-screen image viewer supporting multi-touch pinch-to-zoom and detailed EXIF inspection",
        "Integrated file manager to rename, delete, or export media files directly to system storage",
      ],
      example: "Minimize the video player to a floating window using Picture-in-Picture while browsing or taking notes.",
    },
    {
      id: 5,
      title: "Clipboard Auto-Detect",
      tagline: "Zero-Click Link Analysis",
      icon: <Zap className="text-yellow-400" size={32} />,
      badge: "Instant Action",
      desc: "Vortyx speeds up your media harvesting with clipboard listeners that run fully client-side. The app detects when a supported media link is copied to the clipboard and handles it instantly, without sending data to servers.",
      benefits: [
        "Auto-detects URLs matching our 50+ supported platform schemas",
        "Launches a subtle floating indicator to prompt download upon opening the app",
        "Supports batch copying—paste multiple links on separate lines for bulk queueing",
        "Allows single-tap downloads via the system share sheet (Intent ACTION_SEND)",
      ],
      example: "Copy a tweet URL in X -> Open Vortyx -> Tap 'Use Clipboard Link' banner -> Download starts instantly.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Powerful Engineering. Zero Friction.
        </h1>
        <p className="text-base sm:text-lg text-theme-foreground-muted leading-relaxed">
          Explore the technology behind Vortyx: browser-based universal downloading, multi-engine resolvers, and an offline Android media suite.
        </p>
      </div>

      {/* Interactive Tabs Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          {features.map((feat, idx) => {
            const isSelected = selectedFeature === idx;
            return (
              <button
                key={feat.id}
                onClick={() => setSelectedFeature(idx)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 flex items-center justify-between border cursor-pointer ${
                  isSelected
                    ? "bg-theme-surface border-brand-pink/40 shadow-lg shadow-brand-pink/5"
                    : "bg-transparent border-transparent hover:bg-theme-surface/50 text-theme-foreground-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl border ${
                      isSelected
                        ? "bg-theme-surface-elevated border-brand-pink/20"
                        : "bg-theme-surface border-theme-border/40"
                    }`}
                  >
                    {feat.icon}
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-theme-foreground">
                      {feat.title}
                    </span>
                    <span className="block text-xs text-theme-foreground-muted">
                      {feat.tagline}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isSelected ? "bg-brand-pink scale-125" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Feature Detail Display Card */}
        <div className="lg:col-span-8">
          <motion.div
            key={selectedFeature}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-theme-surface border border-theme-border/40 p-6 sm:p-10 rounded-3xl space-y-8 shadow-xl"
          >
            {/* Top Badge & Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border/20 pb-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-pink">
                  {features[selectedFeature].tagline}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-foreground">
                  {features[selectedFeature].title}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-brand-pink/10 text-brand-pink border border-brand-pink/20 text-xs font-semibold self-start sm:self-auto">
                {features[selectedFeature].badge}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
              {features[selectedFeature].desc}
            </p>

            {/* Benefits Checklist */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-theme-foreground">
                Key Advantages &amp; Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features[selectedFeature].benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="text-brand-pink mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-theme-foreground-muted leading-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action / Example */}
            <div className="p-5 rounded-2xl bg-theme-surface-elevated border border-theme-border/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-theme-foreground uppercase tracking-wide">
                <HelpCircle size={16} className="text-brand-coral" />
                Workflow Demonstration
              </div>
              <p className="text-xs sm:text-sm text-theme-foreground-muted leading-relaxed italic">
                &ldquo;{features[selectedFeature].example}&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Benefits Summary Banner */}
      <section className="bg-gradient-to-r from-brand-pink/10 via-brand-coral/10 to-brand-amber/10 border border-brand-pink/20 rounded-3xl p-8 sm:p-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-foreground leading-tight">
              Experience Vortyx Right Now
            </h2>
            <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
              Use our instant Web Downloader in your browser, or install the lightweight 9.54MB Android APK for background batch downloads and offline WhatsApp status saving.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 justify-start md:justify-end">
            <Link
              href="/"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-brand-pink to-brand-coral text-white font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-brand-pink/20 transition-all duration-300"
            >
              <Globe size={16} />
              Web Downloader
            </Link>
            <Link
              href="/download"
              className="px-6 py-3.5 rounded-full bg-theme-surface border border-theme-border/60 hover:bg-theme-surface-elevated text-theme-foreground font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300"
            >
              <Smartphone size={16} />
              Get Android APK
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
