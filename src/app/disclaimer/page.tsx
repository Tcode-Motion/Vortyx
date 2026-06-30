"use client";

import React from "react";
import { AlertCircle, ShieldAlert, FileWarning } from "lucide-react";

export default function DisclaimerPage() {
  const currentDate = "June 30, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="p-3 bg-brand-coral/10 rounded-full w-fit mx-auto border border-brand-coral/20 text-brand-coral">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Disclaimer
        </h1>
        <p className="text-sm text-theme-foreground-muted">
          Last Updated: {currentDate}
        </p>
      </div>

      {/* Main Core Alert Banner */}
      <div className="bg-brand-coral/5 border border-brand-coral/20 p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-3 text-brand-coral font-bold text-lg">
          <ShieldAlert size={22} />
          Important Legal Notice
        </div>
        <p className="text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
          Vortyx is an independent utility application designed to facilitate media organization, local file caching, and offline status backup. It does not host any media files, and it has no association with the platforms it supports.
        </p>
      </div>

      {/* Disclaimer details */}
      <div className="space-y-8 text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
        
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground flex items-center gap-2">
            <FileWarning size={18} className="text-brand-pink" />
            1. Non-Affiliation Disclaimer
          </h2>
          <p>
            Vortyx is **NOT affiliated, associated, authorized, endorsed by, or in any way officially connected** with YouTube, Google LLC, WhatsApp Inc., Meta Platforms Inc., Twitter/X Corp., TikTok Ltd., Spotify AB, or any of their subsidiaries or affiliates. 
          </p>
          <p>
            The official names, marks, logos, and brands associated with YouTube, Instagram, WhatsApp, Spotify, and other platforms are registered trademarks of their respective owners. The use of these trademarks on this website or inside the application is solely for identifying the compatibility of the download link resolver and does not imply any endorsement or partnership.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">2. Fair Use &amp; Copyright Compliance</h2>
          <p>
            Vortyx is created strictly as a technical tool to help users fetch and manage public media for fair use, personal study, archiving, or offline accessibility. You must not use this tool to violate copyright laws.
          </p>
          <p>
            We do not condone, encourage, or facilitate the unauthorized downloading of copyrighted content. If you download files through Vortyx, you represent that you own the content, have permission to download it, or that the content is in the public domain.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">3. Platform Terms of Service</h2>
          <p>
            Many social media and streaming portals prohibit the downloading or caching of their hosted content under their own Terms of Service (e.g. YouTube Terms of Service). By using Vortyx to resolve and download media from these platforms, you acknowledge that you are doing so at your own risk and that you are solely responsible for any compliance actions or account limitations taken by those platforms.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">4. Accuracy of Information</h2>
          <p>
            The software is provided &ldquo;as is&rdquo;, without warranty of any kind, express or implied. The developers do not guarantee that the download resolution engine will work at all times. Social platforms constantly update their site structures, which may cause download features to break temporarily until a patch is released.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-theme-foreground">5. Contact</h2>
          <p>
            If you have legal or compliance inquiries regarding the application's technology, please contact us:
          </p>
          <a href="mailto:support@vortyx.app" className="font-semibold text-brand-pink hover:underline">
            support@vortyx.app
          </a>
        </div>

      </div>

    </div>
  );
}
