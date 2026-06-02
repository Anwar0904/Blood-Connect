"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserCheck, ShieldCheck, XCircle, Eye, FileText, 
  AlertCircle, Clock, CheckCircle2, Search, ShieldAlert, Loader2
} from "lucide-react";
import Link from "next/link";

interface PendingUser {
  id: string;
  name: string;
  type: string;
  city: string;
  date: string;
}

export default function VerificationClientPage({ initialQueue }: { initialQueue: PendingUser[] }) {
  const [queue, setQueue] = useState<PendingUser[]>(initialQueue);
  const [searchTerm, setSearchTerm] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  // 1. MUTATION: PROCESS SECURITY APPROVALS / REJECTIONS
  const handleVerifyAction = async (id: string, action: "approve" | "reject") => {
    setProcessingId(id);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });

      if (res.ok) {
        // Drop the item out of the active user queue listing view seamlessly
        setQueue((prev) => prev.filter((user) => user.id !== id));
      }
    } catch (err) {
      console.error("Verification decision update failed:", err);
    } finally {
      setProcessingId(null);
    }
  };

  // 2. MUTATION: PURGE ENTRY COMPLETELY FROM THE SYSTEM
  const handlePurgeAction = async (id: string) => {
    const doubleCheck = confirm("Security Warning: Completely purge this entry from the system? This action cannot be undone.");
    if (!doubleCheck) return;

    setProcessingId(id);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setQueue((prev) => prev.filter((user) => user.id !== id));
      }
    } catch (err) {
      console.error("Purging operations pipeline execution fault:", err);
    } finally {
      setProcessingId(null);
    }
  };

  // 3. INTERACTIVE SEARCH FILTER PIPELINE
  const filteredQueue = queue.filter((user) => {
    const normalizationQuery = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(normalizationQuery) ||
      user.id.toLowerCase().includes(normalizationQuery) ||
      user.city.toLowerCase().includes(normalizationQuery) ||
      user.type.toLowerCase().includes(normalizationQuery)
    );
  });

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 pb-20 pt-10">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* --- 1. HEADER SECTION --- */}
        <div className="border-b border-border pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
              Security Protocol
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none flex items-center gap-3">
              Verification <span className="text-emerald-500">Queue</span>
            </h1>
            <p className="text-sm text-muted font-medium">Audit new registrations to ensure platform safety and data accuracy.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto justify-end">
            {/* Real-time Dynamic Filter Field Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={15} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by keyword..." 
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 text-foreground outline-none transition-all"
              />
            </div>
            <div className="bg-card border border-border px-6 py-3.5 rounded-2xl flex items-center gap-4 shadow-sm shrink-0">
               <span className="text-2xl font-black text-foreground">{filteredQueue.length}</span>
               <span className="text-[9px] font-black text-muted uppercase tracking-widest leading-tight">Pending<br/>Matches</span>
            </div>
          </div>
        </div>

        {/* --- 2. PENDING REQUESTS TABLE CONTAINER --- */}
        <div className="border border-border rounded-[2.5rem] overflow-hidden bg-card shadow-sm transition-all">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/5 border-b border-border">
                  <th className="p-5 text-[10px] font-black uppercase text-muted tracking-[0.2em]">User / ID</th>
                  <th className="p-5 text-[10px] font-black uppercase text-muted tracking-[0.2em]">Account Type</th>
                  <th className="p-5 text-[10px] font-black uppercase text-muted tracking-[0.2em]">Jurisdiction</th>
                  <th className="p-5 text-[10px] font-black uppercase text-muted tracking-[0.2em]">Submission</th>
                  <th className="p-5 text-[10px] font-black uppercase text-muted tracking-[0.2em] text-right">Review Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <AnimatePresence mode="popLayout">
                  {filteredQueue.map((user) => (
                    <motion.tr 
                      layout
                      key={user.id} 
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -30, transition: { duration: 0.25 } }}
                      className="hover:bg-muted/5 transition-colors group"
                    >
                      <td className="p-5">
                        <p className="text-sm font-black text-foreground uppercase tracking-tight group-hover:text-emerald-500 transition-colors">{user.name}</p>
                        <p className="text-[10px] font-black text-muted/50 uppercase tracking-widest">{user.id}</p>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                          user.type === 'Donor' || user.type === 'donor'
                          ? 'bg-primary/10 border-primary/20 text-primary' 
                          : 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                        }`}>
                          {user.type}
                        </span>
                      </td>
                      <td className="p-5">
                         <p className="text-sm text-muted font-bold flex items-center gap-2 uppercase italic">
                           <ShieldCheck size={14} className="text-emerald-500" /> {user.city}
                         </p>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-xs text-muted font-medium">
                          <Clock size={14} className="text-primary" /> {user.date}
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center justify-end gap-2">
                          {processingId === user.id ? (
                            <div className="p-3">
                              <Loader2 className="animate-spin text-emerald-500" size={18} />
                            </div>
                          ) : (
                            <>
                              <Link 
                                href={`/profile/${user.id}`}
                                className="p-3 bg-background border border-border rounded-xl text-muted hover:text-foreground transition-all" 
                                title="View Complete Registry Log"
                              >
                                <Eye size={18} />
                              </Link>
                              <button 
                                onClick={() => handleVerifyAction(user.id, "approve")}
                                className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/10"
                                title="Approve Registration"
                              >
                                <UserCheck size={18} />
                              </button>
                              <button 
                                onClick={() => handleVerifyAction(user.id, "reject")}
                                className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl hover:bg-amber-500 hover:text-white transition-all"
                                title="Flag Account"
                              >
                                <XCircle size={18} />
                              </button>
                              <button 
                                onClick={() => handlePurgeAction(user.id)}
                                className="p-3 bg-primary/10 border border-primary/20 text-primary rounded-xl hover:bg-primary hover:text-white transition-all"
                                title="Purge Record"
                              >
                                <XCircle size={18} className="rotate-45" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {filteredQueue.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <p className="text-xl font-black text-foreground uppercase tracking-tighter">Queue Fully Audited</p>
              <p className="text-sm text-muted font-medium max-w-xs mx-auto">All registrations matching this sequence query are verified or updated. Great work.</p>
            </div>
          )}
        </div>

        {/* --- 3. AUDIT NOTES & SECURITY GUIDELINES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-8 bg-foreground text-background dark:bg-card dark:text-foreground rounded-[2.5rem] relative overflow-hidden border border-border transition-colors">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-emerald-500" />
                <h3 className="text-lg font-black uppercase tracking-tighter">Audit Guidelines</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Data Integrity</p>
                  <p className="text-xs font-medium leading-relaxed opacity-70">Cross-verify Donor contact info and ensure blood group matches medical records.</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Service Bounds</p>
                  <p className="text-xs font-medium leading-relaxed opacity-70">Confirm location matches supported service areas (e.g., Peshawar, Swat, Malakand).</p>
                </div>
              </div>
            </div>
            <ShieldAlert size={150} className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none" />
          </div>

          <div className="p-8 border-2 border-dashed border-border rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4 group hover:border-primary transition-all">
            <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
              <AlertCircle size={32} />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-black text-foreground uppercase tracking-widest">Manual Flag?</p>
              <p className="text-[11px] text-muted font-bold leading-relaxed max-w-[200px]">
                If a user is flagged by the system, you must conduct a phone interview before approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}