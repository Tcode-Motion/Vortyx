"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  CheckCircle,
  Play,
  Share2,
  Smartphone,
  Shield,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
  Globe,
  Music,
  Video,
  Check,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Sliders,
  ExternalLink,
  Film,
  Headphones,
  ListMusic,
} from "lucide-react";
import GithubIcon from "../components/GithubIcon";
import PhoneMockup from "../components/PhoneMockup";
import ScreenshotCarousel from "../components/ScreenshotCarousel";
import UniversalDownloader from "../components/downloader/UniversalDownloader";
import PlatformHub from "../components/PlatformHub";

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const stats = [
    { label: "Supported Portals", value: "35+", desc: "YouTube, Instagram, TikTok, X, SoundCloud & more" },
    { label: "Online Web Tool", value: "100% Free", desc: "No app install required for browser downloads" },
    { label: "Audio & Video Quality", value: "4K / 320k", desc: "1080p/4K MP4 and high-fidelity MP3 audio" },
    { label: "Privacy Rating", value: "100%", desc: "Zero user accounts, no cookies or cloud logs" },
  ];

  const features = [
    {
      title: "Universal Web & App Downloader",
      desc: "Download directly on the web on any device (PC, Mac, iPhone, Android), or install our ultra-fast native Android APK for background batching.",
      icon: <Globe className="text-brand-pink" size={24} />,
    },
    {
      title: "Multi-Engine Link Resolver",
      desc: "Integrates resilient Cobalt API instances, Gemini Flash AI parser, and custom scrapers to resolve 99.8% of media links in one tap.",
      icon: <Layers className="text-brand-coral" size={24} />,
    },
    {
      title: "Built-In Media Player & Center",
      desc: "Stream and preview video with Picture-in-Picture (PiP), enjoy waveform audio visualization, and inspect full-resolution artwork.",
      icon: <Play className="text-brand-amber" size={24} />,
    },
    {
      title: "No Watermark Guarantee",
      desc: "Save TikTok, Instagram Reels, and Shorts in pure, unmodified original bitrate without annoying watermarks or logos.",
      icon: <Sparkles className="text-emerald-400" size={24} />,
    },
    {
      title: "WhatsApp Offline Status Saver",
      desc: "Local direct directory scanning for WhatsApp & WA Business statuses. Save pictures and video statuses to your gallery without data usage.",
      icon: <Share2 className="text-green-500" size={24} />,
    },
    {
      title: "Zero-Account Privacy",
      desc: "No registration, no emails, no passwords, and no server tracking. Everything is handled client-side or in your phone's local SQLite DB.",
      icon: <Shield className="text-indigo-400" size={24} />,
    },
  ];

  const comparisonData = [
    {
      feature: "Use in Web Browser (No App Needed)",
      vortyxWeb: true,
      vortyxApp: true,
      otherSites: true,
    },
    {
      feature: "100% Free & No Account Required",
      vortyxWeb: true,
      vortyxApp: true,
      otherSites: false,
    },
    {
      feature: "No Watermark on TikTok & Reels",
      vortyxWeb: true,
      vortyxApp: true,
      otherSites: false,
    },
    {
      feature: "Audio MP3 320kbps Extraction",
      vortyxWeb: true,
      vortyxApp: true,
      otherSites: false,
    },
    {
      feature: "Built-in Media Stream Preview",
      vortyxWeb: true,
      vortyxApp: true,
      otherSites: false,
    },
    {
      feature: "SSRF Security & Zero Malware",
      vortyxWeb: true,
      vortyxApp: true,
      otherSites: false,
    },
  ];

  const faqItems = [
    {
      q: "How do I download videos using the web downloader?",
      a: "Simply copy any video or audio link from YouTube, Instagram, TikTok, Facebook, Twitter, or SoundCloud, paste it into the URL box at the top of this page, and click 'Get Media'. Select your preferred MP4 resolution or MP3 audio quality to download the file directly.",
    },
    {
      q: "Is there any limit on download quality or length?",
      a: "No! Vortyx supports up to 4K and 1080p 60fps video downloads, as well as uncompressed 320kbps MP3 audio conversions. You can download long videos, live stream VODs, and complete albums.",
    },
    {
      q: "What portals and social networks are supported?",
      a: "Vortyx supports over 35 platforms including YouTube (Videos, Shorts, Playlists), Instagram (Reels, Posts, Stories), TikTok, X (Twitter), SoundCloud, Facebook, Reddit (with audio), Pinterest, Threads, Vimeo, Dailymotion, and many music services.",
    },
    {
      q: "Is Vortyx safe and private?",
      a: "100% safe. Vortyx requires zero account registration, collects no personal identifiable information, and does not track your download history on cloud servers. All web history remains in your local browser storage, and our Android app stores records only on your local device.",
    },
    {
      q: "How does the Android App WhatsApp Status Saver work?",
      a: "In the Android application, Vortyx reads the hidden offline '.Statuses' cache directory on your phone with your permission. It lets you view and permanently save WhatsApp and WhatsApp Business photo and video statuses to your photo gallery without using any internet data.",
    },
  ];

  const seoJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "Vortyx Universal Downloader",
        "url": "https://techscript.is-a.dev/Vortyx",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://techscript.is-a.dev/Vortyx/?testUrl={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebApplication",
        "name": "Vortyx Online Media Downloader",
        "url": "https://techscript.is-a.dev/Vortyx",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqItems.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a },
        })),
      },
    ],
  };

  const dedicatedPortals = [
    { title: "YouTube Downloader", path: "/youtube-downloader", desc: "4K, 1080p MP4 & 320k MP3" },
    { title: "Video Downloader", path: "/video-downloader", desc: "Multi-platform online saver" },
    { title: "Audio Downloader", path: "/audio-downloader", desc: "320kbps MP3 stream extractor" },
    { title: "Playlist Downloader", path: "/playlist-downloader", desc: "Full playlist & album batching" },
    { title: "Instagram Downloader", path: "/instagram-downloader", desc: "Reels, stories & posts" },
    { title: "TikTok Downloader", path: "/tiktok-downloader", desc: "Without watermark in HD" },
    { title: "Spotify Matcher", path: "/spotify-downloader", desc: "Track & playlist stream matching" },
    { title: "SoundCloud Downloader", path: "/soundcloud-downloader", desc: "320kbps MP3 tracks & sets" },
    { title: "Facebook Downloader", path: "/facebook-downloader", desc: "Full HD 1080p videos & Reels" },
    { title: "X (Twitter) Saver", path: "/twitter-downloader", desc: "HD MP4 videos & GIFs" },
    { title: "Reddit Downloader", path: "/reddit-downloader", desc: "Merged video with sound" },
    { title: "Pinterest Downloader", path: "/pinterest-downloader", desc: "Video pins & high-res images" },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seoJsonLd) }} />

      {/* Background Animated Gradients */}
      <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] rounded-full bg-brand-pink/10 blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-amber/5 blur-[150px] animate-pulse-slower pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-16 sm:pb-24">
        <div className="space-y-12 text-center">
          
          {/* Hero Header Typography */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <Sparkles size={16} />
              Universal Media Hub &bull; Web &amp; Android APK
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Download Videos &amp; Music <br className="hidden sm:inline" />
              From <span className="bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber bg-clip-text text-transparent">
                35+ Social Platforms
              </span>
            </h1>

            <p className="text-base sm:text-lg text-theme-foreground-muted max-w-2xl mx-auto leading-relaxed">
              Paste any URL below to download Full HD 1080p MP4 videos, 320kbps MP3 audio tracks, and photos directly in your browser, or install the native Android APK.
            </p>
          </div>

          {/* Core Interactive Universal Downloader (App Equivalent Experience on Web) */}
          <div className="pt-2">
            <React.Suspense fallback={<div className="h-96 w-full animate-pulse bg-theme-surface rounded-3xl" />}>
              <UniversalDownloader />
            </React.Suspense>
          </div>

          {/* Quick Dual Download / App CTA Banner */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/download"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber hover:brightness-110 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-pink/20 transition-all duration-300"
            >
              <Smartphone size={20} />
              Download Android APK (9.54 MB)
            </Link>
            <a
              href="https://github.com/Tcode-Motion/Vortyx"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-theme-surface border border-theme-border/60 hover:border-theme-foreground hover:bg-theme-surface-elevated text-theme-foreground font-bold flex items-center justify-center gap-2 transition-all duration-300"
            >
              <GithubIcon size={20} />
              View Open Source on GitHub
            </a>
          </div>

        </div>
      </section>

      {/* Dedicated SEO Portal Guides Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-theme-border/20 text-left">
        <div className="space-y-3 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-foreground">
            Explore Dedicated Downloaders
          </h2>
          <p className="text-xs sm:text-sm text-theme-foreground-muted">
            Access specialized tools optimized for your favorite video and audio platforms.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {dedicatedPortals.map((portal) => (
            <Link
              key={portal.path}
              href={portal.path}
              className="p-4 rounded-2xl bg-theme-surface border border-theme-border/40 hover:border-brand-pink/40 hover:bg-theme-surface-elevated transition-all group"
            >
              <h3 className="text-sm font-bold text-theme-foreground group-hover:text-brand-pink transition-colors">
                {portal.title}
              </h3>
              <p className="text-xs text-theme-foreground-muted mt-1">
                {portal.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Platform Support Hub */}
      <PlatformHub />

      {/* App Screenshots Carousel */}
      <ScreenshotCarousel />

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Why Choose Vortyx?
          </h2>
          <p className="text-sm sm:text-base text-theme-foreground-muted max-w-xl mx-auto">
            Packed with powerful media tools for both online web browsers and Android smartphones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-theme-surface border border-theme-border/40 hover:border-theme-border hover:shadow-xl transition-all duration-300 space-y-4"
            >
              <div className="p-3 rounded-2xl bg-theme-surface-elevated w-fit border border-theme-border/30">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-theme-foreground">{feat.title}</h3>
              <p className="text-sm text-theme-foreground-muted leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center space-y-4 mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            How Vortyx Compares
          </h2>
          <p className="text-sm sm:text-base text-theme-foreground-muted max-w-xl mx-auto">
            See how our free web downloader and native app outperform typical ad-heavy downloader websites.
          </p>
        </div>

        <div className="rounded-3xl border border-theme-border/40 bg-theme-surface overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-theme-surface-elevated text-theme-foreground border-b border-theme-border/40">
                <tr>
                  <th className="p-4 sm:p-5 font-bold">Feature</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-brand-pink">Vortyx Web</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-brand-coral">Vortyx App</th>
                  <th className="p-4 sm:p-5 font-bold text-center text-theme-foreground-muted">Other Sites</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border/20">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-theme-surface-elevated/50 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-theme-foreground">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-center">
                      <CheckCircle className="inline text-emerald-400" size={20} />
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      <CheckCircle className="inline text-emerald-400" size={20} />
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      {row.otherSites ? (
                        <Check className="inline text-theme-foreground-muted" size={18} />
                      ) : (
                        <X className="inline text-red-400" size={18} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-theme-foreground-muted">
            Everything you need to know about web downloads, formats, APK security, and privacy.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {faqItems.map((item, idx) => {
            const isOpened = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-theme-surface border border-theme-border/40 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-base sm:text-lg text-theme-foreground hover:bg-theme-surface-elevated transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  {isOpened ? (
                    <ChevronUp className="text-brand-pink" size={20} />
                  ) : (
                    <ChevronDown className="text-theme-foreground-muted" size={20} />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpened && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-theme-border/10 text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
