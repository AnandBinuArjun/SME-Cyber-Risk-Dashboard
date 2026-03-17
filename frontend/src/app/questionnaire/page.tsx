"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Smartphone, 
  Globe, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Circle,
  HelpCircle,
  Clock,
  Save,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "access", label: "Access Control", icon: <Lock size={20} />, status: "Completed", progress: 100 },
  { id: "backup", label: "Backup & Recovery", icon: <Database size={20} />, status: "In Progress", progress: 65 },
  { id: "endpoint", label: "Endpoint Security", icon: <Smartphone size={20} />, status: "Not Started", progress: 0 },
  { id: "network", label: "Network Security", icon: <Globe size={20} />, status: "Not Started", progress: 0 },
];

const mockQuestions = [
  { 
    id: 1, 
    category: "access", 
    text: "Is Multi-Factor Authentication (MFA) enabled for all administrative accounts?", 
    hint: "Includes cloud consoles, server access, and VPNs.",
    type: "boolean"
  },
  { 
    id: 2, 
    category: "access", 
    text: "Do you have a formal process for disabling user accounts when staff leave?", 
    hint: "Termination procedures should cover all business systems.",
    type: "boolean"
  },
  { 
    id: 3, 
    category: "backup", 
    text: "Are critical business data backups tested for restoration at least once a quarter?", 
    hint: "A backup is only as good as its last restoration test.",
    type: "boolean"
  },
  { 
    id: 4, 
    category: "backup", 
    text: "Are backups stored offsite or in a physically isolated location?", 
    hint: "Cloud-to-cloud or cloud-to-onpremise counts as separate.",
    type: "boolean"
  },
];

