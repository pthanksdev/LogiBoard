"use client";

import { PublicLayout } from "@/components/PublicLayout";
import { motion } from "framer-motion";
import { Globe, Shield, Zap, FileText, Activity, LayoutDashboard, Map, Smartphone, Cpu, Lock, Code, Palette } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Executive Dashboard",
      desc: "Comprehensive multi-tenant dashboard with real-time analytics, shipment volume historical charts, and active performance monitors."
    },
    {
      icon: Map,
      title: "Real-Time GPS Mapping",
      desc: "Live telemetry streaming via WebSockets. Watch your fleet move across the world with sub-second latency markers."
    },
    {
      icon: Smartphone,
      title: "QR Scanning System",
      desc: "Built-in mobile scanner for dispatch teams. Scan physical labels to instantly hydrate digital records and verify status."
    },
    {
      icon: FileText,
      title: "Automated Invoicing",
      desc: "Streamlined PDF generation. Generate and download professional branded invoices for any shipment with a single click."
    },
    {
      icon: Activity,
      title: "Predictive Analytics",
      desc: "Machine learning models anticipate delays and suggest route optimizations to ensure 99.9% on-time delivery."
    },
    {
      icon: Globe,
      title: "Global Reach",
      desc: "Seamlessly manage international shipments with cross-border compliance tools and multi-currency support."
    }
  ];

  return (
    <PublicLayout>
      <section className="pt-32 pb-16 px-8">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter"
          >
            POWERFUL FEATURES <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">FOR ELITE TEAMS.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto font-medium"
          >
            Everything you need to manage a modern logistics operation, from the first mile to the last.
          </motion.p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="pb-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-[40px] bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <f.icon className="text-white w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEW: Deep Dive Sections */}
      
      {/* AI Deep Dive */}
      <section className="py-24 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-6">
                    <Cpu className="text-orange-500 w-6 h-6" />
                </div>
                <h2 className="text-4xl font-black text-white mb-6">AI-Powered Route Optimization</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Our neural networks analyze historical traffic patterns, weather data, and driver performance to calculate the most efficient path for every shipment. Reduce fuel costs by up to 15% overnight.
                </p>
                <ul className="space-y-4">
                    {["Dynamic Re-routing", "Idle Time Reduction", "Fuel Consumption Forecasting"].map(item => (
                        <li key={item} className="flex items-center gap-3 text-white font-medium">
                            <Zap className="w-4 h-4 text-primary" /> {item}
                        </li>
                    ))}
                </ul>
            </motion.div>
            <div className="relative aspect-video rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <Activity className="w-24 h-24 text-primary/20 animate-pulse" />
            </div>
        </div>
      </section>

      {/* Security Deep Dive */}
      <section className="py-24 px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative aspect-square max-w-sm mx-auto rounded-full border-4 border-dashed border-white/5 flex items-center justify-center">
                <Lock className="w-32 h-32 text-indigo-500/30" />
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-indigo-500/10 rounded-full"
                />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
                    <Shield className="text-indigo-500 w-6 h-6" />
                </div>
                <h2 className="text-4xl font-black text-white mb-6">Enterprise-Grade Security</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Your data is isolated at the database level. Each company operates in its own secure environment with multi-factor authentication and full audit logging for every action.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="font-bold text-white mb-1">AES-256</div>
                        <div className="text-xs text-gray-500 uppercase">Encryption</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="font-bold text-white mb-1">SSO/SAML</div>
                        <div className="text-xs text-gray-500 uppercase">Available</div>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* Developer Sandbox */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-8 mx-auto">
                <Code className="text-primary w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black text-white mb-6">Developer First Infrastructure</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-12">
                Integrate Logiboard into your existing ERP or WMS with our robust RESTful API and Webhook system. Built by developers, for developers.
            </p>
            <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 text-left font-mono text-sm max-w-2xl mx-auto relative group">
                <div className="flex justify-between items-center mb-4 text-gray-500 border-b border-white/5 pb-2">
                    <span>GET /v1/shipments/{'{id}'}</span>
                    <span className="text-primary">Docs</span>
                </div>
                <pre className="text-blue-400">
                    {`{
  "trackingId": "LB-88291",
  "status": "IN_TRANSIT",
  "location": {
    "lat": 40.7128,
    "lng": -74.0060
  }
}`}
                </pre>
            </div>
        </div>
      </section>

      {/* White-label Section */}
      <section className="py-24 px-8 mb-32">
        <div className="max-w-7xl mx-auto p-12 rounded-[50px] bg-gradient-to-br from-slate-900 to-black border border-white/10 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl font-black text-white mb-6 flex items-center gap-3">
                        <Palette className="text-accent" /> Your Brand, Our Tech.
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Custom white-label options allow you to present our tracking portal as your own. Custom domains, branded emails, and themed dashboards for your customers.
                    </p>
                    <button className="px-10 py-4 rounded-xl bg-primary text-white font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                        Request White-label Access
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-4 opacity-30 grayscale">
                    <div className="aspect-square bg-white/10 rounded-2xl" />
                    <div className="aspect-square bg-white/10 rounded-2xl" />
                    <div className="aspect-square bg-white/10 rounded-2xl" />
                </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
        </div>
      </section>
    </PublicLayout>
  );
}

