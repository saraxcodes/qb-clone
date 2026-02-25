import { redirect } from "next/navigation";
import { Box, ArrowRightLeft, Upload, Download, ClipboardCheck } from "lucide-react";
import Link from "next/link";

const insights = [
  { label: "Stock In", href: "/dashboard/inventory/stock-in", icon: Download, color: "emerald", desc: "View and manage incoming stock" },
  { label: "Stock Out", href: "/dashboard/inventory/stock-out", icon: Upload, color: "orange", desc: "View and manage outgoing stock" },
  { label: "Stock Requisition", href: "/dashboard/inventory/stock-requisition", icon: Box, color: "blue", desc: "View and manage stock requests" },
  { label: "Stock Transfer", href: "/dashboard/inventory/stock-transfer", icon: ArrowRightLeft, color: "purple", desc: "View and manage stock transfers" },
  { label: "Stock Validation", href: "/dashboard/inventory/stock-validation", icon: ClipboardCheck, color: "indigo", desc: "View and manage stock validation" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400",
  purple: "bg-purple-500/10 text-purple-400",
  indigo: "bg-indigo-500/10 text-indigo-400",
  orange: "bg-orange-500/10 text-orange-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
};

export default function InventoryDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">Inventory Dashboard</h2>
        <p className="text-zinc-500 text-sm mt-0.5">Here's an overview of your inventory modules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              key={i}
              href={item.href}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] transition-colors group"
            >
              <div className={`w-10 h-10 rounded-xl ${colorMap[item.color]} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon size={18} />
              </div>
              <div>
                <span className="block text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{item.label}</span>
                <span className="block text-xs text-zinc-500 mt-1">{item.desc}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
