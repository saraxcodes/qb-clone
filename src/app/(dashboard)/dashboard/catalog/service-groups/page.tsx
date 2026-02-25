"use client";
import CatalogListPage from "@/components/catalog/CatalogListPage";
export default function ServiceGroupsPage() {
  return (
    <CatalogListPage
      title="Service Groups"
      subtitle="Manage service classification groups"
      apiPath="service-groups"
      addTitle="Add Service Group"
      editTitle="Edit Service Group"
      addLabel="Add Service Group"
      columns={[
        { key: "name", label: "Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
        { key: "description", label: "Description", render: (r) => r.description || <span className="text-zinc-600">—</span> },
        { key: "createdAt", label: "Created", render: (r) => new Date(r.createdAt).toLocaleDateString() },
      ]}
      fields={[
        { key: "name", label: "Service Group Name", required: true },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
