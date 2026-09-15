"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Refresh the router so middleware runs again
      router.refresh();
      router.push("/admin");
    }
  };

  return (
    <main className="min-h-screen bg-beige flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white border border-navy/10 rounded-2xl md:rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Subtle decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-navy/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-navy/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="mb-10 text-center">
            <span className="text-navy/50 text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase mb-4 block">
              PORTFOLIO CMS
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-navy mb-2">
              Admin Login
            </h1>
            <p className="text-navy/70 text-sm">
              Secure area. Authorized personnel only.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-600 text-sm p-4 rounded-xl text-center font-medium">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-navy/5 border border-navy/20 rounded-xl px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy/50 focus:ring-1 focus:ring-navy/50 transition-all"
                placeholder="admin@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-navy/5 border border-navy/20 rounded-xl px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy/50 focus:ring-1 focus:ring-navy/50 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-navy text-beige font-bold py-4 rounded-xl hover:bg-navy-light hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:bg-navy disabled:hover:translate-y-0 disabled:cursor-not-allowed shadow-lg hover:shadow-navy/20"
            >
              {loading ? "Authenticating..." : "Login to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
