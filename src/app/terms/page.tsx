"use client";

import React from "react";
import { FileCheck, Users, Ban, Scale } from "lucide-react";

export default function TermsOfServicePage() {
  const currentDate = "June 30, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="p-3 bg-brand-pink/10 rounded-full w-fit mx-auto border border-brand-pink/20 text-brand-pink">
          <FileCheck size={32} />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-theme-foreground-muted">
          Last Updated: {currentDate}
        </p>
      </div>

      {/* Intro */}
      <section className="bg-theme-surface border border-theme-border/40 p-6 sm:p-8 rounded-3xl space-y-4">
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          By downloading, installing, or using the Vortyx Android application, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not install or use the app.
        </p>
      </section>

      {/* Main Core Terms Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-theme-surface border border-theme-border/40 p-6 rounded-2xl space-y-3">
          <div className="p-2 bg-brand-pink/10 rounded-lg w-fit text-brand-pink">
            <Users size={20} />
          </div>
          <h3 className="font-bold text-theme-foreground">Personal Use</h3>
          <p className="text-xs text-theme-foreground-muted leading-relaxed">
            Vortyx is licensed to you solely for your personal, non-commercial media management and downloading workflows.
          </p>
        </div>
        <div className="bg-theme-surface border border-theme-border/40 p-6 rounded-2xl space-y-3">
          <div className="p-2 bg-brand-coral/10 rounded-lg w-fit text-brand-coral">
            <Ban size={20} />
          </div>
          <h3 className="font-bold text-theme-foreground">Legal Boundaries</h3>
          <p className="text-xs text-theme-foreground-muted leading-relaxed">
            You must not download copyrighted material or violate the terms of service of third-party platforms.
          </p>
        </div>
        <div className="bg-theme-surface border border-theme-border/40 p-6 rounded-2xl space-y-3">
          <div className="p-2 bg-brand-amber/10 rounded-lg w-fit text-brand-amber">
            <Scale size={20} />
          </div>
          <h3 className="font-bold text-theme-foreground">Provided As-Is</h3>
          <p className="text-xs text-theme-foreground-muted leading-relaxed">
            The application is provided without warranties of any kind. Developers assume no liability for misuse.
          </p>
        </div>
      </div>

      {/* Terms details */}
      <div className="space-y-8 text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
        
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">1. User License &amp; Scope</h2>
          <p>
            Vortyx grants you a limited, non-exclusive, non-transferable, revocable license to install and run a copy of the application on your Android device for personal, non-commercial purposes. 
          </p>
          <p>
            You agree not to copy, modify, distribute, sell, or lease any part of our application or source code, nor may you reverse engineer or attempt to extract the source code of the software without written authorization.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">2. User Responsibilities &amp; Copyright Compliance</h2>
          <p>
            Vortyx functions as a technical caching utility and link resolver. We do not host, check, or filter any content that you download. You are solely responsible for ensuring that you have the legal right to download and cache any media file you request.
          </p>
          <p>
            <strong>Copyright Compliance:</strong> You must not use Vortyx to download copyrighted content unless you own the copyright or have obtained explicit permission or licensing from the rightful content owner. Downloading copyright-protected content without authorization is a violation of international copyright laws and third-party platform policies.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">3. Google Play Billing &amp; Subscriptions</h2>
          <p>
            Subscriptions or in-app purchases made through Vortyx are handled securely by Google Play Billing services. Cancellations, refunds, and billing issues must be managed directly via your Google Play account dashboard. Premium features are tied to your Google Play Store identity.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">4. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, the Vortyx development team, contributors, and partners shall not be held liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, hardware damage, copyright infringement litigation, or other losses arising from your use of the application.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">5. Termination &amp; Updates</h2>
          <p>
            We reserve the right to modify, suspend, or terminate the application or its online link resolving services (such as API connectors) at any time without notice. We also push updates to keep compatibility with changing social platform schemas.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">6. Contact Info</h2>
          <p>
            If you have questions regarding these Terms, please contact us at:
          </p>
          <a href="mailto:support@vortyx.app" className="font-semibold text-brand-pink hover:underline">
            support@vortyx.app
          </a>
        </div>

      </div>

    </div>
  );
}
