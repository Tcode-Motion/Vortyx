"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeContext";
import { Sun, Moon, Menu, X, Download } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Screenshots", path: "/screenshots" },
    { name: "Download", path: "/download" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-theme-border/20 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-2xl bg-gradient-to-tr from-brand-pink via-brand-coral to-brand-amber p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-brand-pink/10">
                <div className="w-full h-full bg-theme-surface rounded-[14px] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/icon.png"
                    alt="Vortyx Logo"
                    width={40}
                    height={40}
                    className="object-cover rounded-xl"
                    priority
                  />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber bg-clip-text text-transparent tracking-wide">
                Vortyx
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-brand-pink/10 text-brand-pink border border-brand-pink/20"
                    : "text-theme-foreground/80 hover:text-theme-foreground hover:bg-theme-surface-elevated"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-theme-surface-elevated border border-theme-border/40 hover:border-brand-pink/30 hover:text-brand-pink transition-all duration-200 text-theme-foreground"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Download CTA */}
            <Link
              href="/download"
              className="relative group overflow-hidden rounded-full p-[2px] shadow-lg shadow-brand-pink/15 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber" />
              <div className="relative px-6 py-2.5 rounded-full bg-theme-surface group-hover:bg-transparent transition-colors duration-300">
                <span className="relative flex items-center gap-2 text-sm font-bold text-theme-foreground group-hover:text-white transition-colors duration-300">
                  <Download size={16} />
                  Download APK
                </span>
              </div>
            </Link>
          </div>

          {/* Mobile Layout Controls (Menu & Theme Toggle) */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-theme-surface-elevated border border-theme-border/40 text-theme-foreground"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-theme-surface-elevated border border-theme-border/40 text-theme-foreground"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden border-t border-theme-border/20 bg-theme-surface/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-brand-pink/10 text-brand-pink border border-brand-pink/10"
                    : "text-theme-foreground/80 hover:text-theme-foreground hover:bg-theme-surface-elevated"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-4 sm:hidden">
              <Link
                href="/download"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber text-white font-bold text-center shadow-lg shadow-brand-pink/20"
              >
                <Download size={18} />
                Download APK
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
