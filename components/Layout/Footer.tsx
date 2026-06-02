"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Heart } from "lucide-react";
import {
  FaLinkedin,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";

const Footer = () => {
  const footerLinks = {
    navigate: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Blogs", href: "/blogs" },
      { name: "Contact", href: "/contact" },
    ],
    getInvolved: [
      { name: "Register as Donor", href: "/donate#donor-form" },
      { name: "Become a Volunteer", href: "/signup" },
      { name: "Partner With Us", href: "/signup" },
    ],
    socials: [
      { name: "LinkedIn", href: "#", icon: <FaLinkedin size={18} /> },
      { name: "Facebook", href: "#", icon: <FaFacebookF size={18} /> },
      { name: "Instagram", href: "#", icon: <FaInstagram size={18} /> },
      { name: "Twitter / X", href: "#", icon: <FaXTwitter size={18} /> },
      { name: "TikTok", href: "#", icon: <FaTiktok size={18} /> },
    ],
  };

  return (
    <footer className="relative bg-background text-foreground pt-20 pb-10 overflow-hidden font-sans border-t border-border transition-colors duration-500">
      
      {/* Background Large Text (Watermark Effect) - Adaptive Opacity */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.015] leading-none font-black text-[14vw] uppercase tracking-tighter text-foreground">
        <span>Blood Chain</span>
        <span>Pakistan</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Top CTA Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
              Every drop <br />
              <span className="text-primary">saves a life.</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="/donate#donor-form"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-3 rounded-full flex items-center gap-2 font-bold transition-all shadow-lg shadow-primary/20"
            >
              <Heart size={18} fill="currentColor" /> Become a Donor
            </motion.a>

            <motion.a
              href="tel:03499021065"
              whileHover={{ scale: 1.05 }}
              className="border border-border bg-card/50 backdrop-blur-sm px-8 py-3 rounded-full flex items-center gap-2 transition-all text-foreground font-medium"
            >
              <Phone size={18} className="text-primary" />
              <span className="text-sm md:text-base">
                Emergency: <b className="ml-1 tracking-wider">0349-9021065</b>
              </span>
            </motion.a>
          </div>
        </div>

        <hr className="border-border mb-16 opacity-50" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40">
                <Heart fill="white" size={20} color="white" />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-none text-foreground uppercase tracking-tighter">Blood Chain</h3>
                <span className="text-[10px] text-primary tracking-[0.3em] uppercase font-black">Pakistan</span>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              Building a nationwide culture of voluntary blood donation since 2018. 
              Our mission is to ensure that no life is lost due to the unavailability of blood.
            </p>
            <div className="space-y-4 text-sm text-muted">
              <a href="mailto:bloodchainpakistan@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors group">
                <Mail size={16} className="text-primary group-hover:scale-110 transition-transform" />
                bloodchainpakistan@gmail.com
              </a>
              <a href="tel:+923499021062" className="flex items-center gap-3 hover:text-primary transition-colors group">
                <Phone size={16} className="text-primary group-hover:scale-110 transition-transform" />
                +92 349 9021062
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-1 shrink-0" />
                <span className="leading-snug">Luqman Health Care, Shinwari Plaza Nasir Bagh Road, Peshawar</span>
              </div>
            </div>
          </div>

          {/* Navigate */}
          <div className="lg:col-span-1">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8">Navigate</h4>
            <ul className="space-y-4">
              {footerLinks.navigate.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted hover:text-primary transition-all hover:translate-x-1 inline-block text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div className="lg:col-span-1">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8">Get Involved</h4>
            <ul className="space-y-4">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted hover:text-primary transition-all hover:translate-x-1 inline-block text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="lg:col-span-1">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8">Follow Us</h4>
            <ul className="space-y-4">
              {footerLinks.socials.map((social) => (
                <li key={social.name}>
                  <a href={social.href} className="group flex items-center gap-3 text-muted hover:text-primary transition-all">
                    <span className="group-hover:scale-120 transition-all duration-300">
                      {social.icon}
                    </span>
                    <span className="text-sm font-medium">{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-muted font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Blood Chain Pakistan.</p>
          <p className="flex items-center gap-1.5 group cursor-default">
            Made with
            <Heart size={12} className="text-primary fill-primary group-hover:animate-ping" />
            for Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;