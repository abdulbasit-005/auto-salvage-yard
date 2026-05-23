import { Badge } from "@/components/ui/badge";
import type { PartStatus, VehicleStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const vehicleStyles: Record<VehicleStatus, string> = {
  in_yard: "bg-emerald-500/20 text-emerald-300 ring-emerald-500/30",
  stripped: "bg-amber-500/20 text-amber-300 ring-amber-500/30",
  sold: "bg-blue-500/20 text-blue-300 ring-blue-500/30",
  scrapped: "bg-zinc-500/20 text-zinc-300 ring-zinc-500/30",
};

const vehicleOverlayStyles: Record<VehicleStatus, string> = {
  in_yard:
    "bg-emerald-600 text-white ring-1 ring-emerald-400/60 shadow-[0_2px_12px_rgba(0,0,0,0.55)]",
  stripped:
    "bg-amber-600 text-white ring-1 ring-amber-400/60 shadow-[0_2px_12px_rgba(0,0,0,0.55)]",
  sold: "bg-blue-600 text-white ring-1 ring-blue-400/60 shadow-[0_2px_12px_rgba(0,0,0,0.55)]",
  scrapped:
    "bg-zinc-600 text-white ring-1 ring-zinc-400/60 shadow-[0_2px_12px_rgba(0,0,0,0.55)]",
};

const partStyles: Record<PartStatus, string> = {
  available: "bg-emerald-500/20 text-emerald-300 ring-emerald-500/30",
  sold: "bg-blue-500/20 text-blue-300 ring-blue-500/30",
  reserved: "bg-amber-500/20 text-amber-300 ring-amber-500/30",
};

const partOverlayStyles: Record<PartStatus, string> = {
  available:
    "bg-emerald-600 text-white ring-1 ring-emerald-400/60 shadow-[0_2px_12px_rgba(0,0,0,0.55)]",
  sold: "bg-blue-600 text-white ring-1 ring-blue-400/60 shadow-[0_2px_12px_rgba(0,0,0,0.55)]",
  reserved:
    "bg-amber-600 text-white ring-1 ring-amber-400/60 shadow-[0_2px_12px_rgba(0,0,0,0.55)]",
};

const vehicleLabels: Record<VehicleStatus, string> = {
  in_yard: "In Yard",
  stripped: "Stripped",
  sold: "Sold",
  scrapped: "Scrapped",
};

const partLabels: Record<PartStatus, string> = {
  available: "Available",
  sold: "Sold",
  reserved: "Reserved",
};

type BadgeVariant = "default" | "overlay";

interface StatusBadgeProps {
  variant?: BadgeVariant;
  className?: string;
}

export function VehicleStatusBadge({
  status,
  variant = "default",
  className,
}: { status: VehicleStatus } & StatusBadgeProps) {
  const isOverlay = variant === "overlay";

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full border-0 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        isOverlay
          ? "px-3 py-1 backdrop-blur-sm"
          : "ring-1 ring-inset",
        isOverlay ? vehicleOverlayStyles[status] : vehicleStyles[status],
        className
      )}
    >
      {vehicleLabels[status]}
    </Badge>
  );
}

export function PartStatusBadge({
  status,
  variant = "default",
  className,
}: { status: PartStatus } & StatusBadgeProps) {
  const isOverlay = variant === "overlay";

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full border-0 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        isOverlay
          ? "px-3 py-1 backdrop-blur-sm"
          : "ring-1 ring-inset",
        isOverlay ? partOverlayStyles[status] : partStyles[status],
        className
      )}
    >
      {partLabels[status]}
    </Badge>
  );
}

export function SaleTypeBadge({ type }: { type: "vehicle" | "part" }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full border-0 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset",
        type === "vehicle"
          ? "bg-violet-500/20 text-violet-300 ring-violet-500/30"
          : "bg-cyan-500/20 text-cyan-300 ring-cyan-500/30"
      )}
    >
      {type === "vehicle" ? "Vehicle" : "Part"}
    </Badge>
  );
}
