"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X,
  Droplet,
  Globe,
  User,
  Settings,
  Save,
  Loader2
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const pathname = usePathname();

  // Profile Form States
  const [adminProfile, setAdminProfile] = useState({
    username: "Admin_Ihsan",
    email: "ihsan@bloodconnect.org",
    role: "System Administrator",
    avatarInitial: "I"
  });

  const [formUsername, setFormUsername] = useState(adminProfile.username);
  const [formEmail, setFormEmail] = useState(adminProfile.email);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Donors", href: "/donor_management", icon: <Users size={20} /> },
    { name: "Requests", href: "/request_moderator", icon: <ClipboardList size={20} /> },
    { name: "Verify", href: "/verification_module", icon: <ShieldCheck size={20} /> },
    { name: "Inquiries", href: "/inbox", icon: <Droplet size={20} /> },
    { name: "Blood Groups", href: "/blood-groups", icon: <Droplet size={20} /> },
    { name: "All pages", href: "/all-pages", icon: <Globe size={20} /> },
    { name: "Provision User", href: "/users", icon: <User size={20} /> } // Future expansion for user management interface
  ];



  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAdminProfile(prev => ({
        ...prev,
        username: formUsername,
        email: formEmail,
        avatarInitial: formUsername.charAt(0).toUpperCase()
      }));
      setIsProfileModalOpen(false);
    } catch (err) {
      console.error("Profile change persist failure:", err);
    } finally {
      setIsSavingProfile(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden bg-background border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2 text-red-600">
          <Droplet fill="currentColor" size={24} />
          <span className="font-black tracking-tighter text-lg uppercase">BloodConnect</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-300 ease-in-out h-full
        md:sticky md:h-[100vh] md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-full flex flex-col">
          
          <div className="p-8 hidden md:flex items-center gap-2 text-red-600 border-b">
            <Droplet fill="currentColor" size={28} />
            <span className="font-black tracking-tighter text-xl uppercase text-foreground">
              Blood<span className="text-red-600">Connect</span>
            </span>
          </div>

          <div className="p-4 uppercase text-[10px] font-black text-gray-400 tracking-widest mt-4 px-8">
            Admin Menu
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all
                    ${isActive 
                      ? "bg-red-50 text-red-600 shadow-sm" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                  `}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <div 
              onClick={() => { setIsProfileModalOpen(true); setIsMobileMenuOpen(false); }}
              className="bg-gray-50 rounded-2xl p-4 mb-4 cursor-pointer hover:bg-gray-100/80 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400">Logged in as</p>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{adminProfile.username}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-primary font-black text-xs uppercase">
                  {adminProfile.avatarInitial}
                </div>
              </div>
            </div>
            <button 
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-x-hidden relative">
        <header className="hidden md:flex h-20 items-center justify-end px-12 bg-background/50 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100">
          <div className="relative">
            <button 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl transition-all select-none"
            >
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-xs uppercase shadow-sm shadow-red-600/20">
                {adminProfile.avatarInitial}
              </div>
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">{adminProfile.username}</span>
            </button>

            {isProfileDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsProfileDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-2xl shadow-xl z-20 py-2 animate-in fade-in slide-in-from-top-3 duration-150">
                  <div className="px-4 py-2 border-b border-border mb-1">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-wider">{adminProfile.role}</p>
                    <p className="text-xs text-muted-foreground truncate font-medium">{adminProfile.email}</p>
                  </div>
                  <button 
                    onClick={() => { setIsProfileModalOpen(true); setIsProfileDropdownOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-foreground hover:bg-muted/50 transition-colors text-left"
                  >
                    <User size={16} /> View Profile
                  </button>
                  <button 
                    onClick={() => { setIsProfileModalOpen(true); setIsProfileDropdownOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-foreground hover:bg-muted/50 transition-colors text-left"
                  >
                    <Settings size={16} /> Account Settings
                  </button>
                  <div className="border-t border-border mt-1 pt-1">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50/50 transition-colors text-left"
                    >
                      <LogOut size={16} /> End Session
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </header>

        <div className="p-4 md:p-12">
          {children}
        </div>
      </main>

      {/* --- PROFILE MODAL --- */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={handleSaveProfile}
            className="w-full max-w-md bg-card border border-border rounded-[2.5rem] p-8 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Security Desk</span>
                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Admin Profile</h2>
              </div>
              <button 
                type="button" 
                onClick={() => setIsProfileModalOpen(false)}
                className="p-2 border border-border rounded-xl text-muted hover:text-foreground bg-background"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-border/50">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white text-2xl font-black uppercase">
                {adminProfile.avatarInitial}
              </div>
              <div>
                <h4 className="font-black text-foreground text-lg uppercase tracking-tight">{adminProfile.username}</h4>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{adminProfile.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">Identified Username</label>
                <input 
                  type="text" 
                  value={formUsername} 
                  onChange={(e) => setFormUsername(e.target.value)} 
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary text-sm font-bold text-foreground outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">System Email Pointer</label>
                <input 
                  type="email" 
                  value={formEmail} 
                  onChange={(e) => setFormEmail(e.target.value)} 
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary text-sm font-bold text-foreground outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
              <button 
                type="button" 
                onClick={() => {
                  setFormUsername(adminProfile.username);
                  setFormEmail(adminProfile.email);
                  setIsProfileModalOpen(false);
                }}
                className="px-5 py-3 bg-background border border-border text-xs font-black uppercase tracking-widest rounded-xl hover:bg-muted/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSavingProfile}
                className="px-5 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl flex items-center gap-2 shadow-lg shadow-primary/10 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all"
              >
                {isSavingProfile ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Saving Changes...
                  </>
                ) : (
                  <>
                    <Save size={14} /> Update Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}