import React from "react";
import Image from "next/image";

interface PhoneMockupProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function PhoneMockup({ src, alt, priority = false }: PhoneMockupProps) {
  return (
    <div className="relative mx-auto rounded-[38px] p-2 bg-slate-900 border border-slate-800/80 shadow-2xl w-full max-w-[280px] sm:max-w-[300px] aspect-[9/18.5] overflow-hidden select-none">
      {/* Notch / Speaker */}
      <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 h-3.5 w-24 bg-slate-950 rounded-full z-30 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-800 border border-slate-700/30 mr-4" />
        <div className="w-8 h-0.5 rounded-full bg-slate-700" />
      </div>

      {/* Screen reflection overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-transparent via-white/5 to-transparent mix-blend-overlay" />

      {/* Screen content */}
      <div className="relative w-full h-full overflow-hidden rounded-[32px] bg-slate-950">
        {/* Scale and translate to crop status bar (~3.5% top) and navigation bar (~6% bottom) */}
        <div className="relative w-full h-full scale-[1.08] translate-y-[-1.5%]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            className="object-cover"
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
        </div>
      </div>

      {/* Highlight ring */}
      <div className="absolute inset-0 rounded-[38px] border border-white/5 pointer-events-none z-25" />
    </div>
  );
}
