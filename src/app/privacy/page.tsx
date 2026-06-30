"use client";

import React from "react";
import { Shield, EyeOff, Lock, FolderHeart } from "lucide-react";

export default function PrivacyPolicyPage() {
  const currentDate = "June 30, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="p-3 bg-brand-pink/10 rounded-full w-fit mx-auto border border-brand-pink/20 text-brand-pink">
          <Shield size={32} />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-theme-foreground-muted">
          Last Updated: {currentDate}
        </p>
      </div>

      {/* Intro */}
      <section className="bg-theme-surface border border-theme-border/40 p-6 sm:p-8 rounded-3xl space-y-4">
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          At Vortyx, your privacy is our primary priority. Vortyx operates as a client-side media downloader and manager. This Privacy Policy details what information is processed, what is strictly kept offline, and the behaviors of third-party SDKs integrated into our app.
        </p>
      </section>

      {/* Core Privacy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-theme-surface border border-theme-border/40 p-6 rounded-2xl space-y-3">
          <div className="p-2 bg-brand-pink/10 rounded-lg w-fit text-brand-pink">
            <EyeOff size={20} />
          </div>
          <h3 className="font-bold text-theme-foreground">Zero Accounts</h3>
          <p className="text-xs text-theme-foreground-muted leading-relaxed">
            No registration, sign-ups, or profile creation. We never ask for your name, email, or credentials to use our services.
          </p>
        </div>
        <div className="bg-theme-surface border border-theme-border/40 p-6 rounded-2xl space-y-3">
          <div className="p-2 bg-brand-coral/10 rounded-lg w-fit text-brand-coral">
            <Lock size={20} />
          </div>
          <h3 className="font-bold text-theme-foreground">100% Local Cache</h3>
          <p className="text-xs text-theme-foreground-muted leading-relaxed">
            Your download lists, preferences, and offline status caches are saved locally in an SQLite (Room) database on your device.
          </p>
        </div>
        <div className="bg-theme-surface border border-theme-border/40 p-6 rounded-2xl space-y-3">
          <div className="p-2 bg-brand-amber/10 rounded-lg w-fit text-brand-amber">
            <FolderHeart size={20} />
          </div>
          <h3 className="font-bold text-theme-foreground">On-Device Clipboard</h3>
          <p className="text-xs text-theme-foreground-muted leading-relaxed">
            Clipboard monitoring checks URL patterns locally using Android APIs. No clipboard contents are sent to external servers.
          </p>
        </div>
      </div>

      {/* Policy Details */}
      <div className="space-y-8 text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
        
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">1. Information We Collect (And What We Do Not)</h2>
          <p>
            <strong>What We Do NOT Collect:</strong> We do not collect or store any personal data. We do not inspect your downloaded files, read your private media directory content, or track which links you resolve. All media downloading and storage happen client-side.
          </p>
          <p>
            <strong>Automatic Data Collected by Third-Party SDKs:</strong> Vortyx integrates third-party services to display advertisements and analyze app health. These services include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Google AdMob:</strong> Collects advertising IDs (such as AAID), IP addresses, and device hardware specifications to deliver personalized or non-personalized ads.
            </li>
            <li>
              <strong>Google Play Billing:</strong> Manages premium subscription payments securely. Payment information is handled entirely by Google Play Store; we do not store credit card or billing details.
            </li>
            <li>
              <strong>Firebase Analytics:</strong> Collects baseline application events (e.g. app installations, open rates, page flows) to compile anonymous diagnostic metrics.
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">2. Android Permissions Explained</h2>
          <p>
            To perform its operations, Vortyx requests the following permissions. Each permission has an explicit scope and is only activated when necessary:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>INTERNET &amp; ACCESS_NETWORK_STATE:</strong> Needed to resolve link streams, retrieve media files from public CDNs, download updates, and verify subscription status.
            </li>
            <li>
              <strong>READ/WRITE &amp; MANAGE_EXTERNAL_STORAGE:</strong> Enables Vortyx to save files directly to your local storage, scan the cached status directories of messaging apps (like WhatsApp), and play files locally.
            </li>
            <li>
              <strong>FOREGROUND_SERVICE (DATA_SYNC &amp; MEDIA_PLAYBACK):</strong> Keeps the download queue running seamlessly in the background and enables background audio controls.
            </li>
            <li>
              <strong>POST_NOTIFICATIONS:</strong> Sends download status progress bar updates and background music player status controls to the notification drawer.
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">3. Data Retention &amp; Deletion</h2>
          <p>
            Because we do not store any user data on external servers, we hold no data to retain or delete. All download logs, settings, and file history persist on your local device. Uninstalling the Vortyx application or clearing the application data from your system Settings will permanently erase all database entries.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">4. Children's Privacy</h2>
          <p>
            Vortyx does not knowingly collect any personal data from children under the age of 13. If you believe a child under 13 is using our application, please note that no personal data is stored on our servers. If you have concerns, you may contact us via email.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">5. Security</h2>
          <p>
            All local database records are secured inside your device's sandbox environment, preventing other applications from accessing Vortyx data without root access. All internet API requests to Cobalt and Gemini are encrypted using Transport Layer Security (HTTPS).
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">6. Contact Information</h2>
          <p>
            If you have questions or feedback regarding this Privacy Policy, please contact us at:
          </p>
          <a href="mailto:support@vortyx.app" className="font-semibold text-brand-pink hover:underline">
            support@vortyx.app
          </a>
        </div>

      </div>

    </div>
  );
}
