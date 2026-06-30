"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, ChevronLeft, ChevronRight, LayoutGrid, Eye } from "lucide-react";
import PhoneMockup from "../../components/PhoneMockup";

interface ScreenshotItem {
  src: string;
  title: string;
  desc: string;
  alt: string;
}

export default function ScreenshotsPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items: ScreenshotItem[] = [
    {
      src: "/screenshots/home.png",
      title: "Universal Downloader",
      desc: "Analyze and download media from 50+ portals with one tap.",
      alt: "Vortyx Downloader Tab Screenshot",
    },
    {
      src: "/screenshots/downloads.png",
      title: "Active Download Queue",
      desc: "Track real-time progress, speeds, and schedule background syncs.",
      alt: "Vortyx Downloads Queue Screenshot",
    },
    {
      src: "/screenshots/galary.png",
      title: "Offline Media Library",
      desc: "Organize and play your downloaded videos and audio files locally.",
      alt: "Vortyx Gallery Tab Screenshot",
    },
    {
      src: "/screenshots/statussaver.png",
      title: "WhatsApp Status Saver",
      desc: "Instantly view and save WhatsApp statuses without using internet data.",
      alt: "Vortyx WhatsApp Saver Tab Screenshot",
    },
    {
      src: "/screenshots/satings.png",
      title: "App Customization & Settings",
      desc: "Control clipboard monitoring, Wi-Fi scheduling, and parallel thread limits.",
      alt: "Vortyx Settings Tab Screenshot",
    },
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handleLightboxPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === null || prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleLightboxNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === null || prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-brand-pink/10 dark:bg-brand-pink/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-amber/10 dark:bg-brand-amber/5 blur-[130px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-semibold uppercase tracking-wider"
          >
            <LayoutGrid size={14} />
            Visual Walkthrough
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            Experience Vortyx in Action
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-theme-foreground-muted leading-relaxed"
          >
            A native, premium interface built with Material Design 3 for speed and privacy.
          </motion.p>
        </div>

        {/* Dynamic Mockup Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 pt-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center space-y-6 group"
            >
              {/* Mockup Frame with Hover scale */}
              <div
                onClick={() => openLightbox(index)}
                className="relative w-full cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <PhoneMockup src={item.src} alt={item.alt} priority={index < 3} />
                
                {/* Floating overlay Zoom Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[38px] flex items-center justify-center z-25">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white shadow-lg flex items-center gap-1.5 text-xs font-semibold tracking-wide">
                    <ZoomIn size={18} />
                    Zoom UI
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="text-center space-y-1.5 px-4 max-w-[280px]">
                <h3 className="text-lg font-bold text-theme-foreground bg-gradient-to-r from-brand-pink to-brand-coral bg-clip-text text-transparent">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Compilation Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-theme-border/20 pt-16 sm:pt-24 space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-foreground">App Layout Overview</h2>
              <p className="text-xs sm:text-sm text-theme-foreground-muted">High-resolution compilation of the main app screens.</p>
            </div>
            <button
              onClick={() => openLightbox(0)} // Open index 0 for lightbox which has slide transitions
              className="flex items-center gap-2 text-xs font-bold text-brand-pink hover:brightness-110 transition-all cursor-pointer bg-brand-pink/10 px-4 py-2 rounded-full border border-brand-pink/20"
            >
              <Eye size={14} />
              Open Interactive Gallery
            </button>
          </div>

          <div
            className="relative w-full h-[300px] sm:h-[450px] md:h-[550px] rounded-3xl overflow-hidden border border-theme-border/40 cursor-zoom-in group shadow-xl bg-slate-950"
            onClick={() => openLightbox(0)}
          >
            <Image
              src="/app-screen-overview.png"
              alt="Vortyx App Screens Compilation"
              fill
              sizes="100vw"
              className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors duration-300" />
            <div className="absolute bottom-6 right-6 p-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ZoomIn size={20} />
            </div>
          </div>
        </motion.section>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-brand-pink transition-colors z-50 cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Left Nav */}
            <button
              onClick={handleLightboxPrev}
              className="absolute left-4 p-3.5 rounded-full bg-white/5 hover:bg-white/15 text-white hover:text-brand-pink transition-colors z-50 cursor-pointer"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="relative w-full max-w-[340px] sm:max-w-[400px] h-[75vh] sm:h-[82vh] rounded-[36px] overflow-hidden border border-white/10 shadow-2xl bg-slate-950"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glass shine overlay */}
              <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-transparent via-white/5 to-transparent mix-blend-overlay" />
              
              {/* Image Frame */}
              <div className="relative w-full h-full scale-[1.08] translate-y-[-1.5%]">
                <Image
                  src={items[lightboxIndex].src}
                  alt={items[lightboxIndex].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Right Nav */}
            <button
              onClick={handleLightboxNext}
              className="absolute right-4 p-3.5 rounded-full bg-white/5 hover:bg-white/15 text-white hover:text-brand-pink transition-colors z-50 cursor-pointer"
            >
              <ChevronRight size={28} />
            </button>

            {/* Caption underneath */}
            <div className="absolute bottom-6 left-4 right-4 text-center space-y-1.5 z-40 pointer-events-none">
              <h4 className="text-lg font-bold text-white tracking-wide">
                {items[lightboxIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
                {items[lightboxIndex].desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
