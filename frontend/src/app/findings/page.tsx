"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal,
  ChevronDown,
  AlertTriangle,
  FileText,
  X,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  MoreVertical,
  Activity as ActivityIcon,
  Globe,
  Mail,
  Smartphone,
  Eye,
  Zap,
  Info,
  Terminal as TerminalIcon,
  ShieldCheck
} from "lucide-react";
import { cn, getSeverityColor } from "@/lib/utils";

const mockFindings = [
  { id: 1, title: "No DMARC Policy Configured", category: "Email Security", severity: "High", asset: "brightpath.com", status: "Resolved", description: "The domain 'brightpath.com' does not have a DMARC policy. This allows unauthorized senders to spoof emails from your domain, increasing phishing risks for your staff and clients.", impact: "High risk of brand reputation damage and credential harvesting campaigns.", fix: "Create a DMARC TXT record in your DNS with a policy of 'quarantine' or 'reject'.", date: "2024-03-17", icon: <Mail size={20} /> },
  { id: 2, title: "Missing HSTS Header", category: "Web Security", severity: "High", asset: "brightpath.com", status: "Resolved", description: "The 'Strict-Transport-Security' (HSTS) header is missing from your web server responses. This allows insecure HTTP connections and man-in-the-middle attacks.", impact: "Passive data interception on untrusted networks.", fix: "Add 'Strict-Transport-Security' header with a long max-age (e.g., 31536000).", date: "2024-03-17", icon: <Globe size={20} /> },
  { id: 3, title: "SSL Certificate Expiring Soon (18 days)", category: "Encryption", severity: "Medium", asset: "brightpath.com", status: "In Progress", description: "The SSL certificate for 'brightpath.com' is set to expire on April 4th, 2024.", impact: "Website downtime and browser trust warnings if not renewed before expiration.", fix: "Renew the certificate through your CA (Let's Encrypt / DigiCert) and update your web server configuration.", date: "2024-03-15", icon: <ShieldAlert size={20} /> },
  { id: 4, title: "MFA not enforced for staff", category: "Access Control", severity: "High", asset: "Internal", status: "Resolved", description: "Multiple administrative accounts on internal portals do not have MFA enforced. They are protected only by passwords.", impact: "Critical risk of account takeover via brute-force or credential stuffing.", fix: "Enforce MFA (TOTP/WebAuthn) for all staff logins globally.", date: "2024-03-17", icon: <Smartphone size={20} /> },
  { id: 5, title: "Insecure CSP Policy", category: "Web Security", severity: "Medium", asset: "brightpath.com", status: "Open", description: "Content Security Policy (CSP) is too permissive or missing. This increases risk of Cross-Site Scripting (XSS).", impact: "Sensitive session data can be stolen if script injection is successful.", fix: "Define a robust CSP that only allows scripts from trusted domains and prevents 'unsafe-inline'.", date: "2024-03-14", icon: <Globe size={20} /> },
];

