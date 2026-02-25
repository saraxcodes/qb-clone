"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, ImagePlus, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

type SelectOption = { id: string; name: string };

export default function CreateProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Lookup data
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [brands, setBrands] = useState<SelectOption[]>([]);
  const [units, setUnits] = useState<SelectOption[]>([]);
  const [taxes, setTaxes] = useState<SelectOption[]>([]);
  const [charges, setCharges] = useState<SelectOption[]>([]);
  const [manufacturers, setManufacturers] = useState<SelectOption[]>([]);
  const [incomeHeads, setIncomeHeads] = useState<SelectOption[]>([]);

  // Form state
  const [form, setForm] = useState({
    name: "", description: "", sku: "", barcode: "", hsnCode: "",
    price: "", mrp: "", costPrice: "",
    size: "", color: "",
    categoryId: "", brandId: "", unitId: "", taxId: "", chargeId: "",
    manufacturerId: "", incomeHeadId: "",
    isActive: true, manageInventory: false, priceIncludesTax: false, autoBarcode: false,
  });

  const set = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    Promise.all([
      fetch("/api/catalog/categories").then(r => r.json()),
      fetch("/api/catalog/brands").then(r => r.json()),
      fetch("/api/catalog/units").then(r => r.json()),
      fetch("/api/catalog/taxes").then(r => r.json()),
      fetch("/api/catalog/charges").then(r => r.json()),
      fetch("/api/catalog/manufacturers").then(r => r.json()),
      fetch("/api/catalog/income-heads").then(r => r.json()),
    ]).then(([cats, brnds, unts, txs, chrgs, mfrs, ihs]) => {
      setCategories(Array.isArray(cats) ? cats : []);
      setBrands(Array.isArray(brnds) ? brnds : []);
      setUnits(Array.isArray(unts) ? unts : []);
      setTaxes(Array.isArray(txs) ? txs : []);
      setCharges(Array.isArray(chrgs) ? chrgs : []);
      setManufacturers(Array.isArray(mfrs) ? mfrs : []);
      setIncomeHeads(Array.isArray(ihs) ? ihs : []);
    });
  }, []);

  async function handleSave() {
    if (!form.name.trim()) { setError("Product name is required"); return; }
    setSaving(true); setError("");
    try {
      const res = await fetch("/api/catalog/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price) || 0,
          mrp: form.mrp ? parseFloat(form.mrp) : null,
          costPrice: parseFloat(form.costPrice) || 0,
          categoryId: form.categoryId || null,
          brandId: form.brandId || null,
          unitId: form.unitId || null,
          taxId: form.taxId || null,
          chargeId: form.chargeId || null,
          manufacturerId: form.manufacturerId || null,
          incomeHeadId: form.incomeHeadId || null,
        }),
      });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error || "Failed to create product");
        return;
      }
      setSuccess(true);
      setTimeout(() => router.push("/dashboard/catalog/products"), 1000);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-indigo-500/60 transition-colors";
  const selectClass = "w-full bg-[#0c0c16] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/60 transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-400 mb-1.5";
  const sectionClass = "rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 space-y-4";

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/catalog/products"
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.05] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <p className="text-xs text-zinc-500 mb-0.5">Catalog / Product</p>
            <h2 className="text-2xl font-black text-white tracking-tight">New Product</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/catalog/products"
            className="px-5 py-2.5 rounded-xl border border-white/[0.1] text-zinc-400 text-sm font-medium hover:bg-white/[0.05] transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={saving || success}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg shadow-indigo-500/20"
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : success ? <CheckCircle2 size={15} /> : <Save size={15} />}
            {success ? "Saved!" : saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
          <AlertCircle size={15} className="shrink-0" />
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left — Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className={sectionClass}>
            <div>
              <label className={labelClass}>Title <span className="text-red-400">*</span></label>
              <input type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Eg: Short Sleeve T-shirts" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Enter your text here" rows={4} className={inputClass + " resize-none"} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Measurement Unit</label>
                <select value={form.unitId} onChange={e => set("unitId", e.target.value)} className={selectClass}>
                  <option value="">Select...</option>
                  {units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select value={form.categoryId} onChange={e => set("categoryId", e.target.value)} className={selectClass}>
                  <option value="">Select...</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Brand</label>
                <select value={form.brandId} onChange={e => set("brandId", e.target.value)} className={selectClass}>
                  <option value="">Select...</option>
                  {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Manufacturer</label>
                <select value={form.manufacturerId} onChange={e => set("manufacturerId", e.target.value)} className={selectClass}>
                  <option value="">Select...</option>
                  {manufacturers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Income Head</label>
                <select value={form.incomeHeadId} onChange={e => set("incomeHeadId", e.target.value)} className={selectClass}>
                  <option value="">Select...</option>
                  {incomeHeads.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className={sectionClass}>
            <h3 className="text-sm font-semibold text-white">Pricing</h3>
            <div>
              <label className={labelClass}>Selling Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">AED</span>
                <input type="number" value={form.price} onChange={e => set("price", e.target.value)} placeholder="0.00" className={inputClass + " pl-14"} />
              </div>
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.priceIncludesTax}
                  onChange={e => set("priceIncludesTax", e.target.checked)}
                  className="rounded accent-indigo-500"
                />
                <span className="text-sm text-zinc-400">Price includes taxes</span>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>MRP</label>
                <input type="number" value={form.mrp} onChange={e => set("mrp", e.target.value)} placeholder="0.00" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Cost Price</label>
                <input type="number" value={form.costPrice} onChange={e => set("costPrice", e.target.value)} placeholder="0.00" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Taxes</label>
                <select value={form.taxId} onChange={e => set("taxId", e.target.value)} className={selectClass}>
                  <option value="">Select...</option>
                  {taxes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Charges</label>
                <select value={form.chargeId} onChange={e => set("chargeId", e.target.value)} className={selectClass}>
                  <option value="">Select...</option>
                  {charges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className={sectionClass}>
            <div className="flex items-start gap-6">
              <div className="flex-1 flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div>
                  <p className="text-sm font-semibold text-white">Available to Sell</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Make the product active and available for sell on stores</p>
                </div>
                <div
                  onClick={() => set("isActive", !form.isActive)}
                  className={clsx("w-12 h-6 rounded-full relative cursor-pointer transition-colors shrink-0 ml-4", form.isActive ? "bg-indigo-600" : "bg-white/10")}
                >
                  <div className={clsx("absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow", form.isActive ? "translate-x-6" : "translate-x-0.5")} />
                </div>
              </div>
              <div className="flex-1 flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div>
                  <p className="text-sm font-semibold text-white">Manage Inventory</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Manage stock levels, transfers and returns accurately</p>
                </div>
                <div
                  onClick={() => set("manageInventory", !form.manageInventory)}
                  className={clsx("w-12 h-6 rounded-full relative cursor-pointer transition-colors shrink-0 ml-4", form.manageInventory ? "bg-indigo-600" : "bg-white/10")}
                >
                  <div className={clsx("absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow", form.manageInventory ? "translate-x-6" : "translate-x-0.5")} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Additional Options */}
        <div className="space-y-6">
          {/* Image Upload */}
          <div className={sectionClass}>
            <h3 className="text-sm font-semibold text-white">Image</h3>
            <div className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-colors">
              <ImagePlus size={28} className="text-zinc-600" />
              <span className="text-xs text-zinc-500">Upload Image</span>
            </div>
          </div>

          {/* Additional Options */}
          <div className={sectionClass}>
            <h3 className="text-sm font-semibold text-white">Additional Options</h3>
            <div>
              <label className={labelClass}>Size</label>
              <input type="text" value={form.size} onChange={e => set("size", e.target.value)} placeholder="e.g. 1KG, 500ML" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Colour</label>
              <input type="text" value={form.color} onChange={e => set("color", e.target.value)} placeholder="e.g. Red, Blue" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>HSN/SAC Code</label>
              <input type="text" value={form.hsnCode} onChange={e => set("hsnCode", e.target.value)} placeholder="None" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>SKU</label>
              <input type="text" value={form.sku} onChange={e => set("sku", e.target.value)} placeholder="Type something" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Barcode</label>
              <input type="text" value={form.barcode} onChange={e => set("barcode", e.target.value)} placeholder="Enter barcode manually" className={inputClass} disabled={form.autoBarcode} />
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.autoBarcode}
                  onChange={e => set("autoBarcode", e.target.checked)}
                  className="rounded accent-indigo-500"
                />
                <span className="text-sm text-zinc-400">Automatically generate barcode</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
