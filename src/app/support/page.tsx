"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Mail,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  FileText,
  LifeBuoy,
} from "lucide-react";

export default function SupportPage() {
  const [activeIssue, setActiveIssue] = useState<number | null>(null);

  const toggleIssue = (index: number) => {
    setActiveIssue(activeIssue === index ? null : index);
  };

  const commonIssues = [
    {
      title: "Why won't WhatsApp statuses load on Android 11+ or 13+?",
      desc: "Android's Scoped Storage policy restricts apps from reading files directly. To view statuses, Vortyx requires one-time authorization of the WhatsApp directory. When prompted in the WhatsApp Saver tab, click 'Authorize Directory', which launches the system document picker at the correct target folder (`Android/media/com.whatsapp/WhatsApp/Media/.Statuses`). Tap 'Use This Folder' and confirm 'Allow' to grant access.",
    },
    {
      title: "Why does the downloader return an 'Authorization Required' or 'Private Media' error?",
      desc: "Vortyx operates completely anonymously and does not store or prompt for your social media credentials. Because of this, it cannot access files hosted behind private accounts or closed groups. Ensure the media you are trying to download is public and viewable without logging in.",
    },
    {
      title: "My downloads are stuck in the queue and won't progress.",
      desc: "First, verify that your device has an active internet connection. Second, check if you have toggled the 'Wi-Fi Only' setting under Preferences while on a mobile data network. Downloads will pause until a Wi-Fi connection is restored. Lastly, check if you have exhausted your daily free download limits.",
    },
    {
      title: "How do I clear the local storage cache or database records?",
      desc: "Open Vortyx -> go to Settings -> scroll to System Maintenance -> click 'Clear Cache'. This will delete temporary download parts and clear resolved link previews without deleting completed downloads in your local device gallery.",
    },
    {
      title: "How do I upgrade to Premium and what are the benefits?",
      desc: "Go to Settings or click the 'Go Premium' card on the Home screen. Vortyx integrates Google Play Billing. Premium removes Google AdMob banner/interstitial advertisements, unlocks high-speed parallel downloads, and removes all daily queue limits.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Support &amp; Troubleshooting
        </h1>
        <p className="text-base sm:text-lg text-theme-foreground-muted leading-relaxed">
          Find solutions for permissions, network scheduling, and downloading errors.
        </p>
      </div>

      {/* Troubleshooting Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: FAQs */}
        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-theme-foreground mb-6 flex items-center gap-2">
            <HelpCircle className="text-brand-pink" size={24} />
            Common Troubleshooting Issues
          </h2>

          <div className="space-y-4">
            {commonIssues.map((issue, idx) => {
              const isOpened = activeIssue === idx;
              return (
                <div
                  key={idx}
                  className="bg-theme-surface border border-theme-border/40 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleIssue(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-theme-foreground hover:bg-theme-surface-elevated transition-colors cursor-pointer"
                  >
                    <span>{issue.title}</span>
                    {isOpened ? (
                      <ChevronUp className="text-brand-pink" size={18} />
                    ) : (
                      <ChevronDown className="text-theme-foreground-muted" size={18} />
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
                          {issue.desc}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Support Info Cards */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-theme-foreground mb-6 flex items-center gap-2">
            <LifeBuoy className="text-brand-pink" size={24} />
            Contact Channels
          </h2>

          {/* Email Support Card */}
          <div className="bg-theme-surface border border-theme-border/40 p-6 rounded-3xl space-y-4 shadow shadow-brand-pink/5">
            <div className="p-3 bg-brand-pink/10 rounded-2xl border border-brand-pink/20 w-fit">
              <Mail className="text-brand-pink" size={20} />
            </div>
            <h3 className="text-base font-bold text-theme-foreground">Email Support</h3>
            <p className="text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
              If your issue is not resolved by the troubleshooter, email our dev support inbox. Response times are usually within 48 hours.
            </p>
            <a
              href="mailto:support@vortyx.app"
              className="inline-block text-xs font-bold text-brand-pink hover:underline"
            >
              support@vortyx.app
            </a>
          </div>

          {/* Bug / Feature Card */}
          <div className="bg-theme-surface border border-theme-border/40 p-6 rounded-3xl space-y-4 shadow shadow-brand-pink/5">
            <div className="p-3 bg-brand-coral/10 rounded-2xl border border-brand-coral/20 w-fit">
              <AlertTriangle className="text-brand-coral" size={20} />
            </div>
            <h3 className="text-base font-bold text-theme-foreground">File a Bug Report</h3>
            <p className="text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
              Encountered a crash or a broken download engine? Create an issue on our GitHub repository. Make sure to attach Logcat records if possible.
            </p>
            <a
              href="https://github.com/Tcode-Motion/Vortyx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-bold text-brand-coral hover:underline"
            >
              Go to GitHub Issues &rarr;
            </a>
          </div>
        </div>

      </div>

      {/* Permission Guide Section */}
      <section className="bg-theme-surface border border-theme-border/40 p-8 sm:p-10 rounded-3xl shadow-lg space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-theme-foreground flex items-center gap-2 border-b border-theme-border/20 pb-4">
          <FileText className="text-brand-pink" size={22} />
          Android Permission Summary
        </h2>
        <p className="text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
          Vortyx utilizes several system permissions to handle downloading queues and playback in the background. Here is a summary of what they do:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div>
            <strong className="text-theme-foreground block mb-1">Storage Permissions</strong>
            <span className="text-theme-foreground-muted leading-relaxed block">
              `MANAGE_EXTERNAL_STORAGE` and `READ_MEDIA` are used to catalog local music and video download history inside our database and scan status caches offline.
            </span>
          </div>
          <div>
            <strong className="text-theme-foreground block mb-1">Foreground Sync Service</strong>
            <span className="text-theme-foreground-muted leading-relaxed block">
              `FOREGROUND_SERVICE_DATA_SYNC` and `FOREGROUND_SERVICE_MEDIA_PLAYBACK` ensure your batches keep downloading when you leave the app and allow background audio stream controls.
            </span>
          </div>
          <div>
            <strong className="text-theme-foreground block mb-1">Notification Permissions</strong>
            <span className="text-theme-foreground-muted leading-relaxed block">
              `POST_NOTIFICATIONS` is used to render download progress bars in your notification shade and display audio album art controller states.
            </span>
          </div>
          <div>
            <strong className="text-theme-foreground block mb-1">Network State Permissions</strong>
            <span className="text-theme-foreground-muted leading-relaxed block">
              `ACCESS_NETWORK_STATE` tracks whether you are connected to cellular or Wi-Fi networks to schedule queued jobs according to your bandwidth settings.
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
