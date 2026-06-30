"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Target,
  Eye,
  Settings,
  Code2,
  BookOpen,
} from "lucide-react";

export default function AboutPage() {
  const techStack = [
    {
      name: "Kotlin & Jetpack Compose",
      role: "UI & Logic",
      desc: "Developed completely in Kotlin, implementing a modern declarative user interface based on Jetpack Compose and Material Design 3 guidelines.",
    },
    {
      name: "Android Media3 & ExoPlayer",
      role: "Playback Core",
      desc: "Uses the official Google Media3 ExoPlayer library to drive video playback (with picture-in-picture) and background music playback sessions.",
    },
    {
      name: "Room Database & DataStore",
      role: "Local Storage",
      desc: "All download metadata and configurations are stored offline in a secure Room SQLite database. Preferences are handled via Jetpack DataStore.",
    },
    {
      name: "WorkManager & Services",
      role: "Queue Scheduling",
      desc: "Employs Android WorkManager and foreground services for batch downloads, ensuring high reliability even when the app is in the background.",
    },
    {
      name: "Retrofit & OkHttp",
      role: "Network Client",
      desc: "Type-safe network connections and REST API calls handled via Retrofit, OkHttp, and custom interceptors with automatic cookie/retry logic.",
    },
    {
      name: "Dagger Hilt & KSP",
      role: "Dependency Injection",
      desc: "Uses Hilt annotations to automatically compile-time wire classes, viewmodels, and repositories, maximizing startup speed and reliability.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          About Vortyx
        </h1>
        <p className="text-base sm:text-lg text-theme-foreground-muted leading-relaxed">
          Learn about the engineering, stack, and philosophy behind the Android application.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission Card */}
        <div className="bg-theme-surface border border-theme-border/40 p-8 sm:p-10 rounded-3xl space-y-4 shadow-lg">
          <div className="p-3 bg-brand-pink/10 rounded-2xl w-fit border border-brand-pink/20">
            <Target className="text-brand-pink" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-theme-foreground">Our Mission</h2>
          <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
            Our mission is to build a private, fast, and unified offline-first downloader that puts the user in control of their media files. We believe media downloading should be seamless, private, and free from intrusive tracking or mandatory user account logins.
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-theme-surface border border-theme-border/40 p-8 sm:p-10 rounded-3xl space-y-4 shadow-lg">
          <div className="p-3 bg-brand-coral/10 rounded-2xl w-fit border border-brand-coral/20">
            <Eye className="text-brand-coral" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-theme-foreground">Our Vision</h2>
          <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
            We envision an ad-supported free utility that fully respects user privacy. By running all clipboard scraping, local status directories scanning, and file cataloging directly on the Android device, Vortyx aims to establish a benchmark for privacy-first utilities.
          </p>
        </div>
      </section>

      {/* Developer Section */}
      <section className="bg-theme-surface border border-theme-border/40 p-8 sm:p-12 rounded-3xl shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <span className="text-xs font-bold text-brand-pink uppercase tracking-wide">Behind the Code</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-foreground leading-tight">
            Developer Information
          </h2>
          <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
            Vortyx is built and maintained by the Vortyx open-source development community. The project started as a manual downloader container (previously known as MediaPick) and was refactored with compile-time dependency injection and modern Android Media3 libraries for reliability and offline playback capabilities.
          </p>
        </div>
        <div className="lg:col-span-4 flex items-center gap-4 bg-theme-surface-elevated border border-theme-border/60 p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-pink to-brand-amber flex items-center justify-center font-bold text-white text-lg">
            V
          </div>
          <div>
            <span className="block font-bold text-theme-foreground">Vortyx Dev Team</span>
            <span className="block text-xs text-theme-foreground-muted">Android Developers</span>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-foreground">
            Technologies Used
          </h2>
          <p className="text-sm sm:text-base text-theme-foreground-muted">
            The core native frameworks driving Vortyx's high performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="bg-theme-surface border border-theme-border/40 p-6 sm:p-8 rounded-3xl transition-all hover:border-brand-pink/20 hover:-translate-y-1 shadow-md"
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <span className="text-xs font-bold text-brand-pink bg-brand-pink/10 px-2.5 py-1 rounded">
                  {tech.role}
                </span>
                <Code2 size={18} className="text-theme-foreground-muted" />
              </div>
              <h3 className="text-lg font-bold text-theme-foreground mb-2">{tech.name}</h3>
              <p className="text-xs sm:text-sm text-theme-foreground-muted leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Source Acknowledgements */}
      <section className="bg-theme-surface border border-theme-border/40 p-8 sm:p-10 rounded-3xl space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-theme-foreground flex items-center gap-2">
          <BookOpen className="text-brand-pink" size={24} />
          Open Source Acknowledgements
        </h2>
        <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
          Vortyx is built on top of a vibrant ecosystem of open source software. We would like to express our gratitude to the creators of libraries like Coil (image loading), Retrofit (networking), Moshi (JSON parser), Hilt (dependency injection), and Cobalt API (media resolution). We cite their open source licenses in full on our dedicated licenses page.
        </p>
      </section>

    </div>
  );
}
