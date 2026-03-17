"use client";

import React from "react";
import { 
  FileText, 
  Download, 
  Eye, 
  History, 
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockReports = [
  { id: 1, name: "Q1_Security_Posture_Report.pdf", date: "2024-03-10", type: "Full Assessment", size: "2.4 MB" },
  { id: 2, name: "Compliance_Gap_Analysis.pdf", date: "2024-03-05", type: "Compliance", size: "1.8 MB" },
  { id: 3, name: "Executive_Summary_Acme.pdf", date: "2024-02-28", type: "Executive", size: "0.9 MB" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Reports Archive</h2>
          <p className="text-slate-400 text-sm mt-1">Access generated security and compliance reports</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search reports..."
            className="bg-slate-900 border border-slate-800 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-sky-500/50 outline-none w-64"
          />
        </div>
      </div>

      {/* Generation Status Card */}
      <div className="bg-sky-500/5 border border-sky-500/10 rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400">
            <History size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-100">Automatic Reporting Enabled</h3>
            <p className="text-sm text-slate-400">Next scheduled full assessment report: April 1st, 2024</p>
          </div>
        </div>
        <button className="text-sky-400 font-bold hover:underline text-sm">Configure Schedule</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReports.map((report) => (
          <div key={report.id} className="glass-card hover:border-sky-500/30 transition-all p-6 group">
            <div className="flex items-start justify-between">
              <div className="p-4 bg-slate-800/50 rounded-2xl text-slate-400 group-hover:text-sky-400 transition-colors">
                <FileText size={32} />
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded uppercase tracking-wider">
                {report.type}
              </span>
            </div>
            
            <div className="mt-6">
              <h4 className="font-bold text-slate-100 truncate">{report.name}</h4>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                {report.date} • {report.size}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-8">
              <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 py-2 rounded-lg text-sm font-medium transition-colors">
                <Eye size={16} /> Preview
              </button>
              <button className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                <Download size={16} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
