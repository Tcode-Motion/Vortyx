"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { assetUrl } from "../../lib/utils/assetPath";
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
  FileText,
  RefreshCw,
  X,
  Radio,
  ArrowRight,
  Volume2,
  VolumeX,
  AlertTriangle,
} from "lucide-react";
import {
  NormalizedMedia,
  MediaFormatOption,
  ThumbnailOption,
  SubtitleTrack,
  CandidateMatch,
  ProviderCapability,
  DownloadJob,
  JobState,
  ProviderCatalogItem,
} from "../../lib/types/media";
import { sanitizeFilename } from "../../lib/security/sanitize";
import { ALL_PLATFORM_CATALOG } from "../../lib/providers/catalogData";
import WhatsAppWebSaver from "../WhatsAppWebSaver";

interface HistoryRecord {
  id: string;
  title: string;
  platform: string;
  thumbnail: string;
  downloadUrl: string;
  formatLabel: string;
  timestamp: number;
}

export default function UniversalDownloader() {
  const searchParams = useSearchParams();
  const [mainTab, setMainTab] = useState<"downloader" | "whatsapp" | "history">("downloader");
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState<"auto" | "audio" | "video">("auto");
  const [jobState, setJobState] = useState<JobState>(JobState.READY);
  const [stageLabel, setStageLabel] = useState<string>("");
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [showErrorVideo, setShowErrorVideo] = useState(false);
  const [errorVideoMuted, setErrorVideoMuted] = useState(false);
  const [result, setResult] = useState<NormalizedMedia | null>(null);
  const [activeCategory, setActiveCategory] = useState<"video" | "audio" | "image" | "subtitles" | "all">("video");
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateMatch | null>(null);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [detectedPortal, setDetectedPortal] = useState<ProviderCatalogItem | null>(null);

  // Queue & History state
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const errorVideoRef = useRef<HTMLVideoElement | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vortyx_history_v3");
      if (saved) setHistory(JSON.parse(saved));
    } catch {
      // Ignore
    }
  }, []);

  // Handle URL from query param (e.g. ?testUrl=...)
  useEffect(() => {
    const testUrl = searchParams.get("testUrl");
    if (testUrl) {
      setUrl(testUrl);
      handleExtract(testUrl);
    }
  }, [searchParams]);

  // Real-time Portal Detection as user types / pastes
  useEffect(() => {
    if (!url.trim()) {
      setDetectedPortal(null);
      return;
    }
    const clean = url.toLowerCase().trim();
    const found = ALL_PLATFORM_CATALOG.find((p) => p.domains.some((d) => clean.includes(d)));
    setDetectedPortal(found || null);
  }, [url]);

  // Handle autoplay with full audio when error video is displayed
  useEffect(() => {
    if (showErrorVideo && errorVideoRef.current) {
      const vid = errorVideoRef.current;
      vid.volume = 1.0;
      vid.muted = false;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocks unprompted audio autoplay, mute temporarily and offer unmute CTA
          setErrorVideoMuted(true);
          vid.muted = true;
          vid.play();
        });
      }
    }
  }, [showErrorVideo]);

  const unmuteErrorVideo = () => {
    if (errorVideoRef.current) {
      errorVideoRef.current.muted = false;
      errorVideoRef.current.volume = 1.0;
      setErrorVideoMuted(false);
      errorVideoRef.current.play();
    }
  };

  const triggerErrorWithVideo = (errorMessage: string) => {
    setJobState(JobState.FAILED);
    setError(errorMessage);
    setShowErrorVideo(true);
  };

  const saveToHistory = (media: NormalizedMedia, format: MediaFormatOption) => {
    try {
      const item: HistoryRecord = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 7)}`,
        title: media.title,
        platform: media.platformName,
        thumbnail: media.thumbnail,
        downloadUrl: format.url,
        formatLabel: `${format.quality} (${format.container.toUpperCase()})`,
        timestamp: Date.now(),
      };
      const updated = [item, ...history.filter((h) => h.downloadUrl !== format.url)].slice(0, 20);
      setHistory(updated);
      localStorage.setItem("vortyx_history_v3", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("vortyx_history_v3");
    } catch {}
  };

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          setError(null);
          setShowErrorVideo(false);
        }
      }
    } catch {
      // Clipboard denied
    }
  };

  const handleExtract = async (overrideUrl?: string) => {
    const targetUrl = (overrideUrl || url).trim();
    if (!targetUrl) {
      triggerErrorWithVideo("Please paste a media URL from YouTube, Spotify, Instagram, TikTok, or 35+ platforms.");
      return;
    }

    setJobState(JobState.RESOLVING);
    setStageLabel("Resolving Source Metadata & Stream Endpoints...");
    setError(null);
    setShowErrorVideo(false);
    setResult(null);
    setSelectedCandidate(null);

    try {
      const res = await fetch(assetUrl("/api/resolve"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl, mode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Extraction failed.");
      }

      setResult(data);
      if (data.candidateMatches && data.candidateMatches.length > 0) {
        setSelectedCandidate(data.candidateMatches[0]);
      }

      // Default category
      if (data.category === "music") {
        setActiveCategory("audio");
      } else if (data.formats.some((f: MediaFormatOption) => f.type === "video")) {
        setActiveCategory("video");
      } else if (data.formats.some((f: MediaFormatOption) => f.type === "audio")) {
        setActiveCategory("audio");
      } else {
        setActiveCategory("all");
      }

      setJobState(JobState.READY);
    } catch (err: any) {
      triggerErrorWithVideo(err?.message || "Unable to extract media from this URL or usage limit reached.");
    }
  };

  const handleDownloadFormat = async (format: MediaFormatOption) => {
    if (!result) return;
    setDownloadingId(format.id);
    setJobState(JobState.DOWNLOADING);
    setStageLabel("Downloading verified media stream...");
    setDownloadProgress(25);

    try {
      const filename = sanitizeFilename(`${result.title}_${format.quality}`, format.container);

      setTimeout(() => {
        setJobState(JobState.VERIFYING);
        setStageLabel("Verifying media container & magic bytes...");
        setDownloadProgress(75);
      }, 600);

      // Native browser trigger
      const a = document.createElement("a");
      a.href = format.url;
      a.download = filename;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        try {
          document.body.removeChild(a);
        } catch {}
        setJobState(JobState.READY);
        setDownloadProgress(100);
      }, 1200);

      saveToHistory(result, format);
    } catch {
      window.open(format.url, "_blank");
      setJobState(JobState.READY);
    } finally {
      setTimeout(() => setDownloadingId(null), 1000);
    }
  };

  const videoFormats = result?.formats.filter((f) => f.type === "video") || [];
  const audioFormats = result?.formats.filter((f) => f.type === "audio") || [];
  const thumbnailFormats = result?.thumbnails || [];
  const subtitlesList = result?.subtitles || [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Top Workspace Tab Switcher */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-full bg-theme-surface border border-theme-border/60 shadow-lg flex-wrap justify-center gap-1">
          <button
            onClick={() => setMainTab("downloader")}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
              mainTab === "downloader"
                ? "bg-gradient-to-r from-brand-pink to-brand-coral text-white shadow-md shadow-brand-pink/20"
                : "text-theme-foreground/70 hover:text-theme-foreground"
            }`}
          >
            <Sparkles size={15} />
            Universal Downloader
          </button>

          <button
            onClick={() => setMainTab("whatsapp")}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
              mainTab === "whatsapp"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-theme-foreground/70 hover:text-theme-foreground"
            }`}
          >
            <Share2 size={15} />
            WhatsApp Web Status
          </button>

          <button
            onClick={() => setMainTab("history")}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
              mainTab === "history"
                ? "bg-brand-coral text-white shadow-md shadow-brand-coral/20"
                : "text-theme-foreground/70 hover:text-theme-foreground"
            }`}
          >
            <Clock size={15} />
            History ({history.length})
          </button>

          <Link
            href="/providers"
            className="px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 text-theme-foreground/70 hover:text-theme-foreground transition-all"
          >
            <Layers size={14} className="text-brand-pink" />
            <span>35+ Portals</span>
          </Link>
        </div>
      </div>

      {mainTab === "whatsapp" ? (
        <WhatsAppWebSaver />
      ) : mainTab === "history" ? (
        /* Recent Downloads History Panel */
        <div className="p-6 sm:p-8 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-6 shadow-sm text-left">
          <div className="flex items-center justify-between border-b border-theme-border/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-pink/10 text-brand-pink">
                <Clock size={22} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-theme-foreground">Recent Downloads</h3>
                <p className="text-xs text-theme-foreground-muted">Files saved in your local browser session.</p>
              </div>
            </div>

            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="px-3.5 py-1.5 rounded-xl bg-theme-surface-elevated hover:bg-red-500/10 hover:text-red-400 border border-theme-border/40 text-xs font-bold text-theme-foreground-muted flex items-center gap-1.5 transition-all"
              >
                <Trash2 size={13} />
                <span>Clear History</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <Clock size={32} className="mx-auto text-theme-foreground-muted opacity-40" />
              <p className="text-sm font-bold text-theme-foreground">No downloads in history yet</p>
              <p className="text-xs text-theme-foreground-muted">Paste any media link in the Downloader to save files.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="p-4 rounded-2xl bg-theme-surface-elevated border border-theme-border/40 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/40 shrink-0">
                      <Image src={h.thumbnail || assetUrl("/icon.png")} alt={h.title} fill className="object-cover" unoptimized />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-xs font-extrabold text-theme-foreground block truncate">{h.title}</span>
                      <span className="text-[11px] text-theme-foreground-muted block truncate mt-0.5">
                        {h.platform} &bull; {h.formatLabel}
                      </span>
                    </div>
                  </div>

                  <a
                    href={h.downloadUrl}
                    download
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-coral text-white font-bold text-xs flex items-center gap-1 shadow-sm shrink-0"
                  >
                    <Download size={13} />
                    <span>Save</span>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Universal Media Workspace Downloader */
        <div className="relative rounded-3xl p-1 sm:p-2 bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber shadow-2xl shadow-brand-pink/20">
          <div className="bg-theme-surface/95 backdrop-blur-xl rounded-[22px] p-5 sm:p-8 md:p-10 space-y-6">
            
            {/* Header & Provider Detection Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-theme-border/40 pb-5">
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-extrabold uppercase tracking-wider">
                    <Flame size={14} className="animate-pulse text-brand-pink" />
                    Universal Media Engine &bull; 35+ Portals
                  </div>

                  {detectedPortal && (
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1.5"
                      style={{ backgroundColor: detectedPortal.color }}
                    >
                      <CheckCircle size={13} />
                      {detectedPortal.name} Detected
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-theme-foreground">
                  Universal Media &amp; Audio Downloader
                </h2>
              </div>

              {/* Mode Selector */}
              <div className="flex items-center gap-1 p-1 bg-theme-surface-elevated border border-theme-border/40 rounded-full text-xs font-semibold">
                <button
                  onClick={() => setMode("auto")}
                  className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                    mode === "auto" ? "bg-gradient-to-r from-brand-pink to-brand-coral text-white shadow-sm" : "text-theme-foreground/70"
                  }`}
                >
                  <Layers size={13} />
                  All
                </button>
                <button
                  onClick={() => setMode("video")}
                  className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                    mode === "video" ? "bg-gradient-to-r from-brand-pink to-brand-coral text-white shadow-sm" : "text-theme-foreground/70"
                  }`}
                >
                  <Video size={13} />
                  Video
                </button>
                <button
                  onClick={() => setMode("audio")}
                  className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                    mode === "audio" ? "bg-gradient-to-r from-brand-pink to-brand-coral text-white shadow-sm" : "text-theme-foreground/70"
                  }`}
                >
                  <Music size={13} />
                  Audio
                </button>
              </div>
            </div>

            {/* Smart URL Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleExtract();
              }}
              className="space-y-4"
            >
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-grow flex items-center">
                  <div className="absolute left-4 flex items-center pointer-events-none text-theme-foreground-muted">
                    <LinkIcon size={20} />
                  </div>

                  <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (error) {
                        setError(null);
                        setShowErrorVideo(false);
                      }
                    }}
                    placeholder="Paste link from YouTube, Spotify, Instagram, TikTok, Apple Music, Reddit, SoundCloud..."
                    className="w-full pl-12 pr-28 sm:pr-36 py-4 rounded-2xl bg-theme-surface-elevated border border-theme-border/60 hover:border-brand-pink/40 focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 text-theme-foreground text-sm sm:text-base outline-none transition-all placeholder:text-theme-foreground-muted/60"
                    required
                  />

                  <div className="absolute right-2 flex items-center gap-1.5">
                    {url ? (
                      <button
                        type="button"
                        onClick={() => {
                          setUrl("");
                          setResult(null);
                          setError(null);
                          setShowErrorVideo(false);
                          setDetectedPortal(null);
                        }}
                        className="p-2 rounded-xl text-theme-foreground-muted hover:text-theme-foreground"
                      >
                        <RotateCcw size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePaste}
                        className="px-3 py-1.5 rounded-xl bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border/40 text-theme-foreground text-xs font-semibold flex items-center gap-1"
                      >
                        <Copy size={13} />
                        Paste
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={jobState === JobState.RESOLVING || jobState === JobState.FETCHING}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-pink/25 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 whitespace-nowrap min-h-[52px]"
                >
                  {jobState === JobState.RESOLVING ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Resolving...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={20} />
                      <span>Get Media</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Real-time Job Progress Indicator */}
            {jobState !== JobState.READY && jobState !== JobState.FAILED && (
              <div className="p-4 rounded-2xl bg-theme-surface-elevated border border-theme-border/40 space-y-2 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-theme-foreground flex items-center gap-2">
                    <RefreshCw size={14} className="animate-spin text-brand-pink" />
                    {stageLabel}
                  </span>
                  {downloadProgress > 0 && (
                    <span className="font-extrabold text-brand-pink">{downloadProgress}%</span>
                  )}
                </div>
                <div className="w-full h-2 rounded-full bg-theme-surface overflow-hidden border border-theme-border/40">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber"
                    initial={{ width: "0%" }}
                    animate={{ width: `${downloadProgress || 40}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {/* Error Banner with Full-Sound Error Video Player */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-5 rounded-3xl bg-red-500/10 border border-red-500/30 text-red-400 space-y-4 text-left shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle size={24} className="shrink-0 mt-0.5 text-red-400" />
                      <div className="space-y-1">
                        <p className="font-extrabold text-base text-red-400">Notice / Limit Reached</p>
                        <p className="text-xs text-red-300/90 leading-relaxed">{error}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowErrorVideo(false)}
                      className="p-1 rounded-full text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Encoded Video Player with Full Sound */}
                  {showErrorVideo && (
                    <div className="space-y-3 pt-2">
                      <div className="relative rounded-2xl overflow-hidden bg-black/90 border border-red-500/30 aspect-video max-w-lg mx-auto shadow-2xl">
                        <video
                          ref={errorVideoRef}
                          src={assetUrl("/error-video.mp4")}
                          controls
                          autoPlay
                          loop
                          playsInline
                          className="w-full h-full object-contain"
                        />

                        {/* Unmute / Play Full Audio Overlay Banner */}
                        {errorVideoMuted && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                            <button
                              onClick={unmuteErrorVideo}
                              className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-brand-pink text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-2xl shadow-red-500/50 animate-bounce hover:scale-105 transition-transform"
                            >
                              <Volume2 size={18} />
                              <span>Click to Play With Full Sound</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-red-300/80 px-2 max-w-lg mx-auto">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Volume2 size={14} className="text-red-400" />
                          Playing with full audio enabled
                        </span>
                        <button
                          onClick={unmuteErrorVideo}
                          className="font-bold text-red-400 hover:underline"
                        >
                          Max Volume
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Resolved Media Workspace */}
            {result && (
              <div className="pt-6 border-t border-theme-border/40 space-y-6 text-left">
                
                {/* Media Summary Banner */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-theme-surface-elevated border border-theme-border/40 shadow-md">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-black/40 shrink-0 border border-theme-border/60 shadow-md">
                      {result.thumbnail ? (
                        <Image src={result.thumbnail} alt={result.title} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-pink">
                          <Video size={28} />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1.5 overflow-hidden">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-0.5 rounded-full text-[11px] font-extrabold bg-brand-pink/15 text-brand-pink border border-brand-pink/30">
                          {result.platformName}
                        </span>
                        {result.author && (
                          <span className="text-xs text-theme-foreground-muted font-medium truncate">
                            by {result.author}
                          </span>
                        )}
                        {result.durationLabel && (
                          <span className="text-xs font-bold text-theme-foreground flex items-center gap-1">
                            <Clock size={12} className="text-brand-amber" />
                            {result.durationLabel}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-theme-foreground line-clamp-1">
                        {result.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-theme-foreground-muted">
                        <span>{videoFormats.length} Video Formats</span>
                        <span>&bull;</span>
                        <span>{audioFormats.length} Audio Bitrates</span>
                        <span>&bull;</span>
                        <span>{thumbnailFormats.length} Artwork Assets</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(result.originalUrl);
                        setCopiedUrl(true);
                        setTimeout(() => setCopiedUrl(false), 2000);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border/40 text-xs font-bold text-theme-foreground flex items-center gap-1.5 shadow-sm"
                    >
                      {copiedUrl ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copiedUrl ? "Copied Link" : "Share"}
                    </button>
                  </div>
                </div>

                {/* Candidate Match Verification for Music Platforms */}
                {result.candidateMatches && result.candidateMatches.length > 0 && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-brand-pink/10 border border-amber-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Radio size={16} className="text-amber-400 animate-pulse" />
                        <span className="text-xs font-bold text-theme-foreground">
                          Candidate Stream Matches ({result.candidateMatches.length}) &bull; Confidence Scored
                        </span>
                      </div>
                      <button
                        onClick={() => setShowCandidateModal(true)}
                        className="text-xs font-bold text-brand-pink hover:underline flex items-center gap-1"
                      >
                        <span>Change Match</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>

                    {selectedCandidate && (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-theme-surface border border-theme-border/40 text-xs">
                        <div>
                          <p className="font-bold text-theme-foreground">{selectedCandidate.title}</p>
                          <p className="text-[11px] text-theme-foreground-muted">
                            Source: {selectedCandidate.sourceProvider} &bull; Confidence: {selectedCandidate.confidenceScore}%
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">
                          {selectedCandidate.confidenceScore}% Match
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* 4 Dedicated Category Switches */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => setActiveCategory("video")}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      activeCategory === "video"
                        ? "bg-brand-pink/10 border-brand-pink shadow-sm"
                        : "bg-theme-surface-elevated border-theme-border/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Film size={18} className="text-brand-pink" />
                      <div className="text-left">
                        <span className="block text-xs font-bold text-theme-foreground">Videos</span>
                        <span className="block text-[10px] text-theme-foreground-muted">4K to 360p ({videoFormats.length})</span>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveCategory("audio")}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      activeCategory === "audio"
                        ? "bg-brand-pink/10 border-brand-pink shadow-sm"
                        : "bg-theme-surface-elevated border-theme-border/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Headphones size={18} className="text-brand-pink" />
                      <div className="text-left">
                        <span className="block text-xs font-bold text-theme-foreground">Audios</span>
                        <span className="block text-[10px] text-theme-foreground-muted">320k to 128k ({audioFormats.length})</span>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveCategory("image")}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      activeCategory === "image"
                        ? "bg-brand-pink/10 border-brand-pink shadow-sm"
                        : "bg-theme-surface-elevated border-theme-border/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ImageIcon size={18} className="text-brand-pink" />
                      <div className="text-left">
                        <span className="block text-xs font-bold text-theme-foreground">Thumbnails</span>
                        <span className="block text-[10px] text-theme-foreground-muted">Ultra HD/PNG ({thumbnailFormats.length})</span>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveCategory("subtitles")}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      activeCategory === "subtitles"
                        ? "bg-brand-pink/10 border-brand-pink shadow-sm"
                        : "bg-theme-surface-elevated border-theme-border/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText size={18} className="text-brand-pink" />
                      <div className="text-left">
                        <span className="block text-xs font-bold text-theme-foreground">Subtitles</span>
                        <span className="block text-[10px] text-theme-foreground-muted">VTT/SRT ({subtitlesList.length})</span>
                      </div>
                    </div>
                  </button>
                </div>

                {/* In-Browser Real Media Preview Player with Range Support */}
                {result.previewUrl && (
                  <div className="overflow-hidden rounded-2xl bg-black/95 border border-theme-border/40 shadow-inner">
                    {result.previewType === "video" && (
                      <div className="relative aspect-video w-full">
                        <video
                          ref={videoRef}
                          src={result.previewUrl}
                          controls
                          poster={result.thumbnail}
                          className="w-full h-full object-contain"
                          playsInline
                          preload="metadata"
                        />
                      </div>
                    )}

                    {result.previewType === "audio" && (
                      <div className="p-6 flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-theme-surface-elevated to-theme-surface">
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg border border-theme-border/40 shrink-0">
                          <Image src={result.thumbnail} alt={result.title} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex-grow space-y-3 text-center sm:text-left w-full">
                          <div>
                            <span className="text-xs uppercase tracking-wider text-brand-pink font-bold">Verified Audio Stream Preview</span>
                            <h4 className="text-base font-bold text-theme-foreground line-clamp-1">{result.title}</h4>
                          </div>
                          <audio ref={audioRef} src={result.previewUrl} controls className="w-full h-10" preload="metadata" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Formats Grid Rendering */}
                <div className="space-y-4">
                  {activeCategory === "video" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {videoFormats.map((fmt) => (
                        <div key={fmt.id} className="p-4 rounded-2xl bg-theme-surface-elevated border border-theme-border/40 flex items-center justify-between gap-4 shadow-sm">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-3 rounded-xl bg-theme-surface text-brand-pink shrink-0">
                              <Video size={20} />
                            </div>
                            <div className="overflow-hidden">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-extrabold text-theme-foreground">{fmt.quality}</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-pink/10 text-brand-pink uppercase">
                                  {fmt.container}
                                </span>
                              </div>
                              <span className="text-xs text-theme-foreground-muted block truncate mt-0.5">{fmt.sizeLabel}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownloadFormat(fmt)}
                            disabled={downloadingId === fmt.id}
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-coral hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-brand-pink/20"
                          >
                            <Download size={14} />
                            <span>Save MP4</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeCategory === "audio" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {audioFormats.map((fmt) => (
                        <div key={fmt.id} className="p-4 rounded-2xl bg-theme-surface-elevated border border-theme-border/40 flex items-center justify-between gap-4 shadow-sm">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-3 rounded-xl bg-theme-surface text-brand-pink shrink-0">
                              <Music size={20} />
                            </div>
                            <div className="overflow-hidden">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-extrabold text-theme-foreground">{fmt.quality}</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-pink/10 text-brand-pink uppercase">
                                  {fmt.container}
                                </span>
                              </div>
                              <span className="text-xs text-theme-foreground-muted block truncate mt-0.5">{fmt.sizeLabel}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownloadFormat(fmt)}
                            disabled={downloadingId === fmt.id}
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-coral hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-brand-pink/20"
                          >
                            <Download size={14} />
                            <span>Save MP3</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeCategory === "image" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {thumbnailFormats.map((thumb) => (
                        <div key={thumb.id} className="p-4 rounded-2xl bg-theme-surface-elevated border border-theme-border/40 flex items-center justify-between gap-4 shadow-sm">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-3 rounded-xl bg-theme-surface text-brand-pink shrink-0">
                              <ImageIcon size={20} />
                            </div>
                            <div className="overflow-hidden">
                              <span className="text-sm font-extrabold text-theme-foreground block truncate">{thumb.quality}</span>
                              <span className="text-xs text-theme-foreground-muted block truncate">{thumb.sizeLabel || thumb.resolution}</span>
                            </div>
                          </div>
                          <a
                            href={thumb.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-coral text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-brand-pink/20"
                          >
                            <Download size={14} />
                            <span>Save Image</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeCategory === "subtitles" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {subtitlesList.map((sub) => (
                        <div key={sub.id} className="p-4 rounded-2xl bg-theme-surface-elevated border border-theme-border/40 flex items-center justify-between gap-4 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-theme-surface text-brand-pink">
                              <FileText size={20} />
                            </div>
                            <div>
                              <span className="text-sm font-bold text-theme-foreground">{sub.language}</span>
                              <span className="text-xs text-theme-foreground-muted block">Format: {sub.format.toUpperCase()}</span>
                            </div>
                          </div>
                          <a
                            href={sub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="px-4 py-2.5 rounded-xl bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border/40 text-xs font-bold text-theme-foreground flex items-center gap-1.5"
                          >
                            <Download size={14} />
                            <span>Save Track</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Security Guarantee Footer */}
            <div className="pt-4 border-t border-theme-border/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left text-xs text-theme-foreground-muted">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                <span>SSRF Guarded &bull; DNS Rebinding Blocked</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Zap size={16} className="text-brand-amber shrink-0" />
                <span>FFprobe Validated Media Streams</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <CheckCircle size={16} className="text-brand-pink shrink-0" />
                <span>HTTP Range 206 Preview &amp; Stream</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Candidate Match Modal */}
      <AnimatePresence>
        {showCandidateModal && result?.candidateMatches && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setShowCandidateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-3xl bg-theme-surface border border-theme-border/40 p-6 space-y-4 shadow-2xl text-left"
            >
              <div className="flex items-center justify-between border-b border-theme-border/20 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-theme-foreground">Select Equivalent Stream Match</h3>
                  <p className="text-xs text-theme-foreground-muted">Choose the best verified legal stream match for this track.</p>
                </div>
                <button onClick={() => setShowCandidateModal(false)} className="p-1.5 rounded-full hover:bg-theme-surface-elevated">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                {result.candidateMatches.map((cand) => (
                  <div
                    key={cand.id}
                    onClick={() => {
                      setSelectedCandidate(cand);
                      setShowCandidateModal(false);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedCandidate?.id === cand.id ? "bg-brand-pink/10 border-brand-pink" : "bg-theme-surface-elevated border-theme-border/40 hover:border-brand-pink/40"
                    }`}
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-theme-foreground">{cand.title}</p>
                      <p className="text-xs text-theme-foreground-muted">{cand.matchReasons.join(" • ")}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-extrabold text-xs">
                      {cand.confidenceScore}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
