"use client";

import React from "react";
import { 
  History, 
  Search, 
  Calendar, 
  User, 
  Layout, 
  Lock,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

const mockLogs = [
  { id: 1, action: "User Login", user: "Sarah Business", detail: "Successful login from IP 192.168.1.1", time: "2 mins ago" },
  { id: 2, action: "Assessment Completed", user: "Alex Tech", detail: "Run 'Post-Remediation Verification' for BrightPath", time: "15 mins ago" },
  { id: 3, action: "Role Changed", user: "Admin", detail: "Updated David Admin to 'IT Admin'", time: "1 hour ago" },
  { id: 4, action: "Report Download", user: "Tom Auditor", detail: "Downloaded 'Q1_Baseline_Assessment.pdf'", time: "3 hours ago" },
  { id: 5, action: "Organization Created", user: "Admin", detail: "Registered 'BrightPath Consulting Ltd'", time: "2 days ago" },
];

export default function AuditLogsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Audit Logs</h2>
        <p className="text-slate-400 mt-1">Immutable record of all platform activities and administrative changes</p>
      </div>

      <div className="glass-card p-4 bg-indigo-500/5 border-indigo-500/20 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
            <Lock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-300">Compliance Warning: Logs are retained for 365 days in accordance with SOC2 and ISO 27001 requirements.</p>
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="divide-y divide-slate-800">
          {mockLogs.map((log) => (
            <div key={log.id} className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors group">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-sky-400 transition-colors">
                  <History size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-100">{log.action}</span>
                    <span className="text-[10px] font-black bg-slate-800 text-slate-500 px-2 py-0.5 rounded uppercase tracking-widest">{log.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1 font-medium">{log.detail}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-slate-600" />
                  {log.user}
                </div>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
