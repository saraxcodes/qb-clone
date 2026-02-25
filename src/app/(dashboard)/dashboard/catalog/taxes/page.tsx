"use client";
import CatalogListPage from "@/components/catalog/CatalogListPage";
export default function TaxesPage() {
  return (
    <CatalogListPage
      title="Taxes"
      subtitle="Manage tax rates applied to products"
      apiPath="taxes"
      addTitle="Add Tax"
      editTitle="Edit Tax"
      addLabel="Add Tax"
      columns={[
        { key: "name", label: "Tax Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
        { key: "rate", label: "Rate", render: (r) => <span className="text-indigo-400 font-bold">{r.rate}{r.type === "PERCENTAGE" ? "%" : " AED"}</span> },
        { key: "type", label: "Type", render: (r) => <span className="px-2 py-0.5 rounded-full text-xs bg-white/[0.06] text-zinc-400">{r.type}</span> },
        { key: "createdAt", label: "Created", render: (r) => new Date(r.createdAt).toLocaleDateString() },
      ]}
      fields={[
        { key: "name", label: "Tax Name", placeholder: "e.g. VAT 5%", required: true },
        { key: "rate", label: "Rate", type: "number", placeholder: "5", required: true },
        { key: "type", label: "Type", type: "select", options: [{ value: "PERCENTAGE", label: "Percentage (%)" }, { value: "FIXED", label: "Fixed Amount" }] },
      ]}
    />
  );
}
