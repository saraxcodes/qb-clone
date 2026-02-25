"use client";
import CatalogListPage from "@/components/catalog/CatalogListPage";
export default function ChargesPage() {
  return (
    <CatalogListPage
      title="Charges"
      subtitle="Manage additional charges applied to products"
      apiPath="charges"
      addTitle="Add Charge"
      editTitle="Edit Charge"
      addLabel="Add Charge"
      columns={[
        { key: "name", label: "Charge Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
        { key: "amount", label: "Amount", render: (r) => <span className="text-orange-400 font-bold">{r.amount}{r.type === "PERCENTAGE" ? "%" : " AED"}</span> },
        { key: "type", label: "Type", render: (r) => <span className="px-2 py-0.5 rounded-full text-xs bg-white/[0.06] text-zinc-400">{r.type}</span> },
        { key: "createdAt", label: "Created", render: (r) => new Date(r.createdAt).toLocaleDateString() },
      ]}
      fields={[
        { key: "name", label: "Charge Name", placeholder: "e.g. Delivery Fee", required: true },
        { key: "amount", label: "Amount", type: "number", placeholder: "10", required: true },
        { key: "type", label: "Type", type: "select", options: [{ value: "PERCENTAGE", label: "Percentage (%)" }, { value: "FIXED", label: "Fixed Amount" }] },
      ]}
    />
  );
}
