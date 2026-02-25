"use client";

import { Bell, Search, ChevronDown, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface TopNavProps {
  title?: string;
  orgName?: string;
}

export default function TopNav({ title = "Dashboard", orgName = "My Business" }: TopNavProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-white/[0.06] bg-[#0c0c16]/80 backdrop-blur-md shrink-0">
      {/* Left: Page title */}
      <div>
        <h1 className="text-sm font-semibold text-white">{title}</h1>
        <p className="text-xs text-zinc-500">{orgName}</p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.07] text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
          <Search size={13} />
          <span className="hidden md:block">Search...</span>
          <span className="hidden md:block text-[10px] bg-white/10 px-1.5 py-0.5 rounded">⌘K</span>
        </button>

        {/* Notifications */}
        <button className="relative w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors">
          <Bell size={14} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.07] hover:bg-white/[0.08] transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
              A
            </div>
            <ChevronDown size={12} className="text-zinc-500" />
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-44 bg-[#141424] border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <p className="text-xs font-semibold text-white">Admin</p>
                  <p className="text-[11px] text-zinc-500 truncate">admin@business.com</p>
                </div>
                <div className="py-1">
                  <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                    <User size={14} />
                    Profile
                  </button>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
