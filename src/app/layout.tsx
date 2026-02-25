import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QueueBuster — The OS for Modern Retail",
  description: "Enterprise POS, Inventory, eStore, CRM and Ledger — unified in one intelligent platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#080810] text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
