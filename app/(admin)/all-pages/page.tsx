"use client";

import React, { useState, useMemo } from "react";
import { 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Plus, 
  Search, 
  Globe,
  Settings,
  LayoutDashboard,
  Users,
  ClipboardList,
  ShieldCheck,
  Droplet,
  Home,
  Info,
  Phone,
  BookOpen,
  Lock
} from "lucide-react";

// Comprehensive list of all pages defined in your project
const allProjectPages = [
  // --- ADMIN PANEL PAGES ---
  { id: 1, name: "Dashboard", slug: "/dashboard", group: "Admin", icon: <LayoutDashboard size={16}/>, status: "Live" },
  { id: 2, name: "Donor Management", slug: "/donor_management", group: "Admin", icon: <Users size={16}/>, status: "Live" },
  { id: 3, name: "Request Moderator", slug: "/request_moderator", group: "Admin", icon: <ClipboardList size={16}/>, status: "Live" },
  { id: 4, name: "Verification Module", slug: "/verification_module", group: "Admin", icon: <ShieldCheck size={16}/>, status: "Live" },
  { id: 5, name: "Inquiries (Inbox)", slug: "/inbox", group: "Admin", icon: <Droplet size={16}/>, status: "Live" },
  { id: 6, name: "Blood Groups Registry", slug: "/blood-groups", group: "Admin", icon: <Droplet size={16}/>, status: "Live" },

  // --- USER FACING PAGES ---
  { id: 7, name: "Home Landing", slug: "/", group: "User", icon: <Home size={16}/>, status: "Live" },
  { id: 8, name: "About Us", slug: "/about", group: "User", icon: <Info size={16}/>, status: "Live" },
  { id: 9, name: "Contact Us", slug: "/contact", group: "User", icon: <Phone size={16}/>, status: "Live" },
  { id: 10, name: "Blogs & News", slug: "/blogs", group: "User", icon: <BookOpen size={16}/>, status: "Live" },
  { id: 11, name: "Public Blood Requests", slug: "/requests", group: "User", icon: <ClipboardList size={16}/>, status: "Live" },
  { id: 12, name: "Donate Blood Form", slug: "/donate", group: "User", icon: <Droplet size={16}/>, status: "Live" },

  // --- AUTH PAGES ---
  { id: 13, name: "Login Gateway", slug: "/login", group: "Auth", icon: <Lock size={16}/>, status: "Live" },
  { id: 14, name: "Sign Up", slug: "/signup", group: "Auth", icon: <Lock size={16}/>, status: "Live" },
];

export default function PagesManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Filter Logic: Filters based on Search Input and Tab Selection
  const filteredPages = useMemo(() => {
    return allProjectPages.filter((page) => {
      const matchesSearch = page.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            page.slug.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "All" || page.group === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 pb-20 font-sans">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              Project Architect
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
              Site <span className="text-primary">Inventory</span>
            </h1>
            <p className="text-sm text-muted font-medium italic">Manage every route within the Blood Chain Pakistan ecosystem.</p>
          </div>

          <button className="flex items-center gap-3 bg-foreground text-background dark:bg-primary dark:text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
            <Plus size={18} /> Add Custom Route
          </button>
        </div>

        {/* --- SEARCH & LIVE FILTERS --- */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or URL (e.g. /inbox)..." 
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex bg-card border border-border p-1.5 rounded-2xl">
            {["All", "Admin", "User", "Auth"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  activeTab === tab 
                    ? "bg-primary text-white shadow-lg" 
                    : "text-muted hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* --- PAGES TABLE --- */}
        <div className="border border-border rounded-[2.5rem] bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/5 border-b border-border">
                  <th className="p-6 text-[10px] font-black uppercase text-muted tracking-widest">Page Identity</th>
                  <th className="p-6 text-[10px] font-black uppercase text-muted tracking-widest">Category</th>
                  <th className="p-6 text-[10px] font-black uppercase text-muted tracking-widest">Route Path</th>
                  <th className="p-6 text-[10px] font-black uppercase text-muted tracking-widest text-right">Quick Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-muted/5 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-background border border-border rounded-2xl flex items-center justify-center text-muted group-hover:text-primary group-hover:border-primary/40 transition-all">
                          {page.icon}
                        </div>
                        <div>
                          <p className="text-sm font-black text-foreground uppercase tracking-tight">{page.name}</p>
                          <span className="text-[9px] font-bold text-emerald-500 uppercase flex items-center gap-1">
                             <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> {page.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.15em] border ${
                        page.group === 'Admin' ? 'bg-primary/10 border-primary/20 text-primary' : 
                        page.group === 'User' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : 
                        'bg-muted/20 border-border text-muted'
                      }`}>
                        {page.group}
                      </span>
                    </td>
                    <td className="p-6 font-mono text-xs text-muted group-hover:text-foreground transition-colors">
                      {page.slug}
                    </td>
                    <td className="p-6">
                      <div className="flex justify-end gap-2">
                        <button className="p-3 bg-background border border-border rounded-xl text-muted hover:text-primary transition-all shadow-sm" title="Open Page">
                          <ExternalLink size={16} />
                        </button>
                        <button className="p-3 bg-background border border-border rounded-xl text-muted hover:text-blue-500 transition-all shadow-sm" title="Edit Metadata">
                          <Edit3 size={16} />
                        </button>
                        <button className="p-3 bg-background border border-border rounded-xl text-muted hover:text-red-500 transition-all shadow-sm" title="Delete Page">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPages.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <Settings size={48} className="mx-auto text-muted/20 animate-spin-slow" />
              <p className="text-sm font-black text-muted uppercase tracking-widest">No matching routes found</p>
            </div>
          )}
        </div>

        {/* --- SUMMARY INFO --- */}
        <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-card border border-dashed border-border rounded-[2.5rem] gap-6">
          <div className="flex items-center gap-4">
             <div className="p-4 bg-primary/10 rounded-2xl text-primary font-black">
                {filteredPages.length}
             </div>
             <div>
                <p className="text-sm font-black uppercase tracking-tight text-foreground">Filtered Results</p>
                <p className="text-xs text-muted font-medium">Currently viewing {activeTab} pages.</p>
             </div>
          </div>
          <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Blood Chain Pakistan Framework v1.0</p>
        </div>

      </div>
    </div>
  );
}