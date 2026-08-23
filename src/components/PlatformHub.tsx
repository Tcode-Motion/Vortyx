"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
  Zap,
  Download,
  ExternalLink,
} from "lucide-react";
import { SUPPORTED_PLATFORMS, PlatformMeta } from "../services/mediaExtractor";

interface PlatformHubProps {
  onSelectPlatform?: (platform: PlatformMeta) => void;
}

export default function PlatformHub({ onSelectPlatform }: PlatformHubProps) {
  const [selected, setSelected] = useState<string>("youtube");

  const portalGuides: Record<
    string,
    {
      title: string;
      heading: string;
      description: string;
      features: string[];
      steps: string[];
      supportedFormats: string[];
    }
  > = {
    youtube: {
      title: "YouTube Video & Shorts Downloader",
      heading: "Download YouTube 4K, 1080p Full HD & MP3 320kbps Audio",
      description:
        "Fastest online YouTube video downloader for MP4 video clips, Shorts, playlists, and high-fidelity MP3 music tracks. Zero registration required, 100% ad-free stream processing.",
      features: [
        "1080p, 720p, 480p, 360p MP4 resolutions",
        "Direct 320kbps and 128kbps MP3 audio extraction",
        "YouTube Shorts and Playlist batch extraction",
        "Original HD video thumbnail cover art downloads",
      ],
      steps: [
        "Copy the YouTube video or Shorts URL from your browser or the YouTube mobile app.",
        "Paste the link into the Vortyx Web Downloader bar above.",
        "Select your preferred quality (e.g. 1080p Full HD or MP3) and click 'Get Media'.",
        "Preview the video stream and tap 'Save MP4' to download directly to your device.",
      ],
      supportedFormats: ["MP4 (1080p/720p)", "MP3 (320k)", "WebM", "M4A", "JPG Thumbnail"],
    },
    instagram: {
      title: "Instagram Reels, Stories & Photo Downloader",
      heading: "Save Instagram Reels, Carousel Posts & Audio Tracks Online",
      description:
        "Extract high-definition Instagram Reels, Video posts, IGTV, and high-res photography without requiring an Instagram login or sharing account passwords.",
      features: [
        "Full HD 1080p Reels and video clips extraction",
        "Multi-photo carousel posts & story downloads",
        "Extract audio tracks & background music to MP3",
        "100% anonymous & private viewer mode",
      ],
      steps: [
        "Open Instagram, click the three dots (or share icon) on any Reel or Post, and tap 'Copy Link'.",
        "Paste the Instagram URL into the Vortyx search box above.",
        "Vortyx resolves the direct CDN media stream instantly.",
        "Click 'Save MP4' or 'Save JPG' to download to your camera roll or downloads folder.",
      ],
      supportedFormats: ["MP4 (Full HD)", "JPG Photo", "MP3 Audio"],
    },
    tiktok: {
      title: "TikTok Video Downloader Without Watermark",
      heading: "Download TikTok Videos in HD & Extract MP3 Soundtracks",
      description:
        "Save viral TikTok videos in original HD quality without any annoying watermarks. Extract trending TikTok background audio tracks directly into high-fidelity MP3 files.",
      features: [
        "Clean, crystal-clear MP4 videos with no watermarks",
        "Trending TikTok sound & background music to MP3",
        "Fast single-tap download processing",
        "Compatible with all iOS, Android, macOS, and Windows browsers",
      ],
      steps: [
        "In the TikTok app or website, tap 'Share' on your favorite video and select 'Copy Link'.",
        "Paste the TikTok link into the Vortyx online downloader above.",
        "Choose 'Video (No Watermark)' or 'Audio (MP3)'.",
        "Hit download and enjoy your offline TikTok clips anytime.",
      ],
      supportedFormats: ["MP4 (No Watermark)", "MP3 Audio Track", "HD Thumbnail"],
    },
    twitter: {
      title: "X (Twitter) Video & GIF Downloader",
      heading: "Save Videos and Animated GIFs from X / Twitter in High Definition",
      description:
        "Download videos, interviews, breaking news clips, and animated GIFs directly from tweets on X (formerly Twitter) with crystal clear 1080p MP4 quality.",
      features: [
        "Highest bitrate 1080p and 720p MP4 downloads",
        "Convert animated GIFs to MP4 or direct image frames",
        "Thread attachments and multi-video post support",
        "Works with x.com and twitter.com URLs",
      ],
      steps: [
        "Click the Share button on any tweet on X and select 'Copy Link'.",
        "Paste the tweet URL into Vortyx.",
        "Select your preferred resolution and click 'Save Video'.",
        "Your video will download directly without needing any third-party software.",
      ],
      supportedFormats: ["MP4 (1080p)", "MP4 (720p)", "GIF", "JPG"],
    },
    soundcloud: {
      title: "SoundCloud to MP3 Music Downloader",
      heading: "Convert SoundCloud Tracks, Remixes & DJ Sets to MP3 320kbps",
      description:
        "High-fidelity SoundCloud audio downloader. Convert any SoundCloud track, podcast, or DJ mix into pristine 320kbps MP3 audio with original track artwork.",
      features: [
        "Ultra high-bitrate 320 kbps MP3 conversion",
        "Original artist metadata & high-resolution album artwork",
        "Podcast, remix, and DJ set support",
        "Integrated in-browser waveform audio player",
      ],
      steps: [
        "Copy the SoundCloud track or playlist URL.",
        "Paste into Vortyx and select 'Audio (MP3)' mode.",
        "Listen to the live audio preview in your browser.",
        "Tap 'Save MP3' to store the music file on your device.",
      ],
      supportedFormats: ["MP3 (320kbps)", "M4A Audio", "Album Cover Art (JPG)"],
    },
    facebook: {
      title: "Facebook Video & Reel Downloader",
      heading: "Download Facebook Public Videos, Reels & Watch Streams in 1080p HD",
      description:
        "Download Facebook Watch clips, viral reels, public group videos, and livestreams in full 1080p MP4. Free, fast, and completely anonymous.",
      features: [
        "Full HD 1080p & SD 480p format choices",
        "Facebook Reels and mobile watch videos support",
        "Direct CDN streaming links",
        "Zero account login required",
      ],
      steps: [
        "Click Share on any public Facebook video and copy the link.",
        "Paste the link into Vortyx and hit 'Get Media'.",
        "Select HD 1080p resolution.",
        "Save the video file directly to your device storage.",
      ],
      supportedFormats: ["MP4 (1080p HD)", "MP4 (SD)", "MP3 Audio"],
    },
    reddit: {
      title: "Reddit Video Downloader With Audio",
      heading: "Download Reddit Videos with Sound & High-Res Images",
      description:
        "Unlike other downloaders that strip audio from Reddit videos, Vortyx extracts and merges both crystal-clear video and audio streams seamlessly into a single MP4 file.",
      features: [
        "Full audio & video combined in high quality MP4",
        "High-res Reddit gallery photos and GIF downloads",
        "Supports r/ subreddit video posts and v.redd.it links",
        "Fast direct link resolution",
      ],
      steps: [
        "Tap Share on any Reddit video post and copy the URL.",
        "Paste the link into Vortyx.",
        "Select the high-definition MP4 stream.",
        "Click download to enjoy the video with synchronized audio.",
      ],
      supportedFormats: ["MP4 (with Audio)", "JPG Photos", "GIF"],
    },
    pinterest: {
      title: "Pinterest Video & Image Downloader",
      heading: "Save Pinterest Pins, Story Videos & Ultra-HD Art",
      description:
        "Download original resolution Pinterest inspiration photos, design assets, and video pins directly in full quality.",
      features: [
        "Original uncompressed image resolution",
        "HD Video Pins and Story Pins download",
        "Works with pin.it short links and full pinterest.com URLs",
      ],
      steps: [
        "Copy any Pinterest Pin link.",
        "Paste into Vortyx to extract original media.",
        "Tap 'Save JPG' or 'Save MP4'.",
      ],
      supportedFormats: ["JPG (Ultra HD)", "MP4 Video", "PNG"],
    },
    threads: {
      title: "Threads Video & Photo Downloader",
      heading: "Save Videos, Photos and Media from Meta Threads",
      description:
        "Extract high-definition video clips and photos from threads.net posts in one click.",
      features: ["Full resolution MP4 and JPG extraction", "Instant one-tap download"],
      steps: [
        "Copy the link to the Threads post.",
        "Paste into Vortyx and click 'Get Media'.",
        "Save your video or photo directly.",
      ],
      supportedFormats: ["MP4 (1080p)", "JPG Photo"],
    },
    vimeo: {
      title: "Vimeo Video Downloader",
      heading: "Download Vimeo 1080p & 4K Creative Videos",
      description:
        "Download high-quality filmmaking, animations, and cinematic videos from Vimeo without watermarks.",
      features: ["Full HD 1080p and 720p streams", "MP3 audio track extraction"],
      steps: [
        "Copy the Vimeo video URL.",
        "Paste into Vortyx.",
        "Select your preferred resolution and download.",
      ],
      supportedFormats: ["MP4 (1080p)", "MP4 (720p)", "MP3 Audio"],
    },
  };

  const currentGuide = portalGuides[selected] || portalGuides.youtube;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
      
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} />
          Supported Portals &amp; Search Hub
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Download From Over <span className="bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber bg-clip-text text-transparent">50+ Social Platforms</span>
        </h2>
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          Select any platform below to view dedicated features, supported resolutions, and step-by-step download instructions.
        </p>
      </div>

      {/* Platform Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {SUPPORTED_PLATFORMS.map((plat) => {
          const isSelected = selected === plat.id;
          return (
            <button
              key={plat.id}
              onClick={() => {
                setSelected(plat.id);
                if (onSelectPlatform) onSelectPlatform(plat);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 shadow-sm ${
                isSelected
                  ? "bg-gradient-to-r from-brand-pink to-brand-coral text-white shadow-lg shadow-brand-pink/20 scale-105"
                  : "bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border/40 text-theme-foreground hover:border-brand-pink/30"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: plat.color }}
              />
              {plat.name}
            </button>
          );
        })}
      </div>

      {/* Dynamic Platform SEO Showcase Card */}
      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl bg-theme-surface border border-theme-border/40 p-6 sm:p-10 md:p-12 shadow-xl space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-pink">
                {currentGuide.title}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-theme-foreground leading-snug">
                {currentGuide.heading}
              </h3>
              <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
                {currentGuide.description}
              </p>
            </div>

            {/* Key Features List */}
            <div className="space-y-3 pt-2">
              <span className="text-xs uppercase font-bold tracking-wider text-theme-foreground">
                Key Platform Features:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentGuide.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-theme-foreground">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formats Supported Badges */}
            <div className="space-y-2 pt-2 border-t border-theme-border/20">
              <span className="text-xs uppercase font-bold tracking-wider text-theme-foreground-muted">
                Available Formats &amp; Codecs:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentGuide.supportedFormats.map((fmt, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-theme-surface-elevated border border-theme-border/40 text-xs font-semibold text-theme-foreground"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Step-by-Step How-To Guide */}
          <div className="lg:col-span-5 rounded-2xl bg-theme-surface-elevated border border-theme-border/40 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-theme-border/20 pb-4">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-brand-pink" />
                <h4 className="text-sm font-bold text-theme-foreground">
                  How to Download {SUPPORTED_PLATFORMS.find((p) => p.id === selected)?.name} Media
                </h4>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                4 Easy Steps
              </span>
            </div>

            <ol className="space-y-4">
              {currentGuide.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-brand-pink to-brand-coral text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
                    {step}
                  </p>
                </li>
              ))}
            </ol>

            <div className="pt-2">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-pink to-brand-coral hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-brand-pink/20 transition-all"
              >
                <Download size={15} />
                Try {SUPPORTED_PLATFORMS.find((p) => p.id === selected)?.name} Downloader Now
              </button>
            </div>
          </div>

        </div>
      </motion.div>

    </section>
  );
}
