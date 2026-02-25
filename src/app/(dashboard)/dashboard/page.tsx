import {
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  CreditCard,
  Banknote,
} from "lucide-react";

const stats = [
  {
    label: "Total Collection",
    value: "د.إ 0.00",
    change: "+0%",
    up: true,
    icon: TrendingUp,
    color: "indigo",
  },
  {
    label: "Orders Today",
    value: "0",
    change: "+0%",
    up: true,
    icon: ShoppingCart,
    color: "purple",
  },
  {
    label: "Tax Collected",
    value: "د.إ 0.00",
    change: "0%",
    up: true,
    icon: BarChart3,
    color: "blue",
  },
  {
    label: "Discount Given",
    value: "د.إ 0.00",
    change: "0%",
    up: false,
    icon: Package,
    color: "pink",
  },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400" },
  blue:   { bg: "bg-blue-500/10",   text: "text-blue-400"   },
  pink:   { bg: "bg-pink-500/10",   text: "text-pink-400"   },
};

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Welcome back 👋</h2>
          <p className="text-zinc-500 text-sm mt-0.5">Business statistics for {today}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-zinc-400">
          <span>{today} — {today}</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const c = colorMap[s.color];
          return (
            <div
              key={i}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5 hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center`}>
                  <Icon size={16} className={c.text} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${s.up ? "text-emerald-400" : "text-red-400"}`}>
                  {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {s.change}
                </span>
              </div>
              <p className="text-2xl font-black text-white mb-1">{s.value}</p>
              <p className="text-xs text-zinc-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Store Sales */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Store Sales</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-3 text-xs font-medium text-zinc-500">Store</th>
                  <th className="pb-3 text-xs font-medium text-zinc-500 text-right">Collection</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2} className="py-8 text-center text-zinc-600 text-xs">No sales data yet</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            View Report →
          </button>
        </div>

        {/* Payment Breakup */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Payment Breakup</h3>
          <div className="space-y-3">
            {[
              { method: "Cash", icon: Banknote, amount: "د.إ 0.00", pct: 0, color: "emerald" },
              { method: "Card", icon: CreditCard, amount: "د.إ 0.00", pct: 0, color: "blue" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg bg-${item.color}-500/10 flex items-center justify-center shrink-0`}>
                    <Icon size={13} className={`text-${item.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">{item.method}</span>
                      <span className="text-white font-medium">{item.amount}</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/[0.06]">
                      <div
                        className={`h-full rounded-full bg-${item.color}-500`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="mt-4 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            View Report →
          </button>
        </div>

        {/* Sales Trend (chart placeholder) */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Sales Trend</h3>
            <span className="text-xs text-zinc-600">Last 7 days</span>
          </div>
          <div className="flex items-end gap-1 h-20">
            {[0, 0, 0, 0, 0, 0, 0].map((v, i) => (
              <div key={i} className="flex-1 rounded-t-sm bg-indigo-500/20 h-2" />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i} className="flex-1 text-center text-[10px] text-zinc-600">{d}</span>
            ))}
          </div>
          <button className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            View Report →
          </button>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Top Selling Products</h3>
          <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            View All →
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-white/[0.06]">
              {["#", "Product ID", "Product Name", "Unit", "Qty", "Sales"].map((h) => (
                <th key={h} className="pb-3 text-xs font-medium text-zinc-500 last:text-right">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="py-10 text-center text-zinc-600 text-xs">
                No products sold yet — start making sales in POS
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Active Users placeholder */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Active Users</h3>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-zinc-500 flex items-center gap-1">
              <Users size={10} />
              Online now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
