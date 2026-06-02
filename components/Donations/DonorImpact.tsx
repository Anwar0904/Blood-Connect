"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Heart, Share2, TrendingUp } from "lucide-react";

const badges = [
  { level: "Bronze", title: "Life Saver", requirement: "1 Donation", icon: <Heart size={32} />, color: "text-orange-500" },
  { level: "Silver", title: "Guardian", requirement: "5 Donations", icon: <Award size={32} />, color: "text-slate-400" },
  { level: "Gold", title: "Legend", requirement: "10+ Donations", icon: <TrendingUp size={32} />, color: "text-yellow-500" },
];

const DonorImpact = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Progression System */}
          <div className="space-y-12">
            <div>
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Rewards System</span>
              <h2 className="text-5xl font-black tracking-tighter leading-none mb-6">
                EVERY DROP <br /> <span className="text-blood-gradient uppercase">LEVELS YOU UP</span>
              </h2>
              <p className="text-muted leading-relaxed max-w-md">
                Donating blood is its own reward, but we believe in honoring our most consistent heroes. 
                Earn badges and unlock exclusive community perks.
              </p>
            </div>

            <div className="space-y-4">
              {badges.map((badge, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 p-6 bg-card border border-border rounded-[2rem] hover:border-primary/30 transition-all group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-background flex items-center justify-center ${badge.color} group-hover:scale-110 transition-transform`}>
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-tight text-lg">{badge.title}</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">{badge.requirement}</p>
                  </div>
                  <div className="ml-auto opacity-20 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full border-2 border-border" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: The Impact Card */}
          <motion.div 
            whileHover={{ rotate: -2 }}
            className="relative bg-blood-gradient p-1 rounded-[4rem] shadow-2xl shadow-primary/20"
          >
            <div className="bg-card rounded-[3.8rem] p-12 text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 animate-pulse">
                <Heart fill="currentColor" size={48} />
              </div>
              <h3 className="text-4xl font-black tracking-tighter mb-4">YOUR IMPACT</h3>
              <p className="text-5xl font-black text-primary mb-2">1 = 3</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted mb-8">
                One Donation Saves Three Lives
              </p>
              
              <div className="w-full p-6 bg-background rounded-3xl border border-border mb-8">
                <p className="text-sm font-medium text-muted leading-relaxed">
                  "I never realized how much power I had until I received a message saying my blood was used to save a child's life."
                </p>
                <p className="mt-4 text-[10px] font-black uppercase text-primary">— Anonymous Donor</p>
              </div>

              <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">
                <Share2 size={16} /> Share the mission
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Background Finish */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
};


export default DonorImpact;