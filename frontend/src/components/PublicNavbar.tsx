"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

export function PublicNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-8 md:px-16 bg-background/20 backdrop-blur-md border-b border-white/5">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Package className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">LOGIBOARD</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Home</Link>
        <Link href="/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">About</Link>
        <Link href="/features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Features</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Login</Link>
        <Link href="/register">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Get Started
          </motion.button>
        </Link>
      </div>
    </nav>
  );
}
