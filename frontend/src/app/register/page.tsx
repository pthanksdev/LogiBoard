"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, UserPlus, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      setError("Configuration error. Please contact support.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        await signIn("credentials", {
          email: form.email,
          password: form.password,
          callbackUrl: "/dashboard",
        });
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#020617] flex items-center justify-center overflow-hidden py-12">
      {/* Animated background orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[120px] animate-pulse delay-700 pointer-events-none" />
      <div className="absolute top-[30%] right-[60%] w-[300px] h-[300px] rounded-full bg-violet-600/10 blur-[100px] animate-pulse delay-300 pointer-events-none" />

      {/* Back to Home button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="p-10 rounded-[32px] bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/40">
          {/* Logo mark */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <UserPlus className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white tracking-tighter mb-1">Create Account</h1>
            <p className="text-gray-400 font-medium text-sm">Join LogiBoard and streamline your logistics</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={onSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="First Name"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50"
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
              />
              <Input
                placeholder="Last Name"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50"
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </div>
            <Input
              type="email"
              placeholder="Email address"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl pr-12 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-60 mt-2"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/8" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-3 text-gray-600 font-bold tracking-widest">or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full h-12 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 text-white font-semibold flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </Button>

          <p className="text-center text-gray-500 font-medium text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
