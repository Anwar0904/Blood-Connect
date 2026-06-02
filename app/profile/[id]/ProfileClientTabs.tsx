"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Activity, FileText, Settings, Loader2, CheckCircle, AlertCircle, Lock } from "lucide-react";

export default function ProfileClientTabs({ user }: { user: any }) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"history" | "requests" | "edit">("history");
  const [formData, setFormData] = useState<{
    id: string;
    name: string;
    phone: string;
    city: string;
    bloodGroup: string;
    bio: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    ...user,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const router = useRouter();

  // Determine ownership match securely
  const currentLoggedInUserId = (session?.user as any)?.id || (session?.user as any)?._id;
  const isProfileOwner = currentLoggedInUserId === user.id;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusFeedback(null);

    // Dynamic front-end evaluation rule for password fields
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        setStatusFeedback({ type: "error", message: "You must enter your current password to authorize a password change." });
        setLoading(false);
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setStatusFeedback({ type: "error", message: "The new passwords do not match." });
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: formData.id,
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          bloodGroup: formData.bloodGroup,
          bio: formData.bio,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to finalize profile update.");
      }

      setStatusFeedback({ type: "success", message: "Your changes have been saved successfully!" });
      
      // Clear password fields cleanly
      setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
      router.refresh();
      
      setTimeout(() => setStatusFeedback(null), 4000);
    } catch (err: any) {
      setStatusFeedback({ type: "error", message: err.message || "A network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Submenu Elements */}
      <div className="flex border-b border-border gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === "history" ? "border-primary text-primary" : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          <Activity size={16} /> Donation Log ({user.donations.length})
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === "requests" ? "border-primary text-primary" : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          <FileText size={16} /> Requests Made ({user.requests.length})
        </button>

        {/* --- SECURITY UI GATE: Completely hide the edit button from non-owners or admins --- */}
        {isProfileOwner && (
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all shrink-0 ml-auto ${
              activeTab === "edit" ? "border-primary text-primary" : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <Settings size={16} /> Edit Details & Password
          </button>
        )}
      </div>

      {/* Render Dynamic panels */}
      <div className="bg-card border border-border rounded-[2.5rem] p-6 sm:p-8 shadow-lg min-h-62.5">
        
        {/* DONATION TAB LOG */}
        {activeTab === "history" && (
          <div className="space-y-4">
            {user.donations.length === 0 ? (
              <p className="text-muted text-sm text-center py-8 font-medium">No recorded donations completed yet.</p>
            ) : (
              user.donations.map((d: any) => (
                <div key={d.id} className="flex justify-between items-center p-4 bg-muted/10 border border-border rounded-2xl">
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Donated to: {d.recipientName}</h4>
                    <p className="text-xs text-muted mt-0.5">{d.hospital}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-primary bg-primary/10 px-3 py-1 rounded-full">{d.units} Unit(s)</span>
                    <p className="text-[10px] text-muted mt-1">{d.date}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* REQUEST TAB LOG */}
        {activeTab === "requests" && (
          <div className="space-y-4">
            {user.requests.length === 0 ? (
              <p className="text-muted text-sm text-center py-8 font-medium">No blood request pipelines initialized yet.</p>
            ) : (
              user.requests.map((r: any) => (
                <div key={r.id} className="flex justify-between items-center p-4 bg-muted/10 border border-border rounded-2xl">
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Patient: {r.patientName} ({r.bloodGroup})</h4>
                    <p className="text-xs text-muted mt-0.5">{r.hospital}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                      r.status === "fulfilled" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                    }`}>
                      {r.status}
                    </span>
                    <p className="text-[10px] text-muted mt-1.5">{r.date}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* EDIT PANEL (Strictly locked down via conditional layout checks) */}
        {activeTab === "edit" && isProfileOwner && (
          <form onSubmit={handleUpdate} className="space-y-6 max-w-2xl">
            
            {statusFeedback && (
              <div className={`p-4 text-xs font-bold rounded-2xl border flex items-center gap-2 ${
                statusFeedback.type === "success" 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" 
                  : "bg-red-500/10 border-red-500/20 text-red-500"
              }`}>
                {statusFeedback.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                {statusFeedback.message}
              </div>
            )}

            {/* General Information */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-widest border-b border-border pb-1">1. Contact & Identity Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest">Display Name</label>
                  <input
                    type="text" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest">Phone Line</label>
                  <input
                    type="text" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest">Current City</label>
                  <input
                    type="text" value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest">Blood Type</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary outline-none"
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">Profile Status Bio</label>
                <textarea
                  value={formData.bio} rows={2}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Share information history metrics..."
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary outline-none resize-none"
                />
              </div>
            </div>

            {/* Password Credentials Area */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 border-b border-border pb-1 text-primary">
                <Lock size={12} />
                <h3 className="text-[10px] font-black uppercase tracking-widest">2. Security Gate (Change Password)</h3>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">Current Password</label>
                <input
                  type="password" placeholder="••••••••••••" value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest">New System Password</label>
                  <input
                    type="password" placeholder="Minimum 6 characters" value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest">Confirm New Password</label>
                  <input
                    type="password" placeholder="Match new password entry" value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="px-6 py-3.5 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-primary/10"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : "Save Settings Account Changes"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}