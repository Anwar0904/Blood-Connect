"use client";

import React, { useState } from "react";
import { 
  ArrowRightLeft, Edit3, Info, ArrowUpRight, ArrowDownLeft, X, Save, Loader2 
} from "lucide-react";

interface BloodGroupItem {
  id: string;
  type: string;
  label: string;
  can_give: string[];
  can_receive: string[];
  population: string;
}

export default function BloodGroupClientPage({ initialData }: { initialData: BloodGroupItem[] }) {
  const [matrixData, setMatrixData] = useState<BloodGroupItem[]>(initialData);
  const [editingItem, setEditingItem] = useState<BloodGroupItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form Fields State Buffers
  const [formLabel, setFormLabel] = useState("");
  const [formPopulation, setFormPopulation] = useState("");
  const [formGiveTags, setFormGiveTags] = useState("");
  const [formReceiveTags, setFormReceiveTags] = useState("");

  const triggerEditModal = (item: BloodGroupItem) => {
    setEditingItem(item);
    setFormLabel(item.label);
    setFormPopulation(item.population);
    setFormGiveTags(item.can_give.join(", "));
    setFormReceiveTags(item.can_receive.join(", "));
  };

  const handleSaveConfiguration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSaving(true);

    const formattedPopulation = formPopulation.trim().endsWith("%") 
      ? formPopulation.trim() 
      : `${formPopulation.trim()}%`;

    const updatedPayload = {
      id: editingItem.id,
      type: editingItem.type, // ENFORCED: Transmit type back to save route
      label: formLabel,
      population: formattedPopulation,
      can_give: formGiveTags.split(",").map(t => t.trim().toUpperCase()).filter(t => t !== ""),
      can_receive: formReceiveTags.split(",").map(t => t.trim().toUpperCase()).filter(t => t !== ""),
    };

    try {
      const res = await fetch("/api/admin/blood-groups", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPayload),
      });

      if (res.ok) {
        setMatrixData(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...updatedPayload } : item));
        setEditingItem(null);
      }
    } catch (err) {
      console.error("Operational matrix save execution fault:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 pb-20 pt-10">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* --- HEADER --- */}
        <div className="border-b border-border pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              System Configuration
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
              Blood Group <span className="text-primary">Registry</span>
            </h1>
            <p className="text-sm text-muted font-medium">Define compatibility logic and monitor population distribution statistics.</p>
          </div>

          <div className="flex items-center gap-3 bg-card border border-border p-4 rounded-2xl">
            <Info size={20} className="text-primary" />
            <p className="text-[10px] font-bold text-muted uppercase leading-tight">
              Logic used by <br/> <span className="text-foreground">AI Matcher Panel</span>
            </p>
          </div>
        </div>

        {/* --- GRID TABLE --- */}
        <div className="grid grid-cols-1 gap-4">
          <div className="hidden lg:grid grid-cols-6 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted">
            <div className="col-span-1">Blood Type</div>
            <div className="col-span-1">Classification</div>
            <div className="col-span-1 flex items-center gap-2"><ArrowUpRight size={14}/> Can Give To</div>
            <div className="col-span-1 flex items-center gap-2"><ArrowDownLeft size={14}/> Can Receive</div>
            <div className="col-span-1">Pop. %</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {matrixData.map((group) => (
            <div 
              key={group.id} 
              className="group bg-card border border-border rounded-[2rem] p-6 lg:p-8 hover:border-primary/40 transition-all grid grid-cols-1 lg:grid-cols-6 items-center gap-6"
            >
              {/* 1. Type Circle Badge Render */}
              <div className="col-span-1 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition-all duration-300 shrink-0">
                  <span className="text-primary group-hover:text-white text-xl font-black transition-colors duration-300 select-none">
                    {group.type}
                  </span>
                </div>

                {/* Mobile text fallback visibility tracker */}
                <div className="lg:hidden">
                  <h3 className="text-lg font-black uppercase tracking-tight text-foreground">
                    {group.type}
                  </h3>
                  <p className="text-[10px] font-black text-primary uppercase tracking-wider">{group.label}</p>
                </div>
              </div>

              {/* 2. Subtitle Classification */}
              <div className="col-span-1 hidden lg:block">
                <p className="text-xs font-black text-foreground uppercase tracking-tight">{group.label}</p>
                <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-muted uppercase tracking-widest">Live Engine Active</span>
                </div>
              </div>

              {/* 3. Outbound Match Array */}
              <div className="col-span-1">
                <p className="lg:hidden text-[9px] font-black text-muted uppercase tracking-widest mb-2">Can Give To:</p>
                <div className="flex flex-wrap gap-1">
                  {group.can_give.length > 0 ? (
                    group.can_give.map(t => (
                      <span key={t} className="px-2.5 py-1 bg-background border border-border rounded-lg text-[10px] font-bold text-foreground transition-colors group-hover:border-primary/20">
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted/40 italic">None Specified</span>
                  )}
                </div>
              </div>

              {/* 4. Inbound Rules Array */}
              <div className="col-span-1">
                <p className="lg:hidden text-[9px] font-black text-muted uppercase tracking-widest mb-2">Can Receive From:</p>
                <div className="flex flex-wrap gap-1">
                  {group.can_receive.length > 0 ? (
                    group.can_receive.map(t => (
                      <span key={t} className="px-2.5 py-1 bg-background border border-border rounded-lg text-[10px] font-bold text-foreground transition-colors group-hover:border-primary/20">
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted/40 italic">None Specified</span>
                  )}
                </div>
              </div>

              {/* 5. Population Metrics */}
              <div className="col-span-1">
                <p className="lg:hidden text-[9px] font-black text-muted uppercase tracking-widest mb-2">Population Metrics:</p>
                <div className="space-y-1.5 max-w-[150px] lg:max-w-none">
                  <p className="text-sm font-black text-foreground tracking-tighter">{group.population}</p>
                  <div className="w-full h-1 bg-muted/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: group.population }} />
                  </div>
                </div>
              </div>

              {/* 6. Edit Button Trigger */}
              <div className="col-span-1 flex justify-end gap-2 border-t border-border lg:border-none pt-4 lg:pt-0">
                <button 
                  onClick={() => triggerEditModal(group)}
                  className="p-3 bg-background border border-border rounded-xl text-muted hover:text-primary hover:border-primary/30 transition-all w-full lg:w-auto flex justify-center items-center gap-2 text-xs lg:text-sm font-bold"
                >
                  <Edit3 size={16} /> <span className="lg:hidden uppercase tracking-widest text-[10px] font-black">Edit Parameters</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- EDIT MODAL OVERLAY --- */}
        {editingItem && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <form 
              onSubmit={handleSaveConfiguration}
              className="w-full max-w-lg bg-card border border-border rounded-[2.5rem] p-8 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-200"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Matrix Mutator</span>
                  <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Reconfigure Type {editingItem.type}</h2>
                </div>
                <button 
                  type="button" 
                  onClick={() => setEditingItem(null)}
                  className="p-2 border border-border rounded-xl text-muted hover:text-foreground bg-background"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest">Classification Subheading</label>
                  <input 
                    type="text" 
                    value={formLabel} 
                    onChange={(e) => setFormLabel(e.target.value)} 
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary text-sm font-bold text-foreground outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest">Population Distribution Scale (%)</label>
                  <input 
                    type="text" 
                    value={formPopulation} 
                    onChange={(e) => setFormPopulation(e.target.value)} 
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary text-sm font-bold text-foreground outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-primary uppercase tracking-widest">Outbound Mapping Array (Can Give To)</label>
                  <input 
                    type="text" 
                    value={formGiveTags} 
                    onChange={(e) => setFormGiveTags(e.target.value)} 
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary text-sm font-bold text-foreground outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-primary uppercase tracking-widest">Inbound Routing Rules Matrix (Can Receive From)</label>
                  <input 
                    type="text" 
                    value={formReceiveTags} 
                    onChange={(e) => setFormReceiveTags(e.target.value)} 
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary text-sm font-bold text-foreground outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setEditingItem(null)}
                  className="px-6 py-3.5 bg-background border border-border text-xs font-black uppercase tracking-widest rounded-xl hover:bg-muted/10"
                >
                  Discard Changes
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="px-6 py-3.5 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl flex items-center gap-2"
                >
                  {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Commit Matrix Updates
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}