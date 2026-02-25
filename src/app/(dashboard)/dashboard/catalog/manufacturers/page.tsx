"use client";
import CatalogListPage from "@/components/catalog/CatalogListPage";
export default function ManufacturersPage() {
  return (
    <CatalogListPage
      title="Manufacturers"
      subtitle="Manage product manufacturers"
      apiPath="manufacturers"
      addTitle="Add Manufacturer"
      editTitle="Edit Manufacturer"
      addLabel="Add Manufacturer"
      columns={[
        { key: "name", label: "Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
        { key: "description", label: "Description", render: (r) => r.description || <span className="text-zinc-600">—</span> },
        { key: "_count", label: "Products", render: (r) => r._count?.products || 0 },
        { key: "createdAt", label: "Created", render: (r) => new Date(r.createdAt).toLocaleDateString() },
      ]}
      fields={[
        { key: "name", label: "Manufacturer Name", placeholder: "e.g. Syngenta", required: true },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
