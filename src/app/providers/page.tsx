"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  SlidersHorizontal,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Layers,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Zap,
  Globe,
  Radio,
  Music,
  Video,
  Share2,
  Tv,
  Film,
  Disc,
  Headphones,
  Phone,
  ShieldCheck,
  RefreshCw,
  Activity,
  ArrowUpDown,
} from "lucide-react";
import { ProviderCatalogItem, ProviderCapability, PlatformCategory } from "../../lib/types/media";

export default function ProvidersPage() {
  const router = useRouter();
  const [providers, setProviders] = useState<ProviderCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCapability, setSelectedCapability] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "latency" | "popularity">("popularity");

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/diagnostics");
      if (res.ok) {
        const json = await res.json();
        setProviders(json.providers || []);
      }
    } catch {
      // Ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const categories: { id: string; label: string; icon: any }[] = [
    { id: "all", label: "All Portals", icon: Layers },
    { id: "video", label: "Video & 4K", icon: Video },
    { id: "music", label: "Music & Audio", icon: Music },
    { id: "short_video", label: "Short Video", icon: Zap },
    { id: "social", label: "Social Networks", icon: Share2 },
    { id: "streaming", label: "Livestream & VOD", icon: Tv },
    { id: "community", label: "Community & Creator", icon: Globe },
    { id: "messaging", label: "Messaging & Status", icon: Phone },
  ];

  const filtered = providers
    .filter((p) => {
      // Category filter
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }
      // Capability filter
      if (selectedCapability !== "all" && !p.supportedCapabilities.includes(selectedCapability as ProviderCapability)) {
        return false;
      }
      // Search term
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchDomain = p.domains.some((d) => d.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchDomain) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "latency") return a.latencyMs - b.latencyMs;
      return b.totalSuccesses - a.totalSuccesses;
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle size={12} />
            Healthy
          </span>
        );
      case "degraded":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle size={12} />
            Degraded
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
            <XCircle size={12} />
            Offline
          </span>
        );
    }
  };

  const getDeliveryModeBadge = (mode: string) => {
    switch (mode) {
      case "DIRECT_DOWNLOAD":
        return (
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            Direct Media Download
          </span>
        );
      case "SEARCH_FALLBACK":
        return (
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            Legal Search Fallback
          </span>
        );
      case "LOCAL_INSPECTION":
        return (
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            Local Privacy Sandbox
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
            Public Metadata Only
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-theme-background text-theme-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-extrabold uppercase tracking-wider">
            <Sparkles size={15} />
            Modular Dynamic Catalog &bull; 35+ Supported Providers
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Supported Media &amp; Audio Portals
          </h1>
          <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
            Browse our dynamically updated catalog of supported video, music, social, and messaging platforms. Each portal operates on isolated, legally compliant provider adapters.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-6 rounded-3xl bg-theme-surface border border-theme-border/40 space-y-4 shadow-sm">
          
          {/* Top Search & Sorters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-grow">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-foreground-muted pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search portals by name or domain (e.g. YouTube, Spotify, TikTok, Instagram, Reddit)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-theme-surface-elevated border border-theme-border/60 hover:border-brand-pink/40 focus:border-brand-pink text-sm text-theme-foreground outline-none transition-all placeholder:text-theme-foreground-muted"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-theme-surface-elevated border border-theme-border/60 text-xs font-bold text-theme-foreground">
                <ArrowUpDown size={14} className="text-brand-pink" />
                <span className="text-theme-foreground-muted">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer text-theme-foreground font-bold"
                >
                  <option value="popularity" className="bg-theme-surface">Popularity</option>
                  <option value="name" className="bg-theme-surface">Alphabetical (A-Z)</option>
                  <option value="latency" className="bg-theme-surface">Lowest Latency</option>
                </select>
              </div>

              <Link
                href="/diagnostics"
                className="px-4 py-2.5 rounded-2xl bg-theme-surface-elevated hover:bg-brand-pink/10 hover:text-brand-pink border border-theme-border/60 text-xs font-bold flex items-center gap-1.5 transition-all text-theme-foreground"
              >
                <Activity size={14} className="text-brand-pink" />
                <span>Health Dashboard</span>
              </Link>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-theme-border/20">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? "bg-gradient-to-r from-brand-pink to-brand-coral text-white shadow-md shadow-brand-pink/20"
                      : "bg-theme-surface-elevated text-theme-foreground/70 hover:text-theme-foreground hover:bg-theme-surface border border-theme-border/40"
                  }`}
                >
                  <Icon size={14} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Dynamic Provider Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-theme-foreground-muted px-1">
            <span>Showing <strong>{filtered.length}</strong> of {providers.length} registered portals</span>
            <span>Real-time backend registry</span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-theme-surface border border-theme-border/40 space-y-3">
              <Layers size={36} className="mx-auto text-theme-foreground-muted" />
              <h3 className="text-base font-bold text-theme-foreground">No matching portals found</h3>
              <p className="text-xs text-theme-foreground-muted">Try adjusting your search query or category filter.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                  setSelectedCapability("all");
                }}
                className="px-4 py-2 rounded-full bg-brand-pink text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="p-6 rounded-3xl bg-theme-surface border border-theme-border/40 hover:border-brand-pink/40 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    
                    {/* Top Row: Icon, Title & Health Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-md"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-base font-extrabold text-theme-foreground">{item.name}</h3>
                          <span className="text-[11px] uppercase tracking-wider font-bold text-theme-foreground-muted">
                            Category: {item.category.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-theme-foreground-muted leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Delivery Mode Badge */}
                    <div>
                      {getDeliveryModeBadge(item.deliveryMode)}
                    </div>

                    {/* Declared Capabilities */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-theme-foreground-muted block">
                        Capabilities &amp; Features:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.supportedCapabilities.map((cap) => (
                          <span
                            key={cap}
                            className="px-2 py-0.5 rounded-md bg-theme-surface-elevated border border-theme-border/40 text-[10px] font-semibold text-theme-foreground"
                          >
                            {cap.replace(/_/g, " ")}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-theme-border/20 flex items-center justify-between text-xs text-theme-foreground-muted">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Zap size={12} className="text-brand-amber" />
                      {item.latencyMs}ms Latency
                    </span>

                    <button
                      onClick={() => {
                        router.push(`/?testUrl=${encodeURIComponent(item.exampleUrl)}`);
                      }}
                      className="text-xs font-bold text-brand-pink hover:underline flex items-center gap-1"
                    >
                      <span>Try Link</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
