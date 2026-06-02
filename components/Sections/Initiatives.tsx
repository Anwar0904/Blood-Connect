"use client";

import React from "react";
import { motion } from "framer-motion";
// Swapped Wall for Blocks and added other relevant icons
import { 
  ArrowUpRight, 
  GraduationCap, 
  HeartPulse, 
  MapPin, 
  Users, 
  Blocks, 
  Moon,
  ShieldCheck 
} from "lucide-react";

const initiatives = [
  {
    category: "Flagship",
    title: "Annual Blood Conferences",
    desc: "National-level conferences bringing together blood activists, medical professionals, and policymakers.",
    icon: <Users size={20} />,
    image: "https://americasblood.org/wp-content/uploads/bb-plugin/cache/51942187104_be15657ba9_c-1-landscape-b3fddd91a76dfc6bbc5337e46850da74-n7szou6ite8y.jpg",
  },
  {
    category: "Awareness",
    title: "Wall of Thalassemia",
    desc: "Awareness drives highlighting the importance of premarital screening and carrier detection.",
    icon: <Blocks size={20} />,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIrj9x5afna5CthhPr_PUwFoqrQrx4UKBTFQ&s",
  },
  {
    category: "Outreach",
    title: "Provincial & District Conferences",
    desc: "Localized events to strengthen blood activism networks across all provinces and districts.",
    icon: <MapPin size={20} />,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktWnIEtsg_dFWKvIBaHvGoApWTLwr2Ju2xA&s",
  },
  {
    category: "Seasonal",
    title: "Rehmat-e-Ramzan Campaign",
    desc: "Special Ramadan blood donation drives promoting the spirit of giving during the holy month.",
    icon: <Moon size={20} />,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "Education",
    title: "Blood Training Sessions (BTS)",
    desc: "Educational workshops to train new blood activists with professional knowledge and ethics.",
    icon: <GraduationCap size={20} />,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvQfsSvxPO6ZeKMZp4b6n-7sBEjco-M2IHcDW8EeAEBA&s",
  },
  {
    category: "Advocacy",
    title: "Safe Blood Awareness",
    desc: "Educating communities on safe blood practices and dispelling common myths about donation.",
    icon: <ShieldCheck size={20} />,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD59urnx1jjGOqlZLuoaowE1BhbMKykvDfYsS26yAE8w&s",
  },
];

const InitiativeCard = ({ item, index }: { item: typeof initiatives[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative h-[450px] rounded-[2.5rem] overflow-hidden bg-card border border-border"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="p-2 rounded-xl bg-primary/20 text-primary backdrop-blur-md">
            {item.icon}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">
            {item.category}
          </span>
        </div>

        <h3 className="text-2xl font-black text-foreground tracking-tighter leading-tight mb-3">
          {item.title}
        </h3>
        
        <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
          {item.desc}
        </p>

        {/* Action Button */}
        <button className="flex items-center gap-2 text-sm font-bold text-foreground group/btn">
          <span className="relative overflow-hidden">
            LEARN MORE
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-300" />
          </span>
          <div className="p-2 rounded-full border border-border group-hover/btn:bg-primary group-hover/btn:text-white group-hover/btn:border-primary transition-all duration-300">
            <ArrowUpRight size={14} />
          </div>
        </button>
      </div>

      {/* Hover Border Glow */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 rounded-[2.5rem] transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
};

const Initiatives = () => {
  return (
    <section className="py-24 bg-background transition-colors duration-500 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Work</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-none mb-6">
              CAMPAIGNS & <br />
              <span className="text-blood-gradient uppercase">Initiatives</span>
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Our impact goes beyond blood bags—we drive systematic change through education and advocacy.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((item, index) => (
            <InitiativeCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Initiatives;