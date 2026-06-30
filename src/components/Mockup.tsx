"use client";

import React from "react";

interface MockupProps {
  children: React.ReactNode;
}

export default function Mockup({ children }: MockupProps) {
  return (
    <div className="relative mx-auto border-[8px] sm:border-[12px] border-slate-900 dark:border-slate-800 rounded-[36px] sm:rounded-[48px] h-[550px] w-[270px] sm:h-[640px] sm:w-[310px] shadow-2xl overflow-hidden bg-slate-950">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-5 w-28 sm:h-6 sm:w-36 bg-slate-900 dark:bg-slate-800 rounded-b-2xl z-30 flex items-center justify-center">
        {/* Camera Lens */}
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-800 dark:bg-slate-950 border border-slate-700/30 mr-8" />
        {/* Speaker Grill */}
        <div className="w-10 h-1 sm:w-12 sm:h-1.5 rounded-full bg-slate-700" />
      </div>

      {/* Screen reflection overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-transparent via-white/5 to-transparent mix-blend-overlay" />

      {/* Screen content */}
      <div className="relative w-full h-full overflow-hidden rounded-[26px] sm:rounded-[34px] bg-theme-bg">
        {children}
      </div>

      {/* Volume Buttons */}
      <div className="absolute -left-[10px] sm:-left-[14px] top-28 h-10 w-[2px] sm:w-[3px] bg-slate-800 rounded-r-sm" />
      <div className="absolute -left-[10px] sm:-left-[14px] top-42 h-10 w-[2px] sm:w-[3px] bg-slate-800 rounded-r-sm" />

      {/* Power Button */}
      <div className="absolute -right-[10px] sm:-right-[14px] top-32 h-14 w-[2px] sm:w-[3px] bg-slate-800 rounded-l-sm" />
    </div>
  );
}
