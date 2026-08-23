"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeContext";
import {
  Sun,
  Moon,
  Menu,
  X,
  Download,
  Zap,
  Sparkles,
  Layers,
  Activity,
  Smartphone,
  ChevronDown,
  Info,
  HelpCircle,
  Mail,
  Film,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainLinks = [
    { name: "Downloader", path: "/" },
    { name: "35+ Portals", path: "/providers" },
    { name: "Diagnostics", path: "/diagnostics" },
    { name: "Features", path: "/features" },
    { name: "Screenshots", path: "/screenshots" },
  ];

  const secondaryLinks = [
    { name: "FAQ", path: "/faq", icon: HelpCircle },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-theme-border/40 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 overflow-hidden rounded-2xl bg-gradient-to-tr from-brand-pink via-brand-coral to-brand-amber p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-md shadow-brand-pink/15">
                <div className="w-full h-full bg-theme-surface rounded-[14px] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/Vortyx/icon.png"
                    alt="Vortyx Logo"
                    width={36}
                    height={36}
                    className="object-cover rounded-xl"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-lg sm:text-xl font-black bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber bg-clip-text text-transparent tracking-tight leading-none">
                  Vortyx
                </span>
                <span className="text-[9px] uppercase font-black tracking-widest text-theme-foreground-muted mt-0.5">
                  Universal Hub
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop & Laptop Nav Links */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {mainLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3.5 py-2 rounded-full text-xs lg:text-sm font-bold transition-all duration-200 ${
                    active
                      ? "bg-brand-pink/15 text-brand-pink border border-brand-pink/30 shadow-sm"
                      : "text-theme-foreground/80 hover:text-theme-foreground hover:bg-theme-surface-elevated"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Desktop More Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="px-3 py-2 rounded-full text-xs lg:text-sm font-bold text-theme-foreground/80 hover:text-theme-foreground hover:bg-theme-surface-elevated flex items-center gap-1 transition-all"
              >
                <span>More</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${showMoreMenu ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showMoreMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 rounded-2xl bg-theme-surface border border-theme-border/60 shadow-xl p-2 z-50 text-left"
                    onMouseLeave={() => setShowMoreMenu(false)}
                  >
                    {secondaryLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setShowMoreMenu(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-theme-foreground hover:bg-theme-surface-elevated hover:text-brand-pink transition-all"
                        >
                          <Icon size={15} />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-theme-surface-elevated border border-theme-border/60 hover:border-brand-pink/40 hover:text-brand-pink transition-all duration-200 text-theme-foreground"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Get APK Button */}
            <Link
              href="/download"
              className="px-4.5 py-2 rounded-full bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-brand-pink/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Download size={14} />
              <span>Get APK</span>
            </Link>
          </div>

          {/* Mobile Hamburger & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-theme-surface-elevated border border-theme-border/60 text-theme-foreground"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-theme-surface-elevated border border-theme-border/60 text-theme-foreground"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-theme-border/30 bg-theme-surface/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {[...mainLinks, ...secondaryLinks.map((s) => ({ name: s.name, path: s.path }))].map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-center ${
                      active
                        ? "bg-brand-pink/15 text-brand-pink border border-brand-pink/30"
                        : "bg-theme-surface-elevated text-theme-foreground/80 hover:text-theme-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3">
              <Link
                href="/download"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber text-white font-bold text-xs shadow-lg shadow-brand-pink/20"
              >
                <Download size={15} />
                <span>Download Android APK (9.54 MB)</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
