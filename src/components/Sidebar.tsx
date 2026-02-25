"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Package,
  ShoppingBag,
  Users,
  UserCog,
  Settings,
  Store,
  BookMarked,
  Puzzle,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Catalog", href: "/dashboard/catalog", icon: BookOpen },
  { label: "Inventory", href: "/dashboard/inventory", icon: Package },
  { label: "Purchase", href: "/dashboard/purchase", icon: ShoppingBag },
  { label: "Customer", href: "/dashboard/customers", icon: Users },
  { label: "Employee", href: "/dashboard/employees", icon: UserCog },
  { label: "eStore", href: "/dashboard/estore", icon: Store },
  { label: "Khata", href: "/dashboard/khata", icon: BookMarked },
  { label: "Integrations", href: "/dashboard/integrations", icon: Puzzle },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart2 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "flex flex-col h-full bg-[#0c0c16] border-r border-white/[0.06] transition-all duration-300 relative",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className={clsx("flex items-center gap-2.5 px-4 py-5 border-b border-white/[0.06]", collapsed && "justify-center px-0")}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
          <span className="font-black text-sm">QB</span>
        </div>
        {!collapsed && (
          <span className="font-bold text-sm tracking-tight text-white whitespace-nowrap">QueueBuster</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-hide">
        <ul className="space-y-0.5 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 group",
                    active
                      ? "bg-indigo-500/15 text-indigo-400"
                      : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.05]",
                    collapsed && "justify-center px-0"
                  )}
                >
                  <Icon
                    className={clsx(
                      "w-4.5 h-4.5 shrink-0 transition-colors",
                      active ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"
                    )}
                    size={18}
                  />
                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                  {active && !collapsed && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-[#1a1a2e] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors shadow-md z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Bottom user badge */}
      {!collapsed && (
        <div className="p-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-white/[0.04]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Admin</p>
              <p className="text-[10px] text-zinc-500 truncate">admin@business.com</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
