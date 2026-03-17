"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Shield, 
  Building2, 
  FileCheck, 
  AlertCircle, 
  FileText, 
  Settings, 
  Users, 
  History,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  User,
  Zap,
  Activity as ActivityIcon,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  tag?: string;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Organizations", href: "/organizations", icon: Building2 },
  { title: "Assessments", href: "/assessments", icon: Shield },
  { title: "Questionnaire", href: "/questionnaire", icon: FileCheck },
  { title: "Findings", href: "/findings", icon: AlertCircle, tag: "42" },
  { title: "Recommendations", href: "/recommendations", icon: Zap },
  { title: "Reports", href: "/reports", icon: FileText },
  { title: "Audit Trail", href: "/admin/logs", icon: History },
];

const rolePermissions: Record<string, string[]> = {
  "Super Admin": ["Dashboard", "Organizations", "Assessments", "Questionnaire", "Findings", "Recommendations", "Reports", "Audit Trail"],
  "Org Owner": ["Dashboard", "Organizations", "Assessments", "Questionnaire", "Findings", "Recommendations", "Reports"],
  "Analyst": ["Dashboard", "Assessments", "Questionnaire", "Findings", "Recommendations"],
  "Viewer": ["Dashboard", "Findings", "Reports"],
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Simple route protection
        const currentNavItem = navItems.find(item => item.href === pathname);
        if (currentNavItem) {
          const allowedItems = rolePermissions[parsedUser.role] || [];
          if (!allowedItems.includes(currentNavItem.title)) {
            router.push("/dashboard");
          }
        }
      } else if (pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  if (pathname === "/login") return <>{children}</>;

  const filteredNavItems = navItems.filter(item => 
    user ? rolePermissions[user.role]?.includes(item.title) : true
  );

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 selection:bg-sky-500/30 overflow-x-hidden font-medium">
      {/* Sidebar Desktop */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-slate-950/60 backdrop-blur-2xl border-r border-white/5 z-50 transition-all duration-500 ease-out hidden lg:flex flex-col group",
        isCollapsed ? "w-20" : "w-72"
      )}>
        <div className="flex flex-col h-full px-4 py-8">
          {/* Logo Section */}
          <div className="flex items-center gap-4 px-3 mb-10 group-hover:px-4 transition-all">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-xl shadow-sky-500/20 active:scale-95 transition-all">
              <Shield size={24} strokeWidth={2.5} />
            </div>
            {!isCollapsed && (
              <span className="font-black text-xl tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent animate-in fade-in duration-700">
                CODEX SME CYBER
              </span>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar py-4">
             <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4 px-4 transition-opacity", isCollapsed ? "opacity-0" : "opacity-100")}>
               Main Platform
             </p>
            {filteredNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all relative group/item",
                    isActive 
                      ? "bg-sky-500/10 text-sky-400 font-black border border-sky-500/20 shadow-lg shadow-sky-500/5" 
                      : "text-slate-500 hover:bg-slate-900 hover:text-slate-200"
                  )}
                >
                  <item.icon size={22} className={cn("shrink-0 transition-all group-hover/item:scale-110", isActive ? "text-sky-400" : "group-hover/item:text-sky-300")} />
                  {!isCollapsed && <span className="text-sm tracking-tight">{item.title}</span>}
                  
                  {item.tag && !isCollapsed && (
                    <span className="ml-auto text-[9px] font-black bg-orange-500 text-white px-2 py-0.5 rounded shadow-lg shadow-orange-500/20 group-hover/item:scale-110 transition-transform">
                      {item.tag}
                    </span>
                  )}
                  
                  {isActive && (
                    <div className="absolute right-0 w-1 h-6 bg-sky-400 rounded-l-full shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Profile Box */}
          <div className="mt-8 pt-8 border-t border-white/5">
             <div className={cn(
               "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all border border-transparent",
               isCollapsed ? "justify-center" : "bg-slate-900/40 hover:bg-slate-900/60 hover:border-white/5 cursor-pointer"
             )}>
                <div className="w-10 h-10 rounded-xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                  <User size={22} className="text-slate-400" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-100 truncate">{user?.name || "Sarah Business"}</p>
                    <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest truncate mt-0.5">{user?.role || "Org Owner"}</p>
                  </div>
                )}
             </div>
             
              <button 
                onClick={handleLogout}
                className={cn(
                  "mt-4 w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-400/50 hover:bg-red-500/10 hover:text-red-400 transition-all font-black uppercase text-[10px] tracking-widest",
                  isCollapsed ? "justify-center" : ""
                )}
              >
                <LogOut size={20} className="shrink-0" />
                {!isCollapsed && <span className="mt-0.5">Logout Session</span>}
              </button>
          </div>
        </div>

        {/* Collapsed Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 bg-slate-950 border border-white/10 w-6 h-6 rounded-full flex items-center justify-center text-slate-500 hover:text-sky-400 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] z-[60] active:scale-90"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* Main Content Hub */}
      <main className={cn(
        "flex-1 transition-all duration-500 ease-out",
        isCollapsed ? "lg:ml-20" : "lg:ml-72"
      )}>
        {/* Navigation Bar Top */}
        <header className="h-24 sticky top-0 bg-[#020617]/80 backdrop-blur-2xl z-40 px-6 lg:px-10 flex items-center justify-between border-b border-white/5 animate-in slide-in-from-top duration-500">
          <div className="flex items-center gap-6 flex-1">
             <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-3 bg-slate-900 rounded-xl text-slate-400">
                <Menu size={20} />
             </button>
             
             <div className="relative group max-w-md w-full hidden md:block">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-all" size={18} />
               <input 
                 type="text" 
                 placeholder="Search assets, forensic logs, or remediation fix steps..."
                 className="bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-sky-500/50 outline-none w-full text-sm font-medium transition-all text-slate-400 placeholder:text-slate-600 focus:text-slate-100"
               />
               <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-900 rounded border border-slate-800 text-[10px] font-black text-slate-600 group-focus-within:opacity-0 transition-opacity">
                  CMD + K
               </div>
             </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-8 shrink-0">
            <div className="hidden sm:flex items-center gap-8 border-r border-white/5 pr-8 mr-2">
               <div className="text-right">
                  <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest leading-none">Security Monitoring</p>
                  <div className="flex items-center gap-2 mt-1.5 justify-end">
                     <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-0.5">Real-time Active</span>
                     <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest leading-none">Last Data Sync</p>
                  <p className="text-[10px] font-black text-slate-200 mt-1.5 uppercase tracking-widest">3 mins ago</p>
               </div>
            </div>
            
            <div className="flex items-center gap-3">
               <button className="relative p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 hover:text-white hover:border-slate-700 transition-all group active:scale-95">
                 <Bell size={22} className="group-hover:rotate-12 transition-transform" />
                 <div className="absolute top-2 right-2.5 w-2 h-2 bg-sky-500 rounded-full border-2 border-[#020617] group-hover:scale-125 transition-transform" />
               </button>
               <button className="relative p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 hover:text-white hover:border-slate-700 transition-all hidden md:flex items-center justify-center active:scale-90">
                 <ActivityIcon size={22} />
               </button>
            </div>
          </div>
        </header>

        {/* Viewport Content */}
        <div className="p-6 lg:p-12 mb-20 max-w-[1600px] mx-auto no-scrollbar overflow-y-auto">
          {children}
        </div>
      </main>

      {/* Side Mobile Quick Action Button (Floating) */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-sky-500/40 z-40 hover:scale-110 active:scale-90 transition-all shadow-xl group border-2 border-white/10 lg:hidden">
         <Zap size={28} className="fill-white animate-pulse" />
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#020617]/90 backdrop-blur-xl z-[100] lg:hidden p-8 animate-in fade-in zoom-in duration-300">
           <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white">
                    <Shield size={24} />
                 </div>
                  <span className="font-black text-xl tracking-tighter text-white">CODEX SME CYBER</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-slate-900 rounded-xl text-slate-400 active:scale-90 transition-all">
                 <X size={24} />
              </button>
           </div>
           
           <nav className="space-y-6">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-6 text-2xl font-black text-slate-300 hover:text-sky-400 transition-colors"
                >
                   <item.icon size={28} />
                   {item.title}
                </Link>
              ))}
           </nav>
        </div>
      )}
    </div>
  );
}
