"use client";
import CatalogListPage from "@/components/catalog/CatalogListPage";
export default function SubCategoriesPage() {
  return (
    <CatalogListPage
      title="Sub Categories"
      subtitle="Manage product sub-categories"
      apiPath="categories"
      addTitle="Add Sub Category"
      editTitle="Edit Sub Category"
      addLabel="Add Sub Category"
      columns={[
        { key: "name", label: "Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
        { key: "parent", label: "Parent Category", render: (r) => r.parent?.name || <span className="text-zinc-500 text-xs">No parent (Root)</span> },
        { key: "_count", label: "Products", render: (r) => r._count?.products || 0 },
      ]}
      fields={[
        { key: "name", label: "Sub Category Name", placeholder: "e.g. Hybrid Seeds", required: true },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
