"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { 
  FiHome, FiFolder, FiBriefcase, 
  FiAward, FiImage, FiLogOut, 
  FiMenu, FiX 
} from "react-icons/fi";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: FiHome },
  { name: "Kelola Proyek", href: "/admin/projects", icon: FiFolder },
  { name: "Kelola Pengalaman", href: "/admin/experiences", icon: FiBriefcase },
  { name: "Kelola Penghargaan", href: "/admin/awards", icon: FiAward },
  { name: "Kelola Galeri", href: "/admin/gallery", icon: FiImage },
];

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // Close sidebar on route change (for mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // If it's the login page, don't show the admin layout wrapper
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] flex font-sans text-navy p-4 md:p-6 gap-6">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-40 lg:hidden rounded-3xl"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-4 left-4 z-50 w-64 bg-white rounded-3xl shadow-sm border border-navy/5 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[120%]"
        }`}
      >
        <div className="p-6 border-b border-navy/5 flex items-center justify-between">
          <div>
            <span className="text-navy/50 text-[10px] tracking-[0.3em] font-bold uppercase block">
              PORTFOLIO
            </span>
            <span className="text-xl font-display font-bold text-navy">
              Admin CMS
            </span>
          </div>
          <button 
            className="lg:hidden p-2 rounded-xl bg-navy/5 text-navy/70 hover:text-navy hover:bg-navy/10 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            
            // Special handling for exact match on dashboard root
            const isExact = link.href === "/admin" ? pathname === "/admin" : isActive;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${
                  isExact 
                  ? "bg-navy text-beige shadow-md" 
                  : "text-navy/70 hover:bg-navy/5 hover:text-navy"
                }`}
              >
                <Icon className={`w-5 h-5 ${isExact ? "" : "opacity-70"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-navy/5">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full px-4 py-3.5 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-all font-medium border border-transparent hover:border-red-100"
          >
            <FiLogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] bg-white rounded-3xl shadow-sm border border-navy/5 overflow-hidden">
        
        {/* Mobile Header Toggle */}
        <header className="lg:hidden bg-white/80 backdrop-blur-md border-b border-navy/5 p-4 flex items-center justify-between sticky top-0 z-30">
          <span className="text-lg font-display font-bold text-navy">Dashboard</span>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-navy/5 rounded-xl text-navy hover:bg-navy/10 transition-colors"
          >
            <FiMenu className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
