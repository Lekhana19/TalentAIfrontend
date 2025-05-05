import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  UserCircle,
  PieChart,
  Building2,
  Bell,
  Search,
  ChevronDown,
  Users,
  LogOut,
  Sparkles,
} from "lucide-react";
import ChatbotOverlay from "./ChatbotOverlay";

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Users, label: "Talent Pool", path: "/talent-pool", badge: "New" },
  { icon: UserCircle, label: "Hire Alternatives", path: "/hire-alternatives" },
  {
    icon: PieChart,
    label: "Project Requirements",
    path: "/project-requirements",
  },
  { icon: Building2, label: "Departments", path: "/departments" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      {/* Sidebar */}
      <div
        className={`no-print fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-blue-400" />
            <span className="text-white font-bold text-xl tracking-tight">
              Talent AI
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="px-4 py-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Quick search..."
              className="w-full bg-gray-800 text-gray-200 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <nav className="px-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl mb-1 transition-all duration-150 ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                {item.label}
              </div>
              {item.badge && (
                <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
              <div className="flex items-center gap-6">
                <button className="relative p-2 text-gray-400 hover:text-gray-500">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 border-l pl-6"
                  >
                    <img
                      className="h-9 w-9 rounded-full ring-2 ring-gray-200"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User avatar"
                    />
                    <div className="hidden md:block">
                      <div className="text-sm font-medium text-gray-700">
                        Alex Morgan
                      </div>
                      <div className="text-xs text-gray-500">HR Director</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          // Add logout logic here
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="max-w-[90rem] mx-auto p-8">{children}</div>

        {/* Chatbot Overlay */}
        <ChatbotOverlay />
      </div>
    </div>
  );
}
