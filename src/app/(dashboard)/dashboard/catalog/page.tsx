import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Box, Tag, Building2, Layers, Package, Zap, Grid3x3, Wrench, Users2, Gift, FolderOpen } from "lucide-react";
import Link from "next/link";

async function getCatalogStats(orgId: string) {
  const [categories, brands, manufacturers, products, combos, services, memberships, taxes, charges, promotions, productGroups] = await Promise.all([
    prisma.category.count({ where: { organizationId: orgId, parentId: null } }),
    prisma.brand.count({ where: { organizationId: orgId } }),
    prisma.manufacturer.count({ where: { organizationId: orgId } }),
    prisma.product.count({ where: { organizationId: orgId } }),
    prisma.combo.count({ where: { organizationId: orgId } }),
    prisma.service.count({ where: { organizationId: orgId } }),
    prisma.membership.count({ where: { organizationId: orgId } }),
    prisma.tax.count({ where: { organizationId: orgId } }),
    prisma.charge.count({ where: { organizationId: orgId } }),
    prisma.promotion.count({ where: { organizationId: orgId } }),
    prisma.productGroup.count({ where: { organizationId: orgId } }),
  ]);

  const subCategories = await prisma.category.count({ where: { organizationId: orgId, NOT: { parentId: null } } });
  const activeProducts = await prisma.product.count({ where: { organizationId: orgId, isActive: true } });
  const activePromotions = await prisma.promotion.findMany({ where: { organizationId: orgId, isActive: true }, take: 5 });

  return { categories, subCategories, brands, manufacturers, products, combos, services, memberships, taxes, charges, promotions, productGroups, activeProducts, activePromotions };
}

const insights = [
  { label: "Category", key: "categories", href: "/dashboard/catalog/categories", icon: Tag, color: "blue" },
  { label: "Sub-category", key: "subCategories", href: "/dashboard/catalog/subcategories", icon: Layers, color: "violet" },
  { label: "Manufacturer", key: "manufacturers", href: "/dashboard/catalog/manufacturers", icon: Building2, color: "purple" },
  { label: "Brands", key: "brands", href: "/dashboard/catalog/brands", icon: Grid3x3, color: "pink" },
  { label: "Products", key: "products", href: "/dashboard/catalog/products", icon: Box, color: "indigo" },
  { label: "Combo", key: "combos", href: "/dashboard/catalog/combos", icon: Gift, color: "orange" },
  { label: "Service", key: "services", href: "/dashboard/catalog/services", icon: Wrench, color: "teal" },
  { label: "Membership", key: "memberships", href: "/dashboard/catalog/memberships", icon: Users2, color: "emerald" },
  { label: "Product Group", key: "productGroups", href: "/dashboard/catalog/product-groups", icon: FolderOpen, color: "yellow" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400", violet: "bg-violet-500/10 text-violet-400",
  purple: "bg-purple-500/10 text-purple-400", pink: "bg-pink-500/10 text-pink-400",
  indigo: "bg-indigo-500/10 text-indigo-400", orange: "bg-orange-500/10 text-orange-400",
  teal: "bg-teal-500/10 text-teal-400", emerald: "bg-emerald-500/10 text-emerald-400",
  yellow: "bg-yellow-500/10 text-yellow-400",
};

export default async function CatalogDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const orgId = (session.user as any).organizationId;
  const stats = await getCatalogStats(orgId);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">Catalog Dashboard</h2>
        <p className="text-zinc-500 text-sm mt-0.5">Here's an overview of your brand catalog.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Insights */}
        <div className="lg:col-span-2 rounded-2xl bg-white/[0.03] border border-white/[0.07] overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Insights</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="px-5 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Feature</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Count</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {insights.map((item) => {
                const Icon = item.icon;
                const count = (stats as any)[item.key] ?? 0;
                return (
                  <tr key={item.key} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${colorMap[item.color]}`}>
                          <Icon size={13} />
                        </div>
                        <span className="text-zinc-300 font-medium">{item.label}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-white font-bold">{count}</span>
                    </td>
                    <td className="px-5 py-3">
                      <Link href={item.href} className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        View →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Active Promotions */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Active Promotions</h3>
            <Link href="/dashboard/catalog/promotions" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">View all</Link>
          </div>
          {stats.activePromotions.length === 0 ? (
            <div className="px-5 py-10 text-center text-zinc-600 text-sm">No active promotions</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Promotion</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Type</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody>
                {stats.activePromotions.map((p) => (
                  <tr key={p.id} className="border-b border-white/[0.04]">
                    <td className="px-5 py-3 text-zinc-300 font-medium">{p.name}</td>
                    <td className="px-5 py-3 text-zinc-500">{p.type === "PERCENTAGE" ? "%" : p.type === "FIXED" ? "AED" : "B/G"}</td>
                    <td className="px-5 py-3 text-zinc-300">{p.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Sales Insights */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Sales Insights</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Available For Sale", value: stats.activeProducts, icon: Box, color: "indigo" },
            { label: "Total Products", value: stats.products, icon: Package, color: "purple" },
            { label: "Combos Active", value: stats.combos, icon: Gift, color: "orange" },
            { label: "Active Promotions", value: stats.promotions, icon: Zap, color: "emerald" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                <div className={`w-8 h-8 rounded-lg ${colorMap[s.color]} flex items-center justify-center mb-3`}>
                  <Icon size={15} />
                </div>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Add Product", href: "/dashboard/catalog/products/create", icon: Box, color: "indigo" },
          { label: "Add Category", href: "/dashboard/catalog/categories", icon: Tag, color: "blue" },
          { label: "Add Brand", href: "/dashboard/catalog/brands", icon: Grid3x3, color: "pink" },
          { label: "Add Promotion", href: "/dashboard/catalog/promotions", icon: Zap, color: "orange" },
        ].map((a, i) => {
          const Icon = a.icon;
          return (
            <Link
              key={i}
              href={a.href}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] transition-colors group"
            >
              <div className={`w-8 h-8 rounded-lg ${colorMap[a.color]} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon size={14} />
              </div>
              <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{a.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
