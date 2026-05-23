"use client";

import { usePathname } from "next/navigation";
import { Menu, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInventory } from "@/components/providers/inventory-provider";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/vehicles": "Vehicles",
  "/parts": "Parts",
  "/sales": "Sales",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/vehicles")) return "Vehicles";
  if (pathname.startsWith("/parts")) return "Parts";
  return "Salvage Yard";
}

interface AppHeaderProps {
  onMenuClick: () => void;
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  const { reset } = useInventory();
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  function handleReset() {
    if (
      confirm(
        "Reset all inventory to sample data? This cannot be undone."
      )
    ) {
      reset();
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-md lg:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="size-5" />
        </Button>
        <div className="hidden lg:block">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Current section
          </p>
          <p className="font-heading text-sm font-semibold tracking-wide">
            {title}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-foreground">
        <RotateCcw className="size-4" />
        <span className="hidden sm:inline">Reset demo</span>
      </Button>
    </header>
  );
}
