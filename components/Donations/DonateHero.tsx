"use client";

import React from "react";
import { motion } from "framer-motion";
import { Droplet, ArrowRight, ShieldCheck, Heart } from "lucide-react";

const DonateHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background pt-20">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT CONTENT: TYPOGRAPHY & CTA --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-primary"></span>
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">
                The Gift of Life
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.85] mb-8">
              NOT ALL HEROES <br />
              <span className="text-blood-gradient">WEAR CAPES.</span> <br />
              SOME DONATE.
            </h1>

            <p className="text-muted text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
              Your single donation can save up to three lives. Join Pakistan's 
              most elite network of blood donors and start your journey as a lifesaver today.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <button className="px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                Register as Donor <ArrowRight size={18} />
              </button>
              <button className="px-10 py-5 bg-card border border-border text-foreground rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-border transition-all flex items-center justify-center gap-3">
                Check Eligibility
              </button>
            </div>

            {/* Trusted By / Trust Badges */}
            <div className="mt-12 flex items-center gap-8 opacity-50">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest">100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Free for all</span>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT CONTENT: VISUAL ELEMENTS --- */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 aspect-square rounded-[4rem] overflow-hidden border border-border shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop" 
                alt="Blood Donation" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </motion.div>

            {/* --- FLOATING PRO CARD --- */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 md:-left-20 z-20 bg-card/80 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl max-w-[280px]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Droplet fill="currentColor" size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-tighter text-primary">Live Activity</p>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Lahore, PK</p>
                </div>
              </div>
              <p className="text-sm font-bold text-foreground leading-tight">
                "Just registered as an <span className="text-primary font-black">O+ Donor</span>. Ready to save lives!"
              </p>
              <p className="text-[9px] text-muted mt-3 font-bold uppercase tracking-widest">— 2 mins ago</p>
            </motion.div>

            {/* Decorative Background Shape */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary/10 rounded-full rotate-12" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default DonateHero;