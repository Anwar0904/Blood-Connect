"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Users, Heart, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Active Requests", value: "24", icon: <Activity size={18} />, color: "text-primary" },
  { label: "Donors Nearby", value: "1,204", icon: <Users size={18} />, color: "text-blue-500" },
  { label: "Lives Saved", value: "8,432", icon: <Heart size={18} />, color: "text-emerald-500" },
];

const RequestPulse = () => {
  return (
    <div className="w-full bg-card/50 border-b border-border backdrop-blur-md sticky top-20 z-50">
      <div className="container mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-6">
        
        {/* Live Indicator */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
            Live Pulse <span className="hidden md:inline text-muted">— Khar, PK</span>
          </span>
        </div>

        {/* Stats Loop */}
        <div className="flex items-center gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`${stat.color} opacity-80`}>{stat.icon}</div>
              <div>
                <p className="text-xs font-black leading-none">{stat.value}</p>
                <p className="text-[9px] uppercase tracking-tighter text-muted font-bold">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <CheckCircle2 size={14} className="text-emerald-500" />
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Admin Verified Platform</span>
        </div>
      </div>
    </div>
  );
};

export default RequestPulse;