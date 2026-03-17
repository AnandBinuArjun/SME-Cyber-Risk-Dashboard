"use client";

import React, { useState } from "react";
import { 
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  History,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Target,
  BarChart,
  Terminal,
  Activity,
  Award,
  MoreVertical,
  CheckSquare,
  Square,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockRecommendations = [
  { 
    id: 1, 
    title: "Enforce MFA for all staff users", 
    priority: "Immediate", 
    priorityLevel: 1,
    effort: "Low", 
    benefit: "Critical", 
    status: "Resolved", 
    category: "Access Control",
    description: "Multi-factor authentication (MFA) provides a redundant layer of security. Even if a password is stolen, the attacker cannot access the account without the second factor.",
    steps: [
      "Inventory all user accounts with administrative privileges.",
      "Select an MFA provider (TOTP, WebAuthn, or Hardware Keys).",
      "Draft a pilot roll-out for IT and business owners.",
      "Enforce site-wide MFA with a grace period for registration."
    ],
    impact: "+15.0 pts to Risk Score"
  },
  { 
    id: 2, 
    title: "Publish a DMARC policy", 
    priority: "Quick Win", 
    priorityLevel: 2,
    effort: "Low", 
    benefit: "High", 
    status: "Resolved", 
    category: "Email Security",
    description: "Domain-based Message Authentication, Reporting, and Conformance (DMARC) tells mail servers how to handle emails that fail SPF/DKIM checks.",
    steps: [
      "Identify all legitimate IP addresses sending mail as your domain.",
      "Create a DMARC TXT record with p=none for monitoring.",
      "Analyze aggregate reports for unauthorized senders.",
      "Move to p=quarantine once authorized mail is validated."
    ],
    impact: "+12.0 pts to Risk Score"
  },
  { 
    id: 3, 
    title: "Implement HSTS and CSP Security Headers", 
    priority: "Quick Win", 
    priorityLevel: 2,
    effort: "Medium", 
    benefit: "Medium", 
    status: "Resolved", 
    category: "Web Security",
    description: "HTTP Strict Transport Security (HSTS) and Content Security Policy (CSP) provide defense-in-depth against protocol attacks and cross-site scripting.",
    steps: [
      "Add the HSTS header to your HTTPS server configuration.",
      "Draft a base CSP policy allowing self-scripts.",
      "Monitor CSP violations in Report-Only mode.",
      "Enforce the policy site-wide."
    ],
    impact: "+8.5 pts to Risk Score"
  },
  { 
    id: 4, 
    title: "Test backup restoration quarterly", 
    priority: "Standard", 
    priorityLevel: 3,
    effort: "Medium", 
    benefit: "High", 
    status: "Resolved", 
    category: "Resilience",
    description: "Regular testing of backup restoration processes ensures that in the event of ransomware or accidental deletion, data can be recovered reliably.",
    steps: [
      "Select a random subset of critical business data.",
      "Perform a restoration to an isolated test environment.",
      "Verify data integrity and time-to-recovery (RTO).",
      "Document the drill and address any failures."
    ],
    impact: "+10.0 pts to Risk Score"
  },
  { 
    id: 5, 
    title: "Renew SSL certificate for brightpath.com", 
    priority: "Standard", 
    priorityLevel: 3,
    effort: "Low", 
    benefit: "High", 
    status: "In Progress", 
    category: "Encryption",
    description: "Expired certificates lead to browser warnings and broken API integrations. Renewal maintains encryption and user trust.",
    steps: [
      "Verify current certificate expiration date.",
      "Initiate renewal through Ceritificate Authority (CA).",
      "Complete Domain Validation (DV).",
      "Install renewed certificate on the web server."
    ],
    impact: "Prevents Score Drop (-20 pts)"
  },
  { 
    id: 6, 
    title: "Create a formal incident response plan", 
    priority: "Long-term", 
    priorityLevel: 4,
    effort: "High", 
    benefit: "Critical", 
    status: "In Progress", 
    category: "Governance",
    description: "A formal incident response (IR) plan outlines roles, responsibilities, and communication channels during a security breach.",
    steps: [
      "Define what constitutes a security incident.",
      "Identify the IR team members and external support.",
      "Draft step-by-step containment and eradication procedures.",
      "Conduct a tabletop exercise with key stakeholders."
    ],
    impact: "+18.0 pts to Risk Score"
  },
];

export default function RecommendationsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("Open");

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700 no-scrollbar">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-sky-400">
             <Target size={14} className="animate-pulse" /> Remediation Roadmap
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white leading-none">Strategic Actions</h2>
          <p className="text-slate-400 mt-4 font-medium text-lg max-w-xl">
             A prioritized improvement plan designed to maximize impact while minimizing implementation effort.
          </p>
        </div>
        
        <div className="flex gap-3">
           <button className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-6 py-3 rounded-xl hover:bg-slate-800 transition-all font-black text-xs text-slate-400 tracking-widest uppercase active:scale-95">
              <Filter size={18} /> Filters
           </button>
           <button className="flex items-center gap-3 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-black text-xs text-white tracking-widest uppercase shadow-xl shadow-sky-500/25 active:scale-95 transition-all group">
              <Zap size={18} className="fill-white" /> Global Roadmap <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
           </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-3 p-1.5 bg-slate-950/40 border border-slate-800/40 rounded-xl w-fit">
         {["All", "Immediate", "Quick Win", "Standard", "In Progress", "Resolved"].map(filter => (
           <button 
             key={filter}
             onClick={() => setActiveFilter(filter)}
             className={cn(
               "px-5 py-2.5 rounded-lg text-xs font-black tracking-widest uppercase transition-all shadow-none",
               activeFilter === filter ? "bg-slate-900 text-sky-400 shadow-xl shadow-sky-500/5" : "text-slate-600 hover:text-slate-300"
             )}
           >
             {filter}
           </button>
         ))}
      </div>

      {/* Recommendation Grid */}
      <div className="grid grid-cols-1 gap-6">
        {mockRecommendations.map((rec) => {
          const isExpanded = expandedId === rec.id;
          
          return (
            <div 
              key={rec.id} 
              className={cn(
                "glass-card overflow-hidden transition-all duration-500 group",
                isExpanded ? "border-sky-500/40 bg-slate-900/60 shadow-2xl" : "hover:border-white/10"
              )}
            >
              {/* Header Container */}
              <div 
                onClick={() => setExpandedId(isExpanded ? null : rec.id)}
                className="p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-8"
              >
                 <div className="flex items-start gap-6 flex-1">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110 shadow-lg",
                      rec.priority === "Immediate" ? "bg-red-500/10 text-red-500" :
                      rec.priority === "Quick Win" ? "bg-sky-500/10 text-sky-400" :
                      "bg-slate-800 text-slate-500"
                    )}>
                      {rec.priority === "Immediate" ? <AlertCircle size={24} /> : 
                       rec.priority === "Quick Win" ? <Zap size={24} className="fill-sky-500" /> : <Settings size={24} />}
                    </div>
                    
                    <div className="flex-1">
                       <div className="flex items-center gap-3 mb-2">
                          <span className={cn(
                            "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border",
                            rec.priority === "Immediate" ? "bg-red-500/10 text-red-400 border-red-500/10" :
                            rec.priority === "Quick Win" ? "bg-sky-500/10 text-sky-400 border-sky-500/10" :
                            "bg-slate-800 text-slate-500 border-slate-700"
                          )}>
                             {rec.priority}
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{rec.category}</span>
                       </div>
                       <h3 className="text-2xl font-black text-slate-100 group-hover:text-white transition-colors">{rec.title}</h3>
                       <div className="flex items-center gap-6 mt-4">
                          <div className="flex items-center gap-2">
                             <TrendingUp size={12} className="text-emerald-500" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 tracking-tighter shrink-0">{rec.impact}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <BarChart size={12} className="text-sky-400" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 tracking-tighter shrink-0">Benefit: {rec.benefit}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <Clock size={12} className="text-orange-400" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 tracking-tighter shrink-0">Effort: {rec.effort}</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center justify-between md:justify-end gap-10 border-t md:border-t-0 border-slate-800 pt-6 md:pt-0">
                    <div className="flex flex-col items-end">
                       {rec.status === "Resolved" ? (
                         <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-500/10">
                            <CheckCircle2 size={12} /> Resolved
                         </div>
                       ) : (
                         <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-orange-500/10">
                            <Clock size={12} className="animate-pulse" /> {rec.status}
                         </div>
                       )}
                       <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-2">{rec.status === "Resolved" ? "Verification OK" : "In Progress"}</p>
                    </div>
                    <div className={cn("p-2 rounded-xl transition-all", isExpanded ? "bg-sky-500 text-white rotate-180" : "text-slate-600 bg-slate-900 group-hover:bg-slate-800")}>
                       <ChevronDown size={20} />
                    </div>
                 </div>
              </div>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="p-10 bg-[#020617]/40 border-t border-slate-800 animate-in slide-in-from-top-4 duration-500">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-8">
                         <section>
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-4 flex items-center gap-2">
                               <Award size={12} className="text-sky-500" /> Business Justification
                            </h5>
                            <p className="text-slate-300 font-medium leading-relaxed text-lg">
                               {rec.description}
                            </p>
                         </section>

                         <section className="bg-sky-500/5 p-6 rounded-2xl border border-sky-500/10">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-3">Security Impact</h5>
                            <p className="text-slate-300 font-bold leading-relaxed">
                               Implementing this control directly addresses high-severity findings discovered in your recent automated scans, reducing your overall risk probability by approximately 22%.
                            </p>
                         </section>
                      </div>

                      <div className="space-y-8">
                         <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-end px-1">
                               <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-600 flex items-center gap-2">
                                  <CheckSquare size={12} className="text-emerald-500" /> Implementation Checklist
                               </h5>
                               <span className="text-[10px] font-black text-emerald-400">75% COMPLETE</span>
                            </div>
                            
                            <div className="space-y-3 bg-slate-950/60 p-6 rounded-2xl border border-white/5">
                               {rec.steps.map((step, i) => (
                                 <div key={i} className="flex items-start gap-4 group/step cursor-pointer">
                                    <div className={cn(
                                       "w-5 h-5 rounded-md border flex items-center justify-center transition-all",
                                       i < 3 ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" : "bg-slate-900 border-slate-800 text-slate-700"
                                    )}>
                                       {i < 3 ? <CheckCircle2 size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />}
                                    </div>
                                    <p className={cn(
                                       "text-sm font-semibold transition-colors",
                                       i < 3 ? "text-slate-400 line-through decoration-slate-600/50" : "text-slate-200 group-hover/step:text-sky-400"
                                    )}>
                                       {step}
                                    </p>
                                 </div>
                               ))}
                            </div>
                         </div>

                         <div className="flex gap-4 pt-4 border-t border-slate-800/40">
                            <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-sky-500/20 transition-all active:scale-95 group">
                               <CheckCircle2 size={16} /> Deploy Documentation
                            </button>
                            <button className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700/10 rounded-xl font-black text-xs uppercase tracking-widest text-slate-400 flex items-center justify-center gap-2 transition-all active:scale-95">
                               <Terminal size={16} /> Technical Blueprint
                            </button>
                            <button className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 hover:text-white transition-all">
                               <MoreVertical size={20} />
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Global Trend Info */}
      <div className="glass-card p-10 bg-indigo-500/[0.03] border-indigo-500/20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full translate-x-24 -translate-y-24" />
         <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
            <div className="flex items-center gap-8 text-center md:text-left">
               <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-indigo-400 shadow-xl shadow-indigo-500/5 border border-indigo-500/20">
                  <Activity size={36} className="animate-pulse" />
               </div>
               <div>
                  <h4 className="text-2xl font-black text-white leading-tight">Remediation Velocity</h4>
                  <p className="text-slate-400 mt-2 font-medium">You are resolving high-priority items 40% faster than the industry average.</p>
               </div>
            </div>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-500/30 transition-all active:scale-95 flex items-center gap-3">
               Analyze Full Performance <ArrowRight size={18} />
            </button>
         </div>
      </div>
    </div>
  );
}
