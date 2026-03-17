"use client";

import React, { useState, useEffect } from "react";
import { Shield, Lock, Mail, ArrowRight, Eye, EyeOff, CheckCircle2, ChevronRight, Activity as ActivityIcon, Terminal as TerminalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const securityTips = [
  "Enable Multi-Factor Authentication (MFA) across all corporate accounts.",
  "Regularly update your web server's security headers.",
  "Audit administrator permissions quarterly to ensure least-privilege.",
  "Run simulated phishing campaigns to train your staff.",
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTip, setActiveTip] = useState(0);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setActiveTip((prev) => (prev + 1) % securityTips.length);
    }, 6000);
    return () => clearInterval(tipInterval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock user database
    const users: Record<string, { name: string, role: string }> = {
      "admin@platform.com": { name: "Admin Platform", role: "Super Admin" },
      "sarah@brightpath.com": { name: "Sarah Business", role: "Org Owner" },
      "alex@brightpath.com": { name: "Alex Tech", role: "Analyst" },
      "tom@external.com": { name: "Tom Audit", role: "Viewer" }
    };

    const userData = users[email.toLowerCase()] || { name: email.split('@')[0], role: "Org Owner" };

    // Simulate API delay
    setTimeout(() => {
      localStorage.setItem("currentUser", JSON.stringify(userData));
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex relative selection:bg-sky-500/30 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sky-500/20 rounded-full blur-[140px] animate-pulse-soft" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[140px] animate-pulse-soft" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      {/* Left Side: Branding & Illustration */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
            <Shield size={24} strokeWidth={2.5} />
          </div>
          <span className="font-black text-2xl tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            CODEX SME CYBER
          </span>
        </div>

        <div className="relative">
          <div className="absolute -top-24 -left-12 w-64 h-64 bg-sky-500/10 blur-[100px] rounded-full" />
          <h1 className="text-6xl font-black tracking-tight leading-[1.1] mb-6">
            Secure your <span className="text-sky-400">future</span>, <br />
            one assessment at a time.
          </h1>
          <p className="text-slate-400 text-lg max-w-md font-medium">
            Professional cybersecurity posture assessment designed for growing small businesses. 
            Identify, remediate, and report with confidence.
          </p>

          <div className="mt-12 space-y-6">
            {[
              { text: "Automated External Scanning", icon: <ActivityIcon size={18} /> },
              { text: "Internal Readiness Checklists", icon: <CheckCircle2 size={18} /> },
              { text: "Prioritized Remediation Roadmap", icon: <TerminalIcon size={18} /> },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-slate-300 font-bold group bg-slate-900/40 p-4 rounded-2xl w-fit border border-white/5 hover:border-sky-500/20 hover:bg-slate-900/60 transition-all cursor-default">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400">
                  {feature.icon || <CheckCircle2 size={18} />}
                </div>
                {feature.text}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/40 backdrop-blur-md rounded-2xl border border-white/5 p-6 max-w-sm mt-8 group">
          <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest text-sky-400">
            <Lock size={12} /> Security Tip
          </div>
          <p className="text-xs font-semibold text-slate-300 transition-all duration-700 animate-in fade-in slide-in-from-right-4">
            "{securityTips[activeTip]}"
          </p>
          <div className="mt-4 flex gap-1">
             {securityTips.map((_, i) => (
               <div key={i} className={cn("h-1 rounded-full transition-all duration-300", i === activeTip ? "w-6 bg-sky-400" : "w-2 bg-slate-800")} />
             ))}
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-20">
        <div className="w-full max-w-md animate-in zoom-in-95 duration-700">
          <div className="text-center mb-10 lg:hidden">
            <div className="inline-flex p-4 bg-sky-500/10 rounded-2xl text-sky-400 mb-6 border border-sky-500/20 shadow-lg shadow-sky-500/5">
              <Shield size={40} />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white">CODEX SME CYBER</h2>
          </div>

          <form onSubmit={handleLogin} className="glass-card p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-[50px] rounded-full translate-x-12 -translate-y-12" />
            
            <div className="mb-8">
              <h1 className="text-3xl font-black tracking-tight text-white">Access Dashboard</h1>
              <p className="text-slate-500 mt-2 text-sm font-semibold tracking-wide">Enter your credentials to continue</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@platform.com"
                    required
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-sky-500/50 transition-all text-slate-100 font-medium no-scrollbar"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Password</label>
                  <button type="button" className="text-[10px] font-black uppercase text-sky-400 hover:text-sky-300 transition-colors">Forgot?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:border-sky-500/50 transition-all text-slate-100 font-medium no-scrollbar"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-sky-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 py-2">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-sky-500 focus:ring-sky-500/20" />
                <label htmlFor="remember" className="text-xs font-bold text-slate-400 cursor-pointer">Remember this device</label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="mt-8 w-full bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-xl font-black tracking-tight flex items-center justify-center gap-3 transition-all shadow-xl shadow-sky-500/25 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed group/btn"
            >
              {isLoading ? (
                <><ActivityIcon size={20} className="animate-spin" /> Authenticating...</>
              ) : (
                <><span className="mt-0.5">Secure Sign In</span> <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" /></>
              )}
            </button>

            <div className="mt-10 pt-8 border-t border-slate-800/50">
               <p className="text-center text-sm font-semibold text-slate-500">
                New to Codex SME Cyber? <br className="lg:hidden" /> <button type="button" onClick={() => {
                  localStorage.setItem("currentUser", JSON.stringify({ name: "New Business", role: "Org Owner" }));
                  router.push("/dashboard");
                }} className="text-sky-400 hover:text-sky-300 hover:underline transition-colors ml-1 cursor-pointer">Register your business</button>
              </p>
            </div>
          </form>

          <p className="mt-8 text-center text-[10px] uppercase font-black tracking-widest text-slate-600">
            Developed by Anand Binu Arjun
          </p>
        </div>
      </div>
    </div>
  );
}
