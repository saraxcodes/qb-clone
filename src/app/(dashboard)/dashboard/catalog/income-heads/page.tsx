"use client";
import CatalogListPage from "@/components/catalog/CatalogListPage";
export default function IncomeHeadsPage() {
  return (
    <CatalogListPage
      title="Income Heads"
      subtitle="Manage income classification heads"
      apiPath="income-heads"
      addTitle="Add Income Head"
      editTitle="Edit Income Head"
      addLabel="Add Income Head"
      columns={[
        { key: "name", label: "Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
        { key: "description", label: "Description", render: (r) => r.description || <span className="text-zinc-600">—</span> },
        { key: "createdAt", label: "Created", render: (r) => new Date(r.createdAt).toLocaleDateString() },
      ]}
      fields={[
        { key: "name", label: "Income Head Name", required: true },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
