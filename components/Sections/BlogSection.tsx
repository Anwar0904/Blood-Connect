"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ArrowUpRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    category: "Blood Education",
    title: "The Importance of Regular Blood Donation",
    excerpt: "Discover how your regular contribution can save multiple lives and improve your own health.",
    date: "Oct 12, 2025",
    readTime: "5 min read",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXateKdJEdU44AKWjyKhHxp9PGCemfXBrqhw&s",
    link: "/blogs/the-importance-of-regular-blood-donation"
  },
  {
    id: 2,
    category: "Health Tips",
    title: "Preparing for Your First Donation",
    excerpt: "A complete guide on what to eat, how to hydrate, and what to expect during your first visit.",
    date: "Oct 10, 2025",
    readTime: "4 min read",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbt9Vs55UlwyOj2wnMEvR3PuikMOxWd7L6Hw&s",
    link: "/blogs/preparing-for-your-first-donation"
  },
  {
    id: 3,
    category: "Community",

    title: "How Youth are Leading Blood Activism",
    excerpt: "Stories from our volunteers across Pakistan who are changing the landscape of healthcare.",
    date: "Oct 05, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=800",
    link: "/blogs/how-youth-are-leading-blood-activism"
  },
];

const BlogCard = ({ blog, index }: { blog: typeof blogs[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-card border border-border rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-muted text-[10px] font-bold uppercase tracking-widest mb-4">
          <span className="flex items-center gap-1">
            <Calendar size={12} className="text-primary" /> {blog.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-primary" /> {blog.readTime}
          </span>
        </div>

        <h3 className="text-2xl font-black text-foreground tracking-tighter leading-tight mb-4 group-hover:text-primary transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-muted text-sm leading-relaxed mb-8 line-clamp-2">
          {blog.excerpt}
        </p>

        <div className="mt-auto">
          <Link 
            href={blog.link}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground group/link"
          >
            Read Article
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white group-hover/link:border-primary transition-all duration-300">
              <ArrowUpRight size={14} />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const BlogSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Knowledge Hub</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.8] mb-0">
              LATEST FROM <br />
              <span className="text-blood-gradient uppercase">OUR BLOG</span>
            </h2>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <Link 
              href="/blogs" 
              className="group flex items-center gap-4 bg-card border border-border px-8 py-4 rounded-2xl hover:border-primary transition-all shadow-sm"
            >
              <span className="text-sm font-black uppercase tracking-widest">View All Articles</span>
              <div className="p-2 bg-primary rounded-full text-white group-hover:translate-x-1 transition-transform">
                <ArrowRight size={18} />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>

        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

