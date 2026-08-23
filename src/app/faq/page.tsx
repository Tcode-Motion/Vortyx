"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  Key,
  ShieldCheck,
  Globe,
  Music,
  Video,
} from "lucide-react";

export default function FAQPage() {
  const [activeFaq, setActiveFaq] = useState<string | null>("web-0");

  const toggleFaq = (key: string) => {
    setActiveFaq(activeFaq === key ? null : key);
  };

  const categories = [
    {
      id: "web",
      title: "Online Web Downloader",
      icon: <Globe size={18} className="text-brand-pink" />,
      items: [
        {
          q: "How do I use the Vortyx Online Web Downloader without installing the app?",
          a: "Simply visit the Vortyx homepage, paste any public media link (YouTube, Instagram, TikTok, X, SoundCloud, Facebook, Reddit, etc.) into the search bar at the top, and click 'Get Media'. You can stream a live preview right in your browser and click 'Save' to download 1080p MP4 or 320kbps MP3 directly to your computer or phone.",
        },
        {
          q: "Can I download videos on iPhone, iPad, Mac, or Windows PC?",
          a: "Yes! The Vortyx Web Downloader works on any modern web browser (Safari, Chrome, Firefox, Edge, Brave) across iOS, iPadOS, macOS, Windows, Linux, and Android with zero installation or plugins required.",
        },
        {
          q: "Are downloads on the website free of watermarks?",
          a: "Yes. All TikTok, Instagram Reels, and YouTube Shorts downloads generated through Vortyx are delivered in original quality without any watermarks or platform overlays.",
        },
        {
          q: "How can I extract only the audio (MP3) from a video?",
          a: "On the home page downloader, select the 'Audio (MP3)' mode before resolving, or choose the MP3 format badge under 'Available Downloads' after pasting your video link.",
        },
      ],
    },
    {
      id: "general",
      title: "General App & Features",
      icon: <Layers size={18} className="text-brand-coral" />,
      items: [
        {
          q: "What is Vortyx?",
          a: "Vortyx is a premium, offline-first media manager and downloader. It offers both a browser-based Web Downloader for all platforms and a native Android application with background batch downloading, an integrated media player (ExoPlayer with Picture-in-Picture), and an offline WhatsApp status saver.",
        },
        {
          q: "Is Vortyx free? Does it contain ads?",
          a: "Vortyx is 100% free to use. The web tool has no login requirements and no popup redirects. The Android app is lightweight and supported by clean banner/rewarded ads with an optional Google Play Premium ad-free upgrade.",
        },
        {
          q: "How does the multi-engine link resolver work?",
          a: "Vortyx uses a resilient multi-engine fallback architecture. It first queries fast public Cobalt API nodes. If rate limits or special anti-scraping walls are encountered, it invokes the Gemini 3.5 Flash AI parser or routes to our custom scraper backend.",
        },
      ],
    },
    {
      id: "install",
      title: "Installation & Android System",
      icon: <Key size={18} className="text-brand-amber" />,
      items: [
        {
          q: "What are the minimum system requirements for the APK?",
          a: "The Vortyx Android application requires Android 7.0 Nougat (API Level 24) or higher. It supports all modern ARM64-v8a and ARMEABI-v7a chipsets.",
        },
        {
          q: "Why isn't Vortyx on the Google Play Store?",
          a: "Due to Google Play Store policies regarding third-party media downloading (specifically YouTube content caching), utility applications like Vortyx cannot be listed on Google Play. We distribute official, verified APK packages directly from our website.",
        },
        {
          q: "Is it safe to install the APK file?",
          a: "Yes. Our APK package is compiled directly from open-source code, signed with our upload key, and contains no hidden tracking libraries or adware. You can verify the integrity of the file by comparing the SHA-256 hash listed on our Download page.",
        },
      ],
    },
    {
      id: "privacy",
      title: "Privacy & Data Security",
      icon: <ShieldCheck size={18} className="text-emerald-400" />,
      items: [
        {
          q: "Does Vortyx track or log my downloads?",
          a: "No. Vortyx operates on a strict zero-account privacy model. Web downloads keep history exclusively in your browser's localStorage, and the Android app stores history in a local SQLite database that never leaves your device.",
        },
        {
          q: "Does Vortyx read my clipboard in the background?",
          a: "In the Android app, if the 'Monitor Clipboard' setting is enabled, Vortyx checks copied text locally only when the app is foregrounded to detect media URLs. No text, logs, or links are ever transmitted or saved on external servers.",
        },
        {
          q: "Do you collect any personally identifiable information (PII)?",
          a: "No. We do not require names, email addresses, phone numbers, or account logins. Your privacy is 100% protected.",
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base sm:text-lg text-theme-foreground-muted leading-relaxed max-w-2xl mx-auto">
          Comprehensive answers regarding the online web downloader, supported portals, APK installation, and privacy guarantees.
        </p>
      </div>

      {/* Accordions */}
      <div className="space-y-10">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-4">
            <div className="flex items-center gap-2 border-b border-theme-border/20 pb-2 px-2">
              {cat.icon}
              <h2 className="text-lg font-bold text-theme-foreground">{cat.title}</h2>
            </div>

            <div className="space-y-3">
              {cat.items.map((item, idx) => {
                const uniqueKey = `${cat.id}-${idx}`;
                const isOpened = activeFaq === uniqueKey;
                return (
                  <div
                    key={idx}
                    className="bg-theme-surface border border-theme-border/40 rounded-2xl overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(uniqueKey)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-theme-foreground hover:bg-theme-surface-elevated transition-colors cursor-pointer"
                    >
                      <span>{item.q}</span>
                      {isOpened ? (
                        <ChevronUp className="text-brand-pink shrink-0 ml-2" size={18} />
                      ) : (
                        <ChevronDown className="text-theme-foreground-muted shrink-0 ml-2" size={18} />
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
                          <div className="p-5 pt-0 border-t border-theme-border/10 text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
