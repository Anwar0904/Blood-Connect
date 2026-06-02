"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
 
  MessageSquare,
  Globe
} from "lucide-react";

import {FaLinkedinIn as Linkedin,FaFacebookF as Facebook,FaTwitter as Twitter,FaInstagram as Instagram} from "react-icons/fa";


const contactDetails = [
  { icon: <Phone size={20} />, label: "Emergency Hotline", val: "0300-1234567", href: "tel:+923001234567" },
  { icon: <Mail size={20} />, label: "Official Support", val: "help@bloodchain.pk", href: "mailto:help@bloodchain.pk" },
  { icon: <MapPin size={20} />, label: "Headquarters", val: "Malakand, KP, Pakistan", href: "#" },
];

const socials = [
  { name: "Facebook", icon: <Facebook />, color: "hover:text-[#1877F2]", href: "https://facebook.com" },
  { name: "Instagram", icon: <Instagram />, color: "hover:text-[#E4405F]", href: "https://instagram.com" },
  { name: "Twitter", icon: <Twitter />, color: "hover:text-[#1DA1F2]", href: "https://twitter.com" },
  { name: "LinkedIn", icon: <Linkedin />, color: "hover:text-[#0A66C2]", href: "https://linkedin.com" },
];

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pb-20 transition-colors duration-500 overflow-hidden">
      
      {/* --- SECTION 1: HERO & CONNECT HUB --- */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Reusing Plasma Backgrounds for Brand Consistency */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-plasma" />
        
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Content */}
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
              >
                Reach Out
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-black text-foreground tracking-tighter uppercase leading-[0.9]"
              >
                HAVE A <span className="text-primary">QUESTION?</span>
              </motion.h1>
              
              <p className="text-muted text-lg max-w-md leading-relaxed font-medium">
                Our team is here to help you 24/7. Whether you are a donor, a recipient, or a medical partner.
              </p>

              {/* Contact Detail Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                {contactDetails.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.href}
                    className="p-6 rounded-[2rem] bg-card border border-border hover:border-primary/50 transition-all group"
                  >
                    <div className="text-primary mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-foreground">{item.val}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Direct Message Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border p-8 md:p-12 rounded-[3rem] shadow-2xl relative z-10"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" placeholder="Ihsanullah Khan" className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Email</label>
                    <input type="email" placeholder="ihsan@example.com" className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Subject</label>
                  <select className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none transition-all appearance-none">
                    <option>General Inquiry</option>
                    <option>Become a Partner</option>
                    <option>Technical Issue</option>
                    <option>Emergency Blood Need</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Message</label>
                  <textarea rows={4} placeholder="How can we help you?" className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none transition-all resize-none" />
                </div>
                <button className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                  Send Message <Send size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: SOCIAL ECOSYSTEM --- */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter mb-12">
            JOIN OUR <span className="text-primary font-black">COMMUNITY</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {socials.map((social) => (
              <a 
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={`flex flex-col items-center gap-4 p-8 rounded-[2.5rem] bg-card border border-border min-w-[160px] transition-all hover:-translate-y-2 ${social.color}`}
              >
                <span className="p-4 rounded-2xl bg-background border border-border group-hover:border-primary transition-colors">
                  {social.icon}
                </span>
                <span className="text-[11px] font-black uppercase tracking-widest">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: FAQ / QUICK SUPPORT --- */}
      <section className="container mx-auto px-6 pb-24">
        <div className="bg-foreground dark:bg-zinc-900 rounded-[3.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start text-primary">
              <MessageSquare size={24} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Instant Help</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-background dark:text-white uppercase tracking-tighter leading-none">
              CHECK OUR <br /> DOCUMENTATION
            </h3>
            <p className="text-background/60 dark:text-zinc-400 font-medium max-w-sm">
              Most questions about donation eligibility and process are answered in our help center.
            </p>
          </div>
          <button className="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all">
             View FAQ Hub
          </button>
        </div>
      </section>

    </div>
  );
}