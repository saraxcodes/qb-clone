"use client";

import { useState } from "react";
import { Store, Search } from "lucide-react";

export default function StorePricingPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold text-white">Assign Products to Store</h2>
        <p className="text-sm text-zinc-500 mt-0.5">Map products to specific stores and set per-store pricing</p>
      </div>

      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
          <Store size={24} className="text-indigo-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Store Product Mapping</h3>
        <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
          Select a store to assign products and manage per-store pricing. Products must be assigned to a store before they appear in that store's POS.
        </p>
        <p className="text-xs text-zinc-600">This feature will be available once you have products and multiple stores configured.</p>
      </div>
    </div>
  );
}
