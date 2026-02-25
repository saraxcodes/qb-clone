"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, Package, ShoppingBag, Users, UserCog,
  Settings, Store, BookMarked, Puzzle, BarChart2, ChevronLeft,
  ChevronRight, ChevronDown, ChevronUp, Grid3x3, Box, Percent,
  Tags, Layers, Gift, CreditCard, Ticket, Megaphone, Wrench, Folders,
  Receipt, DollarSign,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Catalog", href: "/dashboard/catalog", icon: BookOpen,
    children: [
      { label: "Dashboard", href: "/dashboard/catalog" },
      { label: "── Product Classification", href: "#" },
      { label: "Categories", href: "/dashboard/catalog/categories" },
      { label: "Sub Categories", href: "/dashboard/catalog/subcategories" },
      { label: "Manufacturers", href: "/dashboard/catalog/manufacturers" },
      { label: "Brands", href: "/dashboard/catalog/brands" },
      { label: "Income Heads", href: "/dashboard/catalog/income-heads" },
      { label: "Service Groups", href: "/dashboard/catalog/service-groups" },
      { label: "── Products", href: "#" },
      { label: "Products", href: "/dashboard/catalog/products" },
      { label: "Product Groups", href: "/dashboard/catalog/product-groups" },
      { label: "Services", href: "/dashboard/catalog/services" },
      { label: "── Taxes & Charges", href: "#" },
      { label: "Taxes", href: "/dashboard/catalog/taxes" },
      { label: "Charges", href: "/dashboard/catalog/charges" },
      { label: "── Pricing", href: "#" },
      { label: "Store Pricing", href: "/dashboard/catalog/store-pricing" },
      { label: "── Promotional", href: "#" },
      { label: "Combos", href: "/dashboard/catalog/combos" },
      { label: "Memberships", href: "/dashboard/catalog/memberships" },
      { label: "Vouchers", href: "/dashboard/catalog/vouchers" },
      { label: "Promotions", href: "/dashboard/catalog/promotions" },
    ],
  },
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
  const [openSections, setOpenSections] = useState<string[]>(() => {
    // Auto-open section based on current path
    if (pathname.startsWith("/dashboard/catalog")) return ["Catalog"];
    return [];
  });

  const toggleSection = (label: string) => {
    setOpenSections((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) =>
    href !== "#" && (pathname === href || (href !== "/dashboard" && pathname.startsWith(href + "/")));

  return (
    <aside
      className={clsx(
        "flex flex-col h-full bg-[#0c0c16] border-r border-white/[0.06] transition-all duration-300 relative",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={clsx(
        "flex items-center gap-2.5 px-4 py-5 border-b border-white/[0.06] shrink-0",
        collapsed && "justify-center px-0"
      )}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
          <span className="font-black text-sm">QB</span>
        </div>
        {!collapsed && (
          <span className="font-bold text-sm tracking-tight text-white whitespace-nowrap">QueueBuster</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto scrollbar-hide">
        <ul className="space-y-0.5 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const isOpen = openSections.includes(item.label);
            const hasChildren = !!item.children;
            const childActive = hasChildren && item.children!.some(c => isActive(c.href));

            return (
              <li key={item.href}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleSection(item.label)}
                      className={clsx(
                        "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 group",
                        (childActive || isOpen)
                          ? "text-indigo-400 bg-indigo-500/10"
                          : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.05]",
                        collapsed && "justify-center px-0"
                      )}
                    >
                      <Icon size={18} className={clsx("shrink-0", (childActive || isOpen) ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300")} />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left truncate">{item.label}</span>
                          {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </>
                      )}
                    </button>
                    {!collapsed && isOpen && (
                      <ul className="mt-0.5 ml-2 pl-4 border-l border-white/[0.06] space-y-0.5">
                        {item.children!.map((child) => {
                          if (child.href === "#") {
                            return (
                              <li key={child.label}>
                                <span className="block px-2 py-1.5 text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
                                  {child.label.replace("── ", "")}
                                </span>
                              </li>
                            );
                          }
                          const childIsActive = isActive(child.href);
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={clsx(
                                  "block px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                                  childIsActive
                                    ? "bg-indigo-500/15 text-indigo-400"
                                    : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]"
                                )}
                              >
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
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
                    <Icon size={18} className={clsx("shrink-0", active ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300")} />
                    {!collapsed && (
                      <>
                        <span className="truncate">{item.label}</span>
                        {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />}
                      </>
                    )}
                  </Link>
                )}
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
        <div className="p-3 border-t border-white/[0.06] shrink-0">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-white/[0.04]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold shrink-0">
              K
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Khuram</p>
              <p className="text-[10px] text-zinc-500 truncate">Admin</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
