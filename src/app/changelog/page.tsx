"use client";

import React from "react";
import { GitBranch, CheckCircle2, Award, Zap } from "lucide-react";

export default function ChangelogPage() {
  const currentDate = "June 27, 2026";

  const changes = [
    {
      version: "v1.0.0 Stable",
      date: currentDate,
      badge: "Initial Release",
      badgeColor: "bg-brand-pink/15 text-brand-pink border-brand-pink/20",
      intro: "This is the initial stable release of Vortyx, bringing high-performance offline-first downloading to Android.",
      categories: [
        {
          name: "Media Resolver Engine",
          items: [
            "Coordinated link resolution utilizing Cobalt API, Gemini 3.5 Flash, and MediaPick backend scrapers.",
            "Universal portal detection for over 50 social, music, video, and creative directories.",
            "Clipboard auto-detect scanner that matches copied URLs locally on the home screen.",
            "Foreground batch queue manager built using Android WorkManager for parallel streams.",
          ],
        },
        {
          name: "Built-in Playback Center",
          items: [
            "Video Player: Gesture controls, hardware acceleration, and system Picture-in-Picture (PiP) window support.",
            "Music Player: Asynchronous Media3 background service with system Media Session notifications.",
            "Image Viewer: Full-screen display with multi-touch pinch-to-zoom and basic metadata inspection.",
            "File Manager: Offline list allowing users to rename, open, or delete files directly in Room DB storage.",
          ],
        },
        {
          name: "Design & UX",
          items: [
            "Beautiful Material Design 3 components featuring rounded cards, fluid selections, and bottom navigation tabs.",
            "Dynamic color accents syncing with dark or light modes.",
            "Local preference settings including Wi-Fi only downloading schedules and parallel thread limits.",
          ],
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="p-3 bg-brand-pink/10 rounded-full w-fit mx-auto border border-brand-pink/20 text-brand-pink">
          <GitBranch size={32} />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          App Changelog
        </h1>
        <p className="text-base sm:text-lg text-theme-foreground-muted leading-relaxed">
          Chronological timeline of features, improvements, and engine patches in Vortyx.
        </p>
      </div>

      {/* Timeline items */}
      <div className="space-y-12 relative before:absolute before:left-3 sm:before:left-6 before:top-4 before:bottom-4 before:w-[2px] before:bg-theme-border/20">
        {changes.map((change, idx) => (
          <div key={idx} className="relative pl-10 sm:pl-16 space-y-6">
            
            {/* Timeline node */}
            <div className="absolute left-[3px] sm:left-[15px] top-1.5 w-5 h-5 rounded-full bg-theme-surface border-4 border-brand-pink flex items-center justify-center shadow" />

            {/* Version / Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border/20 pb-4">
              <div className="space-y-1">
                <span className="text-xs text-theme-foreground-muted block">{change.date}</span>
                <h2 className="text-2xl font-black text-theme-foreground">{change.version}</h2>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit border ${change.badgeColor}`}>
                {change.badge}
              </span>
            </div>

            {/* Intro statement */}
            <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed italic">
              &ldquo;{change.intro}&rdquo;
            </p>

            {/* Details categoried lists */}
            <div className="space-y-6">
              {change.categories.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-theme-foreground flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-pink" />
                    {cat.name}
                  </h3>
                  <ul className="text-xs sm:text-sm text-theme-foreground-muted space-y-2 pl-6 list-disc leading-relaxed">
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
