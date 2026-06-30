"use client";

import React from "react";
import Link from "next/link";
import { Globe, ArrowUp } from "lucide-react";
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber bg-clip-text text-transparent">
                Vortyx
              </span>
            </Link>
            <p className="text-sm text-theme-foreground-muted max-w-xs leading-relaxed">
              A professional, offline-first media manager and downloader designed to catalog and download high-quality assets from over 50 social portals.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/Tcode-Motion/Vortyx"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-theme-surface-elevated border border-theme-border/40 hover:text-brand-pink hover:border-brand-pink/30 text-theme-foreground/80 transition-all duration-200"
                aria-label="GitHub Repo"
              >
                <GithubIcon size={18} />
              </a>

              <a
                href="/"
                className="p-2 rounded-full bg-theme-surface-elevated border border-theme-border/40 hover:text-brand-pink hover:border-brand-pink/30 text-theme-foreground/80 transition-all duration-200"
                aria-label="Website"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Links Column - App */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-theme-foreground mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-sm text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/screenshots" className="text-sm text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  App Screenshots
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-sm text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Download Installer
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  About Developer
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column - Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-theme-foreground mb-4">
              Help & Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/support" className="text-sm text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Get Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Contact Form
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-sm text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Changelog Timeline
                </Link>
              </li>
              <li>
                <Link href="/licenses" className="text-sm text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Open Source Licenses
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column - Legal */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-theme-foreground mb-4">
              Legal Policy
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Affiliation Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/data-deletion" className="text-sm text-theme-foreground-muted hover:text-brand-pink transition-colors">
                  Data Deletion Request
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-theme-border/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-xs text-theme-foreground-muted text-center md:text-left">
              &copy; {currentYear} Vortyx App. All rights reserved. Not affiliated with Google Play, YouTube, or WhatsApp.
            </p>
            <p className="text-[10px] text-theme-foreground-muted/60">
              Developed by the Vortyx Team. App Package: <code className="bg-theme-surface-elevated px-1.5 py-0.5 rounded border border-theme-border/20">com.vortyx.app</code>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-theme-foreground-muted">
              App Version: <strong className="text-theme-foreground font-semibold">1.0</strong>
            </span>
            <span className="h-4 w-[1px] bg-theme-border/30" />
            <span className="text-xs text-theme-foreground-muted">
              Size: <strong className="text-theme-foreground font-semibold">9.54 MB</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
