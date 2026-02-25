import Link from "next/link";
import {
  ChevronRight,
  BarChart3,
  Users,
  Box,
  ShoppingCart,
  Smartphone,
  Receipt,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Building2,
  Package,
  CreditCard,
  Layers,
} from "lucide-react";

const features = [
  {
    icon: Box,
    color: "blue",
    title: "Smart Catalog",
    desc: "Manage thousands of SKUs with variants, images, and pricing rules. Barcode generation built in.",
  },
  {
    icon: Package,
    color: "violet",
    title: "Inventory Control",
    desc: "Real-time stock tracking across all locations. Auto-reorder alerts so you never run out.",
  },
  {
    icon: Smartphone,
    color: "purple",
    title: "Lightning POS",
    desc: "Blazing fast billing on any device. Works offline, syncs instantly. Split bills, apply discounts.",
  },
  {
    icon: ShoppingCart,
    color: "pink",
    title: "Instant eStore",
    desc: "Your catalog goes online automatically. SEO-ready storefront with custom domain support.",
  },
  {
    icon: Receipt,
    color: "emerald",
    title: "Khata Ledger",
    desc: "Track customer credit and supplier dues. Auto WhatsApp reminders for outstanding payments.",
  },
  {
    icon: Users,
    color: "orange",
    title: "Customer CRM",
    desc: "Build loyalty with purchase history, store credit, and targeted marketing campaigns.",
  },
  {
    icon: BarChart3,
    color: "indigo",
    title: "Deep Analytics",
    desc: "Real-time dashboards. Sales trends, top products, staff performance — all in one view.",
  },
  {
    icon: Building2,
    color: "teal",
    title: "Multi-Branch",
    desc: "Manage unlimited locations from one dashboard. Consolidated or per-branch reporting.",
  },
];

const stats = [
  { value: "50K+", label: "Businesses" },
  { value: "120M+", label: "Transactions" },
  { value: "99.9%", label: "Uptime" },
  { value: "180+", label: "Countries" },
];

