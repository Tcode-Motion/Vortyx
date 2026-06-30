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
} from "lucide-react";

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = [
    {
      id: 0,
      title: "Multi-Engine Resolver",
      tagline: "AI & API In Synergy",
      icon: <Cpu className="text-brand-pink" size={32} />,
      badge: "AI-Enhanced",
      desc: "Vortyx uses a proprietary fallback workflow to parse media links. When a user pastes a URL, it is first processed via the high-speed Cobalt API. If the API hits a block or rate limit, Vortyx queries the Gemini 3.5 Flash model to extract structural schemas from the target HTML, or routes the request to our custom MediaPick backend scraper.",
      benefits: [
        "Unmatched link resolution success rates (99.8% uptime)",
        "Bypasses complex JavaScript-heavy anti-scraping walls",
        "Supports playlist and catalog extraction automatically",
        "Constant serverless definition updates behind the scenes",
      ],
      example: "Paste a protected short-video link -> Vortyx resolves direct CDN stream -> Downloads 1080p MP4 in seconds.",
    },
    {
      id: 1,
      title: "50+ Supported Portals",
      tagline: "One App, Infinite Sources",
      icon: <Globe className="text-brand-coral" size={32} />,
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
      id: 2,
      title: "WhatsApp Status Saver",
      tagline: "100% Offline, Zero Data Usage",
      icon: <Share2 className="text-emerald-400" size={32} />,
      badge: "Privacy Focused",
      desc: "Unlike online status savers that require you to upload cookies or links, Vortyx's WhatsApp Status Saver works entirely locally on your device. By securely requesting authorization to the Android documents tree, the app scans WhatsApp and WhatsApp Business status caches directly.",
      benefits: [
        "Saves image and video statuses in original quality",
        "Requires zero network connection to function",
        "Completely private—the poster never knows you saved their status",
        "Supports quick share and set-as-wallpaper directly from the app",
      ],
      example: "Open WhatsApp to load statuses -> Open Vortyx Saver Tab -> Instantly download or share any status to your device.",
    },
    {
      id: 3,
      title: "Integrated Media Center",
      tagline: "High-Fidelity Offline Playback",
      icon: <Tv className="text-brand-amber" size={32} />,
      badge: "Media3 Suite",
      desc: "Vortyx is not just a downloader; it is a full-featured media manager. Built on the modern Google Media3 and ExoPlayer framework, it delivers highly optimized local audio and video playback, complete with system Media Session integration.",
      benefits: [
        "Video player with fluid swipe gesture controls and Picture-in-Picture (PiP) multitasking",
        "Background music player service running asynchronously via System Foreground Service",
        "Full-screen image viewer supporting multi-touch pinch-to-zoom and detailed EXIF inspection",
        "Integrated file manager to rename, delete, or export media files directly to system storage",
      ],
      example: "Minimize the video player to a floating window using Picture-in-Picture while browsing or taking notes.",
    },
    {
      id: 4,
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
    {
      id: 5,
      title: "Queue Scheduling & Controls",
      tagline: "Configure Your Bandwidth",
      icon: <Sliders className="text-indigo-400" size={32} />,
      badge: "Smart Queue",
      desc: "Take total control of your network usage. Vortyx includes a powerful, multi-threaded batch download queue managed via WorkManager. It lets you customize how and when downloads are processed, saving mobile data caps.",
      benefits: [
        "Wi-Fi only download setting prevents mobile data usage on large video queues",
        "Adjustable parallel download limits (1 to 5 files downloading simultaneously)",
        "Quiet Hours scheduler to pause downloading tasks during work or sleep automatically",
        "Automatic retry protocol with exponential backoff for network interruptions",
      ],
      example: "Set parallel limit to 3, enable Wi-Fi only, and schedule downloads to run between 2:00 AM and 6:00 AM.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight"
        >
          Explore All features
        </motion.h1>
        <p className="text-base sm:text-lg text-theme-foreground-muted leading-relaxed">
          Vortyx is built with modern Android guidelines, combining cutting-edge AI and offline-first capabilities. Discover how each feature helps you manage your media portfolio.
        </p>
      </div>

      {/* Main Interactive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Navigation Buttons */}
        <div className="lg:col-span-4 space-y-3">
          <span className="block text-xs font-bold uppercase tracking-wider text-theme-foreground-muted mb-2 px-2">
            Features Navigator
          </span>
          <div className="flex overflow-x-auto lg:flex-col gap-2 pb-4 lg:pb-0 no-scrollbar">
            {features.map((feat) => (
              <button
                key={feat.id}
                onClick={() => setSelectedFeature(feat.id)}
                className={`flex-shrink-0 lg:w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                  selectedFeature === feat.id
                    ? "bg-brand-pink/10 border-brand-pink/30 text-theme-foreground shadow-md"
                    : "bg-theme-surface border-theme-border/40 text-theme-foreground-muted hover:text-theme-foreground hover:bg-theme-surface-elevated"
                }`}
              >
                <div className="flex-shrink-0">{feat.icon}</div>
                <div>
                  <span className="block text-sm font-bold">{feat.title}</span>
                  <span className="block text-xs opacity-75 hidden sm:block mt-0.5">{feat.tagline}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Active Card Detail */}
        <div className="lg:col-span-8">
          <motion.div
            key={selectedFeature}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-theme-surface border border-theme-border/40 p-6 sm:p-10 rounded-3xl space-y-8 shadow-xl"
          >
            {/* Title / Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border/20 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-brand-pink uppercase tracking-wide">
                  {features[selectedFeature].tagline}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-foreground">
                  {features[selectedFeature].title}
                </h2>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-brand-pink/15 text-brand-pink text-xs font-bold w-fit">
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
      <section className="bg-gradient-to-r from-brand-pink/5 via-brand-coral/5 to-brand-amber/5 border border-theme-border/40 rounded-3xl p-8 sm:p-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-foreground leading-tight">
              Ready to Upgrade Your Media Workflow?
            </h2>
            <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
              Vortyx delivers all these features in a single, lightweight package that does not track your location, collect your browsing habits, or sell your files. Get the native APK installer now.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <Link
              href="/download"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber text-white font-bold flex items-center gap-2 hover:brightness-110 shadow-lg transition-all duration-300"
            >
              Get Vortyx Today
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
