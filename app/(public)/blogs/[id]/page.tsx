"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  Droplet, 
  Bookmark,
  ChevronRight
} from "lucide-react";

// This would typically come from your API or Database
const blogPosts = [
  {
    id: "o-negative-critical",
    category: "Medical",
    title: "Why O-Negative is the Most Critical Blood Type",
    content: `
      <p>O-negative blood is often called the 'universal' blood type because it can be transfused to patients of any blood type in an emergency. This makes it vital for trauma situations where there is no time to test a patient's blood type.</p>
      <h2>The Science of Universal Donation</h2>
      <p>Unlike other blood types, O-negative blood lacks A, B, and Rh antigens on the surface of the red blood cells. Because these antigens aren't present, the recipient's immune system won't attack the donated blood.</p>
      <blockquote>"One unit of O-negative blood can be the difference between life and death in the first 'golden hour' of trauma care." - Dr. Muhammad Salam</blockquote>
      <p>Despite its importance, only about 7% of the population has O-negative blood. This creates a constant challenge for blood banks like Blood Chain Pakistan to maintain adequate supplies.</p>
    `,
    author: "Dr. Muhammad Salam",
    role: "Chief Medical Officer",
    date: "Oct 24, 2025",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1584362946045-121f8af9214d?auto=format&fit=crop&q=80&w=1200",
  },
  // ... other posts
];

export default function BlogPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Logic to fetch post by ID/Slug
    const foundPost = blogPosts.find((p) => p.id === id);
    setPost(foundPost);
  }, [id]);

  if (!post) return null;

  return (
    <div className="bg-background min-h-screen transition-colors duration-500">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* --- HERO HEADER --- */}
      <header className="relative h-[60vh] md:h-[70vh] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            src={post.image} 
            className="w-full h-full object-cover grayscale-[0.3] dark:opacity-40" 
            alt={post.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pb-12">
          <motion.button
            onClick={() => router.back()}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest mb-8 hover:gap-4 transition-all"
          >
            <ArrowLeft size={16} /> Back to Insights
          </motion.button>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="bg-primary/10 text-primary border border-primary/30 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-foreground tracking-tighter uppercase leading-[0.9] mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2"><Calendar size={14} className="text-primary"/> {post.date}</span>
              <span className="flex items-center gap-2"><Clock size={14} className="text-primary"/> {post.readTime} Read</span>
              <span className="flex items-center gap-2"><User size={14} className="text-primary"/> By {post.author}</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- CONTENT SECTION --- */}
      <main className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 py-20">
        
        {/* Left Sidebar: Sticky Socials */}
        <aside className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-32 flex flex-col gap-4">
            <button className="p-3 rounded-xl border border-border bg-card text-muted hover:text-primary hover:border-primary/30 transition-all">
              <Share2 size={20} />
            </button>
            <button className="p-3 rounded-xl border border-border bg-card text-muted hover:text-primary hover:border-primary/30 transition-all">
              <Bookmark size={20} />
            </button>
          </div>
        </aside>

        {/* Center: Article Body */}
        <article className="lg:col-span-8">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
            prose-p:text-muted prose-p:leading-relaxed
            prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic
            prose-strong:text-foreground
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 pt-12 border-t border-border flex flex-wrap gap-4">
            <button className="flex-1 bg-primary text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
               Register to Donate <Droplet size={18} />
            </button>
            <button className="flex-1 bg-card border border-border text-foreground py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:border-primary transition-all">
               Share This Insight
            </button>
          </div>
        </article>

        {/* Right Sidebar: Author & Related */}
        <aside className="lg:col-span-3 space-y-12">
          <div className="bg-card border border-border rounded-[2rem] p-8">
            <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-4">The Author</p>
            <div className="flex flex-col items-center text-center">
               <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-2xl mb-4">
                 {post.author[0]}
               </div>
               <h4 className="font-black text-foreground uppercase tracking-tight">{post.author}</h4>
               <p className="text-xs text-muted font-bold">{post.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black text-muted uppercase tracking-widest">Recommended</p>
            <div className="group cursor-pointer">
              <h5 className="text-sm font-black text-foreground uppercase leading-tight group-hover:text-primary transition-colors">
                Upcoming Blood Drive at University of Malakand
              </h5>
              <div className="flex items-center gap-2 mt-2 text-[9px] font-bold text-muted uppercase">
                <span>Oct 20</span> • <span>2 min read</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer CTA: Reusing your Newsletter design */}
      <section className="container mx-auto px-6 pb-20">
        <div className="bg-primary p-12 md:p-20 rounded-[3.5rem] relative overflow-hidden group">
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              READY TO SAVE <br /> A LIFE?
            </h2>
            <p className="text-white/70 font-medium max-w-lg mx-auto">
              Join Blood Chain Pakistan today. Your contribution can change a family's history forever.
            </p>
            <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-110 transition-all shadow-2xl">
              Become a Donor
            </button>
          </div>
          <Droplet className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] text-white/5 pointer-events-none group-hover:rotate-12 transition-transform duration-[3s]" />
        </div>
      </section>
    </div>
  );
}