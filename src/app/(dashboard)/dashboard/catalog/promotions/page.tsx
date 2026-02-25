"use client";
import CatalogListPage from "@/components/catalog/CatalogListPage";
export default function PromotionsPage() {
  return (
    <CatalogListPage
      title="Promotions"
      subtitle="Manage active store promotions"
      apiPath="promotions"
      addTitle="Add Promotion"
      editTitle="Edit Promotion"
      addLabel="Add Promotion"
      columns={[
        { key: "name", label: "Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
        { key: "type", label: "Type", render: (r) => <span className="px-2 py-0.5 rounded-full text-xs bg-white/[0.06] text-zinc-400">{r.type}</span> },
        { key: "value", label: "Value", render: (r) => <span className="text-purple-400 font-bold">{r.value}{r.type === "PERCENTAGE" ? "%" : r.type === "FIXED" ? " AED" : ""}</span> },
        { key: "validFrom", label: "Valid From", render: (r) => r.validFrom ? new Date(r.validFrom).toLocaleDateString() : <span className="text-zinc-600">—</span> },
        { key: "validTo", label: "Valid To", render: (r) => r.validTo ? new Date(r.validTo).toLocaleDateString() : <span className="text-zinc-600">—</span> },
        { key: "isActive", label: "Status", render: (r) => <span className={`px-2 py-0.5 rounded-full text-xs ${r.isActive ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-500/10 text-zinc-500"}`}>{r.isActive ? "Active" : "Inactive"}</span> },
      ]}
      fields={[
        { key: "name", label: "Promotion Name", required: true },
        { key: "type", label: "Type", type: "select", options: [{ value: "PERCENTAGE", label: "Percentage (%)" }, { value: "FIXED", label: "Fixed Amount (AED)" }, { value: "BUY_X_GET_Y", label: "Buy X Get Y" }] },
        { key: "value", label: "Value", type: "number", required: true },
        { key: "validFrom", label: "Valid From", type: "text", placeholder: "YYYY-MM-DD" },
        { key: "validTo", label: "Valid To", type: "text", placeholder: "YYYY-MM-DD" },
        { key: "isActive", label: "Active", type: "toggle" },
      ]}
    />
  );
}
