"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  // Prevent body scrolling when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 select-none">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 hover:text-brand-pink text-white transition-all duration-200 cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X size={24} />
      </button>

      {/* Navigation - Left */}
      <button
        onClick={onPrev}
        className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 hover:text-brand-pink text-white transition-all duration-200 cursor-pointer z-10"
        aria-label="Previous Image"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Main Image Container */}
      <div className="relative w-full max-w-lg h-[70vh] sm:h-[80vh] flex items-center justify-center">
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src={images[currentIndex]}
            alt={`App Screenshot ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Navigation - Right */}
      <button
        onClick={onNext}
        className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 hover:text-brand-pink text-white transition-all duration-200 cursor-pointer z-10"
        aria-label="Next Image"
      >
        <ChevronRight size={28} />
      </button>

      {/* Info indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-white/60">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
