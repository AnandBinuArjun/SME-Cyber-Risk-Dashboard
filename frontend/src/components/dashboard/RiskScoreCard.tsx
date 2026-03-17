"use client";

import React from "react";
import { Shield, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn, formatScore } from "@/lib/utils";

interface RiskScoreCardProps {
  score: number;
  severity: string;
  change?: number;
}

export default function RiskScoreCard({ score, severity, change }: RiskScoreCardProps) {
  const isGood = score > 70;
  
  return (
    <div className="glass-card p-6 flex flex-col justify-between h-48 group hover:border-sky-500/50 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400 group-hover:scale-110 transition-transform">
          <Shield size={24} />
        </div>
        {change !== undefined && (
          <div className={cn(
            "flex items-center text-sm font-medium",
            change >= 0 ? "text-emerald-400" : "text-red-400"
          )}>
            {change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold">{formatScore(score)}</span>
          <span className="text-slate-400 text-sm">/ 100</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className={cn(
            "w-2 h-2 rounded-full animate-pulse",
            score > 80 ? "bg-emerald-500" : score > 50 ? "bg-yellow-500" : "bg-red-500"
          )} />
          <span className="text-sm font-medium text-slate-300">{severity} Risk Level</span>
        </div>
      </div>
    </div>
  );
}
