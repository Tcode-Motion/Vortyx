"use client";

import React from "react";
import { Trash2, ShieldCheck, Database, Smartphone } from "lucide-react";

export default function DataDeletionRequestPage() {
  const currentDate = "June 30, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="p-3 bg-brand-pink/10 rounded-full w-fit mx-auto border border-brand-pink/20 text-brand-pink">
          <Trash2 size={32} />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Data Deletion Request
        </h1>
        <p className="text-sm text-theme-foreground-muted">
          Last Updated: {currentDate}
        </p>
      </div>

      {/* Main Policy Statement */}
      <section className="bg-theme-surface border border-theme-border/40 p-6 sm:p-8 rounded-3xl space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-theme-foreground flex items-center gap-2">
          <ShieldCheck className="text-brand-pink" size={22} />
          Our Zero-Server Architecture
        </h2>
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          Vortyx is built as a private, offline-first utility. We do not require account registration, email verification, or profile creations to use the app. Consequently, **we do not host or store any user data, download histories, or personal identities on our servers.**
        </p>
      </section>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Local DB */}
        <div className="bg-theme-surface border border-theme-border/40 p-6 sm:p-8 rounded-3xl space-y-4 shadow">
          <div className="p-2.5 bg-brand-coral/10 rounded-xl border border-brand-coral/20 w-fit text-brand-coral">
            <Database size={20} />
          </div>
          <h3 className="text-lg font-bold text-theme-foreground">Clearing App Database Logs</h3>
          <p className="text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
            All download queue entries, download logs, and settings parameters are stored inside an encrypted local SQLite (Room) database. You can clear this data instantly:
          </p>
          <ul className="text-xs text-theme-foreground-muted list-decimal pl-4 space-y-1.5 pt-2">
            <li>Open the Vortyx App.</li>
            <li>Go to the <strong>Settings</strong> tab.</li>
            <li>Scroll down to <strong>System Maintenance</strong>.</li>
            <li>Tap <strong>Clear Cache</strong>. This erases the database logs and temporary scrapers files immediately.</li>
          </ul>
        </div>

        {/* System level */}
        <div className="bg-theme-surface border border-theme-border/40 p-6 sm:p-8 rounded-3xl space-y-4 shadow">
          <div className="p-2.5 bg-brand-amber/10 rounded-xl border border-brand-amber/20 w-fit text-brand-amber">
            <Smartphone size={20} />
          </div>
          <h3 className="text-lg font-bold text-theme-foreground">System-Level Deletion</h3>
          <p className="text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
            To wipe out all traces of the application, including its locally stored configuration preferences and database files, use Android's system controls:
          </p>
          <ul className="text-xs text-theme-foreground-muted list-decimal pl-4 space-y-1.5 pt-2">
            <li>Go to your device's <strong>Settings</strong>.</li>
            <li>Select <strong>Apps &amp; Notifications</strong> (or App Manager).</li>
            <li>Find and tap on <strong>Vortyx</strong>.</li>
            <li>Select <strong>Storage &amp; Cache</strong>.</li>
            <li>Tap <strong>Clear Storage</strong> (or Clear Data) and then uninstall the application.</li>
          </ul>
        </div>

      </div>

      {/* Deletion of files */}
      <section className="bg-theme-surface border border-theme-border/40 p-6 sm:p-8 rounded-3xl space-y-4">
        <h2 className="text-lg font-bold text-theme-foreground">What about downloaded files?</h2>
        <p className="text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
          Media files (such as videos, audios, and images) that you download through Vortyx are saved directly in your device's public media directories (e.g. `Movies/Vortyx`, `Music/Vortyx`, `Pictures/Vortyx`). Since these files are in public directories, they are not deleted when you uninstall the app. You must delete them manually using your device's file manager app.
        </p>
      </section>

      {/* Inquiries */}
      <section className="space-y-4 text-xs sm:text-sm text-theme-foreground-muted">
        <h2 className="text-lg font-bold text-theme-foreground">Still have questions?</h2>
        <p className="leading-relaxed">
          If you have questions regarding our offline-first architecture, local caching, or wish to verify how our codebase operates, feel free to email our developer team at:
        </p>
        <a href="mailto:support@vortyx.app" className="font-semibold text-brand-pink hover:underline">
          support@vortyx.app
        </a>
      </section>

    </div>
  );
}
