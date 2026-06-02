"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Droplet, User, MapPin, Phone, Mail, Lock, ArrowRight, 
  Heart, Search, CheckCircle2, Users, Handshake, Loader2 
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState<"donor" | "recipient" | "volunteer" | "partner" | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // Added
    bloodGroup: "",
    phone: "",
    city: ""
  });

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // The Main Signup Logic
const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  // 1. Password Match Validation
  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match!");
    setLoading(false);
    return;
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, role }),
    });

    const data = await res.json();

    if (res.ok) {
      // SUCCESS: Instead of logging in, we redirect to the login page
      // We can also pass a query parameter to show a success message on the login page
      router.push("/login?registered=true"); 
    } else {
      setError(data.error || "Something went wrong. Try again.");
    }
  } catch (err) {
    setError("Network error. Please check your connection.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-6 lg:px-8 transition-colors duration-500">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/20">
            <Droplet className="text-white" size={32} fill="currentColor" />
          </div>
        </div>
        <h2 className="text-3xl font-black text-foreground tracking-tight uppercase">
          Join <span className="text-primary">BLOOD CONNECT</span>
        </h2>
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold rounded-xl animate-bounce">
            {error}
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-card py-10 px-8 shadow-2xl border border-border rounded-[2.5rem] sm:px-12 transition-all">
          
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in zoom-in duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ROLE BUTTONS */}
                {[
                  { id: "donor", label: "I want to Donate", icon: <Heart size={22}/>, color: "primary", desc: "Save lives by donating blood." },
                  { id: "recipient", label: "I need Blood", icon: <Search size={22}/>, color: "blue-500", desc: "Find compatible donors fast." },
                  { id: "volunteer", label: "Become Volunteer", icon: <Users size={22}/>, color: "amber-500", desc: "Help organize drives." },
                  { id: "partner", label: "Become Partner", icon: <Handshake size={22}/>, color: "emerald-500", desc: "Hospitals & NGO collaboration." }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setRole(item.id as any)}
                    className={`relative p-6 rounded-3xl border-2 text-left transition-all group ${
                      role === item.id ? `border-${item.color} bg-${item.color}/5` : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className={`p-3 rounded-xl mb-4 inline-block ${role === item.id ? `bg-${item.color} text-white` : "bg-muted/20 text-muted group-hover:text-primary"}`}>
                      {item.icon}
                    </div>
                    <h3 className="font-black text-foreground uppercase text-[10px] tracking-widest">{item.label}</h3>
                    <p className="text-[10px] text-muted mt-2 leading-relaxed">{item.desc}</p>
                    {role === item.id && <CheckCircle2 className="absolute top-4 right-4 text-primary" size={18} />}
                  </button>
                ))}
              </div>
              <button 
                disabled={!role}
                onClick={() => setStep(2)}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:scale-[1.02] active:scale-95 disabled:opacity-30 transition-all shadow-xl"
              >
                Continue to Details
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSignUp} className="space-y-5 animate-in slide-in-from-right-8 duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-muted" size={18} />
                    <input name="name" required value={formData.name} onChange={handleChange} type="text" placeholder="Ihsanullah Khan" className="w-full pl-11 pr-4 py-3.5 bg-background border border-border rounded-2xl focus:ring-2 focus:ring-primary transition-all font-medium text-sm" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Blood Group</label>
                  <select name="bloodGroup" required value={formData.bloodGroup} onChange={handleChange} className="w-full px-4 py-3.5 bg-background border border-border rounded-2xl focus:ring-2 focus:ring-primary font-bold text-sm appearance-none">
                    <option value="">Select Group</option>
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-muted" size={18} />
                  <input name="email" required value={formData.email} onChange={handleChange} type="email" placeholder="name@example.com" className="w-full pl-11 pr-4 py-3.5 bg-background border border-border rounded-2xl focus:ring-2 focus:ring-primary font-medium text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 text-muted" size={18} />
                    <input name="phone" required value={formData.phone} onChange={handleChange} type="tel" placeholder="0345..." className="w-full pl-11 pr-4 py-3.5 bg-background border border-border rounded-2xl focus:ring-2 focus:ring-primary font-medium text-sm" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 text-muted" size={18} />
                    <input name="city" required value={formData.city} onChange={handleChange} type="text" placeholder="Malakand" className="w-full pl-11 pr-4 py-3.5 bg-background border border-border rounded-2xl focus:ring-2 focus:ring-primary font-medium text-sm" />
                  </div>
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-muted" size={18} />
                    <input name="password" required value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-3.5 bg-background border border-border rounded-2xl focus:ring-2 focus:ring-primary font-medium text-sm" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Confirm</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-muted" size={18} />
                    <input name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-3.5 bg-background border border-border rounded-2xl focus:ring-2 focus:ring-primary font-medium text-sm" />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button type="submit" disabled={loading} className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-primary/90 transition-all shadow-xl flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="animate-spin" /> : <>Complete Registration <ArrowRight size={18} /></>}
                </button>
                <button type="button" onClick={() => setStep(1)} className="w-full py-4 text-muted text-[10px] font-black uppercase tracking-widest">Go Back</button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted font-medium">Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign In here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}