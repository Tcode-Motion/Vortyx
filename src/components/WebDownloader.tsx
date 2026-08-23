"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Link as LinkIcon,
  Play,
  Pause,
  Music,
  Video,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Trash2,
  Clock,
  Layers,
  ShieldCheck,
  Zap,
  Share2,
  Film,
  Headphones,
  SlidersHorizontal,
  ChevronRight,
  Flame,
} from "lucide-react";
import {
  extractMediaFromUrl,
  detectPlatform,
  triggerFileDownload,
  ExtractedMedia,
  ExtractedFormat,
  PlatformMeta,
  SUPPORTED_PLATFORMS,
} from "../services/mediaExtractor";
import WhatsAppWebSaver from "./WhatsAppWebSaver";

interface HistoryItem {
  id: string;
  title: string;
  platform: string;
  thumbnail: string;
  downloadUrl: string;
  formatLabel: string;
  timestamp: number;
}

export default function WebDownloader() {
  const [mainTab, setMainTab] = useState<"downloader" | "whatsapp">("downloader");
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState<"auto" | "audio" | "video">("auto");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExtractedMedia | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "video" | "audio" | "image">("all");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const detectedPlatform = detectPlatform(url);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vortyx_web_history");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  const saveToHistory = (media: ExtractedMedia, format: ExtractedFormat) => {
    try {
      const newItem: HistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: media.title,
        platform: media.platform,
        thumbnail: media.thumbnail,
        downloadUrl: format.url,
        formatLabel: `${format.quality} (${format.extension.toUpperCase()})`,
        timestamp: Date.now(),
      };
      const updated = [newItem, ...history.filter((h) => h.downloadUrl !== format.url)].slice(0, 10);
      setHistory(updated);
      localStorage.setItem("vortyx_web_history", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("vortyx_web_history");
    } catch {
      // Ignore
    }
  };

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          setError(null);
        }
      }
    } catch {
      // Clipboard denied
    }
  };

  const handleExtract = async (overrideUrl?: string) => {
    const targetUrl = (overrideUrl || url).trim();
    if (!targetUrl) {
      setError("Please paste a media URL from YouTube, Spotify, TikTok, Instagram, or 50+ platforms.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setIsPlayingAudio(false);

    try {
      const extracted = await extractMediaFromUrl(targetUrl, mode);
      setResult(extracted);
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to extract media from this URL. Please verify the link is public and accessible."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadFormat = async (format: ExtractedFormat) => {
    if (!result) return;
    setDownloadingId(format.id);

    try {
      const cleanTitle = result.title.replace(/[^a-zA-Z0-9_\-\s]/g, "").trim().replace(/\s+/g, "_").slice(0, 50);
      const filename = `Vortyx_${result.platformId}_${cleanTitle}_${format.quality.replace(/[^a-zA-Z0-9]/g, "_")}.${format.extension}`;
      await triggerFileDownload(format.url, filename);
      saveToHistory(result, format);
    } catch {
      window.open(format.url, "_blank");
    } finally {
      setTimeout(() => setDownloadingId(null), 1200);
    }
  };

  const copyResultLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const videoFormats = result?.formats.filter((f) => f.type === "video") || [];
  const audioFormats = result?.formats.filter((f) => f.type === "audio") || [];
  const imageFormats = result?.formats.filter((f) => f.type === "image") || [];

  const filteredFormats = result?.formats.filter((fmt) => {
    if (activeCategory === "all") return true;
    return fmt.type === activeCategory;
  }) || [];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Top Main Mode Switcher: Link Downloader vs WhatsApp Web Saver */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-full bg-theme-surface-elevated border border-theme-border/60 shadow-lg">
          <button
            onClick={() => setMainTab("downloader")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
              mainTab === "downloader"
                ? "bg-gradient-to-r from-brand-pink to-brand-coral text-white shadow-md shadow-brand-pink/20"
                : "text-theme-foreground/70 hover:text-theme-foreground"
            }`}
          >
            <Sparkles size={16} />
            Universal Link Downloader (50+ Sites)
          </button>

          <button
            onClick={() => setMainTab("whatsapp")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
              mainTab === "whatsapp"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-theme-foreground/70 hover:text-theme-foreground"
            }`}
          >
            <Share2 size={16} />
            WhatsApp Web Status Saver
          </button>
        </div>
      </div>

      {/* Render WhatsApp Web Saver Tool */}
      {mainTab === "whatsapp" ? (
        <WhatsAppWebSaver />
      ) : (
        /* Render Universal Link Downloader */
        <div className="relative rounded-3xl p-1 sm:p-2 bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber shadow-2xl shadow-brand-pink/20">
          <div className="bg-theme-surface/95 backdrop-blur-xl rounded-[22px] p-5 sm:p-8 md:p-10 space-y-6">
            
            {/* Header & Modes */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-theme-border/40 pb-5">
              <div className="space-y-1 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-bold uppercase tracking-wider">
                  <Flame size={14} className="animate-pulse text-brand-pink" />
                  Premium Media Downloader &bull; 4K, MP3, Thumbnails
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-theme-foreground">
                  Download Videos, Audios &amp; Thumbnails in All Qualities
                </h2>
              </div>

              {/* Mode Selector Chips */}
              <div className="flex items-center gap-1.5 p-1 bg-theme-surface-elevated border border-theme-border/40 rounded-full text-xs font-semibold">
                <button
                  onClick={() => setMode("auto")}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    mode === "auto"
                      ? "bg-gradient-to-r from-brand-pink to-brand-coral text-white shadow-sm"
                      : "text-theme-foreground/70 hover:text-theme-foreground"
                  }`}
                >
                  <Layers size={14} />
                  All Formats
                </button>
                <button
                  onClick={() => setMode("video")}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    mode === "video"
                      ? "bg-gradient-to-r from-brand-pink to-brand-coral text-white shadow-sm"
                      : "text-theme-foreground/70 hover:text-theme-foreground"
                  }`}
                >
                  <Video size={14} />
                  Videos (4K-360p)
                </button>
                <button
                  onClick={() => setMode("audio")}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    mode === "audio"
                      ? "bg-gradient-to-r from-brand-pink to-brand-coral text-white shadow-sm"
                      : "text-theme-foreground/70 hover:text-theme-foreground"
                  }`}
                >
                  <Music size={14} />
                  Audios (320k-128k)
                </button>
              </div>
            </div>

            {/* URL Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleExtract();
              }}
              className="space-y-4"
            >
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                
                {/* Input Field with Platform Indicator */}
                <div className="relative flex-grow flex items-center">
                  <div className="absolute left-4 flex items-center pointer-events-none text-theme-foreground-muted">
                    <LinkIcon size={20} />
                  </div>

                  <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder={
                      url ? detectedPlatform.placeholder : "Paste any YouTube, Spotify, TikTok, Instagram, X link..."
                    }
                    className="w-full pl-12 pr-28 sm:pr-36 py-4 rounded-2xl bg-theme-surface-elevated border border-theme-border/60 hover:border-brand-pink/40 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 text-theme-foreground text-sm sm:text-base outline-none transition-all duration-200 placeholder:text-theme-foreground-muted/60"
                    required
                  />

                  {/* Right Action Chips */}
                  <div className="absolute right-2 flex items-center gap-1.5">
                    {url ? (
                      <button
                        type="button"
                        onClick={() => {
                          setUrl("");
                          setResult(null);
                          setError(null);
                        }}
                        className="p-2 rounded-xl text-theme-foreground-muted hover:text-theme-foreground hover:bg-theme-surface transition-colors"
                        title="Clear Input"
                      >
                        <RotateCcw size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePaste}
                        className="px-3 py-1.5 rounded-xl bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border/40 text-theme-foreground text-xs font-semibold flex items-center gap-1 transition-all shadow-sm"
                      >
                        <Copy size={13} />
                        Paste
                      </button>
                    )}

                    {url && (
                      <span
                        className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-sm"
                        style={{ backgroundColor: detectedPlatform.color }}
                      >
                        {detectedPlatform.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Submit Download Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-pink/25 hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap min-h-[52px]"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Resolving All Streams...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={20} />
                      <span>Get Media &amp; Formats</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Platform Presets */}
            <div className="space-y-2 pt-2 text-left">
              <span className="text-[11px] uppercase tracking-wider font-bold text-theme-foreground-muted">
                Supported 50+ Portals (Click to test):
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {SUPPORTED_PLATFORMS.map((plat) => (
                  <button
                    key={plat.id}
                    type="button"
                    onClick={() => {
                      setUrl(plat.sampleUrl);
                      handleExtract(plat.sampleUrl);
                    }}
                    className="px-3 py-1 rounded-xl bg-theme-surface-elevated hover:bg-theme-surface border border-theme-border/40 hover:border-brand-pink/40 text-xs font-medium text-theme-foreground flex items-center gap-1.5 transition-all duration-150"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: plat.color }}
                    />
                    {plat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3 text-left"
                >
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">Extraction Notice</p>
                    <p className="text-xs text-red-300/80 leading-relaxed">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result Card: Premium Showcase */}
            {result && (
              <div className="pt-6 border-t border-theme-border/40 space-y-6 text-left">
                
                {/* Media Title, Poster & Author Bar */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-theme-surface-elevated border border-theme-border/40 shadow-md">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-black/40 shrink-0 border border-theme-border/60 shadow-md">
                      {result.thumbnail ? (
                        <Image
                          src={result.thumbnail}
                          alt={result.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-pink">
                          <Video size={28} />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1.5 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-0.5 rounded-full text-[11px] font-extrabold bg-brand-pink/15 text-brand-pink border border-brand-pink/30">
                          {result.platform}
                        </span>
                        {result.author && (
                          <span className="text-xs text-theme-foreground-muted font-medium truncate">
                            by {result.author}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-theme-foreground line-clamp-1">
                        {result.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-theme-foreground-muted">
                        <span>{videoFormats.length} Video Qualities</span>
                        <span>&bull;</span>
                        <span>{audioFormats.length} Audio Bitrates</span>
                        <span>&bull;</span>
                        <span>{imageFormats.length} Thumbnail Formats</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <button
                      onClick={() => copyResultLink(result.originalUrl)}
                      className="px-4 py-2.5 rounded-xl bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border/40 text-xs font-bold text-theme-foreground flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      {copiedUrl ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copiedUrl ? "Copied Link" : "Share"}
                    </button>
                    <a
                      href={result.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border/40 text-theme-foreground transition-all"
                      title="Open Original Page"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                {/* 3 Dedicated Category Buttons (Videos, Audios, Thumbnails) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Videos Button */}
                  <button
                    onClick={() => setActiveCategory("video")}
                    className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between text-left ${
                      activeCategory === "video"
                        ? "bg-brand-pink/10 border-brand-pink shadow-md shadow-brand-pink/10"
                        : "bg-theme-surface-elevated border-theme-border/40 hover:border-brand-pink/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${activeCategory === "video" ? "bg-brand-pink text-white" : "bg-theme-surface text-brand-pink"}`}>
                        <Film size={20} />
                      </div>
                      <div>
                        <span className="block text-sm font-extrabold text-theme-foreground">
                          Video Formats
                        </span>
                        <span className="block text-xs text-theme-foreground-muted">
                          4K, 1080p, 720p, 480p, 360p ({videoFormats.length})
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={18} className={activeCategory === "video" ? "text-brand-pink" : "text-theme-foreground-muted"} />
                  </button>

                  {/* Audios Button */}
                  <button
                    onClick={() => setActiveCategory("audio")}
                    className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between text-left ${
                      activeCategory === "audio"
                        ? "bg-brand-pink/10 border-brand-pink shadow-md shadow-brand-pink/10"
                        : "bg-theme-surface-elevated border-theme-border/40 hover:border-brand-pink/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${activeCategory === "audio" ? "bg-brand-pink text-white" : "bg-theme-surface text-brand-pink"}`}>
                        <Headphones size={20} />
                      </div>
                      <div>
                        <span className="block text-sm font-extrabold text-theme-foreground">
                          Audio Tracks
                        </span>
                        <span className="block text-xs text-theme-foreground-muted">
                          320k, 256k, 192k, 128k MP3 ({audioFormats.length})
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={18} className={activeCategory === "audio" ? "text-brand-pink" : "text-theme-foreground-muted"} />
                  </button>

                  {/* Thumbnails & Covers Button */}
                  <button
                    onClick={() => setActiveCategory("image")}
                    className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between text-left ${
                      activeCategory === "image"
                        ? "bg-brand-pink/10 border-brand-pink shadow-md shadow-brand-pink/10"
                        : "bg-theme-surface-elevated border-theme-border/40 hover:border-brand-pink/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${activeCategory === "image" ? "bg-brand-pink text-white" : "bg-theme-surface text-brand-pink"}`}>
                        <ImageIcon size={20} />
                      </div>
                      <div>
                        <span className="block text-sm font-extrabold text-theme-foreground">
                          Thumbnails &amp; Covers
                        </span>
                        <span className="block text-xs text-theme-foreground-muted">
                          Ultra HD, SD, PNG, WebP ({imageFormats.length})
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={18} className={activeCategory === "image" ? "text-brand-pink" : "text-theme-foreground-muted"} />
                  </button>

                </div>

                {/* Media Preview Player */}
                {result.previewUrl && (
                  <div className="overflow-hidden rounded-2xl bg-black/90 border border-theme-border/40 shadow-inner">
                    {result.previewType === "video" && (
                      <div className="relative aspect-video w-full">
                        <video
                          src={result.previewUrl}
                          controls
                          poster={result.thumbnail}
                          className="w-full h-full object-contain"
                          playsInline
                        />
                      </div>
                    )}

                    {result.previewType === "audio" && (
                      <div className="p-6 flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-theme-surface-elevated to-theme-surface">
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg border border-theme-border/40 shrink-0">
                          <Image
                            src={result.thumbnail}
                            alt={result.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex-grow space-y-3 text-center sm:text-left w-full">
                          <div>
                            <span className="text-xs uppercase tracking-wider text-brand-pink font-bold">
                              Audio Track Stream
                            </span>
                            <h4 className="text-base font-bold text-theme-foreground line-clamp-1">
                              {result.title}
                            </h4>
                          </div>
                          
                          <audio
                            ref={audioRef}
                            src={result.previewUrl}
                            controls
                            className="w-full h-10"
                            onPlay={() => setIsPlayingAudio(true)}
                            onPause={() => setIsPlayingAudio(false)}
                          />
                        </div>
                      </div>
                    )}

                    {result.previewType === "image" && (
                      <div className="relative aspect-video w-full flex items-center justify-center p-4">
                        <Image
                          src={result.previewUrl}
                          alt={result.title}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Formats Grid for Active Category */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal size={15} className="text-brand-pink" />
                      <span className="text-xs font-bold uppercase tracking-wider text-theme-foreground">
                        {activeCategory === "all"
                          ? `All Download Formats (${filteredFormats.length})`
                          : activeCategory === "video"
                          ? `Video Formats (${filteredFormats.length})`
                          : activeCategory === "audio"
                          ? `Audio Tracks (${filteredFormats.length})`
                          : `Thumbnails & Image Assets (${filteredFormats.length})`}
                      </span>
                    </div>

                    {/* Filter Mode Switcher */}
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={`text-xs font-bold transition-colors ${
                        activeCategory === "all"
                          ? "text-brand-pink underline"
                          : "text-theme-foreground-muted hover:text-theme-foreground"
                      }`}
                    >
                      Show All ({result.formats.length})
                    </button>
                  </div>

                  {/* Formats Card Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredFormats.map((fmt) => (
                      <div
                        key={fmt.id}
                        className="p-4 rounded-2xl bg-theme-surface-elevated border border-theme-border/40 flex items-center justify-between gap-4 hover:border-brand-pink/50 transition-all duration-200 shadow-sm group"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="p-3 rounded-xl bg-theme-surface border border-theme-border/40 text-brand-pink shrink-0 group-hover:scale-105 transition-transform">
                            {fmt.type === "video" ? (
                              <Video size={20} />
                            ) : fmt.type === "audio" ? (
                              <Music size={20} />
                            ) : (
                              <ImageIcon size={20} />
                            )}
                          </div>
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-extrabold text-theme-foreground truncate">
                                {fmt.quality}
                              </span>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-brand-pink/10 text-brand-pink uppercase border border-brand-pink/20">
                                {fmt.extension}
                              </span>
                            </div>
                            <span className="text-xs text-theme-foreground-muted block truncate mt-0.5">
                              {fmt.sizeLabel || fmt.label}
                            </span>
                          </div>
                        </div>

                        {/* Direct Download Action Button */}
                        <button
                          onClick={() => handleDownloadFormat(fmt)}
                          disabled={downloadingId === fmt.id}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-coral hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-brand-pink/20 transition-all duration-150 active:scale-95 disabled:opacity-50 shrink-0"
                        >
                          {downloadingId === fmt.id ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <Download size={15} />
                          )}
                          <span>Download {fmt.extension.toUpperCase()}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Privacy & Speed Specs */}
            <div className="pt-4 border-t border-theme-border/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left text-xs text-theme-foreground-muted">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                <span>Zero Account &bull; 100% Private</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Zap size={16} className="text-brand-amber shrink-0" />
                <span>Fast Direct Stream Downloads</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <CheckCircle size={16} className="text-brand-pink shrink-0" />
                <span>No Watermark &bull; 4K &amp; 320k Audio</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Recent Downloads (Local History) */}
      {history.length > 0 && (
        <div className="rounded-3xl bg-theme-surface border border-theme-border/40 p-5 sm:p-6 space-y-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-brand-pink" />
              <h3 className="text-sm font-bold text-theme-foreground">
                Recent Downloads (Saved Locally in Browser)
              </h3>
            </div>
            <button
              onClick={clearHistory}
              className="text-xs text-theme-foreground-muted hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 size={13} />
              Clear History
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-theme-surface-elevated border border-theme-border/40 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-black/20 shrink-0">
                    <Image
                      src={item.thumbnail || "/Vortyx/icon.png"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-theme-foreground truncate">{item.title}</p>
                    <p className="text-[11px] text-theme-foreground-muted">
                      {item.platform} &bull; {item.formatLabel}
                    </p>
                  </div>
                </div>

                <a
                  href={item.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="p-2 rounded-xl bg-theme-surface hover:bg-brand-pink hover:text-white border border-theme-border/40 text-theme-foreground transition-all shrink-0"
                  title="Re-download"
                >
                  <Download size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
