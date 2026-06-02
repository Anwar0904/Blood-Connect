"use client";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Droplet, Users, Handshake, ChevronRight, LayoutDashboard, User } from "lucide-react";

const Hero = () => {
  // Grab live session validation context straight from NextAuth provider
  const { data: session, status } = useSession();

  // Explicit type definition matching the design properties
  interface CTAButton {
    name: string;
    icon: React.ReactNode;
    primary: boolean;
    link: string;
  }

  // Generate buttons reactively based on structural authentications matching the Header logic
  const getDynamicButtons = (): CTAButton[] => {
    if (status === "authenticated") {
      const userRole = (session?.user as any)?.role;
      const userId = (session?.user as any)?.id || (session?.user as any)?._id;

      if (userRole === "admin") {
        return [
          { name: "Admin Dashboard", icon: <LayoutDashboard size={18} />, primary: true, link: "/dashboard" },
          { name: "Manage Donor Base", icon: <Users size={18} />, primary: false, link: "/donor_management" }
        ]; // Third structural button hidden/removed completely for admins
      }

      // Default authenticated normal user profile routing configuration
      return [
        { name: "Schedule A Donation", icon: <Droplet size={18} />, primary: true, link: "/donate" },
        { name: "Go to Account Profile", icon: <User size={18} />, primary: false, link: `/profile/${userId}` }
      ]; // Third button hidden completely for users
    }

    // Default Unauthenticated Guest Fallback Array
    return [
      { name: "Become a Donor", icon: <Droplet size={18} />, primary: true, link: "/donate#donor-form" },
      { name: "Become a Volunteer", icon: <Users size={18} />, primary: false, link: "/signup?role=volunteer" },
      { name: "Become a Partner", icon: <Handshake size={18} />, primary: false, link: "/signup?role=partner" },
    ];
  };

  const activeCtaButtons = getDynamicButtons();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background transition-colors duration-500">
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px] animate-plasma" />
        <div className="absolute top-[40%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 dark:bg-primary/5 blur-[120px] animate-plasma-delayed" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-primary/5 dark:bg-primary/10 blur-[100px] animate-plasma" />

        {/* Watermark Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.02] leading-none font-black text-[14vw] uppercase tracking-tighter text-foreground">
          <span>Blood</span>
          <span>Connect</span>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Together For A Cause
        </motion.div>

        {/* Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9] text-foreground"
        >
          BLOOD <br />
          <span className="text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/40">
            CONNECT
          </span>
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted leading-relaxed mb-12 text-balance"
        >
          Every <span className="text-foreground font-semibold underline decoration-primary/30">drop counts</span>, every hand matters. 
          A single cause that connects us all. Join us, because together, we are 
          <span className="text-primary italic"> stronger than any crisis.</span>
        </motion.p>

        {/* --- CONTEXT SENSITIVE BUTTON MATRIX RENDERING --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          {activeCtaButtons.map((btn) => (
            <motion.a
              href={btn.link}
              key={btn.name}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className={`relative overflow-hidden group px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all duration-300 w-full md:w-auto justify-center ${
                btn.primary
                  ? "bg-primary text-white"
                  : "bg-card border border-border text-foreground hover:border-primary/50"
              }`}
            >
              {/* Inner Light Glow Overlay */}
              <motion.div
                variants={{
                  rest: { x: "-100%" },
                  hover: { x: "100%" },
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`absolute inset-0 z-0 ${
                  btn.primary
                    ? "bg-linear-to-r from-transparent via-white/20 to-transparent"
                    : "bg-linear-to-r from-transparent via-primary/10 to-transparent"
                }`}
              />

              <span className={`relative z-10 flex items-center gap-3 transition-transform group-hover:scale-105 ${btn.primary ? "text-white" : ""}`}>
                <span className={btn.primary ? "text-white" : "text-primary"}>
                   {btn.icon}
                </span>
                {btn.name}
                <ChevronRight size={16} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12 max-w-4xl mx-auto"
        >
          {[
            { label: "Active Donors", val: "12k+" },
            { label: "Lives Saved", val: "45k+" },
            { label: "Cities covered", val: "25+" },
            { label: "Volunteers", val: "1.2k" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-black text-foreground">{stat.val}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted font-bold">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;