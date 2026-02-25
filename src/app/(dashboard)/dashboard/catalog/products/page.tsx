"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Edit, Trash2, Search, Filter, Box } from "lucide-react";
import DataTable, { Column } from "@/components/ui/DataTable";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  sku: string | null;
  barcode: string | null;
  price: number;
  mrp: number | null;
  costPrice: number;
  isActive: boolean;
  category: { name: string } | null;
  brand: { name: string } | null;
  unit: { name: string; shortName: string } | null;
  createdAt: string;
  _count: { inventory: number; orderItems: number };
};

export default function ProductsPage() {
  const router = useRouter();
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/catalog/products${search ? `?search=${search}` : ""}`);
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async (item: Product) => {
    if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    await fetch(`/api/catalog/products/${item.id}`, { method: "DELETE" });
    fetchData();
  };

  const columns: Column<Product>[] = [
    {
      key: "image", label: "", className: "w-12",
      render: () => (
        <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
          <Box size={14} className="text-zinc-600" />
        </div>
      ),
    },
    {
      key: "name", label: "Product Name",
      render: (r) => (
        <div>
          <p className="font-medium text-white">{r.name}</p>
          {r.sku && <p className="text-xs text-zinc-500 mt-0.5">SKU: {r.sku}</p>}
        </div>
      ),
    },
    { key: "category", label: "Category", render: (r) => r.category?.name || <span className="text-zinc-600">—</span> },
    { key: "brand", label: "Brand", render: (r) => r.brand?.name || <span className="text-zinc-600">—</span> },
    {
      key: "price", label: "Price",
      render: (r) => (
        <div>
          <p className="font-semibold text-white">AED {r.price.toFixed(2)}</p>
          {r.mrp && <p className="text-xs text-zinc-500">MRP: {r.mrp.toFixed(2)}</p>}
        </div>
      ),
    },
    {
      key: "isActive", label: "Status",
      render: (r) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${r.isActive ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-500/10 text-zinc-500"}`}>
          {r.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Products</h2>
          <p className="text-sm text-zinc-500 mt-0.5">List of Products · <span className="text-indigo-400">{data.length} total</span></p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-zinc-400 text-sm font-medium hover:bg-white/[0.08] transition-colors">
            <Filter size={14} />
            Bulk Operations
          </button>
          <Link
            href="/dashboard/catalog/products/create"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
          >
            <Plus size={16} />
            Create Product
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <select className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-400 text-sm focus:outline-none">
          <option>Department: ALL</option>
        </select>
        <select className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-400 text-sm focus:outline-none">
          <option>Brand: All</option>
        </select>
        <select className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-400 text-sm focus:outline-none">
          <option>Category: All</option>
        </select>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] flex-1 max-w-xs">
          <Search size={14} className="text-zinc-500 shrink-0" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <DataTable
        title=""
        columns={columns}
        data={data}
        loading={loading}
        actions={[
          { label: "Edit", icon: Edit, onClick: (r) => router.push(`/dashboard/catalog/products/${r.id}`) },
          { label: "Delete", icon: Trash2, onClick: handleDelete, danger: true },
        ]}
      />
    </div>
  );
}
