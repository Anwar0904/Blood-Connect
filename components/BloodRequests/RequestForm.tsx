"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Droplet, MapPin, User, Phone, Mail, Hospital, 
  Calendar, Plus, Info, AlertCircle, Loader2, CheckCircle
} from "lucide-react";

const BloodRequestForm = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    isUrgent: false,
    patientName: "",
    bloodGroup: "",
    unitsRequired: "",
    requiredByDate: "",
    hospitalName: "",
    city: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    additionalInfo: ""
  });

  // Pre-fill fields from session to save time during an emergency
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        contactPerson: session.user?.name || prev.contactPerson,
        contactEmail: session.user?.email || prev.contactEmail
      }));
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleUrgent = () => {
    setFormData(prev => ({ ...prev, isUrgent: !prev.isUrgent }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const currentUserId = (session?.user as any)?.id || (session?.user as any)?._id;

    if (!currentUserId) {
      setError("You must be logged in to post an emergency blood requirement.");
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      userId: currentUserId
    };

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.refresh();
          // Instantly send them to their profile page to check status
          window.location.href = `/profile/${currentUserId}`;
        }, 2000);
      } else {
        setError(data.error || "Something failed. Check form parameters.");
      }
    } catch (err) {
      setError("Network exception error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-background transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Emergency Support
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9] mb-6">
              SUBMIT A <br />
              <span className="text-blood-gradient uppercase">Blood Request</span>
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Provide accurate details to help our donor network respond to your emergency as quickly as possible.
            </p>
          </motion.div>
        </div>

        {/* --- FORM CONTAINER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative bg-card border border-border rounded-[3rem] p-8 md:p-16 shadow-2xl overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
            
            {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs font-bold">{error}</div>}
            {success && <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl text-xs font-bold flex items-center gap-2"><CheckCircle size={16}/> Emergency Request Broadcasted! Relocating to your overview dashboard...</div>}

            {/* 1. URGENCY & CORE DATA */}
            <div className="bg-background/50 border border-primary/20 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Is this an Emergency?</h4>
                  <p className="text-xs text-muted">Marking as urgent notifies priority donors.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={formData.isUrgent} onChange={handleToggleUrgent} className="sr-only peer" />
                <div className="w-14 h-7 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                <span className="ms-3 text-sm font-black uppercase tracking-widest text-primary">Mark as Urgent</span>
              </label>
            </div>

            {/* 2. PATIENT & BLOOD INFO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Patient Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  <input type="text" name="patientName" required value={formData.patientName} onChange={handleChange} placeholder="Full Name" className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary outline-none transition-all font-medium text-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Blood Group</label>
                <div className="relative">
                  <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  <select name="bloodGroup" required value={formData.bloodGroup} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary outline-none transition-all font-bold appearance-none text-foreground">
                    <option value="">Select Group</option>
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Units Required</label>
                <div className="relative">
                  <Plus className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  <input type="number" name="unitsRequired" required min="1" value={formData.unitsRequired} onChange={handleChange} placeholder="No. of Units" className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary outline-none text-foreground transition-all" />
                </div>
              </div>
            </div>

            {/* 3. LOCATION & TIMING */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Required By Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  <input type="date" name="requiredByDate" required value={formData.requiredByDate} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary text-foreground outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Hospital Name</label>
                <div className="relative">
                  <Hospital className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  <input type="text" name="hospitalName" required value={formData.hospitalName} onChange={handleChange} placeholder="e.g. Mayo Hospital" className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary text-foreground outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">City</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  <input type="text" name="city" required value={formData.city} onChange={handleChange} placeholder="Enter City" className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary text-foreground outline-none transition-all" />
                </div>
              </div>
            </div>

            {/* 4. CONTACT DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Contact Person</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  <input type="text" name="contactPerson" required value={formData.contactPerson} onChange={handleChange} placeholder="Attendant Name" className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary text-foreground outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Contact Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  <input type="tel" name="contactPhone" required value={formData.contactPhone} onChange={handleChange} placeholder="03XX XXXXXXX" className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary text-foreground outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Contact Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  <input type="email" name="contactEmail" required value={formData.contactEmail} onChange={handleChange} placeholder="email@example.com" className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary text-foreground outline-none transition-all" />
                </div>
              </div>
            </div>

            {/* 5. ADDITIONAL INFO */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Additional Information</label>
              <div className="relative">
                <Info className="absolute left-4 top-6 text-primary" size={18} />
                <textarea name="additionalInfo" rows={4} value={formData.additionalInfo} onChange={handleChange} placeholder="Any specific instructions, floor number, or blood replacement requirements..." className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:border-primary text-foreground outline-none transition-all resize-none" />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-8">
              <button type="submit" disabled={loading} className="group relative w-full py-6 bg-primary text-white font-black uppercase tracking-widest rounded-3xl overflow-hidden shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3">
                {loading ? (
                  <>Processing Broadcast... <Loader2 className="animate-spin" size={20} /></>
                ) : (
                  <>
                    Submit Blood Request
                    <Droplet size={20} fill="currentColor" />
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-muted font-bold mt-6 uppercase tracking-widest">
                By submitting, you agree to our emergency protocols and verify that the data provided is correct.
              </p>
            </div>

          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default BloodRequestForm;