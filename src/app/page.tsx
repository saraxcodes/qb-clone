import { CheckCircle2, ChevronRight, BarChart3, Users, Box, ShoppingCart, Smartphone, Receipt } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-lg tracking-tighter">QB</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">QueueBuster</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <button className="bg-white text-black px-5 py-2.5 rounded-full font-semibold hover:bg-zinc-200 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] -z-10 opacity-50" />
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-indigo-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            The Next Generation POS
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-tight">
            Manage your business
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              beautifully.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade point of sale, inventory management, and eStore solutions—all in one elegant platform designed for modern retailers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Start Free Trial <ChevronRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white font-semibold text-lg hover:bg-white/20 transition-colors border border-white/10">
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 border-t border-white/10 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Everything you need.</h2>
            <p className="text-xl text-zinc-400 max-w-2xl">A complete ecosystem to run your retail operations flawlessly, from the storefront to the warehouse.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Box className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Catalog & Inventory</h3>
              <p className="text-zinc-400 leading-relaxed">Manage thousands of SKUs effortlessly. Track stock levels in real-time across multiple locations with barcode support.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart POS</h3>
              <p className="text-zinc-400 leading-relaxed">Lightning-fast billing on any device. Works offline and syncs automatically. Process payments, split bills, and apply discounts.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant eStore</h3>
              <p className="text-zinc-400 leading-relaxed">Take your business online in seconds. Your catalog automatically syncs to a beautiful, SEO-optimized e-commerce storefront.</p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Receipt className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Khata & Ledger</h3>
              <p className="text-zinc-400 leading-relaxed">Keep track of customer credit, supplier dues, and cash flow. Send automated payment reminders via WhatsApp.</p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer CRM</h3>
              <p className="text-zinc-400 leading-relaxed">Build loyalty with targeted marketing. Track purchase history, issue store credit, and manage membership programs.</p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Deep Analytics</h3>
              <p className="text-zinc-400 leading-relaxed">Make data-driven decisions with beautiful, real-time dashboards covering sales trends, top products, and staff performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-zinc-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-xs">QB</span>
            </div>
            <span className="font-semibold">QueueBuster</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p>© 2026 QueueBuster Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
