"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Calendar, 
  ChevronRight, 
  Clock, 
  ShieldCheck,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  History,
  Activity
} from "lucide-react";
import { cn, formatScore, getSeverityColor } from "@/lib/utils";

const mockAssessments = [
  { 
    id: 1, 
    name: "Post-Remediation Verification", 
    status: "Completed", 
    score: 72.0, 
    severity: "Low", 
    date: "2024-03-17", 
    org: "BrightPath Consulting Ltd",
    type: "Full Scan"
  },
  { 
    id: 2, 
    name: "Q1 Baseline Assessment", 
    status: "Completed", 
    score: 38.5, 
    severity: "High", 
    date: "2024-02-15", 
    org: "BrightPath Consulting Ltd",
    type: "Baseline"
  },
];

export default function AssessmentsPage() {
  const [isScanning, setIsScanning] = useState(false);

  const startNewScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Assessments</h2>
          <p className="text-slate-400 mt-1">Lifecycle of security evaluations and posture tracking</p>
        </div>
        <button 
          onClick={startNewScan}
          disabled={isScanning}
          className={cn(
            "bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-sky-500/25 active:scale-95",
            isScanning && "opacity-75 cursor-not-allowed"
          )}
        >
          {isScanning ? (
            <><Activity size={20} className="animate-spin" /> Scanning Domain...</>
          ) : (
            <><Plus size={20} /> Start New Assessment</>
          )}
        </button>
      </div>

      {/* Historical Trend Summary */}
      <div className="glass-card p-6 bg-sky-500/5 border-sky-500/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400">
            <TrendingUp size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              Posture Trend: Improving
              <span className="text-xs font-black px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30 uppercase">+33.5 pts</span>
            </h3>
            <p className="text-sm text-slate-400 mt-0.5">Your cyber risk score has increased by 87% since the baseline assessment.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {mockAssessments.map((asm) => (
          <div key={asm.id} className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between hover:border-slate-700 transition-all cursor-pointer group gap-6">
            <div className="flex items-center gap-6">
              <div className={cn(
                "p-4 rounded-2xl transition-all group-hover:scale-110",
                asm.score > 60 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10" : "bg-red-500/10 text-red-400 border border-red-500/10"
              )}>
                {asm.score > 60 ? <ShieldCheck size={28} /> : <ShieldAlert size={28} />}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-xl group-hover:text-sky-400 transition-colors">{asm.name}</h3>
                  <span className="text-[10px] font-black px-2 py-0.5 bg-slate-800 text-slate-500 rounded uppercase tracking-widest">{asm.type}</span>
                </div>
                <div className="flex items-center gap-4 mt-1.5 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-slate-600" /> {asm.date}</span>
                  <span className="flex items-center gap-1.5"><History size={14} className="text-slate-600" /> {asm.status}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-12 border-t md:border-t-0 border-slate-800/50 pt-4 md:pt-0">
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-3xl font-black tracking-tighter">{formatScore(asm.score)}</span>
                  <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">Score</span>
                </div>
                <span className={cn(
                  "text-[10px] font-black px-2 py-1 rounded-lg border uppercase tracking-widest",
                  getSeverityColor(asm.severity)
                )}>
                  {asm.severity} Risk
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 group/btn">
                  View Results <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
