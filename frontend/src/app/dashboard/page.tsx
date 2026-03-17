"use client";

import React, { useState, useEffect } from "react";
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  ArrowUpRight, 
  ChevronRight,
  MoreVertical,
  Activity as ActivityIcon,
  Zap,
  Lock,
  Globe,
  Mail,
  ListRestart,
  History
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { cn, formatScore } from "@/lib/utils";

const trendData = [
  { name: "Jan", score: 32 },
  { name: "Feb", score: 38 },
  { name: "Mar", score: 38.5 },
  { name: "Apr", score: 45 },
  { name: "May", score: 62 },
  { name: "Jun", score: 72 },
];

const categoryData = [
  { name: "Web Security", score: 65, color: "#0ea5e9" },
  { name: "Email Security", score: 42, color: "#6366f1" },
  { name: "Access Control", score: 88, color: "#10b981" },
  { name: "Encryption", score: 74, color: "#8b5cf6" },
  { name: "Resilience", score: 91, color: "#3b82f6" },
];

const latestFindings = [
  { id: 1, title: "No DMARC Policy Configured", severity: "High", asset: "brightpath.com", time: "2 days ago" },
  { id: 2, title: "Missing HSTS Header", severity: "High", asset: "brightpath.com", time: "2 days ago" },
  { id: 3, title: "SSL Certificate Expiring Soon (18 days)", severity: "Medium", asset: "brightpath.com", time: "4 days ago" },
];

const timelineData = [
  { id: 1, action: "Assessment Completed", detail: "Post-Remediation Verification Score: 72.0", time: "Yesterday, 14:22" },
  { id: 2, action: "Recommendation Implemented", detail: "MFA enforced for all staff users", time: "Mar 15, 09:10" },
  { id: 3, action: "New Finding Detected", detail: "Weak SSL cipher suite on staging.brightpath.com", time: "Mar 12, 11:45" },
];

