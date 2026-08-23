"use client";

import React from "react";
import Link from "next/link";
import { Globe, ArrowUp, Sparkles, Film, Music, ShieldCheck } from "lucide-react";
import GithubIcon from "./GithubIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-theme-border/20 bg-theme-surface mt-20">
      {/* Scroll to Top Floating Button */}
      <div className="absolute -top-6 right-8 sm:right-12 z-10">
        <button
          onClick={scrollToTop}
          className="p-3.5 rounded-full bg-gradient-to-r from-brand-pink to-brand-coral hover:from-brand-coral hover:to-brand-amber text-white shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Back to Top"
        >
          <ArrowUp size={20} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber bg-clip-text text-transparent">
                Vortyx
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
              Universal online media downloader &amp; stream manager supporting 35+ social portals with verified MP4/MP3 delivery.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Tcode-Motion/Vortyx"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-theme-surface-elevated border border-theme-border/40 hover:text-brand-pink text-theme-foreground/80 transition-all"
                aria-label="GitHub Repo"
              >
                <GithubIcon size={16} />
              </a>
              <Link
                href="/"
                className="p-2 rounded-full bg-theme-surface-elevated border border-theme-border/40 hover:text-brand-pink text-theme-foreground/80 transition-all"
                aria-label="Website"
              >
                <Globe size={16} />
              </Link>
            </div>
          </div>

          {/* Column 1: Feature Tools */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-theme-foreground mb-3 flex items-center gap-1.5">
              <Film size={14} className="text-brand-pink" />
              <span>Core Tools</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/video-downloader" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Video Downloader
                </Link>
              </li>
              <li>
                <Link href="/youtube-downloader" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  YouTube Downloader
                </Link>
              </li>
              <li>
                <Link href="/audio-downloader" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Audio &amp; MP3 Downloader
                </Link>
              </li>
              <li>
                <Link href="/playlist-downloader" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Playlist Downloader
                </Link>
              </li>
              <li>
                <Link href="/providers" className="text-theme-foreground-muted hover:text-brand-pink transition-colors font-bold text-brand-pink">
                  35+ Supported Portals &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Social Portals */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-theme-foreground mb-3 flex items-center gap-1.5">
              <Sparkles size={14} className="text-brand-coral" />
              <span>Social Savers</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/instagram-downloader" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Instagram Downloader
                </Link>
              </li>
              <li>
                <Link href="/tiktok-downloader" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  TikTok Downloader
                </Link>
              </li>
              <li>
                <Link href="/facebook-downloader" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Facebook Downloader
                </Link>
              </li>
              <li>
                <Link href="/twitter-downloader" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  X / Twitter Downloader
                </Link>
              </li>
              <li>
                <Link href="/reddit-downloader" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Reddit Downloader
                </Link>
              </li>
              <li>
                <Link href="/pinterest-downloader" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Pinterest Downloader
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Audio & Streaming */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-theme-foreground mb-3 flex items-center gap-1.5">
              <Music size={14} className="text-amber-500" />
              <span>Music &amp; Audio</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/spotify-downloader" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Spotify Track Matcher
                </Link>
              </li>
              <li>
                <Link href="/soundcloud-downloader" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  SoundCloud to MP3
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  All App Features
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Android APK Downloader
                </Link>
              </li>
              <li>
                <Link href="/screenshots" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  App Screenshots
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Help & Legal */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-theme-foreground mb-3 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Help &amp; Legal</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/faq" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  FAQ &amp; Guide
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  About Vortyx
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Release Changelog
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  DMCA / Disclaimer
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-theme-border/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-theme-foreground-muted">
          <p>&copy; {currentYear} Vortyx &bull; Free Universal Media Downloader &amp; Manager.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-theme-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-theme-foreground transition-colors">Terms</Link>
            <Link href="/disclaimer" className="hover:text-theme-foreground transition-colors">DMCA</Link>
            <Link href="/data-deletion" className="hover:text-theme-foreground transition-colors">Data Deletion</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
