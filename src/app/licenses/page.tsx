"use client";

import React, { useState } from "react";
import { BookOpen, FileCode, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function LicensesPage() {
  const [openLicense, setOpenLicense] = useState<number | null>(null);

  const toggleLicense = (index: number) => {
    setOpenLicense(openLicense === index ? null : index);
  };

  const apacheLicenseText = `Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`;

  const mitLicenseText = `MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

  const packages = [
    {
      name: "Jetpack Compose Suite",
      author: "Google LLC",
      licenseName: "Apache License 2.0",
      desc: "Declarative UI layout system libraries for native Android development.",
      fullText: apacheLicenseText,
    },
    {
      name: "Android Media3 ExoPlayer",
      author: "Google LLC",
      licenseName: "Apache License 2.0",
      desc: "High-performance video and audio streaming, playback session components, and background handlers.",
      fullText: apacheLicenseText,
    },
    {
      name: "Room Database Layer",
      author: "Google LLC",
      licenseName: "Apache License 2.0",
      desc: "Object-relational mapping SQLite wrapper database compiled at verification time.",
      fullText: apacheLicenseText,
    },
    {
      name: "Dagger Hilt Android",
      author: "Google LLC / Square",
      licenseName: "Apache License 2.0",
      desc: "Compile-time dependency injection container system for modular projects.",
      fullText: apacheLicenseText,
    },
    {
      name: "Retrofit & OkHttp Clients",
      author: "Square Inc.",
      licenseName: "Apache License 2.0",
      desc: "Type-safe HTTP requests client, header interceptors, cookies logging, and connection pooling.",
      fullText: apacheLicenseText,
    },
    {
      name: "Moshi JSON Adapter",
      author: "Square Inc.",
      licenseName: "Apache License 2.0",
      desc: "Reflective and codegen-based JSON serializing and deserializing library.",
      fullText: apacheLicenseText,
    },
    {
      name: "Coil Image Loading",
      author: "Coil Contributors",
      licenseName: "Apache License 2.0",
      desc: "Kotlin-first asynchronous image and video frame decoding and caching system.",
      fullText: apacheLicenseText,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="p-3 bg-brand-pink/10 rounded-full w-fit mx-auto border border-brand-pink/20 text-brand-pink">
          <BookOpen size={32} />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Open Source Licenses
        </h1>
        <p className="text-base sm:text-lg text-theme-foreground-muted leading-relaxed">
          Acknowledgements and legal licenses for third-party libraries driving the Vortyx Android application.
        </p>
      </div>

      {/* Main Intro */}
      <section className="bg-theme-surface border border-theme-border/40 p-6 sm:p-8 rounded-3xl space-y-4">
        <p className="text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">
          Vortyx is built on top of excellent open source technologies. In compliance with the software license agreements of these dependencies, we cite their copyright notices, descriptions, and license contents below.
        </p>
      </section>

      {/* List of libraries */}
      <div className="space-y-4">
        {packages.map((pkg, idx) => {
          const isOpened = openLicense === idx;
          return (
            <div
              key={idx}
              className="bg-theme-surface border border-theme-border/40 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border/10">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-pink bg-brand-pink/10 px-2 py-0.5 rounded">
                    {pkg.licenseName}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-theme-foreground">{pkg.name}</h3>
                  <p className="text-xs text-theme-foreground-muted">Developed by {pkg.author}</p>
                </div>
                <button
                  onClick={() => toggleLicense(idx)}
                  className="flex items-center gap-1.5 text-xs font-bold text-theme-foreground hover:text-brand-pink cursor-pointer w-fit"
                >
                  <span>License details</span>
                  {isOpened ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
              
              {/* Description */}
              <div className="p-5 pt-4 text-xs sm:text-sm text-theme-foreground-muted border-b border-theme-border/10 bg-theme-surface-elevated/40">
                {pkg.desc}
              </div>

              {/* License Details Drawer */}
              {isOpened && (
                <div className="bg-theme-bg p-5 border-t border-theme-border/10 font-mono text-[10px] sm:text-xs text-theme-foreground-muted whitespace-pre-wrap leading-relaxed select-all">
                  {pkg.fullText}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
