"use client";

import React, { useState } from "react";
import { 
  Building2, 
  MapPin, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight, 
  ChevronRight,
  MoreVertical,
  Activity as ActivityIcon,
  Globe,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const organizations = [
  { 
    id: 1, 
    name: "BrightPath Consulting Ltd", 
    domain: "brightpath.com", 
    employees: 45, 
    industry: "Professional Services", 
    lastScore: 38.5, 
    currentScore: 72.0, 
    status: "Improving",
    icon: <Building2 className="text-sky-400" />
  },
  { 
    id: 2, 
    name: "Nexus FinTech Solutions", 
    domain: "nexus-fin.io", 
    employees: 120, 
    industry: "Financial Services", 
    lastScore: 68.2, 
    currentScore: 84.5, 
    status: "Stable",
    icon: <Globe className="text-indigo-400" />
  },
  { 
    id: 3, 
    name: "GreenLeaf Healthcare", 
    domain: "greenleaf.med", 
    employees: 85, 
    industry: "Healthcare", 
    lastScore: 42.0, 
    currentScore: 41.5, 
    status: "Risky",
    icon: <ActivityIcon className="text-emerald-400" />
  },
];

export default function OrganizationsPage() {
  const [activeOrg, setActiveOrg] = useState(1);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700 no-scrollbar">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-sky-400">
             <Building2 size={14} className="animate-pulse" /> Corporate Hierarchy
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white leading-none">Managed Organizations</h2>
          <p className="text-slate-400 mt-4 font-medium text-lg max-w-xl">
             Centralized governance for your enterprise portfolio. View security velocity across all managed business units.
          </p>
        </div>
        
        <div className="flex gap-3">
           <button className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-6 py-3 rounded-xl hover:bg-slate-800 transition-all font-black text-xs text-slate-400 tracking-widest uppercase active:scale-95">
              <Filter size={18} /> Filter List
           </button>
           <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-black text-xs text-white tracking-widest uppercase shadow-xl shadow-sky-500/25 active:scale-95 transition-all group">
              <Plus size={18} className="fill-white" /> Register New Org
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {organizations.map((org) => {
          const improvement = org.currentScore - org.lastScore;
          const isImproving = improvement > 0;
          const isSelected = activeOrg === org.id;

          return (
            <div 
              key={org.id} 
              onClick={() => setActiveOrg(org.id)}
              className={cn(
                "glass-card p-8 group relative overflow-hidden transition-all duration-500",
                isSelected ? "border-sky-500/40 bg-slate-900 shadow-2xl scale-[1.02]" : "hover:scale-[1.01] hover:bg-slate-900/40 border-slate-800/40"
              )}
            >
              {/* Background Glow */}
              <div className={cn(
                "absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full translate-x-12 -translate-y-12 transition-all opacity-0 group-hover:opacity-100",
                org.status === "Improving" ? "bg-emerald-500/10" : org.status === "Stable" ? "bg-sky-500/10" : "bg-red-500/10"
              )} />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                 <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    {org.icon}
                 </div>
                 <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-600 transition-all"><MoreVertical size={18} /></button>
              </div>

              <div className="relative z-10">
                 <h3 className="text-2xl font-black text-white group-hover:text-sky-400 transition-colors uppercase tracking-tight">{org.name}</h3>
                 <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1 mb-6 flex items-center gap-2">
                    <Globe size={12} className="text-slate-700" /> {org.domain}
                 </p>

                 <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5">
                       <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1 leading-none">Security Score</p>
                       <div className="flex items-baseline gap-2">
                          <span className={cn(
                            "text-2xl font-black transition-all",
                            org.currentScore > 70 ? "text-emerald-400 shadow-emerald-500/20" : "text-sky-400 shadow-sky-500/20"
                          )}>
                             {org.currentScore.toFixed(1)}
                          </span>
                          <span className="text-[10px] font-black text-slate-700">/ 100</span>
                       </div>
                    </div>
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5">
                       <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1 leading-none">Status</p>
                       <div className={cn(
                         "text-xs font-black uppercase tracking-widest flex items-center gap-1.5",
                         org.status === "Improving" ? "text-emerald-400" : org.status === "Stable" ? "text-sky-400" : "text-red-400"
                       )}>
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            org.status === "Improving" ? "bg-emerald-500" : org.status === "Stable" ? "bg-sky-500" : "bg-red-500"
                          )} />
                          {org.status}
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center justify-between pt-6 border-t border-slate-800 relative z-10">
                    <div className="flex items-center gap-4">
                       <div className="flex -space-x-3">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center overflow-hidden">
                               <Users size={12} className="text-slate-500" />
                            </div>
                          ))}
                       </div>
                       <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest font-bold">+{org.employees} Staff</span>
                    </div>
                    
                    <button className="flex items-center gap-2 text-sky-400 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all group/btn">
                       Manage <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                 </div>
              </div>

              {/* Progress Bar Shadow Background */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-800">
                 <div 
                   className={cn(
                     "h-full transition-all duration-1000",
                     isImproving ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500"
                   )} 
                   style={{ width: `${org.currentScore}%` }} 
                 />
              </div>
            </div>
          );
        })}

        {/* Empty Placeholder / Add Card */}
        <div className="border-2 border-dashed border-slate-800/40 rounded-3xl p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-sky-500/20 hover:bg-sky-500/[0.02] transition-all min-h-[300px]">
           <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-slate-700 group-hover:text-sky-500 group-hover:scale-110 transition-all border border-slate-800 group-hover:border-sky-500/20">
              <Plus size={32} strokeWidth={2.5} />
           </div>
           <h4 className="mt-6 text-lg font-black text-slate-500 group-hover:text-slate-300 transition-colors uppercase tracking-tight">Onboard Entity</h4>
           <p className="text-xs font-bold text-slate-600 mt-2 max-w-[180px] uppercase tracking-widest">Register a new client or business unit to the platform.</p>
        </div>
      </div>

      {/* Stats Summary Footer */}
      <div className="glass-card p-10 bg-sky-500/[0.02] border-sky-500/10">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-1">
               <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Global Average Score</p>
               <h5 className="text-3xl font-black text-white leading-none">65.8<span className="text-slate-700 text-sm ml-1 font-bold">/100</span></h5>
            </div>
            <div className="space-y-1">
               <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Critical Vulnerabilities</p>
               <h5 className="text-3xl font-black text-red-500 leading-none">12</h5>
            </div>
            <div className="space-y-1">
               <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Resolved (30d)</p>
               <h5 className="text-3xl font-black text-emerald-500 leading-none">84</h5>
            </div>
            <div className="space-y-1">
               <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Active Remediation</p>
               <h5 className="text-3xl font-black text-sky-400 leading-none">92%</h5>
            </div>
         </div>
      </div>
    </div>
  );
}
