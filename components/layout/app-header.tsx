"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
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
  const [resetOpen, setResetOpen] = useState(false);

  return (
    <>
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setResetOpen(true)}
          className="text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="size-4" />
          <span className="hidden sm:inline">Reset demo</span>
        </Button>
      </header>

      <ConfirmDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        title="Reset demo data?"
        description="This restores all vehicles, parts, and sales to the original sample inventory. Your current data will be lost."
        confirmLabel="Reset everything"
        variant="destructive"
        onConfirm={() => {
          reset();
          toast.success("Demo data restored");
        }}
      />
    </>
  );
}
