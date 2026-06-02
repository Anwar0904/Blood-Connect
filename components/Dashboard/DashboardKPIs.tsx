"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, Clock, TrendingUp, Zap, ChevronRight } from "lucide-react";

interface KPIProps {
  activeRequests: number;
  pendingAudits: number;
  totalMatches: number;
}

const DashboardKPIs = ({ activeRequests, pendingAudits, totalMatches }: KPIProps) => {
  const kpiData = [
    {
      id: 1,
      label: "Active Requests",
      value: activeRequests.toString(),
      change: "Live Feed",
      trend: "up",
      icon: <Activity size={24} />,
      color: "from-red-600 to-rose-800",
      desc: "Critical blood needs across PK"
    },
    {
      id: 2,
      label: "Pending Audit",
      value: pendingAudits.toString(),
      change: pendingAudits > 0 ? "Action Required" : "Cleared",
      trend: "neutral",
      icon: <Clock size={24} />,
      color: "from-amber-500 to-orange-600",
      desc: "Profiles awaiting verification"
    },
    {
      id: 3,
      label: "Matches Tracked",
      value: totalMatches.toString(),
      change: "All Time",
      trend: "up",
      icon: <CheckCircle2 size={24} />,
      color: "from-emerald-500 to-teal-700",
      desc: "Successful life-saving actions completed"
    }
  ];

  return (
    <section className="px-2 bg-background">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[2px] w-8 bg-primary rounded-full" />
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">
              Platform Intelligence
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-none">
            COMMAND <span className="text-blood-gradient">CENTER</span>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mt-6 md:mt-0 flex items-center gap-4">
          <div className="flex flex-col items-end mr-2">
             <span className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Network Status</span>
             <span className="text-xs font-black text-emerald-500 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                All Nodes Active
             </span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center text-primary shadow-sm">
            <Zap size={22} fill="currentColor" className="text-primary" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {kpiData.map((kpi, i) => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-10 rounded-[3rem] bg-card/50 backdrop-blur-xl border border-border overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-2xl shadow-black/5"
          >
            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${kpi.color} opacity-5 blur-2xl group-hover:opacity-15 transition-opacity`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${kpi.color} text-white flex items-center justify-center shadow-xl shadow-primary/20`}>
                  {kpi.icon}
                </div>
                <div className="text-right">
                    <div className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-tighter ${kpi.trend === 'up' ? 'text-emerald-500' : 'text-primary'}`}>
                        {kpi.trend === 'up' && <TrendingUp size={14} />}
                        {kpi.change}
                    </div>
                    <p className="text-[9px] font-bold text-muted uppercase mt-1">Growth Index</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-6xl font-black tracking-tighter text-foreground group-hover:scale-105 origin-left transition-transform duration-500">
                  {kpi.value}
                </h3>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
                  {kpi.label}
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-border/50 flex items-center justify-between">
                <p className="text-[10px] font-bold text-muted uppercase leading-none tracking-tight">
                  {kpi.desc}
                </p>
                <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted group-hover:text-primary group-hover:border-primary transition-all">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DashboardKPIs;