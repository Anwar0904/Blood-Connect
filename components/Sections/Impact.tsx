"use client";

import React from "react";
import { motion } from "framer-motion";
import { Droplet, ShieldCheck, Zap, GraduationCap } from "lucide-react";

const Provinces = [
  "Khyber Pakhtunkhwa", "Punjab", "Islamabad", "Sindh", 
  "Baluchistan", "Gilgit Baltistan", "Azad Kashmir"
];

const FocusAreas = [
  {
    title: "Blood Activism",
    desc: "Actively mobilizing volunteers, educating communities, and building donor networks to ensure safe and accessible blood.",
    icon: <Droplet className="text-primary" size={24} />,
    gradient: "from-red-500/10 to-transparent"
  },
  {
    title: "Thalassemia Prevention",
    desc: "Working to eliminate Thalassemia through premarital screening, community awareness, and patient support.",
    icon: <ShieldCheck className="text-primary" size={24} />,
    gradient: "from-blue-500/10 to-transparent"
  },
  {
    title: "Safe Blood Awareness",
    desc: "Educating communities on safe blood practices, dispelling myths, and promoting a healthy donor culture.",
    icon: <Zap className="text-primary" size={24} />,
    gradient: "from-amber-500/10 to-transparent"
  },
  {
    title: "Youth Leadership",
    desc: "Channeling youth energy into meaningful volunteering to drive real change across the nation.",
    icon: <GraduationCap className="text-primary" size={24} />,
    gradient: "from-green-500/10 to-transparent"
  }
];

const ImpactSection = () => {
  return (
    <section className="py-24 bg-background transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        {/* --- PART 1: Province Presence --- */}
        <div className="mb-32 border-red-700 border rounded-4xl p-12">
          <div className="flex flex-col items-center mb-10 text-center">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4">Coverage</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase">
              Province-Wise Presence
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {Provinces.map((province, idx) => (
              <motion.div
                key={province}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="px-6 py-3 rounded-2xl bg-card border border-border text-foreground font-bold text-sm md:text-base hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default shadow-sm"
              >
                {province}
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- PART 2: Core Focus Areas --- */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Sticky Heading Column */}
          <div className="lg:col-span-1 lg:sticky lg:top-32">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Focus</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9] mb-6">
              CORE AREAS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/40">
                OF IMPACT
              </span>
            </h2>
            <p className="text-muted text-lg leading-relaxed max-w-sm">
              We focus on more than just donation; we build a sustainable ecosystem for life-saving blood services across Pakistan.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {FocusAreas.map((area, idx) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative p-8 rounded-3xl bg-card border border-border overflow-hidden"
              >
                {/* Subtle Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-linear-to-br ${area.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="mb-6 inline-flex p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-red-300 group-hover:text-white transition-all duration-300">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 tracking-tight">
                    {area.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed group-hover:text-foreground/80 transition-colors">
                    {area.desc}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ImpactSection;