function CircularScore({ score }: { score: number }) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-64 h-64 flex items-center justify-center group">
      <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
        <circle
          cx="128"
          cy="128"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-slate-800/40"
        />
        <circle
          cx="128"
          cy="128"
          r={radius}
          stroke="currentColor"
          strokeWidth="14"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className={cn(
            "transition-all duration-1000 ease-out drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]",
            score > 80 ? "text-emerald-500" : score > 60 ? "text-sky-500" : score > 40 ? "text-yellow-500" : "text-red-500"
          )}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <div className="flex items-baseline gap-1 group-hover:scale-110 transition-transform duration-500">
          <span className="text-7xl font-black tracking-tighter text-white drop-shadow-lg">{formatScore(score)}</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1">Platform Score</p>
      </div>
      
      {/* Decorative pulse when hover */}
      <div className={cn(
        "absolute inset-0 rounded-full bg-sky-500/10 blur-[60px] scale-75 opacity-0 group-hover:opacity-100 transition-all duration-700",
        score > 60 ? "bg-sky-500/20" : "bg-red-500/20"
      )} />
    </div>
  );
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700 no-scrollbar">
      {/* Welcome & Global Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-sky-400 drop-shadow-sm">
             <ActivityIcon size={14} className="animate-pulse" /> Active Monitoring
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white leading-none">Command Center</h2>
          <p className="text-slate-400 mt-3 font-medium text-lg leading-tight max-w-lg">
            Good morning, Sarah. <span className="text-slate-200">BrightPath's</span> security posture is currently <span className="text-sky-400 font-bold uppercase text-sm tracking-widest">Stable</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-slate-900 border border-slate-800 text-slate-400 px-5 py-3 rounded-xl font-bold transition-all flex items-center gap-2 hover:text-white hover:bg-slate-800">
             <Clock size={18} /> History
           </button>
           <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-black transition-all flex items-center gap-2 shadow-xl shadow-sky-500/25 active:scale-95 group">
             <Zap size={18} className="fill-white" /> Start Quick Scan <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Risk Score Highlights */}
        <div className="xl:col-span-4 glass-card p-10 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-[50px] rounded-full translate-x-12 -translate-y-12" />
          <CircularScore score={72.0} />
          
          <div className="mt-8 grid grid-cols-2 gap-8 w-full border-t border-slate-800/50 pt-8">
             <div className="text-center group/metric">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Exposure</p>
                <div className="text-xl font-black text-orange-400 group-hover/metric:scale-110 transition-transform">Moderate</div>
             </div>
             <div className="text-center group/metric">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Trend</p>
                <div className="text-xl font-black text-emerald-400 flex items-center justify-center gap-1 group-hover/metric:scale-110 transition-transform">
                   <TrendingUp size={18} /> +33.5
                </div>
             </div>
          </div>
        </div>

        {/* Categories & Trends */}
        <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Posture Trend Line */}
          <div className="glass-card p-8 flex flex-col h-[340px]">
             <div className="flex justify-between items-center mb-8">
                <div>
                   <h3 className="font-black text-slate-200 tracking-tight flex items-center gap-2">
                     <TrendingUp size={18} className="text-sky-400" /> Security Velocity
                   </h3>
                   <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mt-1">Score over time (Last 6 Assessments)</p>
                </div>
                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 transition-all"><MoreVertical size={16} /></button>
             </div>
             <div className="flex-1 -mx-4 -mb-2">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={trendData}>
                      <defs>
                         <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                         </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" stroke="#475569" fontSize={11} fontWeight="bold" axisLine={false} tickLine={false} dy={10} />
                      <YAxis domain={[0, 100]} hide />
                      <Tooltip 
                        contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '12px' }}
                        itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Category Distribution Bar Chart */}
          <div className="glass-card p-8 flex flex-col h-[340px]">
             <div className="flex justify-between items-center mb-8">
                <div>
                   <h3 className="font-black text-slate-200 tracking-tight flex items-center gap-2">
                     <ShieldCheck size={18} className="text-emerald-400" /> Control Domains
                   </h3>
                   <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mt-1">Effectiveness per Category</p>
                </div>
                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 transition-all"><MoreVertical size={16} /></button>
             </div>
             <div className="flex-1 -mx-4">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
                      <XAxis type="number" hide domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} fontWeight="black" width={100} axisLine={false} tickLine={false} />
                      <Tooltip 
                         cursor={{ fill: '#1e293b' }}
                         contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={12}>
                         {categoryData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                      </Bar>
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>

      {/* Detail Rows: Findings & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top Technical Findings */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                 <AlertTriangle size={20} className="text-orange-500" /> Top Open Risk Items
              </h3>
              <button className="text-xs font-black uppercase tracking-widest text-sky-400 hover:text-sky-300 transition-all">View All 42 Items</button>
           </div>
           
           <div className="space-y-4">
              {latestFindings.map((finding) => (
                <div key={finding.id} className="glass-card hover:bg-slate-900/60 p-5 flex items-center justify-between group transition-all group cursor-pointer border-l-4 border-l-orange-500/50 hover:border-l-orange-500">
                  <div className="flex items-center gap-5">
                     <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl group-hover:bg-slate-800 transition-colors">
                        {finding.title.includes("Email") ? <Mail size={22} className="text-slate-400" /> : <Globe size={22} className="text-slate-400" />}
                     </div>
                     <div>
                        <h4 className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors">{finding.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                           <span className="text-[10px] font-black uppercase bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded tracking-widest">{finding.severity}</span>
                           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{finding.asset}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="text-xs font-bold text-slate-600 group-hover:text-slate-400">{finding.time}</span>
                     <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg group-hover:bg-sky-500 group-hover:border-sky-400 group-hover:text-white transition-all">
                        <ArrowUpRight size={18} />
                     </button>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Activity Timeline */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                 <History size={20} className="text-indigo-400" /> Platform Event Log
              </h3>
              <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500"><ListRestart size={18} /></button>
           </div>

           <div className="glass-card p-8 flex flex-col h-full bg-slate-900/20">
              <div className="space-y-8 relative">
                 {/* Vertical Line */}
                 <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-800" />
                 
                 {timelineData.map((item) => (
                   <div key={item.id} className="relative pl-10 group">
                      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center z-10 group-hover:border-indigo-500 transition-colors">
                         <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                      </div>
                      <div>
                         <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-0.5 uppercase">{item.time}</p>
                         <h4 className="font-bold text-slate-100 leading-tight">{item.action}</h4>
                         <p className="text-sm font-medium text-slate-500 mt-1">{item.detail}</p>
                      </div>
                   </div>
                 ))}
              </div>
              
              <button className="mt-auto w-full py-4 border border-slate-800 rounded-xl text-slate-400 text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-800/40 hover:text-white transition-all tracking-wider">
                 View Full Audit Trail
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
