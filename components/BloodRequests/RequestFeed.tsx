"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet, MapPin, Calendar, Phone, Share2, Search, Filter } from "lucide-react";

const initialRequests = [
  { id: 1, patient: "Ali Khan", bloodGroup: "O+", hospital: "Khyber Teaching Hospital", city: "Peshawar", date: "May 10, 2026", urgency: "Critical" },
  { id: 2, patient: "Sara Ahmed", bloodGroup: "A-", hospital: "Mayo Hospital", city: "Lahore", date: "May 09, 2026", urgency: "Urgent" },
  { id: 3, patient: "Zubair Shah", bloodGroup: "B+", hospital: "PIMS", city: "Islamabad", date: "May 10, 2026", urgency: "Critical" },
  { id: 4, patient: "Fatima Noor", bloodGroup: "O-", hospital: "Jinnah Hospital", city: "Karachi", date: "May 11, 2026", urgency: "Normal" },
  { id: 5, patient: "Hamza Malik", bloodGroup: "AB+", hospital: "CMH", city: "Rawalpindi", date: "May 08, 2026", urgency: "Urgent" },
  { id: 6, patient: "Bilal Jan", bloodGroup: "A+", hospital: "LRH", city: "Peshawar", date: "May 10, 2026", urgency: "Critical" },
];

const extraRequests = [
  { id: 7, patient: "Ayesha Bibi", bloodGroup: "B-", hospital: "Shaukat Khanum", city: "Lahore", date: "May 12, 2026", urgency: "Urgent" },
  // ... more data from your database would go here
];

const BloodRequestCard = ({ request }: { request: typeof initialRequests[0] }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="bg-card border border-border p-6 rounded-[2.5rem] relative overflow-hidden group hover:border-primary transition-all duration-500"
  >
    {/* Urgency Badge */}
    <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest ${
      request.urgency === 'Critical' ? 'bg-primary text-white' : 'bg-muted text-foreground'
    }`}>
      {request.urgency}
    </div>

    <div className="flex items-start gap-5">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex flex-col items-center justify-center text-primary border border-primary/20">
        <span className="text-xl font-black">{request.bloodGroup}</span>
        <Droplet size={14} fill="currentColor" />
      </div>
      <div>
        <h3 className="text-xl font-black tracking-tight text-foreground">{request.patient}</h3>
        <p className="flex items-center gap-1 text-muted text-xs mt-1">
          <Calendar size={12} /> {request.date}
        </p>
      </div>
    </div>

    <div className="mt-6 space-y-3">
      <div className="flex items-center gap-3 text-sm text-muted">
        <MapPin size={16} className="text-primary" />
        <span className="line-clamp-1">{request.hospital}, {request.city}</span>
      </div>
    </div>

    <div className="mt-8 flex gap-3">
      <button className="flex-grow bg-primary text-white py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2">
        <Phone size={16} /> Donate Now
      </button>
      <button className="p-3 border border-border rounded-2xl text-muted hover:text-primary transition-colors">
        <Share2 size={18} />
      </button>
    </div>
  </motion.div>
);

const RequestSection = () => {
  const [displayCount, setDisplayCount] = useState(6);
  const allRequests = [...initialRequests, ...extraRequests];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
            <h2 className="text-4xl font-black tracking-tighter">LIVE <span className="text-primary">REQUESTS</span></h2>
            <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-grow md:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                    <input type="text" placeholder="Search City/Group..." className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-2xl focus:outline-none focus:border-primary" />
                </div>
                <button className="p-3 bg-card border border-border rounded-2xl text-muted"><Filter size={20} /></button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {allRequests.slice(0, displayCount).map((request) => (
              <BloodRequestCard key={request.id} request={request} />
            ))}
          </AnimatePresence>
        </div>

        {displayCount < allRequests.length && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setDisplayCount(allRequests.length)}
              className="px-10 py-4 bg-card border border-border rounded-full font-black uppercase tracking-widest text-xs hover:border-primary transition-all"
            >
              Show More Requests
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RequestSection;