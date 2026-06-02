"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import {FaLinkedin, FaTwitter} from "react-icons/fa6";

const board = [
  { 
    name: "Dr Luqman Hakim", 
    role: "Founder", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Engr Rehan Khan", 
    role: "Co Founder", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Afaq Karim", 
    role: "Member", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Engr Kamran Khan", 
    role: "Member", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Ibadullah Jan", 
    role: "Member", 
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Muhamad Waqas Bloodwala", 
    role: "Member", 
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Saeed Anwar", 
    role: "Member", 
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Usman Ali", 
    role: "Member", 
    image: "https://images.unsplash.com/photo-1537517300961-4206e987bd18?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Sajjad Saeed", 
    role: "Member", 
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=500&auto=format&fit=crop" 
  },
];

const cabinet = [
  { 
    name: "Sana Ur Rehman", 
    role: "Country Governor", 
    image: "https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Qandeel Saleem", 
    role: "Secretary General", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Arsal Imran", 
    role: "Director Media", 
    image: "https://images.unsplash.com/photo-1504199367641-aba8151af406?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Saif Ullah", 
    role: "Asst Director Media", 
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Arshia Amraiz", 
    role: "Director Communications", 
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Ayesha Javaid", 
    role: "Director Donor Database", 
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Harnain Ayub", 
    role: "Asst Director Donor DB", 
    image: "https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Masood Khan", 
    role: "Director Training", 
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=400&h=500&auto=format&fit=crop" 
  },
  { 
    name: "Jehan Badshah", 
    role: "Director Thalassemia", 
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&h=500&auto=format&fit=crop" 
  },
];

const MemberCard = ({ name, role, image }: { name: string; role: string; image: string }) => (
  <div className="shrink-0 w-[280px] group">
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-card border border-border transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/10">
      {/* Image Placeholder - Replace with <img src="..." /> */}
      <img src={image} alt={name} />
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10 opacity-60" />
      <div className="w-full h-full bg-muted flex items-center justify-center text-muted/20 font-black text-6xl select-none">
        {name.split(' ').map(n => n[0]).join('')}
      </div>

      {/* Social Overlay */}
      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20">
        {[FaLinkedin, FaTwitter, Mail].map((Icon, i) => (
          <button key={i} className="p-3 rounded-full bg-primary text-white hover:scale-110 transition-transform shadow-xl">
            <Icon size={18} />
          </button>
        ))}
      </div>
    </div>
    <div className="mt-4 text-center px-2">
      <h4 className="text-lg font-bold text-foreground tracking-tight">{name}</h4>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mt-1">{role}</p>
    </div>
  </div>
);

const TeamSection = () => {
  return (
    <section className="py-24 bg-background transition-colors duration-500 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-20 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Leadership</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9] mb-6">
            THE PEOPLE BEHIND <br />
            <span className="text-blood-gradient">OUR MISSION</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Meet the dedicated individuals driving our mission forward across the nation.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="flex flex-col gap-16 pause-on-hover relative">
        
        {/* Row 1: Board of Governance (Scrolls Left) */}
        <div className="relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30">
            <span className="px-4 py-1 rounded-full border border-border bg-card text-[9px] font-black uppercase tracking-widest text-muted">Board of Governance</span>
          </div>
          <div className="flex gap-6 animate-marquee w-max">
            {[...board, ...board].map((member, i) => (
              <MemberCard key={i} {...member} />
            ))}
          </div>
        </div>

        {/* Row 2: Core Cabinet (Scrolls Right) */}
        <div className="relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30">
            <span className="px-4 py-1 rounded-full border border-border bg-card text-[9px] font-black uppercase tracking-widest text-muted">Core Cabinet</span>
          </div>
          <div className="flex gap-6 animate-marquee-reverse w-max">
            {[...cabinet, ...cabinet].map((member, i) => (
              <MemberCard key={i} {...member} />
            ))}
          </div>
        </div>

        {/* Side Fades (The "Pro" Edge) */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-background to-transparent z-40 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-background to-transparent z-40 pointer-events-none" />
      </div>
    </section>
  );
};

export default TeamSection;