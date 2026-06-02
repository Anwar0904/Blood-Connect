"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Navigation, Clock, Phone, Filter } from "lucide-react";

const locations = [
  {
    id: 1,
    name: "Central Blood Bank - LRH",
    city: "Peshawar",
    address: "GT Road, Near City Hospital",
    timing: "08:00 AM - 08:00 PM",
    status: "Open Now",
    type: "Permanent Center"
  },
  {
    id: 2,
    name: "Emergency Mobile Camp",
    city: "Lahore",
    address: "Liberty Market, Gulberg III",
    timing: "10:00 AM - 06:00 PM",
    status: "Limited Time",
    type: "Mobile Camp"
  },
  // Add more as needed...
];

const DonationLogistics = () => {
  return (
    <section className="py-24 bg-card transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Logistics</span>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9] mb-6">
            FIND A <span className="text-blood-gradient">DONATION CENTER</span>
          </h2>
          <p className="text-muted text-lg">Locate the nearest permanent center or a mobile camp near you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-background border border-border rounded-[3.5rem] p-4 md:p-8 shadow-2xl">
          
          {/* List Sidebar */}
          <div className="lg:col-span-5 flex flex-col h-[600px]">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Search city or area..." 
                className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl focus:border-primary outline-none transition-all font-bold"
              />
            </div>

            <div className="flex-grow overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {locations.map((loc) => (
                <motion.div 
                  key={loc.id}
                  whileHover={{ x: 10 }}
                  className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 cursor-pointer transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 rounded-full">
                      {loc.type}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-500 uppercase">{loc.status}</span>
                  </div>
                  <h4 className="text-lg font-black tracking-tight mb-2">{loc.name}</h4>
                  <p className="text-xs text-muted mb-4 flex items-center gap-2">
                    <MapPin size={12} className="text-primary" /> {loc.address}, {loc.city}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase">
                      <Clock size={14} /> {loc.timing}
                    </div>
                    <button className="p-2 bg-primary text-white rounded-xl hover:scale-110 transition-transform">
                      <Navigation size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map Placeholder/Visual */}
          <div className="lg:col-span-7 h-[600px] rounded-[2.5rem] bg-muted relative overflow-hidden group">
             {/* Replace this div with a real Google Map or Leaflet component later */}
             <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/72.35,32.20,5,0/1000x600?access_token=YOUR_TOKEN')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000" />
             
             {/* Map Overlay UI */}
             <div className="absolute bottom-8 left-8 right-8 p-6 bg-background/80 backdrop-blur-md border border-white/10 rounded-3xl z-10 flex items-center justify-between">
                <div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary">Map View</p>
                    <p className="text-sm font-bold text-foreground">6 Active Locations Found in Pakistan</p>
                </div>
                <button className="px-6 py-3 bg-foreground text-background rounded-2xl font-black text-[10px] uppercase tracking-widest">
                    Expand Map
                </button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};


export default DonationLogistics;