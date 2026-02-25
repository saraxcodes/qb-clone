"use client";
import CatalogListPage from "@/components/catalog/CatalogListPage";
export default function ServicesPage() {
  return (
    <CatalogListPage
      title="Services"
      subtitle="Manage services offered by your business"
      apiPath="services"
      addTitle="Add Service"
      editTitle="Edit Service"
      addLabel="Add Service"
      columns={[
        { key: "name", label: "Service Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
        { key: "price", label: "Price", render: (r) => <span className="text-emerald-400 font-bold">AED {r.price.toFixed(2)}</span> },
        { key: "duration", label: "Duration", render: (r) => r.duration ? `${r.duration} min` : <span className="text-zinc-600">—</span> },
        { key: "serviceGroup", label: "Group", render: (r) => r.serviceGroup?.name || <span className="text-zinc-600">—</span> },
      ]}
      fields={[
        { key: "name", label: "Service Name", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "price", label: "Price (AED)", type: "number", placeholder: "0.00" },
        { key: "duration", label: "Duration (minutes)", type: "number" },
      ]}
    />
  );
}
