"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Phone, ChevronRight, BarChart3, MoreVertical, Zap } from "lucide-react";

interface UrgencyRequest {
  id: string;
  group: string;
  patient: string;
  hospital: string;
  time: string;
  level: string;
}

interface RegionalLoad {
  city: string;
  count: number;
}

interface SectionProps {
  urgencyRequests: UrgencyRequest[];
  regionalLoad: RegionalLoad[];
}

const RegionalUrgencySection = ({ urgencyRequests, regionalLoad }: SectionProps) => {
  // Determine dynamic bar scaling logic by setting a maximum value boundary
  const highestLoadCount = Math.max(...regionalLoad.map(item => item.count), 1);

  const getCityProgressColor = (city: string) => {
    if (city === "Lahore") return "bg-blue-600";
    if (city === "Peshawar") return "bg-primary";
    if (city === "Islamabad") return "bg-emerald-500";
    return "bg-amber-500";
  };

  return (
    <section className="px-2">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[2px] w-8 bg-primary rounded-full" />
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">
              Live Operations
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-none">
            URGENCY <span className="text-blood-gradient">& LOAD</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted">System Status</p>
            <p className="text-sm font-black text-emerald-500 uppercase">Optimal Response</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
            <Zap size={20} fill="currentColor" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- LIVE URGENCY FEED --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-7 bg-card/50 backdrop-blur-xl border border-border rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5">
          <div className="p-8 border-b border-border flex items-center justify-between bg-muted/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                <AlertTriangle size={22} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.15em]">Urgent Requests</h3>
                <p className="text-[10px] text-muted font-bold uppercase tracking-tighter">Verified Real-time Needs</p>
              </div>
            </div>
            <button className="px-5 py-2 rounded-xl bg-background border border-border text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
              Manage All
            </button>
          </div>

          <div className="p-6 space-y-4">
            {urgencyRequests.length === 0 ? (
              <p className="text-muted text-xs text-center py-12 font-bold uppercase tracking-widest">No Active Pending Requests</p>
            ) : (
              urgencyRequests.map((req) => (
                <div key={req.id} className="group flex items-center justify-between p-6 rounded-[2rem] bg-background border border-border/50 hover:border-primary/40 transition-all cursor-pointer relative overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${req.level === 'Critical' ? 'bg-primary' : 'bg-amber-500'}`} />
                  
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-muted/40 rounded-2xl group-hover:bg-primary/10 transition-colors">
                      <span className="text-xl font-black text-primary leading-none">{req.group}</span>
                      <span className="text-[8px] font-black uppercase opacity-60">Type</span>
                    </div>
                    <div>
                      <h4 className="text-base font-black tracking-tight group-hover:text-primary transition-colors">{req.patient}</h4>
                      <p className="text-[10px] text-muted flex items-center gap-1.5 font-bold uppercase mt-1">
                        <MapPin size={12} className="text-primary/60" /> {req.hospital}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right hidden sm:block">
                      <span className={`text-[9px] font-black uppercase px-4 py-1 rounded-full border ${
                        req.level === 'Critical' ? 'border-primary text-primary bg-primary/5' : 'border-border text-muted-foreground'
                      }`}>
                        {req.level}
                      </span>
                      <p className="text-[10px] text-muted font-bold mt-2 uppercase tracking-tighter">{req.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-11 h-11 flex items-center justify-center bg-muted/30 border border-border rounded-xl text-muted hover:text-primary hover:bg-background transition-all">
                        <Phone size={18} />
                      </button>
                      <button className="w-11 h-11 flex items-center justify-center bg-foreground text-background rounded-xl shadow-xl hover:bg-primary hover:text-white transition-all">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* --- REGIONAL LOAD GRAPH CONTEXT --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-5 bg-card/50 backdrop-blur-xl border border-border rounded-[3rem] p-10 flex flex-col shadow-2xl shadow-black/5">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                <BarChart3 size={22} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.15em]">Regional Load</h3>
                <p className="text-[10px] text-muted font-bold uppercase tracking-tighter">Demand Analytics</p>
              </div>
            </div>
            <button className="text-muted hover:text-primary transition-colors"><MoreVertical size={20} /></button>
          </div>

          <div className="flex-grow space-y-8">
              {regionalLoad.map((stat, i) => (
                  <div key={i} className="group">
                      <div className="flex justify-between items-end mb-3">
                          <span className="text-[11px] font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">{stat.city}</span>
                          <span className="text-sm font-black text-foreground">{stat.count} <span className="text-[10px] font-bold text-muted uppercase ml-1">Requests</span></span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full p-[2px] overflow-hidden border border-border">
                          <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(stat.count / highestLoadCount) * 100}%` }}
                              transition={{ duration: 1.2, ease: "circOut", delay: i * 0.1 }}
                              className={`h-full rounded-full ${getCityProgressColor(stat.city)} shadow-sm`}
                          />
                      </div>
                  </div>
              ))}
          </div>

          <div className="mt-12 p-6 bg-primary/5 rounded-[2rem] border border-primary/10 border-dashed relative">
              <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-white text-[8px] font-black uppercase tracking-widest rounded-md">
                AI Suggestion
              </div>
              <p className="text-[11px] font-bold text-muted uppercase leading-relaxed text-center">
                  Directing surplus donors to <span className="text-primary font-black underline underline-offset-4">Lahore hub</span> is advised to stabilize regional demand.
              </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegionalUrgencySection;