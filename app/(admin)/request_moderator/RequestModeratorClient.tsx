"use client";

import { useState } from "react";
import { 
  ClipboardList, MapPin, UserCheck, AlertCircle, 
  MessageCircle, Search, CheckCircle2, ChevronRight, 
  Filter, Loader2 
} from "lucide-react";

interface BloodRequest {
  id: string;
  patient: string;
  group: string;
  hospital: string;
  urgency: string;
  status: string;
}

export default function RequestModeratorClient({ initialRequests }: { initialRequests: BloodRequest[] }) {
  const [requests, setRequests] = useState<BloodRequest[]>(initialRequests);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All Groups");
  const [processingId, setProcessingId] = useState<string | null>(null);

  // 1. MUTATION: TRIGGER STATUS ADVISORY CHANGE
  const updateRequestStatus = async (id: string, newStatus: "Matching" | "Fulfilled") => {
    setProcessingId(id);
    try {
      const res = await fetch("/api/admin/requests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus.toLowerCase() }),
      });

      if (res.ok) {
        setRequests((prev) =>
          prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
        );
      }
    } catch (err) {
      console.error("Pipeline tracking update failed:", err);
    } finally {
      setProcessingId(null);
    }
  };

  // 2. MATRIX FILTER SYSTEM (TAB + TEXT SEARCH + DROPDOWN SELECTION)
  const filteredRequests = requests.filter((req) => {
    const matchesTab = activeTab === "All" || req.status === activeTab;
    const matchesSearch = 
      req.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedBloodGroup === "All Groups" || req.group === selectedBloodGroup;

    return matchesTab && matchesSearch && matchesGroup;
  });

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 pb-20 pt-10">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* --- 1. HEADER & INTERACTABLE TABS --- */}
        <div className="border-b border-border pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              Live Feed
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none flex items-center gap-3">
              Request <span className="text-primary">Moderator</span>
            </h1>
            <p className="text-sm text-muted font-medium">Connecting recipients with compatible donors in real-time.</p>
          </div>

          {/* Tab Filter: Adaptive Layout */}
          <div className="flex bg-card border border-border p-1.5 rounded-2xl overflow-x-auto shrink-0">
            {["All", "Pending", "Matching", "Fulfilled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* --- 2. SEARCH & FILTERS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Patient Name or Hospital..." 
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-[1.25rem] text-foreground focus:ring-2 focus:ring-primary outline-none text-sm transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <select 
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
              className="w-full pl-11 pr-10 py-4 bg-card border border-border rounded-[1.25rem] text-sm font-bold outline-none cursor-pointer appearance-none text-foreground"
            >
              <option>All Groups</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {/* --- 3. REQUEST CARDS --- */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="p-12 text-center text-xs text-muted font-bold border border-dashed border-border rounded-[2.5rem] uppercase tracking-widest">
              No matching diagnostic logs mapped to active queries.
            </div>
          ) : (
            filteredRequests.map((req) => (
              <div 
                key={req.id} 
                className="group border border-border rounded-[2.5rem] p-6 md:p-8 hover:border-primary/40 transition-all bg-card shadow-sm relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                  
                  <div className="flex items-center gap-6">
                    {/* High-Impact Blood Group Display */}
                    <div className="w-20 h-20 rounded-[1.5rem] bg-primary/10 border-2 border-primary/20 flex flex-col items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <span className="text-2xl font-black leading-none">{req.group}</span>
                      <span className="text-[8px] font-black uppercase mt-1 tracking-widest opacity-80">Type</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-black text-foreground uppercase tracking-tight">{req.patient}</h3>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          req.urgency === 'Critical' || req.urgency === 'urgent'
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-muted/10 text-muted border-border'
                        }`}>
                          {req.urgency}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground bg-muted/20 px-2.5 py-0.5 rounded-md border border-border">
                          {req.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted flex items-center gap-2 font-bold italic">
                        <MapPin size={14} className="text-primary" /> {req.hospital}
                      </p>
                      <p className="text-[10px] font-black text-muted/50 tracking-widest uppercase">REF: {req.id}</p>
                    </div>
                  </div>

                  {/* Interaction Hub */}
                  <div className="flex items-center gap-3 border-t border-border lg:border-t-0 pt-6 lg:pt-0">
                    {processingId === req.id ? (
                      <div className="px-12 py-4 flex justify-center w-full lg:w-auto">
                        <Loader2 className="animate-spin text-primary" size={24} />
                      </div>
                    ) : (
                      <>
                        <button 
                          onClick={() => updateRequestStatus(req.id, "Matching")}
                          disabled={req.status === "Matching" || req.status === "Fulfilled"}
                          className={`flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl ${
                            req.status === "Pending" 
                              ? "bg-foreground text-background dark:bg-primary dark:text-white hover:scale-[1.02] active:scale-95 shadow-primary/10"
                              : "bg-muted text-muted-foreground border border-border opacity-50 cursor-not-allowed shadow-none"
                          }`}
                        >
                          <UserCheck size={16} /> Match Donor
                        </button>
                        <button className="p-4 bg-background border border-border rounded-2xl text-muted hover:text-blue-500 hover:border-blue-500/50 transition-all" title="Message Center">
                          <MessageCircle size={20} />
                        </button>
                        <button 
                          onClick={() => updateRequestStatus(req.id, "Fulfilled")}
                          disabled={req.status === "Fulfilled"}
                          className={`p-4 bg-background border border-border rounded-2xl transition-all ${
                            req.status === "Fulfilled" 
                              ? "text-emerald-500 border-emerald-500/30 cursor-default bg-emerald-500/5" 
                              : "text-muted hover:text-emerald-500 hover:border-emerald-500/50"
                          }`}
                          title="Mark Fulfilled"
                        >
                          <CheckCircle2 size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform">
                  <ClipboardList size={120} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* --- 4. SMART AI ADVISORY --- */}
        <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-[2rem] flex flex-col sm:flex-row gap-4 items-center animate-pulse">
          <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500 shrink-0">
            <AlertCircle size={24} />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Smart Match Suggestion</p>
            <p className="text-xs text-muted leading-relaxed font-bold">
              Automated routing loops checked. Matches prioritize geographic distribution based on user address attributes.
            </p>
          </div>
          <button className="sm:ml-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:gap-4 transition-all">
            Review System <ChevronRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}