import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Oswald } from "next/font/google";
import { InventoryProvider } from "@/components/providers/inventory-provider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auto Salvage | Inventory System",
  description:
    "Professional salvage yard management — vehicles, parts inventory, and sales tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${dmSans.variable} ${oswald.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <InventoryProvider>{children}</InventoryProvider>
      </body>
    </html>
  );
}