export default function FindingsPage() {
  const [selectedFinding, setSelectedFinding] = useState<typeof mockFindings[0] | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "technical" | "remediation">("overview");

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-sky-400">
             <ActivityIcon size={14} className="animate-pulse" /> Technical Evidence Archive
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white leading-none">Security Findings</h2>
          <p className="text-slate-400 mt-4 font-medium text-lg max-w-xl">
             A prioritized inventory of identified vulnerabilities and compliance gaps discovered across your digital surface.
          </p>
        </div>
        
        <div className="flex gap-3">
           <div className="relative group w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search Assets, IDs..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-sky-500/50 outline-none text-sm transition-all"
              />
           </div>
           <button className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-6 py-3 rounded-xl hover:bg-slate-800 transition-all font-black text-xs text-slate-400 tracking-widest uppercase active:scale-95">
              <Filter size={18} /> Filters
           </button>
        </div>
      </div>

      {/* Severity Filter Tabs */}
      <div className="flex items-center gap-3 p-1.5 bg-slate-950/40 border border-slate-800/40 rounded-xl w-fit">
         {["All", "Critical", "High", "Medium", "Low"].map(sev => (
           <button 
             key={sev}
             className={cn(
               "px-5 py-2.5 rounded-lg text-xs font-black tracking-widest uppercase transition-all shadow-none",
               sev === "All" ? "bg-slate-900 text-sky-400 shadow-xl shadow-sky-500/5" : "text-slate-600 hover:text-slate-300"
             )}
           >
             {sev}
           </button>
         ))}
      </div>

      {/* Main Container: Table + Sidebar Drawer Overlay */}
      <div className="grid grid-cols-1 gap-8 relative overflow-hidden">
        {/* Findings Table */}
        <div className="glass-card overflow-hidden">
           <table className="w-full text-left">
              <thead className="bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
                 <tr>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] w-24">Risk</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Detection & Asset</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Category</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Lifecycle</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                 {mockFindings.map((finding) => (
                   <tr 
                     key={finding.id} 
                     onClick={() => { setSelectedFinding(finding); setActiveTab("overview"); }}
                     className={cn(
                       "hover:bg-sky-500/[0.03] transition-all group cursor-pointer border-l-4 border-transparent transition-all",
                       selectedFinding?.id === finding.id ? "bg-sky-500/[0.05] border-l-sky-500" : "hover:border-l-sky-500/30"
                     )}
                   >
                      <td className="px-8 py-6">
                         <div className={cn(
                           "w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-black/20",
                           finding.severity === "High" ? "bg-red-500/10 text-red-500" : "bg-orange-500/10 text-orange-400"
                         )}>
                            {finding.severity.charAt(0)}
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div>
                            <h4 className="font-bold text-slate-200 group-hover:text-sky-400 transition-colors lowercase tracking-tight leading-none text-lg">
                              {finding.title}
                            </h4>
                            <p className="text-[10px] font-black uppercase text-slate-500 mt-2 tracking-widest flex items-center gap-2">
                               <Globe size={11} className="text-slate-600" /> {finding.asset}
                            </p>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className="text-xs font-black uppercase tracking-widest text-slate-500 opacity-60 group-hover:opacity-100 transition-opacity">
                            {finding.category}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                               <div className={cn(
                                 "w-2 h-2 rounded-full animate-pulse",
                                 finding.status === "Resolved" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "bg-orange-500"
                               )} />
                               <span className={cn(
                                 "text-[10px] font-black uppercase tracking-widest",
                                 finding.status === "Resolved" ? "text-emerald-400" : "text-orange-400"
                               )}>{finding.status}</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Identified {finding.date}</span>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* Floating Detail Sidebar Drawer Overlay */}
      {selectedFinding && (
        <div className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-slate-950/80 backdrop-blur-2xl border-l border-slate-800 shadow-2xl z-50 animate-in slide-in-from-right duration-500 flex flex-col">
           {/* Header */}
           <div className="p-8 border-b border-slate-800 flex justify-between items-start">
              <div className="flex items-center gap-4">
                 <div className={cn(
                   "p-4 rounded-2xl",
                   selectedFinding.severity === "High" ? "bg-red-500/10 text-red-500" : "bg-orange-500/10 text-orange-400"
                 )}>
                    {selectedFinding.icon}
                 </div>
                 <div>
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-500 rounded tracking-widest">{selectedFinding.id}</span>
                       <span className={cn(
                         "text-[10px] font-black uppercase tracking-widest",
                         selectedFinding.severity === "High" ? "text-red-500" : "text-orange-400"
                       )}>{selectedFinding.severity} Criticality</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mt-2 leading-tight">{selectedFinding.title}</h3>
                 </div>
              </div>
              <button onClick={() => setSelectedFinding(null)} className="p-2 hover:bg-slate-900 rounded-xl text-slate-500 transition-all active:scale-90">
                 <X size={24} />
              </button>
           </div>

           {/* Tabs */}
           <div className="flex px-8 border-b border-slate-800">
              {[
                { id: "overview", label: "Business View", icon: <ShieldAlert size={14} /> },
                { id: "technical", label: "Technical Evidence", icon: <TerminalIcon size={14} /> },
                { id: "remediation", label: "Recommended Fix", icon: <CheckCircle2 size={14} /> },
              ].map(tab => (
                 <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-b-2",
                    activeTab === tab.id ? "border-sky-500 text-sky-400" : "border-transparent text-slate-500 hover:text-slate-300"
                  )}
                 >
                   {tab.icon} {tab.label}
                 </button>
              ))}
           </div>

           {/* Content */}
           <div className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar">
              {activeTab === "overview" && (
                <div className="space-y-10 animate-in fade-in duration-500">
                   <section>
                      <h5 className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-600 mb-4 flex items-center gap-2">
                         <Info size={12} className="text-sky-500" /> Executive Summary
                      </h5>
                      <p className="text-slate-300 leading-relaxed font-medium text-lg">
                        {selectedFinding.description}
                      </p>
                   </section>

                   <section className="bg-red-500/5 p-6 rounded-2xl border border-red-500/10">
                      <h5 className="text-[10px] font-black tracking-[0.2em] uppercase text-red-400/80 mb-3">Potential Impact</h5>
                      <p className="text-slate-300 font-bold leading-relaxed">
                        {selectedFinding.impact}
                      </p>
                   </section>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/40">
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Target Asset</p>
                         <p className="text-sm font-black text-slate-300 flex items-center gap-2 uppercase tracking-wider">
                           <Globe size={14} className="text-sky-500" /> {selectedFinding.asset}
                         </p>
                      </div>
                      <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/40">
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Domain</p>
                         <p className="text-sm font-black text-slate-300 uppercase tracking-wider">{selectedFinding.category}</p>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === "technical" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                   <div className="bg-slate-950 p-6 rounded-xl font-mono text-xs text-sky-400 border border-slate-900 shadow-inner">
                      <div className="flex justify-between items-center mb-4 text-slate-600">
                         <span>RAW SCAN EVIDENCE</span>
                         <TerminalIcon size={14} />
                      </div>
                      <p className="mb-2"># Domain: {selectedFinding.asset}</p>
                      <p className="mb-2"># Check: {selectedFinding.category}</p>
                      <p className="mb-2"># Status: Vulnerable (No Policy)</p>
                      <p className="mt-4 text-slate-400">--- Evidence Chunk ---</p>
                      <pre className="mt-2 text-slate-300 leading-relaxed">
{`$ dig +short TXT _dmarc.${selectedFinding.asset}
> (empty response)
$ curl -I https://${selectedFinding.asset}
> Strict-Transport-Security: (missing)`}
                      </pre>
                   </div>
                   
                   <button className="w-full py-4 border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">
                     <ExternalLink size={14} /> Download Vulnerability Evidence PDF
                   </button>
                </div>
              )}

              {activeTab === "remediation" && (
                <div className="space-y-10 animate-in fade-in duration-500">
                   <div className="p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full translate-x-12 -translate-y-12" />
                      <h5 className="text-[10px] font-black tracking-[0.2em] uppercase text-emerald-400 mb-6 flex items-center gap-2 relative z-10">
                         <ShieldCheck size={14} /> Step-by-Step Fix
                      </h5>
                      <p className="text-white text-xl font-black leading-tight relative z-10">
                        {selectedFinding.fix}
                      </p>
                      <div className="mt-8 flex gap-3 relative z-10">
                         <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">
                            Mark as Progress
                         </button>
                         <button className="p-3 border border-emerald-500/20 rounded-xl text-emerald-400 hover:bg-emerald-500/10 transition-all active:scale-90">
                           <MoreVertical size={20} />
                         </button>
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 pl-2">Associated Recommendations</p>
                      <div className="glass-card p-5 flex items-center justify-between group">
                         <div className="flex items-center gap-4">
                            <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400">
                               <Zap size={16} />
                            </div>
                            <p className="text-sm font-bold text-slate-300">Publish a DMARC policy...</p>
                         </div>
                         <ArrowUpRight size={16} className="text-slate-600 group-hover:text-sky-400 transition-all" />
                      </div>
                   </div>
                </div>
              )}
           </div>

           {/* Footer Action */}
           <div className="p-8 border-t border-slate-800 bg-[#020617] flex gap-4">
              <button className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800/10 rounded-xl font-black uppercase text-[10px] text-slate-400 tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                 <Eye size={16} /> Mark as Reviewed
              </button>
              <button className="flex-1 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl shadow-sky-500/25">
                 <Zap size={16} /> Deploy Remediation
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
