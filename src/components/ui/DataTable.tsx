"use client";

import { useState } from "react";
import { Search, Plus, Trash2, MoreHorizontal, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

export type Column<T> = {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

type Action<T> = {
  label: string;
  icon?: React.ElementType;
  onClick: (row: T) => void;
  danger?: boolean;
};

type Props<T extends { id: string }> = {
  title: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
  onAdd?: () => void;
  addLabel?: string;
  onSearch?: (q: string) => void;
  searchPlaceholder?: string;
  loading?: boolean;
  filters?: React.ReactNode;
  bulkActions?: React.ReactNode;
};

export default function DataTable<T extends { id: string }>({
  title, subtitle, columns, data, actions, onAdd, addLabel = "Add New",
  onSearch, searchPlaceholder = "Search...", loading, filters, bulkActions,
}: Props<T>) {
  const [selected, setSelected] = useState<string[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(data.length / perPage);
  const pageData = data.slice((page - 1) * perPage, page * perPage);

  const toggleAll = () =>
    setSelected(selected.length === pageData.length ? [] : pageData.map((r) => r.id));

  const toggleRow = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          {subtitle && <p className="text-sm text-zinc-500 mt-0.5">{subtitle}</p>}
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
          >
            <Plus size={16} />
            {addLabel}
          </button>
        )}
      </div>

      {/* Filters + Search */}
      <div className="flex items-center gap-3 flex-wrap">
        {filters}
        {onSearch && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] flex-1 min-w-[200px] max-w-sm">
            <Search size={14} className="text-zinc-500 shrink-0" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Bulk actions bar */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-sm">
          <span className="text-indigo-400 font-medium">{selected.length} selected</span>
          {bulkActions}
          <button
            onClick={() => setSelected([])}
            className="ml-auto text-zinc-500 hover:text-white text-xs"
          >
            Clear
          </button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/[0.07] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.length === pageData.length && pageData.length > 0}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-white/20 bg-transparent accent-indigo-500"
                  />
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={clsx("px-4 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap", col.className)}
                  >
                    {col.label}
                  </th>
                ))}
                {actions && <th className="px-4 py-3 w-12" />}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 2} className="py-16 text-center text-zinc-600 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-indigo-500/40 border-t-indigo-500 rounded-full animate-spin" />
                      Loading...
                    </div>
                  </td>
                </tr>
              ) : pageData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 2} className="py-16 text-center text-zinc-600 text-sm">
                    No records found
                  </td>
                </tr>
              ) : (
                pageData.map((row) => (
                  <tr
                    key={row.id}
                    className={clsx(
                      "border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors",
                      selected.includes(row.id) && "bg-indigo-500/5"
                    )}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                        className="w-4 h-4 rounded border-white/20 bg-transparent accent-indigo-500"
                      />
                    </td>
                    {columns.map((col) => (
                      <td key={col.key} className={clsx("px-4 py-3 text-zinc-300", col.className)}>
                        {col.render ? col.render(row) : (row as any)[col.key]}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-4 py-3">
                        <div className="relative">
                          <button
                            onClick={() => setOpenMenu(openMenu === row.id ? null : row.id)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.08] transition-colors"
                          >
                            <MoreHorizontal size={15} />
                          </button>
                          {openMenu === row.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                              <div className="absolute right-0 top-full mt-1 w-40 bg-[#141424] border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden py-1">
                                {actions.map((action, i) => {
                                  const Icon = action.icon;
                                  return (
                                    <button
                                      key={i}
                                      onClick={() => { action.onClick(row); setOpenMenu(null); }}
                                      className={clsx(
                                        "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-white/5",
                                        action.danger ? "text-red-400 hover:text-red-300" : "text-zinc-400 hover:text-white"
                                      )}
                                    >
                                      {Icon && <Icon size={14} />}
                                      {action.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06]">
            <p className="text-xs text-zinc-500">
              Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, data.length)} of {data.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={clsx(
                    "w-7 h-7 rounded-lg text-xs font-medium transition-colors",
                    p === page ? "bg-indigo-500/20 text-indigo-400" : "text-zinc-500 hover:text-white hover:bg-white/[0.06]"
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
