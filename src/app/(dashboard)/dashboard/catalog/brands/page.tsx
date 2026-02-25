"use client";
import CatalogListPage from "@/components/catalog/CatalogListPage";
export default function BrandsPage() {
  return (
    <CatalogListPage
      title="Brands"
      subtitle="Manage your product brands"
      apiPath="brands"
      addTitle="Add Brand"
      editTitle="Edit Brand"
      addLabel="Add Brand"
      columns={[
        { key: "name", label: "Brand Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
        { key: "description", label: "Description", render: (r) => r.description || <span className="text-zinc-600">—</span> },
        { key: "_count", label: "Products", render: (r) => r._count?.products || 0 },
        { key: "createdAt", label: "Created", render: (r) => new Date(r.createdAt).toLocaleDateString() },
      ]}
      fields={[
        { key: "name", label: "Brand Name", placeholder: "e.g. Lotus", required: true },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
