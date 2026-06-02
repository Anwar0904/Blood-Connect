import React from "react";
import { Droplet, Heart, Shield, Zap, Target, Globe } from "lucide-react";

const features = [
  {
    title: "Secure Platform",
    desc: "Advanced encryption to protect donor and recipient privacy.",
    icon: <Shield className="text-primary" size={24} />,
  },
  {
    title: "Instant Alerts",
    desc: "Real-time notifications connecting donors to urgent needs.",
    icon: <Zap className="text-primary" size={24} />,
  },
  {
    title: "Verified Donors",
    desc: "A rigorous check system to ensure safe blood contributions.",
    icon: <Droplet className="text-primary" size={24} />,
  },
];

const stats = [
  { label: "Blood Drives", val: "150+" },
  { label: "Cities Reached", val: "25+" },
  { label: "Community Heroes", val: "12k+" },
  { label: "Lives Impacted", val: "45k+" },
];

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen transition-colors duration-500 overflow-hidden">
      
      {/* --- HERO SECTION (Atmospheric) --- */}
      <section className="relative pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
        {/* Plasma Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px] animate-plasma" />
        </div>

        <div 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8 relative z-10 transition-all duration-700 ease-out"
        >
          Our Story
        </div>

        <h1 
          className="text-6xl md:text-8xl font-black text-foreground tracking-tighter uppercase leading-[0.9] mb-8 relative z-10 transition-all duration-700 ease-out"
        >
          Connecting Lives <br />
          <span className="text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/40">
            Across Pakistan
          </span>
        </h1>

        <p 
          className="max-w-2xl text-muted text-lg font-medium leading-relaxed mb-12 transition-all duration-700 ease-out delay-100"
        >
          Blood Chain Pakistan is more than a database; it is a movement. 
          We use technology to bridge the gap between those who want to save lives 
          and those who need a hero.
        </p>
      </section>

      {/* --- MISSION & VISION (Grid Layout) --- */}
      <section className="container mx-auto px-6 py-20 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="p-4 bg-primary/10 rounded-2xl h-fit">
                <Target className="text-primary" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight mb-2">Our Mission</h3>
                <p className="text-muted leading-relaxed">
                  To eliminate blood shortages in Pakistan by creating a decentralized, 
                  digitally connected network of voluntary donors and medical facilities.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="p-4 bg-primary/10 rounded-2xl h-fit">
                <Globe className="text-primary" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight mb-2">Our Vision</h3>
                <p className="text-muted leading-relaxed">
                  A future where no patient loses their life due to the unavailability 
                  of blood, powered by community-driven digital solutions.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-card border border-border rounded-[3rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-700">
               <img 
                 src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" 
                 className="w-full h-full object-cover grayscale opacity-50 dark:opacity-30" 
                 alt="medical team" 
               />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary p-8 rounded-[2rem] shadow-2xl">
              <Heart className="text-white" size={40} fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE VALUES (Pro Feature Cards) --- */}
      <section className="bg-card/50 py-24 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tighter">
              Why We <span className="text-primary">Stand Out</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div 
                key={i}
                className="p-8 rounded-[2.5rem] bg-background border border-border hover:border-primary/50 hover:-translate-y-2.5 transition-all duration-300 ease-out group"
              >
                <div className="mb-6 p-4 bg-primary/10 w-fit rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  {f.icon}
                </div>
                <h4 className="text-xl font-bold text-foreground uppercase tracking-tight mb-4">{f.title}</h4>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STATS SECTION (Adaptive Counters) --- */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-5xl md:text-6xl font-black text-foreground tracking-tighter mb-2">{s.val}</p>
              <p className="text-xs font-black text-primary uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="container mx-auto px-6 pb-24">
        <div className="bg-foreground text-background p-12 md:p-20 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left transition-colors">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
              Be Part of the <br /> <span className="text-primary">Life Chain</span>
            </h2>
            <p className="text-background/60 font-medium max-w-sm">
              Your registration as a donor takes less than 2 minutes and lasts a lifetime.
            </p>
          </div>
          <a href="/signup" className="bg-primary text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:scale-110 transition-all shadow-xl shadow-primary/20">
            Join Now
          </a>
        </div>
      </section>
    </div>
  );
}