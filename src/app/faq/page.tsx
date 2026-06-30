"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp, Layers, Key, ShieldCheck, LifeBuoy } from "lucide-react";

export default function FAQPage() {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const toggleFaq = (key: string) => {
    setActiveFaq(activeFaq === key ? null : key);
  };

  const categories = [
    {
      id: "general",
      title: "General Questions",
      icon: <Layers size={18} className="text-brand-pink" />,
      items: [
        {
          q: "What is Vortyx?",
          a: "Vortyx is a premium and private Android utility that allows you to download and manage video, audio, and images from 50+ platforms. It features a built-in media center (ExoPlayer with PiP), advanced parallel queue manager (WorkManager), and a local-only database catalog.",
        },
        {
          q: "Is Vortyx free? Does it contain ads?",
          a: "Vortyx is free to download and use. It utilizes Google AdMob advertisements (banner and interstitial) to fund API resolutions and ongoing development. Free users can watch rewarded video advertisements to earn bonus downloads. A Premium upgrade via Google Play Billing is available to remove ads entirely and unlock unlimited high-speed downloads.",
        },
        {
          q: "How does the link resolver work?",
          a: "Vortyx uses a multi-engine fallback architecture. It first queries the high-speed Cobalt API. If blocked, it utilizes the Gemini 3.5 Flash AI model to parse dynamic elements directly, or queries our custom MediaPick scraping backend.",
        },
      ],
    },
    {
      id: "install",
      title: "Installation & System",
      icon: <Key size={18} className="text-brand-coral" />,
      items: [
        {
          q: "What are the minimum system requirements?",
          a: "Vortyx requires Android 7.0 Nougat (API Level 24) or higher. It supports standard ARM64-v8a and ARMEABI-v7a hardware architectures.",
        },
        {
          q: "Why isn't Vortyx on the Google Play Store?",
          a: "Due to Google Play Store policies regarding third-party media downloading (specifically YouTube content caching), utility applications like Vortyx cannot be listed on Google Play. We distribute official, clean APK packages directly from our website.",
        },
        {
          q: "Is it safe to install the APK file?",
          a: "Yes. Our APK package is compiled directly from our source code, signed with our upload key, and contains no hidden tracking libraries or adware. You can verify the integrity of the file by comparing the SHA-256 hash listed on our Download page.",
        },
      ],
    },
    {
      id: "privacy",
      title: "Privacy & Data",
      icon: <ShieldCheck size={18} className="text-emerald-400" />,
      items: [
        {
          q: "Does Vortyx track my downloads?",
          a: "No. Vortyx runs 100% client-side and does not operate any central cloud databases for user cataloging. Your downloading history, active queue, and file labels are saved locally inside a secure SQLite database (Room DB) on your device.",
        },
        {
          q: "Does Vortyx read my clipboard background contents?",
          a: "If the 'Monitor Clipboard' setting is enabled under Preferences, Vortyx checks copied text locally whenever the app is active. It only verifies if the text contains a URL matching any of our 50+ supported domains. No text, logs, or links are ever transmitted or saved onto our servers.",
        },
        {
          q: "Do you collect any personally identifiable information (PII)?",
          a: "We do not request or collect names, email addresses, phone numbers, or account details. Third-party SDKs integrated into the app, such as Google AdMob and Firebase Analytics baseline libraries, may collect standard advertising identifiers and diagnostic parameters according to their own privacy guidelines.",
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
        <p className="text-base sm:text-lg text-theme-foreground-muted leading-relaxed">
          Comprehensive answers regarding features, safety, billing, and permissions.
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
                    className="bg-theme-surface border border-theme-border/40 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(uniqueKey)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-theme-foreground hover:bg-theme-surface-elevated transition-colors cursor-pointer"
                    >
                      <span>{item.q}</span>
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
