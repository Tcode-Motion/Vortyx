"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Globe, HelpCircle } from "lucide-react";
import GithubIcon from "../../components/GithubIcon";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "general", message: "" });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Contact the Developers
        </h1>
        <p className="text-base sm:text-lg text-theme-foreground-muted leading-relaxed">
          Submit inquiries, bug logs, feature updates, or open-source partnership proposals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Side: General Info */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-theme-foreground">
              Direct Communication
            </h2>
            <p className="text-sm sm:text-base text-theme-foreground-muted leading-relaxed">
              Vortyx is built by independent open source developers. If you have questions about the codebase, API endpoints, or advertising partnerships, please reach out to us.
            </p>

            <ul className="space-y-4 text-sm">

              <li className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-coral/10 border border-brand-coral/20 text-brand-coral">
                  <GithubIcon size={16} />
                </div>
                <div>
                  <span className="block text-xs text-theme-foreground-muted">GitHub Repository</span>
                  <a href="https://github.com/Tcode-Motion/Vortyx" target="_blank" rel="noopener noreferrer" className="font-semibold text-theme-foreground hover:underline">
                    github.com/Tcode-Motion/Vortyx
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-amber/10 border border-brand-amber/20 text-brand-amber">
                  <Globe size={16} />
                </div>
                <div>
                  <span className="block text-xs text-theme-foreground-muted">Official Site</span>
                  <a href="https://techscript.is-a.dev/Vortyx" target="_blank" rel="noopener noreferrer" className="font-semibold text-theme-foreground hover:underline">
                    techscript.is-a.dev/Vortyx
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-theme-surface-elevated border border-theme-border/40 flex items-start gap-3">
            <HelpCircle className="text-brand-pink mt-0.5 flex-shrink-0" size={18} />
            <p className="text-xs text-theme-foreground-muted leading-relaxed">
              For common support queries regarding WhatsApp permission grants or offline cache deletions, please check our dedicated <a href="/support" className="text-brand-pink hover:underline font-bold">Support Page</a> before contacting us.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 bg-theme-surface border border-theme-border/40 p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-theme-foreground">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-theme-surface-elevated border border-theme-border/60 text-sm text-theme-foreground focus:outline-none focus:border-brand-pink/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-theme-foreground">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-theme-surface-elevated border border-theme-border/60 text-sm text-theme-foreground focus:outline-none focus:border-brand-pink/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-theme-foreground">
                    Inquiry Category
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-surface-elevated border border-theme-border/60 text-sm text-theme-foreground focus:outline-none focus:border-brand-pink/50 transition-colors cursor-pointer"
                  >
                    <option value="general">General Support / Question</option>
                    <option value="bug">Report a Bug / Crash</option>
                    <option value="feature">Request a New Feature</option>
                    <option value="business">Advertising / Partnership</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-theme-foreground">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write details of your question here..."
                    className="w-full px-4 py-3 rounded-xl bg-theme-surface-elevated border border-theme-border/60 text-sm text-theme-foreground focus:outline-none focus:border-brand-pink/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-brand-pink via-brand-coral to-brand-amber hover:brightness-110 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-pink/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Inquiries
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-4 py-12"
              >
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-theme-foreground">Message Sent Successfully!</h3>
                <p className="text-xs sm:text-sm text-theme-foreground-muted max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. We have logged your request and our development team will review it. You will receive a response at your provided email address shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-theme-surface-elevated border border-theme-border/60 hover:text-brand-pink hover:border-brand-pink/30 text-xs font-bold text-theme-foreground transition-all cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