export default function QuestionnairePage() {
  const [activeCategory, setActiveCategory] = useState("access");
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<number, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);

  const activeQuestions = mockQuestions.filter(q => q.category === activeCategory);
  const totalQuestions = mockQuestions.length;
  const answeredQuestions = Object.keys(responses).length;
  const progressPercent = Math.round((answeredQuestions / totalQuestions) * 100);

  const handleResponse = (questionId: number, value: boolean) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Sidebar Navigation & Overall Progress */}
      <div className="xl:col-span-3 space-y-10">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white leading-none">Internal Assessment</h2>
          <p className="text-slate-500 mt-3 text-sm font-semibold tracking-wide">Capturing non-technical risk controls.</p>
        </div>

        <div className="glass-card p-8 bg-sky-500/5 border-sky-500/20">
           <div className="flex justify-between items-end mb-4">
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 leading-none">Global Completion</p>
                 <h4 className="text-2xl font-black text-sky-400 leading-none">{progressPercent}%</h4>
              </div>
              <ShieldCheck size={28} className="text-sky-500/50" />
           </div>
           <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                 className="h-full bg-sky-500 transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(56,189,248,0.6)]" 
                 style={{ width: `${progressPercent}%` }} 
              />
           </div>
           <p className="text-[10px] font-bold text-slate-500 mt-4 uppercase tracking-widest flex items-center gap-2">
              <Clock size={12} /> Last auto-saved @ 14:22
           </p>
        </div>

        <nav className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 pl-2">Categories</p>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-xl border transition-all relative group overflow-hidden",
                activeCategory === cat.id 
                  ? "bg-slate-900 border-sky-500/40 text-sky-400" 
                  : "bg-transparent border-slate-800/10 text-slate-500 hover:bg-slate-900/40 hover:border-slate-800 hover:text-slate-300"
              )}
            >
               <div className="flex items-center gap-4 relative z-10">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                    activeCategory === cat.id ? "bg-sky-500/10 text-sky-400" : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                  )}>
                    {cat.icon}
                  </div>
                  <span className="text-sm font-black tracking-tight">{cat.label}</span>
               </div>
               
               <div className="flex items-center gap-3 relative z-10">
                  <span className="text-[10px] font-bold uppercase">{cat.progress}%</span>
                  {cat.progress === 100 ? (
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  ) : (
                    <ChevronRight size={16} className="text-slate-700 group-hover:translate-x-1 transition-transform" />
                  )}
               </div>

               {activeCategory === cat.id && (
                 <div className="absolute left-0 top-0 w-1 h-full bg-sky-500" />
               )}
            </button>
          ))}
        </nav>
      </div>

      {/* Questionnaire Wizard Area */}
      <div className="xl:col-span-9 space-y-10">
        <div className="glass-card p-10 min-h-[600px] flex flex-col relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[100px] rounded-full translate-x-24 -translate-y-24" />
           
           <div className="flex justify-between items-start mb-12 relative z-10">
              <div>
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-sky-400 mb-2">
                    <CheckCircle2 size={14} /> {activeCategory.replace('-', ' ')} Domain
                 </div>
                 <h3 className="text-4xl font-black tracking-tight text-white leading-none">Security Readiness Checks</h3>
                 <p className="text-slate-400 mt-4 font-medium text-lg max-w-xl">
                    Answer these critical validation questions honestly to ensure your calculated risk mirrors reality.
                 </p>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/60 p-4 rounded-2xl border border-white/5">
                 <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5 leading-none">Category Status</p>
                    <p className="text-sm font-black text-emerald-400 tracking-tight leading-none mt-1 uppercase tracking-wider">Validated</p>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <ShieldCheck size={24} />
                 </div>
              </div>
           </div>

           <div className="flex-1 space-y-8 relative z-10 transition-all animate-in slide-in-from-right-4 duration-500">
              {activeQuestions.map((q) => (
                <div key={q.id} className="p-8 rounded-2xl border border-slate-800/40 bg-slate-950/20 hover:bg-slate-900/30 transition-all hover:border-slate-800 group">
                   <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                      <div className="flex-1">
                         <div className="flex items-center gap-4 mb-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500">Q{q.id}</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Verification Card</span>
                         </div>
                         <h4 className="text-xl font-bold text-slate-200 leading-snug group-hover:text-white transition-colors">
                           {q.text}
                         </h4>
                         <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-sky-400/70 bg-sky-500/5 w-fit px-3 py-2 rounded-lg border border-sky-500/10">
                            <HelpCircle size={14} className="shrink-0" />
                            {q.hint}
                         </div>
                      </div>
                      
                      <div className="flex gap-4 shrink-0 mt-4 md:mt-0">
                         <button 
                           onClick={() => handleResponse(q.id, true)}
                           className={cn(
                             "w-32 py-4 rounded-xl border-2 font-black uppercase text-xs tracking-[0.2em] transition-all flex flex-col items-center gap-2",
                             responses[q.id] === true 
                               ? "bg-sky-500/20 border-sky-500 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]" 
                               : "bg-slate-900 border-slate-800 text-slate-600 hover:border-slate-700 hover:text-slate-400"
                           )}
                         >
                            <CheckCircle size={20} className={cn("transition-all duration-300", responses[q.id] === true ? "scale-110 opacity-100" : "opacity-30 scale-90")} />
                            YES
                         </button>
                         <button 
                           onClick={() => handleResponse(q.id, false)}
                           className={cn(
                             "w-32 py-4 rounded-xl border-2 font-black uppercase text-xs tracking-[0.2em] transition-all flex flex-col items-center gap-2",
                             responses[q.id] === false 
                               ? "bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]" 
                               : "bg-slate-900 border-slate-800 text-slate-600 hover:border-slate-700 hover:text-slate-400"
                           )}
                         >
                            <Circle size={20} className={cn("transition-all duration-300", responses[q.id] === false ? "scale-110 opacity-100" : "opacity-30 scale-90")} />
                            NO
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-12 flex justify-between items-center relative z-10 pt-10 border-t border-slate-800/50">
              <button 
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-800 text-slate-500 font-bold hover:bg-slate-900 hover:text-white transition-all disabled:opacity-0"
                disabled={activeCategory === categories[0].id}
              >
                <ChevronLeft size={20} /> <span className="mt-0.5">Previous Category</span>
              </button>
              
              <div className="flex items-center gap-4">
                 <div className={cn(
                   "flex items-center gap-2 text-xs font-black uppercase text-slate-500 transition-all",
                   isSaving ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                 )}>
                    <Save size={16} className="text-emerald-500" /> Auto-Saving
                 </div>
                 <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-xl font-black tracking-tight transition-all active:scale-95 group shadow-xl shadow-sky-500/25">
                    <span className="mt-0.5">Save & Continue</span> <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>
        </div>
        
        <div className="flex justify-center gap-3">
           {categories.map((_, i) => (
             <div key={i} className={cn("h-1.5 rounded-full transition-all duration-500", activeCategory === categories[i].id ? "w-12 bg-sky-400" : "w-3 bg-slate-800")} />
           ))}
        </div>
      </div>
    </div>
  );
}
