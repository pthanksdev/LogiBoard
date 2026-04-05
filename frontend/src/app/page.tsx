"use client";

import { PublicLayout } from "@/components/PublicLayout";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Shield, Zap, Leaf, Terminal, Network } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const [stats, setStats] = useState({
    companies: 0,
    shipments: 0,
    drivers: 0,
    onTimeRate: "0%",
  });

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    if (!API_URL) return;

    fetch(`${API_URL}/public-analytics/global-stats`)
      .then(res => res.json())
      .then(data => setStats({
        companies: data.companies,
        shipments: data.shipments,
        drivers: data.drivers,
        onTimeRate: data.onTimeRate
      }))
      .catch(err => console.error("Failed to fetch global stats:", err));

    fetch(`${API_URL}/public-analytics/recent-events`)
      .then(res => res.json())
      .then(events => {
        if (events.length > 0) {
            let i = 0;
            const interval = setInterval(() => {
                setLogs(prev => [events[i % events.length], ...prev].slice(0, 5));
                i++;
            }, 3000);
            return () => clearInterval(interval);
        }
      })
      .catch(err => console.error("Failed to fetch recent events:", err));
  }, []);

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative pt-16 pb-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8"
          >
            <Zap className="w-3 h-3 fill-current" />
            Revolutionizing Logistics
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.95]"
          >
            THE FUTURE OF <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">LOGISTICS OPERATIONS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-medium"
          >
            Streamline your fleet, track shipments in real-time, and automate your entire supply chain with the ultimate enterprise dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register">
              <button className="px-12 py-5 rounded-2xl bg-primary text-white text-lg font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 flex items-center gap-2">
                Start Tracking Now <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/features">
              <button className="px-12 py-5 rounded-2xl bg-white/5 text-white text-lg font-bold hover:bg-white/10 transition-all border border-white/10">
                Explore Features
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Floating elements for decor */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute top-1/3 right-0 -translate-y-1/2 w-96 h-96 bg-accent/20 blur-[120px] rounded-full mix-blend-screen animate-pulse delay-500" />
      </section>

      {/* NEW: Live Terminal Section */}
      <section className="py-24 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <div className="inline-flex items-center gap-2 text-primary font-bold tracking-widest text-sm uppercase">
                    <Terminal className="w-4 h-4" /> Live Operations
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Real-time pulse of your commerce.</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                    Logiboard doesn&apos;t just store data; it streams it. Our event-driven architecture ensures that every pick-up, drop-off, and delay is reflected across your entire organization in milliseconds.
                </p>
                <div className="flex gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-white mb-1">500ms</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Max Latency</div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-[40px] bg-slate-900 border border-white/10 shadow-2xl font-mono text-xs overflow-hidden"
            >
                <div className="flex gap-1.5 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="space-y-3 min-h-[200px]">
                    {logs.map((log, idx) => (
                        <motion.div
                            key={`${log}-${idx}`}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-3 text-blue-400"
                        >
                            <span className="text-gray-600">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                            <span className="text-white">{log}</span>
                        </motion.div>
                    ))}
                    <div className="animate-pulse inline-block w-2 h-4 bg-primary ml-1" />
                </div>
            </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-8 bg-slate-950/40 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: Globe, 
                title: "Global Visibility", 
                desc: "Monitor your entire international fleet from a single unified control room." 
              },
              { 
                icon: Shield, 
                title: "Enterprise Security", 
                desc: "Bank-grade JWT encryption and multi-tenant isolation for your critical data." 
              },
              { 
                icon: Zap, 
                title: "Real-Time Telemetry", 
                desc: "Live WebSocket-powered GPS tracking with sub-second update frequency." 
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Global Network Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4 mb-16"
            >
                <div className="inline-flex items-center gap-2 text-accent font-bold tracking-widest text-sm uppercase">
                    <Network className="w-4 h-4" /> Massive Reach
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Built for a connected planet.</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                    From the ports of Singapore to the streets of New York, Logiboard connects thousands of carriers and millions of consumers into one seamless network.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "Partner Carriers", val: `${stats.companies}+` },
                    { label: "Active Nodes", val: "185k" },
                    { label: "Countries Served", val: "15" },
                    { label: "Daily Transactions", val: `${(stats.shipments / 42).toFixed(0)}k` }
                ].map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <div className="text-4xl font-black text-white mb-2">{item.val}</div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{item.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* NEW: Sustainability Section */}
      <section className="py-24 px-8 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-1 rounded-[40px] border border-green-500/20"
            >
                <div className="bg-slate-950 p-12 rounded-[38px] text-center">
                    <Leaf className="w-16 h-16 text-green-500 mx-auto mb-8 animate-pulse" />
                    <div className="text-6xl font-black text-white mb-2">14.2%</div>
                    <p className="text-green-500 font-bold uppercase tracking-widest text-sm mb-6">Carbon Reduction</p>
                    <p className="text-gray-400 font-medium">Average fuel savings achieved by companies using our route optimization algorithms in 2025.</p>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">Efficiency is the <br />ultimate sustainability.</h2>
                <p className="text-gray-400 text-lg leading-relaxed font-medium">
                    We believe the greenest mile is the one you never have to drive. Our Intelligent Routing Engine eliminates waste, reduces idle time, and helps our partners meet their ESG goals faster than ever.
                </p>
                <button className="px-8 py-4 rounded-xl bg-green-600/20 text-green-400 font-bold border border-green-600/30 hover:bg-green-600/30 transition-all">
                    View ESG Framework
                </button>
            </motion.div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: `${(stats.shipments / 1000).toFixed(1)}k+`, label: "Total Shipments" },
              { val: `${stats.drivers}+`, label: "Active Drivers" },
              { val: stats.onTimeRate, label: "On-Time Delivery" },
              { val: "15+", label: "Countries" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.val}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Global Compliance */}
      <section className="py-12 px-8 border-y border-white/5 opacity-60">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 grayscale">
            <span className="text-2xl font-black text-white tracking-tighter italic">ISO 27001</span>
            <span className="text-2xl font-black text-white tracking-tighter italic">GDPR READY</span>
            <span className="text-2xl font-black text-white tracking-tighter italic">SOC 2 COMPLIANT</span>
            <span className="text-2xl font-black text-white tracking-tighter italic">ELD CERTIFIED</span>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[40px] bg-gradient-to-br from-primary via-indigo-600 to-accent relative overflow-hidden text-center">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">READY TO SCALE?</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto font-medium">Join over 500 companies using Logiboard to optimize their logistics network every single day.</p>
            <Link href="/register">
              <button className="px-16 py-6 rounded-2xl bg-white text-primary text-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl">
                Get Started for Free
              </button>
            </Link>
          </div>
          {/* Animated rings for CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full animate-ping pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full animate-pulse pointer-events-none" />
        </div>
      </section>
    </PublicLayout>
  );
}

