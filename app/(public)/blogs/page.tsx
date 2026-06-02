import React from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  Droplet 
} from "lucide-react";

const categories = ["All", "Medical", "Community", "Success Stories"];

const blogPosts = [
  {
    id: 1,
    slug: "o-negative-critical",
    category: "Medical",
    title: "Why O-Negative is the Most Critical Blood Type",
    excerpt: "Learn about the universal donor type and why hospitals always face a shortage of O- blood.",
    author: "Dr. Muhammad Salam",
    date: "Oct 24, 2025",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1584362946045-121f8af9214d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    slug: "blood-drive-malakand",
    category: "Community",
    title: "Upcoming Blood Drive at University of Malakand",
    excerpt: "Join us next Tuesday at the CS department for our quarterly voluntary donation camp.",
    author: "Syed Ihsanullah",
    date: "Oct 20, 2025",
    readTime: "2 min",
    image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    slug: "kamran-recovery",
    category: "Success Stories",
    title: "A Life Saved: The Story of Kamran's Recovery",
    excerpt: "How the BloodConnect platform helped a family find a B+ donor within 30 minutes.",
    author: "Atiq Uz Zaman",
    date: "Oct 15, 2025",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800",
  }
];

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogsPage({ searchParams }: PageProps) {
  // Read parameters directly off the search query string safely on the server side
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams.category || "All";

  const filteredPosts = blogPosts.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div className="bg-background min-h-[90vh] pb-20 transition-colors duration-500">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[30vh] flex items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img src={blogPosts[0].image} className="w-full h-full object-cover opacity-30 dark:opacity-20 grayscale" alt="hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            Latest News & Articles
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter uppercase mb-6">
            Insights & <span className="text-primary">Impact</span>
          </h1>
        </div>
      </section>

      {/* --- STICKY NAV (Using semantic Links instead of active client state) --- */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-xl z-40 border-b border-border transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <Link
                  key={cat}
                  href={cat === "All" ? "/blogs" : `/blogs?category=${encodeURIComponent(cat)}`}
                  className={`text-[11px] font-black uppercase tracking-widest transition-all relative py-2 block ${
                    isActive ? "text-primary" : "text-muted hover:text-foreground"
                  }`}
                >
                  {cat}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fadeIn" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- BLOG GRID --- */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {filteredPosts.map((post) => (
            <article key={post.id} className="group flex flex-col transition-all duration-300">
              {/* Image box */}
              <Link href={`/blogs/${post.slug}`} className="relative h-72 w-full rounded-[2rem] overflow-hidden mb-6 block border border-border bg-card">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute top-5 left-5">
                  <span className="bg-background/95 backdrop-blur-md px-4 py-1.5 rounded-xl text-[9px] font-black uppercase text-foreground tracking-widest border border-border">
                    {post.category}
                  </span>
                </div>
              </Link>
              
              {/* Card content alignment details left identical */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-[10px] font-black text-muted uppercase tracking-widest mb-3">
                  <span className="flex items-center gap-1.5"><Calendar size={13}/> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13}/> {post.readTime}</span>
                </div>
                
                <Link href={`/blogs/${post.slug}`}>
                  <h3 className="text-2xl font-black text-foreground leading-tight group-hover:text-primary transition-colors mb-3 uppercase tracking-tighter">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground italic">By {post.author}</span>
                  <Link 
                    href={`/blogs/${post.slug}`}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary group-hover:translate-x-1 transition-transform duration-300"
                  >
                    Read Article <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* --- ADAPTIVE NEWSLETTER --- */}
        <section className="mt-32 bg-card border border-border rounded-[3rem] p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden transition-colors">
          <div className="max-w-md space-y-4 text-center md:text-left relative z-10">
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter leading-none">
              Stay <span className="text-primary">Connected</span>
            </h2>
            <p className="text-muted font-medium text-sm">
              Subscribe for the latest stories and urgent donor needs in Pakistan.
            </p>
          </div>
          <div className="w-full max-w-sm flex gap-2 relative z-10">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1 px-6 py-4 rounded-2xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary outline-none text-xs transition-all"
            />
            <button className="bg-primary text-white px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">
              Join
            </button>
          </div>
          <Droplet className="absolute -right-10 -bottom-10 text-primary/5 w-64 h-64 -rotate-12" />
        </section>
      </main>
    </div>
  );
}