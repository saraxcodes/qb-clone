"use client";
import CatalogListPage from "@/components/catalog/CatalogListPage";
export default function VouchersPage() {
  return (
    <CatalogListPage
      title="Vouchers"
      subtitle="Manage discount vouchers and coupon codes"
      apiPath="vouchers"
      addTitle="Add Voucher"
      editTitle="Edit Voucher"
      addLabel="Add Voucher"
      columns={[
        { key: "code", label: "Code", render: (r) => <span className="font-mono text-indigo-400 font-bold">{r.code}</span> },
        { key: "name", label: "Name", render: (r) => r.name },
        { key: "value", label: "Value", render: (r) => <span className="text-emerald-400 font-bold">{r.value}{r.type === "PERCENTAGE" ? "%" : " AED"}</span> },
        { key: "usedCount", label: "Used", render: (r) => `${r.usedCount}${r.maxUses ? `/${r.maxUses}` : ""}` },
        { key: "isActive", label: "Status", render: (r) => <span className={`px-2 py-0.5 rounded-full text-xs ${r.isActive ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-500/10 text-zinc-500"}`}>{r.isActive ? "Active" : "Inactive"}</span> },
      ]}
      fields={[
        { key: "name", label: "Voucher Name", required: true },
        { key: "code", label: "Coupon Code", placeholder: "SAVE10", required: true },
        { key: "type", label: "Type", type: "select", options: [{ value: "PERCENTAGE", label: "Percentage (%)" }, { value: "FIXED", label: "Fixed Amount (AED)" }] },
        { key: "value", label: "Value", type: "number", required: true },
        { key: "minOrderValue", label: "Min Order Value (AED)", type: "number" },
        { key: "maxUses", label: "Max Uses (leave blank for unlimited)", type: "number" },
        { key: "validFrom", label: "Valid From", type: "text", placeholder: "YYYY-MM-DD" },
        { key: "validTo", label: "Valid To", type: "text", placeholder: "YYYY-MM-DD" },
        { key: "isActive", label: "Active", type: "toggle" },
      ]}
    />
  );
}
