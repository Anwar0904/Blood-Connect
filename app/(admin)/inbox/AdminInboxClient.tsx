"use client";

import React, { useState } from "react";
import { 
  Inbox, AlertTriangle, Search, CheckCircle, Clock, Mail, 
  User, ChevronRight, Filter, MessageSquare, X, Send, Loader2
} from "lucide-react";

interface Ticket {
  id: string;
  type: string;
  sender: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: string;
  priority: string;
}

export default function AdminInboxClient({ initialTickets }: { initialTickets: Ticket[] }) {
  const [activeTab, setActiveTab] = useState("All");
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal Drawer Overlay Interaction Tracking States
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. ACTION: UPDATE TICKET STATUS IN ISOLATION
  const handleUpdateStatus = async (id: string, nextStatus: "In-Progress" | "Resolved") => {
    try {
      const res = await fetch("/api/admin/tickets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      if (res.ok) {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus } : t));
        if (selectedTicket?.id === id) setSelectedTicket(prev => prev ? { ...prev, status: nextStatus } : null);
      }
    } catch (err) {
      console.error("Failed to update execution status logs:", err);
    }
  };

  // 2. ACTION: DISPATCH EMAIL AND AUTO CLOSE OUT PREVIEW FILE
  const handleSendEmailResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyMessage.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedTicket.id,
          email: selectedTicket.email,
          recipientName: selectedTicket.sender,
          subject: selectedTicket.subject,
          responseMessage: replyMessage,
        }),
      });

      if (res.ok) {
        setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, status: "Resolved" } : t));
        setReplyMessage("");
        setSelectedTicket(null);
        alert(`Correspondence deployed cleanly to ${selectedTicket.email}`);
      }
    } catch (err) {
      console.error("Outbound gateway transmission failure:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. MULTI-FIELD REALTIME FILTER COMPUTATION MATRIX
  const filteredTickets = tickets.filter((ticket) => {
    const matchesTab = activeTab === "All" || ticket.type === activeTab;
    const normalizedQuery = searchTerm.toLowerCase();
    const matchesSearch = 
      ticket.sender.toLowerCase().includes(normalizedQuery) ||
      ticket.subject.toLowerCase().includes(normalizedQuery) ||
      ticket.id.toLowerCase().includes(normalizedQuery);

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 pb-20 pt-10">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* --- HEADER & STATS --- */}
        <div className="border-b border-border pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              Communication Hub
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
              Inquiries & <span className="text-primary">Issues</span>
            </h1>
            <p className="text-sm text-muted font-medium">Review user messages and resolve platform reports.</p>
          </div>

          <div className="flex bg-card border border-border p-1.5 rounded-2xl overflow-x-auto shrink-0">
            {["All", "Enquiry", "Issue"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? "bg-foreground text-background dark:bg-primary dark:text-white" 
                    : "text-muted hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* --- SEARCH & QUICK FILTERS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, sender, or subject..." 
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-foreground focus:ring-2 focus:ring-primary outline-none text-sm transition-all"
            />
          </div>
          <button className="flex items-center justify-center gap-3 bg-card border border-border rounded-2xl text-xs font-black uppercase tracking-widest text-muted hover:text-primary transition-all py-4">
            <Filter size={16} /> Filter Results ({filteredTickets.length})
          </button>
        </div>

        {/* --- TICKETS LIST --- */}
        <div className="space-y-3">
          {filteredTickets.map((ticket) => (
            <div 
              key={ticket.id} 
              className="group bg-card border border-border rounded-[2rem] p-5 md:p-6 hover:border-primary/40 transition-all flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6 w-full md:w-auto">
                {/* Icon based on Type */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                  ticket.type === "Issue" 
                  ? "bg-amber-500/10 border-amber-500/20 text-amber-500" 
                  : "bg-blue-500/10 border-blue-500/20 text-blue-500"
                }`}>
                  {ticket.type === "Issue" ? <AlertTriangle size={24} /> : <MessageSquare size={24} />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted">{ticket.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
                      ticket.priority === 'Critical' || ticket.priority === 'High' ? 'bg-primary text-white' : 'bg-muted/10 text-muted'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-foreground uppercase tracking-tight">{ticket.subject}</h3>
                  <div className="flex items-center gap-4 text-[11px] font-bold text-muted italic flex-wrap">
                    <span className="flex items-center gap-1.5"><User size={12} className="text-primary"/> {ticket.sender}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {ticket.date}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto border-t border-border md:border-t-0 pt-4 md:pt-0">
                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                  ticket.status === 'New' ? 'bg-primary/10 text-primary border-primary/20' : 
                  ticket.status === 'In-Progress' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                  'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                }`}>
                  {ticket.status}
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setSelectedTicket(ticket); setReplyMessage(""); }}
                    className="p-3 bg-background border border-border rounded-xl text-muted hover:text-primary transition-all" 
                    title="Open Reply Dialogue Box"
                  >
                    <Mail size={18} />
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(ticket.id, "Resolved")}
                    disabled={ticket.status === "Resolved"}
                    className={`p-3 bg-background border border-border rounded-xl transition-all ${ticket.status === 'Resolved' ? 'text-emerald-500 opacity-40 cursor-default' : 'text-muted hover:text-emerald-500'}`}
                    title="Mark Action Completed"
                  >
                    <CheckCircle size={18} />
                  </button>
                  <button 
                    onClick={() => { setSelectedTicket(ticket); setReplyMessage(""); }}
                    className="p-3 bg-background border border-border rounded-xl text-muted hover:text-foreground transition-all"
                    title="Examine Message Body Details"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- EMPTY STATE VIEW --- */}
        {filteredTickets.length === 0 && (
          <div className="p-20 text-center border border-dashed border-border rounded-[2.5rem]">
            <Inbox size={48} className="mx-auto text-muted mb-4 opacity-20" />
            <p className="text-sm font-black text-muted uppercase tracking-widest">Inbox records matching context are empty</p>
          </div>
        )}

        {/* --- 4. DETAILS INSPECTOR & RESPONSE OVERLAY SHEET (MODAL) --- */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-end transition-opacity duration-300">
            <div className="w-full max-w-xl bg-card border-l border-border h-full p-8 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">{selectedTicket.id}</span>
                    <h2 className="text-xl font-black text-foreground uppercase tracking-tight">{selectedTicket.type} File Review</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedTicket(null)} 
                    className="p-2 text-muted hover:text-foreground border border-border rounded-xl bg-background"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Ticket Details Body Grid */}
                <div className="space-y-4 bg-muted/20 p-5 rounded-2xl border border-border">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-[9px] font-black text-muted uppercase tracking-widest">From Sender</p>
                      <p className="font-bold text-foreground mt-0.5">{selectedTicket.sender}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-muted uppercase tracking-widest">Email Address</p>
                      <p className="font-bold text-foreground mt-0.5 break-all">{selectedTicket.email}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-muted uppercase tracking-widest">Current Status</p>
                      <p className="font-bold text-primary mt-0.5 uppercase tracking-wider">{selectedTicket.status}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-muted uppercase tracking-widest">Time Ingested</p>
                      <p className="font-bold text-muted mt-0.5">{selectedTicket.date}</p>
                    </div>
                  </div>
                  <div className="border-t border-border/60 pt-3 mt-2">
                    <p className="text-[9px] font-black text-muted uppercase tracking-widest mb-1">Subject Header</p>
                    <p className="text-sm font-black text-foreground uppercase tracking-tight">{selectedTicket.subject}</p>
                  </div>
                </div>

                {/* Main Incoming Message */}
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-muted uppercase tracking-widest">User Request Message Content</p>
                  <div className="p-5 bg-background border border-border rounded-2xl text-sm leading-relaxed text-foreground whitespace-pre-wrap font-medium">
                    {selectedTicket.message}
                  </div>
                </div>

                {/* Operational Quick-status Adjuster Row */}
                {selectedTicket.status === "New" && (
                  <button 
                    onClick={() => handleUpdateStatus(selectedTicket.id, "In-Progress")}
                    className="text-xs font-black text-blue-500 uppercase tracking-widest flex items-center gap-1.5 hover:underline"
                  >
                    <Clock size={14} /> Mark Ticket "In-Progress"
                  </button>
                )}
              </div>

              {/* Email Textbox Delivery Box */}
              <form onSubmit={handleSendEmailResponse} className="border-t border-border pt-6 mt-8 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                    <Mail size={12} /> Send Response To Email Inbox
                  </label>
                  <textarea
                    rows={4}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    required
                    placeholder={`Compose helpdesk message solution targeted to ${selectedTicket.sender}...`}
                    className="w-full p-4 text-sm bg-background border border-border rounded-2xl focus:ring-2 focus:ring-primary text-foreground outline-none resize-none font-medium transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-xl hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-xl shadow-primary/10"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Transmitting Communications...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Deploy Helpdesk Response Email
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}