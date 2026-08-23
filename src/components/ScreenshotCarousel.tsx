"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PhoneMockup from "./PhoneMockup";
import { assetUrl } from "../lib/utils/assetPath";

interface ScreenshotItem {
  src: string;
  title: string;
  desc: string;
  alt: string;
}

export default function ScreenshotCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const items: ScreenshotItem[] = [
    {
      src: assetUrl("/screenshots/home.png"),
      title: "Universal Downloader",
      desc: "Analyze and download media from 50+ portals with one tap.",
      alt: "Vortyx Downloader Tab Screenshot",
    },
    {
      src: assetUrl("/screenshots/downloads.png"),
      title: "Active Download Queue",
      desc: "Track real-time progress, speeds, and schedule background syncs.",
      alt: "Vortyx Downloads Queue Screenshot",
    },
    {
      src: assetUrl("/screenshots/galary.png"),
      title: "Offline Media Library",
      desc: "Organize and play your downloaded videos and audio files locally.",
      alt: "Vortyx Gallery Tab Screenshot",
    },
    {
      src: assetUrl("/screenshots/statussaver.png"),
      title: "WhatsApp Status Saver",
      desc: "Instantly view and save WhatsApp statuses without using internet data.",
      alt: "Vortyx WhatsApp Saver Tab Screenshot",
    },
    {
      src: assetUrl("/screenshots/satings.png"),
      title: "App Customization & Settings",
      desc: "Control clipboard monitoring, Wi-Fi scheduling, and parallel thread limits.",
      alt: "Vortyx Settings Tab Screenshot",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

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
    <div className="w-full space-y-12">
      {/* Desktop view (Carousel) */}
      <div className="hidden md:block relative px-12">
        {/* Carousel Tracks */}
        <div className="overflow-hidden py-10">
          <div className="flex items-center justify-center gap-8 lg:gap-12">
            {/* Left Card Preview */}
            <div
              onClick={() => setCurrentIndex((currentIndex - 1 + items.length) % items.length)}
              className="opacity-40 scale-85 hover:opacity-60 transition-all duration-300 cursor-pointer w-[200px]"
            >
              <PhoneMockup src={items[(currentIndex - 1 + items.length) % items.length].src} alt="Previous Mockup" />
            </div>

            {/* Active Card */}
            <motion.div
              layoutId="active-mockup"
              className="relative scale-100 z-10 w-[280px] sm:w-[300px] group cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div onClick={() => openLightbox(currentIndex)}>
                <PhoneMockup src={items[currentIndex].src} alt={items[currentIndex].alt} priority />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[38px] flex items-center justify-center z-25">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white shadow-lg">
                    <ZoomIn size={24} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Card Preview */}
            <div
              onClick={() => setCurrentIndex((currentIndex + 1) % items.length)}
              className="opacity-40 scale-85 hover:opacity-60 transition-all duration-300 cursor-pointer w-[200px]"
            >
              <PhoneMockup src={items[(currentIndex + 1) % items.length].src} alt="Next Mockup" />
            </div>
          </div>
        </div>

        {/* Carousel Navigation Controllers */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between items-center px-4 pointer-events-none">
          <button
            onClick={handlePrev}
            className="p-3.5 rounded-full bg-theme-surface/75 border border-theme-border/40 hover:border-brand-pink/40 hover:text-brand-pink text-theme-foreground transition-all duration-200 shadow-lg pointer-events-auto cursor-pointer"
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={handleNext}
            className="p-3.5 rounded-full bg-theme-surface/75 border border-theme-border/40 hover:border-brand-pink/40 hover:text-brand-pink text-theme-foreground transition-all duration-200 shadow-lg pointer-events-auto cursor-pointer"
            aria-label="Next screenshot"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Caption */}
        <div className="text-center max-w-md mx-auto space-y-2 mt-4">
          <h3 className="text-xl font-bold text-theme-foreground bg-gradient-to-r from-brand-pink to-brand-coral bg-clip-text text-transparent">
            {items[currentIndex].title}
          </h3>
          <p className="text-sm text-theme-foreground-muted leading-relaxed">
            {items[currentIndex].desc}
          </p>
        </div>
      </div>

      {/* Mobile view (Horizontal Swiper list) */}
      <div className="md:hidden space-y-6">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 pb-6 no-scrollbar"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="snap-center shrink-0 w-[260px] flex flex-col items-center space-y-4"
            >
              <div className="relative w-full cursor-pointer" onClick={() => openLightbox(index)}>
                <PhoneMockup src={item.src} alt={item.alt} />
              </div>
              <div className="text-center space-y-1 px-4">
                <h3 className="text-base font-bold text-theme-foreground bg-gradient-to-r from-brand-pink to-brand-coral bg-clip-text text-transparent">
                  {item.title}
                </h3>
                <p className="text-xs text-theme-foreground-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center text-[10px] text-theme-foreground-muted flex items-center justify-center gap-1.5 font-medium">
          Swipe horizontally to explore app tabs 📱
        </div>
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
