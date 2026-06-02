"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Mail, Fingerprint, Filter, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface DonorRow {
  id: string;
  name: string;
  group: string;
  location: string;
  status: string;
  lastDonation: string;
  cnic: string;
}

interface RegistryProps {
  initialDonors: DonorRow[];
}

const DonorRegistrySection = ({ initialDonors }: RegistryProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Handles dynamic frontend client-side string query evaluation matching rows
  const filteredDonors = initialDonors.filter((donor) => {
    const normalizeQuery = searchQuery.toLowerCase();
    return (
      donor.name.toLowerCase().includes(normalizeQuery) ||
      donor.location.toLowerCase().includes(normalizeQuery) ||
      donor.cnic.includes(normalizeQuery)
    );
  });

  return (
    <section className="mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[2px] w-8 bg-primary rounded-full" />
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">
              Global Database
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-none">
            DONOR <span className="text-blood-gradient">REGISTRY</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mt-6 md:mt-0 flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search CNIC, Name, or City..." 
              className="pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-xs focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary w-full md:w-80 transition-all font-bold text-foreground"
            />
          </div>
          <button className="p-4 bg-card border border-border rounded-2xl text-muted hover:text-primary transition-all shadow-sm">
            <Filter size={18} />
          </button>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-card/50 backdrop-blur-xl border border-border rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted border-b border-border">Donor Details</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-muted text-center border-b border-border">Blood Group</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-muted border-b border-border">Verification</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-muted text-center border-b border-border">Current Status</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted text-right border-b border-border">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredDonors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-12 text-center text-xs text-muted font-bold uppercase tracking-widest">
                    No Matching Records Found
                  </td>
                </tr>
              ) : (
                filteredDonors.map((donor) => (
                  <tr key={donor.id} className="group hover:bg-primary/[0.02] transition-all">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center text-primary font-black text-sm">
                          {donor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black tracking-tight text-foreground group-hover:text-primary transition-colors">{donor.name}</p>
                          <p className="text-[10px] text-muted font-bold uppercase tracking-tighter">{donor.location}, Pakistan</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="inline-flex flex-col items-center justify-center w-12 h-12 bg-background border-2 border-border rounded-xl group-hover:border-primary/30 transition-all">
                        <span className="text-xs font-black text-primary">{donor.group}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-foreground/80">
                          <Fingerprint size={14} className="text-primary/40" />
                          <span className="text-[11px] font-mono font-bold tracking-tight">{donor.cnic}</span>
                        </div>
                        <span className="text-[9px] text-muted font-bold uppercase tracking-widest ml-5">Last Logged: {donor.lastDonation}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        donor.status === 'verified' || donor.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-600' : 
                        donor.status === 'pending' || donor.status === 'Pending' ? 'bg-amber-500/10 text-amber-600' : 
                        'bg-primary/10 text-primary'
                      }`}>
                        <span className={`w-2 h-2 rounded-full animate-pulse ${
                           donor.status === 'verified' || donor.status === 'Verified' ? 'bg-emerald-500' : 
                           donor.status === 'pending' || donor.status === 'Pending' ? 'bg-amber-500' : 'bg-primary'
                        }`} />
                        {donor.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="w-10 h-10 flex items-center justify-center bg-background border border-border rounded-xl text-muted hover:text-primary hover:border-primary/50 transition-all">
                          <Mail size={16} />
                        </button>
                        <Link 
                          href={`/profile/${donor.id}`}
                          className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-110 transition-all"
                        >
                          <ArrowUpRight size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-muted/20 border-t border-border flex items-center justify-between">
          <p className="text-[10px] font-bold text-muted uppercase tracking-[0.1em]">
            Viewing <span className="text-foreground">{filteredDonors.length}</span> Registered Users Array Matrix
          </p>
          <button className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            Launch Full Registry <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default DonorRegistrySection;