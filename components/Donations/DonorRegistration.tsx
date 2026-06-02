"use client";

import React, { useState, useEffect, SubmitEvent } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  User as UserIcon, Mail, Phone, CreditCard, 
  Calendar, MapPin, Droplet, Users, ArrowRight, Loader2, CheckCircle
} from "lucide-react";

const DonorRegistration = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cnic: "",
    age: "",
    gender: "",
    bloodGroup: "",
    city: "",
    lastDonationDate: ""
  });
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (session?.user) {
      const u = session.user as any;
      setFormData(prev => ({
        ...prev,
        name: u.name || prev.name,
        email: u.email || prev.email ,
        phone: u.phone || prev.phone,
        city: u.city || prev.city ,
        bloodGroup: u.bloodGroup || prev.bloodGroup,
      }));
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const targetedEmail = formData.email || session?.user?.email;

    if (!targetedEmail) {
      setError("Authentication mismatch. Please sign out and log back in fresh to verify your account session.");
      return;
    }

    if (!agreed) {
      setError("You must acknowledge the legal conditions and donor eligibility rules.");
      return;
    }

    setLoading(true);

    const executionPayload = {
      ...formData,
      email: targetedEmail
    };

    try {
      const res = await fetch("/api/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(executionPayload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.refresh();
          router.push(`/profile/${data.userId}`);
        }, 2000);
      } else {
        setError(data.error || "An error occurred. Please verify parameters.");
      }
    } catch (err) {
      setError("Network tracking breakdown. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="donor-form" className="py-24 bg-background transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
              Join the elite
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-none mb-6">
              BECOME A <br />
              <span className="text-blood-gradient uppercase">Blood Donor</span>
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-card/50 backdrop-blur-xl border border-border rounded-[3.5rem] p-8 md:p-16 shadow-2xl shadow-primary/5 overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            
            {error && <div className="md:col-span-2 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs font-bold">{error}</div>}
            {success && <div className="md:col-span-2 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl text-xs font-bold flex items-center gap-2"><CheckCircle size={16}/> Application processed! Relocating to dashboard workspace...</div>}

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-2">Full Name</label>
              <div className="group relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary text-foreground outline-none transition-all font-medium" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-2">Email Address</label>
              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary text-foreground outline-none transition-all font-medium" />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-2">Phone Number</label>
              <div className="group relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="03XX XXXXXXX" className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary text-foreground outline-none transition-all font-medium" />
              </div>
            </div>

            {/* CNIC */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-2">CNIC Number</label>
              <div className="group relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                <input type="text" name="cnic" required value={formData.cnic} onChange={handleChange} placeholder="XXXXX-XXXXXXX-X" className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary text-foreground outline-none transition-all font-medium" />
              </div>
            </div>

            {/* Age & Gender & Blood Group Row */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Age */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-2">Age</label>
                <div className="group relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                  <input type="number" name="age" required min="18" max="65" value={formData.age} onChange={handleChange} placeholder="18-60" className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary text-foreground outline-none transition-all" />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-2">Gender</label>
                <div className="group relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                  <select name="gender" required value={formData.gender} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary text-foreground outline-none transition-all appearance-none cursor-pointer font-bold">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-2">Blood Group</label>
                <div className="group relative">
                  <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:animate-bounce" size={18} />
                  <select name="bloodGroup" required value={formData.bloodGroup} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary outline-none transition-all appearance-none cursor-pointer font-black text-primary">
                    <option value="">Choose</option>
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-2">Current City</label>
              <div className="group relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                <input type="text" name="city" required value={formData.city} onChange={handleChange} placeholder="e.g. Peshawar" className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary text-foreground outline-none transition-all" />
              </div>
            </div>

            {/* Last Donation Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-2">Last Donation Date</label>
              <div className="group relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                <input type="date" name="lastDonationDate" value={formData.lastDonationDate} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary outline-none transition-all text-foreground text-[10px] font-bold uppercase" />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="md:col-span-2 pt-4">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex items-center mt-1">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="peer sr-only" />
                  <div className="w-6 h-6 border-2 border-border rounded-lg peer-checked:bg-primary peer-checked:border-primary transition-all duration-300" />
                  <ArrowRight size={14} className="absolute left-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-xs font-bold text-muted group-hover:text-foreground transition-colors leading-relaxed">
                  I agree to the terms and conditions and confirm that I meet the eligibility criteria for blood donation. 
                  <span className="text-primary ml-1 underline cursor-help">Read Terms.</span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-8">
              <button type="submit" disabled={loading} className="group relative w-full py-6 bg-primary text-white font-black uppercase tracking-[0.3em] text-sm rounded-3xl overflow-hidden shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center">
                <span className="relative z-10 flex items-center justify-center gap-4">
                  {loading ? (
                    <>Processing... <Loader2 className="animate-spin" size={18}/></>
                  ) : (
                    <>
                      Complete Registration
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform">
                        <ArrowRight size={16} />
                      </div>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-black/0 via-white/10 to-black/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default DonorRegistration;