"use client";
import CatalogListPage from "@/components/catalog/CatalogListPage";
export default function CombosPage() {
  return (
    <CatalogListPage
      title="Combos"
      subtitle="Manage combo deals and bundle offers"
      apiPath="combos"
      addTitle="Add Combo"
      editTitle="Edit Combo"
      addLabel="Add Combo"
      columns={[
        { key: "name", label: "Combo Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
        { key: "price", label: "Price", render: (r) => <span className="text-emerald-400 font-bold">AED {r.price.toFixed(2)}</span> },
        { key: "items", label: "Items", render: (r) => `${r.items?.length || 0} products` },
        { key: "isActive", label: "Status", render: (r) => <span className={`px-2 py-0.5 rounded-full text-xs ${r.isActive ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-500/10 text-zinc-500"}`}>{r.isActive ? "Active" : "Inactive"}</span> },
      ]}
      fields={[
        { key: "name", label: "Combo Name", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "price", label: "Price (AED)", type: "number", required: true },
        { key: "isActive", label: "Active", type: "toggle" },
      ]}
    />
  );
}
