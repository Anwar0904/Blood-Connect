"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Menu,
  X,
  ChevronDown,
  Droplet,
  Search,
  FileText,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

const Header = () => {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blogs", href: "/blogs" },
  ];

  const actionLinks = [
    { name: "Blood Requests", href: "/requests", urgent: true },
    { name: "Donate Blood", href: "/donate", urgent: false },
  ];

  const memberOptions = [
    {
      name: "Become a Donor",
      link: "/donate/#donor-form",
      description: "Register your blood group and save lives.",
      iconColor: "text-primary bg-primary/10",
    },
    {
      name: "Become a Partner",
      link: "/signup?role=partner",
      description: "Search active blood savers in your city.",
      iconColor: "text-blue-500 bg-blue-500/10",
    },
    {
      name: "Become a Volunteer",
      link: "/signup?role=volunteer",
      description: "View or post urgent blood requirements.",
      iconColor: "text-amber-500 bg-amber-500/10",
    },
    {
      name:"Login"
      ,link:"/login"
      ,description:"Access your profile and dashboard."
      ,iconColor:"text-emerald-500 bg-emerald-500/10"
    }
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-lg border-b border-border"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
            <Heart fill="white" size={20} color="white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold leading-none uppercase tracking-tighter text-foreground">
              Blood
            </h1>
            <p className="text-[9px] text-primary font-black tracking-[0.2em] uppercase">
              Connect
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 border-r border-border pr-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            {actionLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold transition-all ${
                  link.urgent ? "text-primary animate-pulse" : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* DYNAMIC CTA / PROFILE SECTION */}
        <div className="hidden lg:block relative">
          <motion.div
            onHoverStart={() => setIsDropdownOpen(true)}
            onHoverEnd={() => setIsDropdownOpen(false)}
            className={`${
              status === "authenticated"
                ? "bg-card border border-border text-foreground"
                : "bg-primary text-white"
            } cursor-pointer hover:opacity-90 px-5 py-2.5 rounded-full flex items-center gap-3 font-bold text-sm transition-all shadow-lg`}
          >
            {status === "authenticated" ? (
              <>
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={14} />
                  )}
                </div>
                <span className="max-w-25 truncate">
                  {session?.user?.name?.split(" ")[0]}
                </span>
              </>
            ) : (
              <span>Become a Member</span>
            )}

            <ChevronDown
              size={14}
              className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-2xl p-2 shadow-2xl backdrop-blur-xl"
                >
                  {status === "authenticated" ? (
                    <>
                      {/* Fixed class typo 'p- *:3' here to 'p-3' */}
                      <Link
                        href={
                          (session?.user as any)?.role === "admin"
                            ? "/dashboard"
                            : `/profile/${(session?.user as any)?.id || (session?.user as any)?._id}`
                        }
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          {(session?.user as any)?.role === "admin" ? (
                            <LayoutDashboard size={16} />
                          ) : (
                            <User size={16} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">
                            {(session?.user as any)?.role === "admin"
                              ? "Admin Dashboard"
                              : "My Profile"}
                          </p>
                          <p className="text-[10px] text-muted">
                            Manage your account
                          </p>
                        </div>
                      </Link>

                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-colors group text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                          <LogOut size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-red-500">
                            Logout
                          </p>
                          <p className="text-[10px] text-muted">
                            See you soon!
                          </p>
                        </div>
                      </button>
                    </>
                  ) : (
                    /* Populated options cleanly to replace the empty comment map */
                    memberOptions.map((item) => {
                      const IconComponent =
                        item.name.includes("Donor") ? Droplet :
                        item.name.includes("Find") ? Search : FileText;

                      return (
                        <Link
                          key={item.name}
                          href={item.link}
                          className="flex items-start gap-4 p-3 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200 group text-left"
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${item.iconColor}`}>
                            <IconComponent size={16} />
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-muted leading-tight">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Header;