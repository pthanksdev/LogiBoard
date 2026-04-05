"use client";

import { PublicLayout } from "@/components/PublicLayout";
import { motion } from "framer-motion";
import { Heart, Target, Users, History, Leaf, ShieldCheck, Award } from "lucide-react";

export default function AboutPage() {
  const milestones = [
    { year: "2023", title: "The Spark", desc: "Logiboard was founded in a small garage with a big mission." },
    { year: "2024", title: "Series A", desc: "Raised $12M to rebuild the global logistics stack from scratch." },
    { year: "2025", title: "Global Scale", desc: "Reached 1,000 active carriers across 15 countries." },
    { year: "2026", title: "The Future", desc: "Launching AI-driven predictive routing for all partners." },
  ];

  return (
    <PublicLayout>
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter"
          >
            LOGISTICS FOR THE <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">MODERN ERA.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto font-medium"
          >
            We are redefining how the world moves. From local deliveries to global supply chains, 
            Logiboard provides the tools for carriers, dispatchers, and consumers alike.
          </motion.p>
        </div>

        {/* NEW: Founding Story / Timeline */}
        <div className="max-w-7xl mx-auto mb-32">
          <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-sm uppercase mb-12 justify-center">
            <History className="w-4 h-4" /> Our Journey
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="text-3xl font-black text-primary mb-2">{m.year}</div>
                <h4 className="text-lg font-bold text-white mb-2">{m.title}</h4>
                <p className="text-sm text-gray-400">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {[
            { 
              icon: Target, 
              title: "Our Vision", 
              desc: "A world where every package is visible, every route is optimized, and every delivery is predictable." 
            },
            { 
              icon: Users, 
              title: "Our Culture", 
              desc: "We are a distributed team of engineers, designers, and logistics experts obsessed with efficiency." 
            },
            { 
              icon: Heart, 
              title: "Our Commitment", 
              desc: "We stand by our 99.9% uptime and our dedication to making the global supply chain greener." 
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[32px] bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-8">
                <item.icon className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* NEW: Sustainability Pledge */}
        <div className="max-w-7xl mx-auto mb-32 p-12 rounded-[40px] bg-emerald-500/5 border border-emerald-500/10 flex flex-col md:flex-row items-center gap-12">
            <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Leaf className="w-12 h-12 text-emerald-500" />
            </div>
            <div>
                <h3 className="text-3xl font-black text-white mb-4">The Green Logistics Pledge</h3>
                <p className="text-gray-400 text-lg font-medium leading-relaxed">
                    By 2030, we aim to help our partners reduce their carbon footprint by 40% through intelligent consolidation and AI-driven route density. We don&apos;t just care about moving fast; we care about moving right.
                </p>
            </div>
        </div>

        {/* NEW: Leadership / Team */}
        <div className="max-w-7xl mx-auto mb-32">
          <h3 className="text-3xl font-black text-center text-white mb-16 underline decoration-primary decoration-4 underline-offset-8">The Minds Behind Logiboard</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Sarah Chen", "Marcus Thorne", "Elena Rodriguez", "David Wu"].map((name) => (
              <motion.div 
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-32 h-32 rounded-full bg-slate-800 mx-auto mb-4 border-2 border-white/5 group-hover:border-primary transition-all overflow-hidden flex items-center justify-center">
                    <Users className="w-12 h-12 text-white/20" />
                </div>
                <h4 className="font-bold text-white">{name}</h4>
                <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">Founding Member</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto relative px-8 py-20 rounded-[40px] border border-white/10 bg-white/5 overflow-hidden mb-32">
             <div className="absolute top-0 right-0 p-12 opacity-10">
                <ShieldCheck className="w-64 h-64 text-white" />
             </div>
             <div className="relative z-10 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Built for scale. <br /> Trusted by giants.</h2>
                <p className="text-lg text-gray-400 max-w-2xl mb-8 font-medium">Logiboard powers the logistics networks of some of the world&apos;s most demanding enterprises. From pharmaceuticals to fresh produce, we ensure the world keeps moving.</p>
                <div className="flex flex-wrap gap-12 grayscale opacity-50">
                    <span className="text-xl font-bold text-white tracking-widest">AMAZONICA</span>
                    <span className="text-xl font-bold text-white tracking-widest">FEDEXIA</span>
                    <span className="text-xl font-bold text-white tracking-widest">SHIPX</span>
                </div>
             </div>
        </div>

        {/* NEW: Industry Recognition */}
        <div className="max-w-7xl mx-auto text-center border-t border-white/5 pt-20">
            <div className="inline-flex items-center gap-2 text-yellow-500 font-bold tracking-widest text-sm uppercase mb-8">
                <Award className="w-4 h-4" /> Award Winning Platform
            </div>
            <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale">
                <div className="text-lg font-black text-white tracking-tighter italic">Logistics Weekly</div>
                <div className="text-lg font-black text-white tracking-tighter italic">TechCrunch 40</div>
                <div className="text-lg font-black text-white tracking-tighter italic">Innovator of the Year</div>
                <div className="text-lg font-black text-white tracking-tighter italic">Global Supply Hub</div>
            </div>
        </div>
      </section>
    </PublicLayout>
  );
}

