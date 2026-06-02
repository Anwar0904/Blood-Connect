"use client";

import { useState } from "react";
import { 
  User, Phone, MapPin, Search, CheckCircle, 
  UserX, Filter, MoreVertical, Plus, Loader2 
} from "lucide-react";
import Link from "next/link";

interface Donor {
  id: string;
  name: string;
  group: string;
  location: string;
  phone: string;
  status: string;
}

export default function DonorManagement({ initialDonors }: { initialDonors: Donor[] }) {
  const [donors, setDonors] = useState<Donor[]>(initialDonors);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // 1. DYNAMIC SEARCH & FILTER FILTER PIPELINE
  const filteredDonors = donors.filter((donor) => {
    const query = searchTerm.toLowerCase();
    return (
      donor.name.toLowerCase().includes(query) ||
      donor.group.toLowerCase().includes(query) ||
      donor.location.toLowerCase().includes(query)
    );
  });

  // 2. TOGGLE APPROVE / VERIFY STATUS ACTION
  const handleVerify = async (id: string, currentStatus: string) => {
    if (currentStatus === "Verified") return; // Avoid redundant network requests
    setActionLoadingId(id);

    try {
      const res = await fetch("/api/admin/donors", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "Verified" }),
      });

      if (res.ok) {
        // Optimistically mutate UI data state layout array rows
        setDonors((prev) =>
          prev.map((d) => (d.id === id ? { ...d, status: "Verified" } : d))
        );
      }
    } catch (err) {
      console.error("Verification processing failure:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  // 3. REMOVE DONOR ACTION
  const handleRemove = async (id: string) => {
    const confirmation = confirm("Are you sure you want to completely remove this donor from the global registry?");
    if (!confirmation) return;

    setActionLoadingId(id);
    try {
      const res = await fetch("/api/admin/donors", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        // Slice user cleanly away from local state immediately
        setDonors((prev) => prev.filter((d) => d.id !== id));
      }
    } catch (err) {
      console.error("Removal processing failure:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 pb-20 pt-10">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* --- HEADER & SEARCH --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              Admin Portal
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
              Donor <span className="text-primary">Registry</span>
            </h1>
            <p className="text-sm text-muted font-medium">Manage and verify registered blood donors across the community.</p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input 
                type="text" 
                value={searchTerm}
                placeholder="Search name, group, city..." 
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-2xl text-sm focus:ring-2 focus:ring-primary text-foreground outline-none transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-3 bg-card border border-border rounded-2xl text-muted hover:text-primary hover:border-primary/50 transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* --- DONOR TABLE --- */}
        <div className="border border-border rounded-[2rem] bg-card shadow-sm overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/5 border-b border-border">
                  <th className="p-5 text-[10px] font-black uppercase text-muted tracking-[0.2em]">Donor Details</th>
                  <th className="p-5 text-[10px] font-black uppercase text-muted tracking-[0.2em]">Blood Group</th>
                  <th className="p-5 text-[10px] font-black uppercase text-muted tracking-[0.2em]">Location</th>
                  <th className="p-5 text-[10px] font-black uppercase text-muted tracking-[0.2em]">Status</th>
                  <th className="p-5 text-[10px] font-black uppercase text-muted tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredDonors.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-xs text-muted font-bold uppercase tracking-widest">
                      No matching records located in directory queries.
                    </td>
                  </tr>
                ) : (
                  filteredDonors.map((donor) => (
                    <tr key={donor.id} className="hover:bg-muted/5 transition-colors group">
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-background border border-border rounded-2xl flex items-center justify-center text-muted group-hover:border-primary/50 transition-all">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-foreground uppercase tracking-tight">{donor.name}</p>
                            <p className="text-[11px] text-muted font-bold flex items-center gap-1.5 mt-0.5">
                              <Phone size={12} className="text-primary" /> {donor.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className="inline-flex items-center justify-center px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary font-black text-xs rounded-xl">
                          {donor.group}
                        </span>
                      </td>
                      <td className="p-5">
                        <p className="text-sm text-muted font-medium flex items-center gap-2">
                          <MapPin size={16} className="text-primary/60" /> {donor.location}
                        </p>
                      </td>
                      <td className="p-5">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                          donor.status === 'Verified' 
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                        }`}>
                          {donor.status}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {actionLoadingId === donor.id ? (
                            <div className="p-2.5">
                              <Loader2 size={18} className="animate-spin text-muted" />
                            </div>
                          ) : (
                            <>
                              <button 
                                onClick={() => handleVerify(donor.id, donor.status)}
                                className={`p-2.5 rounded-xl transition-all ${donor.status === 'Verified' ? 'text-emerald-500 bg-emerald-500/5 cursor-default' : 'text-muted hover:text-emerald-500 hover:bg-emerald-500/5'}`} 
                                title={donor.status === 'Verified' ? "Already Verified" : "Verify Profile"}
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button 
                                onClick={() => handleRemove(donor.id)}
                                className="p-2.5 text-muted hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all" 
                                title="Remove Profile"
                              >
                                <UserX size={18} />
                              </button>
                              <Link 
                                href={`/profile/${donor.id}`}
                                className="p-2.5 text-muted hover:text-foreground rounded-xl transition-all"
                                title="View Details"
                              >
                                <MoreVertical size={18} />
                              </Link>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- QUICK ACTION FOOTER --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-8 bg-card border border-dashed border-border rounded-[2.5rem] gap-6 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-background border border-border rounded-2xl text-primary">
              <Plus size={24} />
            </div>
            <div>
              <p className="text-sm font-black text-foreground uppercase tracking-tight">Manual Entry</p>
              <p className="text-xs text-muted font-medium">Quickly register a donor who contacted via offline channels.</p>
            </div>
          </div>
          <button className="w-full sm:w-auto bg-foreground text-background dark:bg-primary dark:text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/10">
            Register New Donor
          </button>
        </div>

      </div>
    </div>
  );
}