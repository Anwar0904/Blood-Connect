"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Added for redirection
import { Droplet, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(""); // New error state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Calling the Credentials Provider we set up in [...nextauth]
    const result = await signIn("credentials", {
      redirect: false, // We handle redirection manually for better UX
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      // Logic handled by the role-router we discussed earlier
      router.push("/"); 
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center">
          <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-500">
            <Droplet className="text-white" size={32} fill="currentColor" />
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-black text-foreground tracking-tight uppercase">
          Blood<span className="text-red-600">Connect</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground font-medium">
          Sign in to save lives in your community.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-xl border border-border sm:rounded-3xl sm:px-10">
          
          {/* SOCIAL LOGIN */}
          <div className="space-y-3">
            <button 
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full inline-flex justify-center items-center gap-3 py-3 px-4 border border-border rounded-xl bg-background text-sm font-bold text-foreground hover:bg-muted/50 transition-all"
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="h-5 w-5" alt="Google" />
              Continue with Google
            </button>
            
            <button 
              onClick={() => signIn("facebook", { callbackUrl: "/" })}
              className="w-full inline-flex justify-center items-center gap-3 py-3 px-4 rounded-xl bg-[#1877F2] text-sm font-bold text-white hover:bg-[#166fe5] transition-all"
            >
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-5 w-5 brightness-0 invert" alt="Facebook" />
              Continue with Facebook
            </button>
          </div>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
            <div className="relative flex justify-center text-xs uppercase font-black">
              <span className="px-2 bg-card text-muted-foreground tracking-widest">Or login with email</span>
            </div>
          </div>

          {/* ERROR DISPLAY */}
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold rounded-xl text-center">
              {error}
            </div>
          )}

          {/* EMAIL FORM */}
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-black text-muted-foreground uppercase tracking-wider ml-1">Email Address</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-4 top-3.5 text-muted-foreground" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-3 py-3.5 bg-background border border-border rounded-xl focus:ring-red-500 focus:border-red-500 text-sm font-medium transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-muted-foreground uppercase tracking-wider ml-1">Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-4 top-3.5 text-muted-foreground" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-3 py-3.5 bg-background border border-border rounded-xl focus:ring-red-500 focus:border-red-500 text-sm font-medium transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-red-600 border-border rounded" />
                <label className="ml-2 block text-xs font-bold text-muted-foreground">Remember me</label>
              </div>
              <Link href="/forgot-password" size={16} className="text-xs font-bold text-red-600 hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-2xl shadow-xl text-xs font-black uppercase tracking-widest text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground font-medium">
              Don't have an account?{" "}
              <Link href="/signup" className="text-red-600 font-bold hover:underline underline-offset-4">Register Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}