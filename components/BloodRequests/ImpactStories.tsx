"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const stories = [
  {
    name: "Ahmed Raza",
    city: "Peshawar",
    text: "Within 20 minutes of posting an O- request for my father's surgery, I had 3 calls from donors. This platform is a miracle.",
    rating: 5
  },
  {
    name: "Sara Ali",
    city: "Lahore",
    text: "Being a Thalassemia patient, finding regular donors was a struggle. Blood Chain simplified everything for us.",
    rating: 5
  },
  {
    name: "Dr. Kamran",
    city: "Islamabad",
    text: "As a medical professional, I recommend this to all my patients. The verification process is what sets it apart.",
    rating: 5
  }
];

const ImpactStories = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4">Success Stories</span>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 uppercase leading-none">
            COMMUNITY <br /> <span className="text-blood-gradient">IN ACTION</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] bg-card border border-border flex flex-col relative group"
            >
              <Quote className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors" size={48} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" className="text-yellow-500" />
                ))}
              </div>

              <p className="text-foreground/80 leading-relaxed italic mb-8 italic">
                "{story.text}"
              </p>

              <div className="mt-auto pt-6 border-t border-border flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary text-xs">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-black tracking-tight">{story.name}</p>
                  <p className="text-[10px] uppercase font-bold text-muted tracking-widest">{story.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default ImpactStories;