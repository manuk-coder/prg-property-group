"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Map, LogOut } from "lucide-react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Properties", href: "/admin/properties", icon: Building2 },
    { name: "Neighborhoods", href: "/admin/neighborhoods", icon: Map },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    window.location.href = "/admin";
  };

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-100 font-sans">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <span className="font-serif font-bold text-lg tracking-tight">PRG ADMIN</span>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                // Special case for root /admin to avoid highlighting everything
                const exactMatch = item.href === "/admin" ? pathname === "/admin" : isActive;
                
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                        exactMatch
                          ? "bg-gray-100 text-black font-bold"
                          : "text-gray-600 hover:text-black hover:bg-gray-50"
                      }`}
                    >
                      <item.icon size={18} className={exactMatch ? "text-black" : "text-gray-400"} />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors rounded-sm"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 overflow-y-auto w-full h-full bg-gray-50">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}
