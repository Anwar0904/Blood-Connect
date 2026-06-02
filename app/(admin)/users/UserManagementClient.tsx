"use client";

import React, { useState } from "react";
import { 
  UserPlus, Shield, Loader2, CheckCircle2, AlertCircle, 
  Users, Trash2, Edit3, X, Check, Search, Mail, Phone, MapPin 
} from "lucide-react";

interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: string;
  bloodGroup: string;
  phone: string;
  city: string;
  status: string;
}

export default function UserManagementClient({ initialUsers }: { initialUsers: UserItem[] }) {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("all");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [editingUser, setEditingUser] = useState<UserItem | null>(null);

  const [formData, setFormData] = useState({
    name: "", email: "", password: "", role: "donor",
    bloodGroup: "O+", phone: "", city: "", cnic: "",
    age: "", gender: "male", status: "verified"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setNotification(null);

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Failed to provision profile.");

      setNotification({ type: "success", message: `Account created for ${formData.name}!` });
      setUsers((prev) => [result.data, ...prev]); 
      setFormData({
        name: "", email: "", password: "", role: "donor",
        bloodGroup: "O+", phone: "", city: "", cnic: "",
        age: "", gender: "male", status: "verified"
      });
    } catch (err: any) {
      setNotification({ type: "error", message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser._id,
          name: editingUser.name,
          role: editingUser.role,
          status: editingUser.status,
          bloodGroup: editingUser.bloodGroup,
          phone: editingUser.phone,
          city: editingUser.city
        }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Failed to update target.");

      setUsers((prev) => prev.map(u => u._id === editingUser._id ? result.data : u));
      setEditingUser(null);
      setNotification({ type: "success", message: "User modifications saved successfully!" });
    } catch (err: any) {
      setNotification({ type: "error", message: err.message });
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`Are you absolutely sure you want to permanently delete user: ${name}?`)) return;

    try {
      const response = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to execute purge operation.");
      }

      setUsers((prev) => prev.filter(u => u._id !== id));
      setNotification({ type: "success", message: "User account dropped completely." });
    } catch (err: any) {
      setNotification({ type: "error", message: err.message });
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm);
    const matchesRole = selectedRoleFilter === "all" || user.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 pt-10">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-12">
        
        {/* --- HEADER --- */}
        <div className="border-b border-border pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              Root Administration Deck
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
              Identity & Access <span className="text-primary">Hub</span>
            </h1>
            <p className="text-sm text-muted font-medium">Provision new verified structural layers or manage existing registered network accounts.</p>
          </div>

          <div className="flex items-center gap-3 bg-card border border-border p-4 rounded-2xl shrink-0">
            <Shield size={20} className="text-primary" />
            <p className="text-[10px] font-bold text-muted uppercase leading-tight">
              Root Level Control <br/> <span className="text-foreground">Live Database Sync</span>
            </p>
          </div>
        </div>

        {/* --- STATUS ALERTS --- */}
        {notification && (
          <div className={`p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            notification.type === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-red-500/10 border-red-500/30 text-red-500"
          }`}>
            {notification.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <p className="text-xs font-bold uppercase tracking-wide">{notification.message}</p>
          </div>
        )}

        {/* --- PROVISIONING CONTAINER --- */}
        <div className="bg-card border border-border rounded-[2.5rem] p-6 md:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <UserPlus className="text-primary" size={22} />
            <h2 className="text-xl font-black uppercase tracking-tight">Provision Brand New User Record</h2>
          </div>

          <form onSubmit={handleCreateUser} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Ihsan Ullah" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary"/>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">Login Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="name@domain.com" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary"/>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">Temporary Password *</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} required placeholder="••••••••••••" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary"/>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="space-y-1 col-span-2 md:col-span-1">
                <label className="text-[10px] font-black text-primary uppercase tracking-widest">Structural Role *</label>
                <select name="role" value={formData.role} onChange={handleInputChange} className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary">
                  <option value="donor">Donor</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="partner">Partner</option>
                  <option value="recipient">Recipient</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">Blood Type *</label>
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none">
                  {["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">Contact Phone *</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="+92..." className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none"/>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">Base City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} required placeholder="Peshawar" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none"/>
              </div>
              <div className="space-y-1 col-span-2 md:col-span-1">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">Status Gate *</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none">
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" disabled={isSaving} className="px-6 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl flex items-center gap-2 hover:scale-[1.01] active:scale-95 transition-all shadow-md cursor-pointer">
                {isSaving ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />} Provision Identity
              </button>
            </div>
          </form>
        </div>

        {/* --- MANAGEMENT COMPONENTS REGISTRY BOARD --- */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card border border-border p-6 rounded-3xl">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Users size={20} className="text-primary" />
              <h3 className="font-black text-lg uppercase tracking-tight">Active User Database Registry</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
              <div className="relative flex-1 sm:w-64">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input 
                  type="text" placeholder="Search by name, email, phone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-xs font-bold text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <select 
                value={selectedRoleFilter} onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-xl text-xs font-bold outline-none"
              >
                <option value="all">All Registered Roles</option>
                <option value="admin">Administrators Only</option>
                <option value="volunteer">Volunteers Only</option>
                <option value="partner">Partners Only</option>
                <option value="donor">Donors Only</option>
                <option value="recipient">Recipients Only</option>
              </select>
            </div>
          </div>

          <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden">
            {filteredUsers.length === 0 ? (
              <div className="p-20 text-center text-muted text-xs font-bold uppercase tracking-wide">
                No registered user matches the specified filters.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border bg-muted/20 text-[10px] font-black uppercase tracking-wider text-muted select-none">
                      <th className="p-5">User Identification & Email Pointer</th>
                      <th className="p-5">Assigned Role</th>
                      <th className="p-5 text-center">Blood</th>
                      <th className="p-5">Contact Vector</th>
                      <th className="p-5">Status</th>
                      <th className="p-5 text-right">Actions Dashboard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-sm">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-muted/10 transition-colors group">
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black uppercase text-sm group-hover:bg-primary group-hover:text-white transition-all">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-black text-foreground uppercase tracking-tight">{user.name}</p>
                              <p className="text-xs text-muted font-medium flex items-center gap-1 mt-0.5"><Mail size={12}/>{user.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="p-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            user.role === "admin" ? "bg-purple-500/10 border border-purple-500/30 text-purple-500" :
                            user.role === "volunteer" ? "bg-amber-500/10 border border-amber-500/30 text-amber-500" :
                            user.role === "partner" ? "bg-blue-500/10 border border-blue-500/30 text-blue-500" : "bg-zinc-500/10 border border-zinc-500/20 text-muted"
                          }`}>
                            <Shield size={10} /> {user.role}
                          </span>
                        </td>

                        <td className="p-5 text-center">
                          <span className="px-2.5 py-1 bg-red-500/10 text-primary border border-primary/20 rounded-lg text-xs font-black">
                            {user.bloodGroup}
                          </span>
                        </td>

                        <td className="p-5">
                          <p className="text-xs font-bold text-foreground flex items-center gap-1"><Phone size={11} className="text-muted"/> {user.phone}</p>
                          <p className="text-[10px] font-bold text-muted flex items-center gap-1 mt-1"><MapPin size={11}/> {user.city}</p>
                        </td>

                        <td className="p-5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                            user.status === "verified" ? "bg-emerald-500/10 text-emerald-500" :
                            user.status === "rejected" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500 animate-pulse"
                          }`}>
                            {user.status}
                          </span>
                        </td>

                        <td className="p-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => setEditingUser(user)}
                              className="p-2 border border-border text-muted hover:text-primary hover:border-primary/30 rounded-xl transition-all cursor-pointer bg-background"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user._id, user.name)}
                              className="p-2 border border-border text-muted hover:text-red-500 hover:border-red-500/30 rounded-xl transition-all cursor-pointer bg-background"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* --- MODAL DIALOG MODIFIER OVERLAY PANEL --- */}
        {editingUser && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <form 
              onSubmit={handleUpdateUser}
              className="w-full max-w-lg bg-card border border-border rounded-[2.5rem] p-8 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Live Directory Mutator</span>
                  <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Modify Parameters</h2>
                </div>
                <button type="button" onClick={() => setEditingUser(null)} className="p-2 border border-border rounded-xl text-muted hover:text-foreground bg-background cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest">Adjust Legal Display Name</label>
                  <input 
                    type="text" value={editingUser.name} onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} required
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-primary uppercase tracking-widest">Modify System Role Layer</label>
                    <select 
                      value={editingUser.role} onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                      className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm font-bold text-foreground outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="donor">Donor</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="partner">Partner</option>
                      <option value="recipient">Recipient</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest">Verification Gateway Status</label>
                    <select 
                      value={editingUser.status} onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                      className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm font-bold text-foreground outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="verified">Verified</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest">Blood Type</label>
                    <select 
                      value={editingUser.bloodGroup} onChange={(e) => setEditingUser({...editingUser, bloodGroup: e.target.value})}
                      className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none"
                    >
                      {["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest">Phone Contact</label>
                    <input 
                      type="text" value={editingUser.phone} onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})} required
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest">Base Operating City Location</label>
                  <input 
                    type="text" value={editingUser.city} onChange={(e) => setEditingUser({...editingUser, city: e.target.value})} required
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-bold outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button type="button" onClick={() => setEditingUser(null)} className="px-5 py-3 bg-background border border-border text-xs font-black uppercase tracking-widest rounded-xl hover:bg-muted/10">
                  Discard Changes
                </button>
                <button type="submit" className="px-5 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl flex items-center gap-2 shadow-md">
                  <Check size={14} /> Commit Changes
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}