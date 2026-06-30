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
  Users,
} from "lucide-react";
import GithubIcon from "../components/GithubIcon";
import PhoneMockup from "../components/PhoneMockup";
import ScreenshotCarousel from "../components/ScreenshotCarousel";

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const stats = [
    { label: "Supported Portals", value: "50+", desc: "YouTube, Spotify, IG, X, and more" },
    { label: "Daily Free Downloads", value: "Unlimited", desc: "No strict caps, watch ads for bonuses" },
    { label: "Privacy Rating", value: "100%", desc: "No user accounts or cloud tracking" },
    { label: "APK Package Size", value: "9.54 MB", desc: "Lightweight, optimized binaries" },
  ];

  const features = [
    {
      title: "Multi-Engine Link Resolver",
      desc: "Combines Cobalt API, Gemini 3.5 Flash, and a custom backend parser to extract direct download streams for video, audio, and images.",
      icon: <Layers className="text-brand-pink" size={24} />,
    },
    {
      title: "Built-In Media Center",
      desc: "An integrated ExoPlayer video engine supporting Picture-in-Picture (PiP), a full-screen image viewer, and a Media3 background music player.",
      icon: <Play className="text-brand-coral" size={24} />,
    },
    {
      title: "WhatsApp Status Saver",
      desc: "Direct offline scanning for WhatsApp and WhatsApp Business cached statuses. Preview and save images or videos to your gallery instantly.",
      icon: <Share2 className="text-green-500" size={24} />,
    },
    {
      title: "Smart Clipboard Monitor",
      desc: "Runs locally on your device to detect copied URLs and automatically prompts you to analyze or batch-download links in one tap.",
      icon: <Smartphone className="text-brand-amber" size={24} />,
    },
    {
      title: "Background Batch Queue",
      desc: "A foreground sync service that manages parallel downloads, schedules jobs over Wi-Fi only, and auto-resumes after network interruptions.",
      icon: <Clock className="text-indigo-400" size={24} />,
    },
    {
      title: "Zero-Account Privacy",
      desc: "No registration, no sign-ups, and no data uploaded to external servers. All download records are stored in a secure local Room database.",
      icon: <Shield className="text-emerald-400" size={24} />,
    },
  ];

  const faqItems = [
    {
      q: "What is Vortyx?",
      a: "Vortyx is a premium, professional utility app for Android that allows you to download and manage media (video, audio, images) from over 50 platforms. It features a built-in media player, background downloads, and an offline WhatsApp status saver.",
    },
    {
      q: "Is my personal data safe with Vortyx?",
      a: "Absolutely. Vortyx operates on a zero-account model. No names, emails, or credentials are required. All clipboard monitoring and media parsing checks happen locally on your device. Download logs are stored in a local SQLite database that never leaves your phone.",
    },
    {
      q: "Which social media platforms are supported?",
      a: "We support over 50 platforms, including YouTube (Videos, Shorts, Playlists), YouTube Music, Spotify, SoundCloud, Apple Music, Instagram (Reels, Posts, Stories), Facebook, X (Twitter), TikTok, Threads, Telegram, Pinterest, Reddit, and many local music/video portals.",
    },
    {
      q: "What are the system requirements?",
      a: "Vortyx requires Android 7.0 Nougat (API level 24) or higher. It is optimized for Android 15/16 and works on ARM64-v8a and ARMEABI-v7a architectures.",
    },
    {
      q: "How does the WhatsApp Status Saver work?",
      a: "Vortyx requests read permission for the WhatsApp and WhatsApp Business directories. It scans the hidden '.Statuses' cache directory on your device, letting you view and permanently save statuses without using any internet bandwidth.",
    },
    {
      q: "Are there any download limits?",
      a: "Free users have a standard daily limit of downloads which can be topped up by watching rewarded ads. Premium members enjoy unlimited high-speed downloads, parallel batch downloading, and an ad-free experience.",
    },
  ];

  const testimonials = [
    {
      name: "Marcus V.",
      role: "Power User",
      text: "The best status saver and link downloader I've ever used. The fact that it doesn't require a login and runs completely offline is a lifesaver.",
      stars: 5,
    },
    {
      name: "Aisha K.",
      role: "Music Enthusiast",
      text: "I love the integrated music player and the Spotify metadata matching. I can queue up high-quality downloads and they play in the background smoothly.",
      stars: 5,
    },
    {
      name: "Hiroshi T.",
      role: "Android Developer",
      text: "A highly optimized Android utility. It takes up less than 10MB of space, parses links instantly, and uses Material Design 3 beautifully.",
      stars: 5,
    },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Animated Gradients */}
      <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] rounded-full bg-brand-pink/10 blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-amber/5 blur-[150px] animate-pulse-slower pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs sm:text-sm font-semibold uppercase tracking-wide"
            >
              <Smartphone size={16} />
              Android App - Version 1.0
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
            >
              The Premium <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber bg-clip-text text-transparent">
                All-Media Downloader
              </span> <br />
              &amp; Offline Manager
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-theme-foreground-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Vortyx is a professional, offline-first utility built for Android. Download, categorize, and play high-quality video, audio, and images from 50+ platforms. Features a high-fidelity media player with PiP and a secure zero-account local SQLite catalog.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/download"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber hover:brightness-110 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-pink/20 transition-all duration-300"
              >
                <Download size={20} />
                Download APK (9.54 MB)
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-theme-surface border border-theme-border/60 hover:border-theme-foreground hover:bg-theme-surface-elevated text-theme-foreground font-bold flex items-center justify-center gap-2 transition-all duration-300"
              >
                <GithubIcon size={20} />
                View on GitHub
              </a>
            </motion.div>

            {/* Spec Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto lg:mx-0 border-t border-theme-border/20"
            >
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-theme-foreground-muted">Package</span>
                <span className="text-xs sm:text-sm font-semibold text-theme-foreground">com.vortyx.app</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-theme-foreground-muted">Minimum SDK</span>
                <span className="text-xs sm:text-sm font-semibold text-theme-foreground">Android 7.0+</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-theme-foreground-muted">Last Updated</span>
                <span className="text-xs sm:text-sm font-semibold text-theme-foreground">June 2026</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Content - Real App Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[280px] sm:max-w-[300px]"
            >
              <PhoneMockup src="/screenshots/homedark.png" alt="Vortyx Home Screen Dark Mode" priority />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Statistics Section */}
      <section className="border-y border-theme-border/20 bg-theme-surface/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <span className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="block text-sm sm:text-base font-bold text-theme-foreground">
                  {stat.label}
                </span>
                <span className="block text-xs sm:text-sm text-theme-foreground-muted">
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Engineered with Premium Features
          </h2>
          <p className="text-base sm:text-lg text-theme-foreground-muted max-w-2xl mx-auto">
            Vortyx replaces clunky web downloaders with a sleek, native Android package designed for extreme performance and absolute privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-theme-surface border border-theme-border/40 p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:border-brand-pink/30 hover:shadow-xl hover:shadow-brand-pink/5 hover:translate-y-[-4px] group"
            >
              <div className="p-3 bg-theme-surface-elevated rounded-2xl border border-theme-border/40 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-theme-foreground mb-3">{feat.title}</h3>
              <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="relative overflow-hidden border-t border-theme-border/20 py-20 sm:py-28 bg-theme-surface/10">
        {/* Glowing Blurred Blobs */}
        <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-pink/10 dark:bg-brand-pink/5 blur-[100px] animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand-amber/10 dark:bg-brand-amber/5 blur-[100px] animate-pulse-slower pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Experience Vortyx in Action
            </h2>
            <p className="text-base sm:text-lg text-theme-foreground-muted leading-relaxed">
              A native, premium interface built with Material Design 3 for speed and privacy.
            </p>
          </div>

          <ScreenshotCarousel />
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="border-t border-theme-border/20 bg-theme-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center space-y-4 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Loved by Users Worldwide
            </h2>
            <p className="text-sm sm:text-base text-theme-foreground-muted">
              Here is what early testers and open-source contributors say about Vortyx.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-theme-surface border border-theme-border/40 p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(test.stars)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-theme-foreground-muted italic leading-relaxed">
                    &ldquo;{test.text}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-theme-border/20 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-pink to-brand-coral flex items-center justify-center font-bold text-white text-xs">
                    {test.name[0]}
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-theme-foreground">{test.name}</span>
                    <span className="block text-xs text-theme-foreground-muted">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
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
            Got questions? We have professional answers about permissions, features, and billing.
          </p>
        </div>

        <div className="space-y-4">
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
