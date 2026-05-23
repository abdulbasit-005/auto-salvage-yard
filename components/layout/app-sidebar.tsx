"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Car,
  LayoutDashboard,
  Package,
  Receipt,
  Warehouse,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getSidebarImageUrl } from "@/lib/images";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vehicles", label: "Vehicles", icon: Car },
  { href: "/parts", label: "Parts", icon: Package },
  { href: "/sales", label: "Sales", icon: Receipt },
];

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-gradient-to-b from-sidebar to-sidebar/90 text-sidebar-foreground shadow-xl transition-transform duration-200 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="border-b border-sidebar-border px-4 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
                <Warehouse className="size-5 text-primary" />
              </div>
              <div>
                <span className="font-heading text-lg font-semibold tracking-wide text-sidebar-foreground">
                  Auto Salvage
                </span>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Inventory System
                </p>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon-sm"
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "border-primary bg-sidebar-accent text-sidebar-accent-foreground"
                    : "border-transparent text-sidebar-foreground/70 hover:border-primary/40 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "size-4",
                    isActive ? "text-primary" : ""
                  )}
                />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="relative h-20 overflow-hidden rounded-lg">
            <Image
              src={getSidebarImageUrl()}
              alt="Salvage yard"
              fill
              className="object-cover"
              sizes="256px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sidebar to-transparent" />
            <p className="absolute bottom-2 left-2 text-[10px] text-sidebar-foreground/80">
              Demo · local storage
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
