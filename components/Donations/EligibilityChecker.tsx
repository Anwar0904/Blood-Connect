"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Scale, 
  Clock, 
  Stethoscope, 
  ShieldCheck, 
  Baby, 
  XCircle, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const criteria = [
  {
    id: "age",
    title: "Age Limit",
    desc: "Donors should be between 18 and 60 years of age.",
    icon: <Baby size={24} />,
    requirement: "18-60 Years"
  },
  {
    id: "weight",
    title: "Minimum Weight",
    desc: "You must weigh at least 50 kg to ensure a safe donation.",
    icon: <Scale size={24} />,
    requirement: "50kg+"
  },
  {
    id: "health",
    title: "General Health",
    desc: "You should be free from flu, fever, or any active infections.",
    icon: <Stethoscope size={24} />,
    requirement: "Feeling Fit"
  },
  {
    id: "interval",
    title: "Donation Gap",
    desc: "At least 3-4 months must have passed since your last donation.",
    icon: <Clock size={24} />,
    requirement: "90 Days Gap"
  }
];

const EligibilityChecker = () => {
  const [checked, setChecked] = useState<string[]>([]);

  const toggleCheck = (id: string) => {
    setChecked(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isEligible = checked.length === criteria.length;

  return (
    <section className="py-24 bg-card transition-colors duration-500 relative overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-0 right-0 text-[15rem] font-black text-foreground/[0.02] select-none pointer-events-none leading-none">
        SAFE
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* --- LEFT SIDE: THE CHECKER GRID --- */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {criteria.map((item, index) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                onClick={() => toggleCheck(item.id)}
                className={`cursor-pointer p-8 rounded-[2.5rem] border-2 transition-all duration-500 ${
                  checked.includes(item.id) 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-background hover:border-primary/30"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                  checked.includes(item.id) ? "bg-primary text-white" : "bg-card text-primary"
                }`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-black tracking-tight mb-2 uppercase">{item.title}</h3>
                <p className="text-muted text-xs leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-black text-primary tracking-widest uppercase">{item.requirement}</span>
                  {checked.includes(item.id) ? (
                    <CheckCircle2 className="text-primary" size={20} />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-border" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* --- RIGHT SIDE: THE VALIDATION STATUS --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Validation</span>
              <h2 className="text-5xl font-black tracking-tighter leading-[0.9] mb-8">
                ARE YOU <br /> <span className="text-blood-gradient">READY?</span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-muted leading-relaxed">
                  Before joining our donor database, please confirm your eligibility. 
                  Tap the cards to verify your current health status.
                </p>

                {/* DYNAMIC STATUS CARD */}
                <div className={`p-8 rounded-[3rem] transition-all duration-700 ${
                  isEligible ? "bg-emerald-500 text-white" : "bg-background border border-border"
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    {isEligible ? (
                      <ShieldCheck size={32} />
                    ) : (
                      <AlertCircle size={32} className="text-primary" />
                    )}
                    <div>
                      <h4 className="font-black uppercase tracking-tighter text-xl">
                        {isEligible ? "Verification Complete" : "Status: Pending"}
                      </h4>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${isEligible ? "text-white/80" : "text-muted"}`}>
                        {checked.length} of {criteria.length} Criteria Met
                      </p>
                    </div>
                  </div>

                  <p className={`text-sm mb-6 ${isEligible ? "text-white/90" : "text-muted"}`}>
                    {isEligible 
                      ? "You are eligible to donate! Proceed to the registration form to save a life." 
                      : "Please review the highlighted criteria. If you have any medical conditions, consult our team."}
                  </p>

                  <button 
                    disabled={!isEligible}
                    className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                      isEligible 
                        ? "bg-white text-emerald-600 shadow-xl" 
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    Proceed to Registration
                  </button>
                </div>

                {/* CRITICAL NOTE */}
                <div className="flex items-start gap-4 p-4">
                    <XCircle className="text-primary shrink-0" size={18} />
                    <p className="text-[10px] font-bold text-muted uppercase leading-normal tracking-wide">
                        Note: If you have recently traveled abroad, or have a history of Hepatitis, HIV, or Malaria, please contact our medical desk before donating.
                    </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EligibilityChecker;