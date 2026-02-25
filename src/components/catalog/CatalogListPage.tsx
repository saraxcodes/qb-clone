"use client";

import { useState, useEffect, useCallback } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import DataTable, { Column } from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";
import clsx from "clsx";

type Field = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "toggle";
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
};

type Props = {
  title: string;
  subtitle?: string;
  apiPath: string;
  columns: Column<any>[];
  fields: Field[];
  addLabel?: string;
  editTitle?: string;
  addTitle?: string;
};

export default function CatalogListPage({
  title, subtitle, apiPath, columns, fields, addLabel = "Add New",
  editTitle = "Edit", addTitle = "Add New",
}: Props) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{ open: boolean; mode: "add" | "edit"; item?: any }>({ open: false, mode: "add" });
  const [form, setForm] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/catalog/${apiPath}`);
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [apiPath]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = data.filter((item) =>
    !search || item.name?.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm({});
    setError("");
    setModal({ open: true, mode: "add" });
  };

  const openEdit = (item: any) => {
    setForm({ ...item });
    setError("");
    setModal({ open: true, mode: "edit", item });
  };

  const closeModal = () => setModal({ open: false, mode: "add" });

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const url = modal.mode === "edit"
        ? `/api/catalog/${apiPath}/${modal.item.id}`
        : `/api/catalog/${apiPath}`;
      const method = modal.mode === "edit" ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error || "Something went wrong");
        return;
      }
      await fetchData();
      closeModal();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    await fetch(`/api/catalog/${apiPath}/${item.id}`, { method: "DELETE" });
    await fetchData();
  };

  const allColumns: Column<any>[] = [
    ...columns,
  ];

  return (
    <>
      <DataTable
        title={title}
        subtitle={subtitle}
        columns={allColumns}
        data={filtered}
        loading={loading}
        onAdd={openAdd}
        addLabel={addLabel}
        onSearch={setSearch}
        searchPlaceholder={`Search ${title.toLowerCase()}...`}
        actions={[
          { label: "Edit", icon: Edit, onClick: openEdit },
          { label: "Delete", icon: Trash2, onClick: handleDelete, danger: true },
        ]}
      />

      <Modal
        open={modal.open}
        onClose={closeModal}
        title={modal.mode === "add" ? addTitle : editTitle}
        size="md"
      >
        <div className="space-y-4">
          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  value={form[field.key] || ""}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-indigo-500/60 transition-colors resize-none"
                />
              ) : field.type === "select" ? (
                <select
                  value={form[field.key] || ""}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full bg-[#0f0f1e] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/60 transition-colors"
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === "toggle" ? (
                <div
                  onClick={() => setForm({ ...form, [field.key]: !form[field.key] })}
                  className={clsx(
                    "w-12 h-6 rounded-full relative cursor-pointer transition-colors",
                    form[field.key] ? "bg-indigo-600" : "bg-white/10"
                  )}
                >
                  <div className={clsx(
                    "absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow",
                    form[field.key] ? "translate-x-6" : "translate-x-0.5"
                  )} />
                </div>
              ) : (
                <input
                  type={field.type || "text"}
                  value={form[field.key] || ""}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-indigo-500/60 transition-colors"
                />
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <button
              onClick={closeModal}
              className="flex-1 py-3 rounded-xl border border-white/[0.1] text-zinc-400 text-sm font-medium hover:bg-white/[0.05] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>{modal.mode === "add" ? "Create" : "Save Changes"}</>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
