"use client";

import { PublicNavbar } from "./PublicNavbar";
import { ThreeBackground } from "./ThreeBackground";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-slate-950 font-sans text-foreground relative overflow-x-hidden">
      <ThreeBackground />

      <PublicNavbar />
      
      <main className="relative z-10 pt-20">
        {children}
      </main>

      <footer className="relative z-10 py-12 px-8 border-t border-white/5 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tighter text-white">LOGIBOARD</span>
          </div>
          <p className="text-sm text-gray-400">© 2026 Logiboard Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
