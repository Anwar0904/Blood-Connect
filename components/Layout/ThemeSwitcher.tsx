"use client";

import  { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon, GripVertical } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const constraintsRef = useRef(null);

  // Avoid Hydration Mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    // Invisible constraint box that covers the viewport
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        // Snap logic: This is the "Pro" part
        onDragEnd={(event, info) => {
          // Logic to snap to the nearest corner could be added here, 
          // but Framer's dragConstraints keep it within bounds perfectly.
        }}
        initial={{ x: "85vw", y: "85vh" }} // Start bottom right
        className="pointer-events-auto absolute p-1 bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center cursor-grab active:cursor-grabbing group transition-colors hover:border-primary/50"
      >
        {/* Drag Handle */}
        <div className="px-1 text-muted group-hover:text-primary transition-colors">
          <GripVertical size={16} />
        </div>

        {/* The Toggle Action */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative h-12 w-12 flex items-center justify-center rounded-xl bg-background border border-white/5 overflow-hidden"
        >
          <motion.div
            initial={false}
            animate={{ 
              y: theme === "dark" ? 0 : 40,
              rotate: theme === "dark" ? 0 : 90 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute"
          >
            <Moon size={20} className="text-primary" />
          </motion.div>

          <motion.div
            initial={false}
            animate={{ 
              y: theme === "light" ? 0 : -40,
              rotate: theme === "light" ? 0 : -90 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute"
          >
            <Sun size={20} className="text-yellow-500" />
          </motion.div>
        </button>

        {/* Tooltip hint */}
        <div className="absolute right-full mr-4 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Drag to Move • Click to Toggle
        </div>
      </motion.div>
    </div>
  );
};

export default ThemeSwitcher;