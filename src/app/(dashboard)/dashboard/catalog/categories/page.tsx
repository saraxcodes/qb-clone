"use client";
import CatalogListPage from "@/components/catalog/CatalogListPage";
export default function CategoriesPage() {
  return (
    <CatalogListPage
      title="Categories"
      subtitle="Manage your product categories"
      apiPath="categories"
      addTitle="Add Category"
      editTitle="Edit Category"
      addLabel="Add Category"
      columns={[
        { key: "name", label: "Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
        { key: "parent", label: "Parent", render: (r) => r.parent?.name || <span className="text-zinc-600">—</span> },
        { key: "_count", label: "Products", render: (r) => r._count?.products || 0 },
        { key: "createdAt", label: "Created", render: (r) => new Date(r.createdAt).toLocaleDateString() },
      ]}
      fields={[
        { key: "name", label: "Category Name", placeholder: "e.g. Seeds", required: true },
        { key: "description", label: "Description", type: "textarea", placeholder: "Optional description" },
      ]}
    />
  );
}
