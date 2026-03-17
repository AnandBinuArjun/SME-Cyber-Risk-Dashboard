"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Mail, 
  Shield, 
  UserPlus, 
  MoreHorizontal, 
  Trash2,
  ShieldCheck,
  Eye,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockTeam = [
  { id: 1, name: "Sarah Business", email: "sarah@brightpath.com", role: "Org Owner", status: "Active" },
  { id: 2, name: "Alex Tech", email: "alex@brightpath.com", role: "Security Analyst", status: "Active" },
  { id: 3, name: "Tom Auditor", email: "tom@external.com", role: "Viewer/Auditor", status: "Active" },
  { id: 4, name: "David Admin", email: "david@brightpath.com", role: "IT Admin", status: "Pending" },
];

export default function TeamManagementPage() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team & Access</h2>
          <p className="text-slate-400 mt-1">Manage role-based access for <span className="text-sky-400 font-medium whitespace-nowrap">BrightPath Consulting Ltd</span></p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-sky-500/25 active:scale-95"
        >
          <UserPlus size={20} /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Role Statistics */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Shield size={18} className="text-sky-400" /> Member Distribution
            </h3>
            <div className="space-y-4">
              {[
                { label: "Org Owners", count: 1, color: "bg-sky-500" },
                { label: "Analysts", count: 1, color: "bg-indigo-500" },
                { label: "Auditors", count: 1, color: "bg-emerald-500" },
                { label: "Admins", count: 1, color: "bg-orange-500" },
              ].map(stat => (
                <div key={stat.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                    <span>{stat.label}</span>
                    <span>{stat.count}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", stat.color)} style={{ width: '25%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <p className="text-sm font-medium text-emerald-200/80">Audit logging is active for all member actions.</p>
            </div>
          </div>
        </div>

        {/* Member Table */}
        <div className="lg:col-span-2">
          <div className="glass-card overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Member</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {mockTeam.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:border-sky-500/30 transition-colors">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-slate-200">{member.name}</p>
                          <p className="text-xs text-slate-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                        member.role === "Org Owner" ? "bg-sky-500/10 text-sky-400 border-sky-500/20" :
                        member.role === "Security Analyst" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" :
                        member.role === "Viewer/Auditor" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                        "bg-orange-500/10 text-orange-400 border-orange-500/20"
                      )}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full animate-pulse",
                          member.status === "Active" ? "bg-emerald-500" : "bg-orange-500"
                        )} />
                        <span className="text-sm font-medium text-slate-400">{member.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-100 transition-colors">
                          <Settings size={18} />
                        </button>
                        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-red-400 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invite Modal Placeholder */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowInviteModal(false)} />
          <div className="glass-card w-full max-w-lg p-8 relative z-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-bold mb-6">Invite New Member</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-400 ml-1">Email Address</label>
                <input type="email" placeholder="colleague@brightpath.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:border-sky-500/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-400 ml-1">Assign Role</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:border-sky-500/50 appearance-none">
                  <option>Security Analyst</option>
                  <option>IT Admin</option>
                  <option>Viewer/Auditor</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setShowInviteModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-800 font-bold text-slate-400 hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 font-bold text-white transition-all">
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