const steps = [
  {
    step: "01",
    title: "Sign Up in Seconds",
    desc: "Create your account and set up your first store. No credit card required to get started.",
  },
  {
    step: "02",
    title: "Add Your Products",
    desc: "Import your catalog via CSV or add products manually. Set prices, variants, and stock levels.",
  },
  {
    step: "03",
    title: "Start Selling",
    desc: "Open your POS, go live on eStore, and watch your analytics fill up in real time.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "29",
    desc: "Perfect for small retailers just getting started.",
    features: ["1 Store Location", "Up to 500 Products", "POS & Billing", "Basic Analytics", "Email Support"],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Pro",
    price: "79",
    desc: "For growing businesses that need more power.",
    features: ["5 Store Locations", "Unlimited Products", "POS + eStore + Khata", "Advanced Analytics", "CRM & Loyalty", "Priority Support"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "199",
    desc: "For large-scale operations with complex needs.",
    features: ["Unlimited Locations", "Unlimited Products", "All Modules Included", "Custom Integrations", "Dedicated Manager", "SLA Guarantee"],
    cta: "Contact Sales",
    highlight: false,
  },
];

const testimonials = [
  {
    name: "Ravi Sharma",
    role: "Owner, FreshMart",
    quote: "QueueBuster transformed how we run our 8 stores. The real-time sync across branches is a game changer.",
    stars: 5,
  },
  {
    name: "Fatima Al Zahra",
    role: "CEO, LuxeThreads",
    quote: "We went from manual Excel sheets to a fully digital operation in one week. The eStore alone doubled our revenue.",
    stars: 5,
  },
  {
    name: "David Osei",
    role: "Director, QuickBuy",
    quote: "The Khata module replaced three different tools we were using. Support team is incredibly responsive.",
    stars: 5,
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/15 text-blue-400",
  violet: "bg-violet-500/15 text-violet-400",
  purple: "bg-purple-500/15 text-purple-400",
  pink: "bg-pink-500/15 text-pink-400",
  emerald: "bg-emerald-500/15 text-emerald-400",
  orange: "bg-orange-500/15 text-orange-400",
  indigo: "bg-indigo-500/15 text-indigo-400",
  teal: "bg-teal-500/15 text-teal-400",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080810] text-white antialiased font-sans overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed w-full z-50 top-0 border-b border-white/[0.06] bg-[#080810]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="font-black text-sm tracking-tight">QB</span>
            </div>
            <span className="text-lg font-bold tracking-tight">QueueBuster</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors duration-200">How it Works</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-200">Pricing</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Docs</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="/login" className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">Sign in</a>
            <Link href="/register" className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-100 transition-colors shadow-lg">
              Start Free →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-44 pb-36 px-6 text-center overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px] -z-10" />
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm font-medium text-indigo-300 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Now with AI-powered analytics
          <ChevronRight className="w-3.5 h-3.5" />
        </div>

        <h1 className="text-6xl md:text-[90px] font-black tracking-[-3px] mb-6 leading-[0.95] max-w-5xl mx-auto">
          The OS for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
            modern retail
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          POS, Inventory, eStore, CRM and Ledger — unified in one intelligent platform built for enterprise scale.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-2xl shadow-indigo-500/30">
            Start for free <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-white font-semibold text-lg hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-2">
            Sign in <span className="text-indigo-400">▶</span>
          </Link>
        </div>

        {/* Dashboard mockup */}
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080810] z-10 pointer-events-none" style={{top: '60%'}} />
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10 bg-white/[0.03]">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="ml-4 flex-1 h-6 rounded-md bg-white/5 max-w-xs text-xs text-zinc-500 flex items-center px-3">
                mgadmin.queuebuster.co
              </div>
            </div>
            <div className="p-6 grid grid-cols-4 gap-4">
              {[
                { label: "Total Sales", value: "د.إ 84,320", change: "+12.4%" },
                { label: "Orders Today", value: "1,284", change: "+8.1%" },
                { label: "Active Products", value: "3,921", change: "+2.3%" },
                { label: "Customers", value: "12,405", change: "+5.7%" },
              ].map((card, i) => (
                <div key={i} className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-4">
                  <p className="text-xs text-zinc-500 mb-2">{card.label}</p>
                  <p className="text-xl font-bold text-white">{card.value}</p>
                  <p className="text-xs text-emerald-400 mt-1">{card.change} this month</p>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6 grid grid-cols-3 gap-4">
              <div className="col-span-2 rounded-xl bg-white/[0.04] border border-white/[0.08] p-4 h-32 flex items-end gap-1">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-indigo-600 to-purple-500 opacity-80" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-4 flex flex-col gap-2 justify-center">
                {["Cash", "Card", "Online"].map((m, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-zinc-400">{m}</span>
                    <span className="text-white font-medium">{["48%", "35%", "17%"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 mb-1">{s.value}</p>
              <p className="text-zinc-500 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Platform</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
              Everything. Unified.
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
              Stop juggling separate tools. QueueBuster gives you a complete operating system for your retail business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300 cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${colorMap[f.color]} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SAAS BADGE ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Multi-Tenant SaaS</span>
            </div>
            <h3 className="text-4xl font-black mb-4 tracking-tight">Built for scale from day one</h3>
            <p className="text-zinc-400 text-lg font-light leading-relaxed">
              Each business gets its own isolated workspace, data, and settings. White-label ready with custom domain support and full API access.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 min-w-[280px]">
            {[
              { icon: Shield, text: "Data Isolation" },
              { icon: Zap, text: "99.9% Uptime" },
              { icon: Globe, text: "Custom Domains" },
              { icon: CreditCard, text: "Flexible Billing" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium">
                  <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Process</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">Up and running in minutes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-indigo-500/50 to-transparent" />
                )}
                <div className="text-6xl font-black text-white/5 mb-4">{s.step}</div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-32 px-6 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Pricing</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">Simple, honest pricing</h2>
            <p className="text-zinc-400 text-xl font-light">14-day free trial. No credit card required. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {plans.map((plan, i) => (
              <div key={i} className={`rounded-2xl p-8 border ${plan.highlight ? "bg-gradient-to-b from-indigo-900/60 to-purple-900/40 border-indigo-500/40 shadow-2xl shadow-indigo-500/20 scale-105" : "bg-white/[0.03] border-white/[0.08]"}`}>
                {plan.highlight && (
                  <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-zinc-400 text-sm mb-6">{plan.desc}</p>
                <div className="flex items-end gap-1 mb-8">
                  <span className="text-5xl font-black">${plan.price}</span>
                  <span className="text-zinc-400 mb-1.5">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.cta === "Contact Sales" ? "/login" : "/register"}
                  className={`w-full py-3.5 rounded-full font-semibold transition-all text-center block ${plan.highlight ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-indigo-500/30" : "bg-white/5 border border-white/10 hover:bg-white/10"}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Testimonials</p>
            <h2 className="text-5xl font-black tracking-tight">Loved by retailers worldwide</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/15 transition-colors">
                <div className="flex gap-1 mb-6">
                  {Array(t.stars).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-zinc-300 leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-zinc-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-transparent -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px] -z-10" />
        <div className="max-w-3xl mx-auto">
          <TrendingUp className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Ready to scale your business?
          </h2>
          <p className="text-xl text-zinc-400 font-light mb-10">
            Join 50,000+ businesses already running on QueueBuster. Start your free 14-day trial today.
          </p>
          <Link href="/register" className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform inline-flex items-center gap-2 shadow-2xl">
            Get started for free <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-zinc-500 text-sm mt-4">No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="font-black text-xs">QB</span>
                </div>
                <span className="font-bold">QueueBuster</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                The complete operating system for modern retail businesses, built for enterprise scale.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Docs"] },
              { title: "Solutions", links: ["Retail", "Restaurant", "Pharmacy", "eCommerce"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            ].map((col, i) => (
              <div key={i}>
                <p className="font-semibold text-sm mb-4">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-zinc-500 text-sm hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm">
            <p>© 2026 QueueBuster. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
