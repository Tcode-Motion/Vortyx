"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  ShieldAlert,
  CheckCircle,
  Copy,
  Info,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function DownloadPage() {
  const [copied, setCopied] = useState(false);
  const sha256 = "23D501404AA6D336DD4BD5C9AFA68595BE8615A9F5358041E1EBA10725CFEBBE";

  const copyHash = () => {
    navigator.clipboard.writeText(sha256);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      num: "01",
      title: "Download Installer",
      desc: "Tap the 'Download APK' button above to save the Vortyx installer package onto your Android device.",
    },
    {
      num: "02",
      title: "Allow Unknown Sources",
      desc: "Open your device Settings -> Apps & Notifications -> Special App Access -> Install Unknown Apps. Toggle 'Allow from this source' for your browser or file manager.",
    },
    {
      num: "03",
      title: "Execute Installation",
      desc: "Launch the downloaded '.apk' file from your notifications bar or local 'Downloads' folder. Click 'Install' to start the package deployment.",
    },
    {
      num: "04",
      title: "Grant Permissions",
      desc: "Launch Vortyx. Authorize local storage directory access (to save statuses and media) and enjoy your premium ad-supported features.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Download Vortyx
        </h1>
        <p className="text-base sm:text-lg text-theme-foreground-muted leading-relaxed">
          Install the official, unmodified release APK directly onto your Android device. Secure, private, and lightweight.
        </p>
      </div>

      {/* Main Download Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Stats Column */}
        <div className="lg:col-span-8 bg-theme-surface border border-theme-border/40 p-6 sm:p-10 rounded-3xl flex flex-col justify-between shadow-xl">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-theme-border/20 pb-6">
              <div>
                <span className="text-xs font-bold text-brand-pink uppercase tracking-wide">Stable Release</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-foreground">Vortyx v1.0</h2>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                Verified Clean (SHA-256)
              </span>
            </div>

            {/* Downloader Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="/Vortyx/vortyx-v1.0.apk"
                download
                className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-brand-pink/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download size={22} />
                Download Stable APK (9.54 MB)
              </a>
              <a
                href="https://github.com/Tcode-Motion/Vortyx/releases/tag/v1.0.0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-5 rounded-full bg-theme-surface border border-theme-border/60 hover:bg-theme-surface-elevated text-theme-foreground font-bold flex items-center justify-center gap-2 transition-all duration-300"
              >
                Release Notes
                <ExternalLink size={16} />
              </a>
            </div>

            {/* SHA-256 Checksum Widget */}
            <div className="p-4 sm:p-5 rounded-2xl bg-theme-surface-elevated border border-theme-border/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-theme-foreground">
                <span className="flex items-center gap-2">
                  <Info size={14} className="text-brand-pink" />
                  SHA-256 Hash Checksum
                </span>
                <button
                  onClick={copyHash}
                  className="flex items-center gap-1.5 text-brand-pink hover:underline cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle size={12} className="text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      Copy Hash
                    </>
                  )}
                </button>
              </div>
              <code className="block text-[10px] sm:text-xs text-theme-foreground-muted bg-theme-bg p-3 rounded-lg border border-theme-border/20 break-all select-all font-mono">
                {sha256}
              </code>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-6 border-t border-theme-border/20 text-xs sm:text-sm text-theme-foreground-muted">
            <ShieldAlert className="text-brand-coral flex-shrink-0" size={18} />
            <span>Note: Only download Vortyx from our official website to protect your device from malware.</span>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-4 bg-theme-surface border border-theme-border/40 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-theme-foreground border-b border-theme-border/20 pb-4 mb-4">
              File Details
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-sm border-b border-theme-border/10 pb-2">
                <span className="text-theme-foreground-muted">Package Name</span>
                <span className="font-semibold text-theme-foreground">com.vortyx.app</span>
              </li>
              <li className="flex justify-between items-center text-sm border-b border-theme-border/10 pb-2">
                <span className="text-theme-foreground-muted">Version</span>
                <span className="font-semibold text-theme-foreground">1.0 (Build 1)</span>
              </li>
              <li className="flex justify-between items-center text-sm border-b border-theme-border/10 pb-2">
                <span className="text-theme-foreground-muted">File Size</span>
                <span className="font-semibold text-theme-foreground">9.54 MB</span>
              </li>
              <li className="flex justify-between items-center text-sm border-b border-theme-border/10 pb-2">
                <span className="text-theme-foreground-muted">Minimum Android</span>
                <span className="font-semibold text-theme-foreground">7.0+ (API 24)</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-theme-foreground-muted">Target Android</span>
                <span className="font-semibold text-theme-foreground">16 (API 36)</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-theme-border/20">
            <span className="block text-xs font-bold uppercase tracking-wider text-theme-foreground-muted mb-2">
              Supported Architectures
            </span>
            <div className="flex gap-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-theme-surface-elevated border border-theme-border/40 font-semibold">
                arm64-v8a
              </span>
              <span className="px-2.5 py-1 rounded bg-theme-surface-elevated border border-theme-border/40 font-semibold">
                armeabi-v7a
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Installation Guide */}
      <section className="space-y-8 pt-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-foreground text-center">
          How to Install Vortyx APK
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-theme-surface border border-theme-border/40 p-6 rounded-3xl relative overflow-hidden transition-all duration-300 hover:border-brand-pink/30 hover:-translate-y-1 shadow-md"
            >
              <span className="absolute -top-4 -right-2 text-5xl font-black text-brand-pink/5 select-none">
                {step.num}
              </span>
              <div className="text-xs font-bold text-brand-pink uppercase tracking-widest mb-3">
                Step {step.num}
              </div>
              <h3 className="text-base font-bold text-theme-foreground mb-2 flex items-center gap-1">
                {step.title}
                <ChevronRight size={14} className="text-theme-foreground-muted" />
              </h3>
              <p className="text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Release History */}
      <section className="bg-theme-surface border border-theme-border/40 p-6 sm:p-10 rounded-3xl shadow-xl space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-theme-foreground border-b border-theme-border/20 pb-4">
          Version History
        </h2>
        <div className="space-y-6">
          <div className="relative pl-6 border-l border-brand-pink/20">
            <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-brand-pink" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm font-semibold mb-2">
              <span className="text-theme-foreground font-extrabold text-base">v1.0 stable release</span>
              <span className="text-theme-foreground-muted font-normal text-xs sm:text-sm">Released June 27, 2026</span>
            </div>
            <ul className="space-y-1 text-xs sm:text-sm text-theme-foreground-muted list-disc pl-4 leading-relaxed">
              <li>Integrated Cobalt, Gemini AI, and custom scrapers.</li>
              <li>Supports video, audio, and image downloads from 50+ portals.</li>
              <li>Includes built-in video player (PiP), image viewer, and background music player.</li>
              <li>Implemented offline status scanner for WhatsApp / WA Business.</li>
              <li>Material Design 3 style guidelines with dark mode settings.</li>
            </ul>
            <div className="mt-3 pl-4">
              <a
                href="https://github.com/Tcode-Motion/Vortyx/releases/tag/v1.0.0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-pink hover:underline"
              >
                View v1.0.0 Release Notes on GitHub &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
