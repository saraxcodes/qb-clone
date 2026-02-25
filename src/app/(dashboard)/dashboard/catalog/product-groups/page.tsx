"use client";
import CatalogListPage from "@/components/catalog/CatalogListPage";
export default function ProductGroupsPage() {
  return (
    <CatalogListPage
      title="Product Groups"
      subtitle="Manage product groupings"
      apiPath="product-groups"
      addTitle="Add Product Group"
      editTitle="Edit Product Group"
      addLabel="Add Product Group"
      columns={[
        { key: "name", label: "Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
        { key: "description", label: "Description", render: (r) => r.description || <span className="text-zinc-600">—</span> },
        { key: "createdAt", label: "Created", render: (r) => new Date(r.createdAt).toLocaleDateString() },
      ]}
      fields={[
        { key: "name", label: "Group Name", required: true },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
