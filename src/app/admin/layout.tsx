"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Newspaper, 
  Calendar, 
  Image as ImageIcon, 
  Settings, 
  Search,
  Bell,
  LogOut,
  Menu,
  X
} from "lucide-react";

export const dynamic = 'force-dynamic';

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Applications", icon: Newspaper },
  { href: "/admin/teachers", label: "Teachers", icon: GraduationCap },
  { href: "/admin/users", label: "Students", icon: Users },
  { href: "/admin/news-events", label: "News & Events", icon: Calendar },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [searching, setSearching] = useState(false);
  const pathname = usePathname();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults(null);
      return;
    }

    setSearching(true);
    try {
      const response = await fetch(`/api/admin/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-6 border-b border-primary-dark">
            <h1 className="text-xl font-bold">WISEDELL ACADEMY</h1>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-primary-dark text-white" 
                      : "text-gray-300 hover:bg-primary-dark"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-dark">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-primary-dark transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Back to Site
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:ml-64">
          {/* Top bar */}
          <header className="bg-white shadow-sm sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Menu className="h-6 w-6 text-gray-600" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Search className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-500">Search...</span>
                    <kbd className="hidden sm:inline-block px-2 py-1 text-xs bg-gray-200 rounded">⌘K</kbd>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/admin/settings" className="relative">
                  <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900" />
                </Link>
              </div>
            </div>

            {/* Global search dropdown */}
            {searchOpen && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <input
                  type="text"
                  placeholder="Search across all entities..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  autoFocus
                />
                {searching && (
                  <div className="mt-4 text-center text-gray-500">Searching...</div>
                )}
                {searchResults && (
                  <div className="mt-4 space-y-4 max-h-96 overflow-y-auto">
                    {Object.entries(searchResults).map(([type, items]: [string, any]) => (
                      items.length > 0 && (
                        <div key={type}>
                          <h3 className="font-semibold text-gray-900 capitalize mb-2">{type}</h3>
                          <div className="space-y-2">
                            {items.map((item: any) => (
                              <Link
                                key={item.id}
                                href={`/admin/${type === 'students' ? 'users' : type === 'applications' ? 'applications' : type === 'teachers' ? 'teachers' : type === 'news' ? 'news-events' : type === 'events' ? 'news-events' : type === 'gallery' ? 'gallery' : 'settings'}`}
                                className="block p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                                onClick={() => setSearchOpen(false)}
                              >
                                <div className="font-medium text-gray-900">
                                  {item.first_name && item.last_name 
                                    ? `${item.first_name} ${item.last_name}`
                                    : item.title || item.name || item.application_number}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {item.email || item.description || item.message}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                    {Object.values(searchResults).every((items: any) => items.length === 0) && (
                      <div className="text-center text-gray-500">No results found</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </header>

          {/* Page content */}
          <main>{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
