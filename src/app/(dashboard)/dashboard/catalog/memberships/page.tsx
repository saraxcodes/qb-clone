"use client";
import CatalogListPage from "@/components/catalog/CatalogListPage";
export default function MembershipsPage() {
  return (
    <CatalogListPage
      title="Memberships"
      subtitle="Manage customer membership plans"
      apiPath="memberships"
      addTitle="Add Membership"
      editTitle="Edit Membership"
      addLabel="Add Membership"
      columns={[
        { key: "name", label: "Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
        { key: "price", label: "Price", render: (r) => <span className="text-emerald-400 font-bold">AED {r.price.toFixed(2)}</span> },
        { key: "durationDays", label: "Duration", render: (r) => `${r.durationDays} days` },
        { key: "discountPct", label: "Discount", render: (r) => `${r.discountPct}%` },
        { key: "isActive", label: "Status", render: (r) => <span className={`px-2 py-0.5 rounded-full text-xs ${r.isActive ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-500/10 text-zinc-500"}`}>{r.isActive ? "Active" : "Inactive"}</span> },
      ]}
      fields={[
        { key: "name", label: "Membership Name", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "price", label: "Price (AED)", type: "number", required: true },
        { key: "durationDays", label: "Duration (days)", type: "number" },
        { key: "discountPct", label: "Discount (%)", type: "number" },
        { key: "isActive", label: "Active", type: "toggle" },
      ]}
    />
  );
}
