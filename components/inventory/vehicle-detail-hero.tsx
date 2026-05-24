"use client";

import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { SellVehicleDialog } from "@/components/inventory/sell-vehicle-dialog";
import { VehicleStatusBadge } from "@/components/inventory/status-badge";
import { getVehicleImageUrl } from "@/lib/images";
import type { Vehicle } from "@/lib/types";

interface VehicleDetailHeroProps {
  vehicle: Vehicle;
}

function VehicleActions({
  vehicle,
  className,
}: {
  vehicle: Vehicle;
  className?: string;
}) {
  return (
    <div className={className}>
      {vehicle.status !== "sold" && (
        <SellVehicleDialog
          vehicle={vehicle}
          trigger={<Button className="w-full sm:w-auto">Sell Vehicle</Button>}
        />
      )}
      <ButtonLink
        variant="outline"
        href={`/vehicles/${vehicle.id}/edit`}
        className="w-full justify-center border-primary/30 sm:w-auto sm:bg-background/50 sm:backdrop-blur-sm"
      >
        <Pencil className="size-4" />
        Edit
      </ButtonLink>
      <ButtonLink
        href={`/parts/new?vehicleId=${vehicle.id}`}
        className="w-full justify-center sm:w-auto"
      >
        <Plus className="size-4" />
        Add Part
      </ButtonLink>
    </div>
  );
}

export function VehicleDetailHero({ vehicle }: VehicleDetailHeroProps) {
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  return (
    <section className="max-w-full overflow-hidden rounded-2xl border border-border/50 bg-card/90 shadow-2xl">
      {/* Mobile: image + solid info panel (matches vehicle card rhythm) */}
      <div className="sm:hidden">
        <div className="relative">
          <ImageWithFallback
            src={getVehicleImageUrl(vehicle.make, vehicle.model)}
            alt={title}
            containerClassName="aspect-[16/10]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
          <div className="absolute right-3 top-3 z-10">
            <VehicleStatusBadge status={vehicle.status} variant="overlay" />
          </div>
        </div>
        <div className="space-y-4 border-t border-border/50 p-4">
          <div>
            <p className="font-mono text-xs text-primary">{vehicle.stockNumber}</p>
            <h1 className="mt-1 font-heading text-2xl font-bold uppercase leading-tight tracking-wide">
              {title}
            </h1>
          </div>
          <VehicleActions
            vehicle={vehicle}
            className="grid grid-cols-2 gap-2 [&>*:first-child]:col-span-2"
          />
        </div>
      </div>

      {/* Desktop: wide cinematic banner */}
      <div className="relative hidden sm:block">
        <ImageWithFallback
          src={getVehicleImageUrl(vehicle.make, vehicle.model)}
          alt={title}
          containerClassName="aspect-[21/9] min-h-[220px]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="flex items-end justify-between gap-6">
            <div className="min-w-0">
              <p className="font-mono text-sm text-primary">{vehicle.stockNumber}</p>
              <h1 className="mt-1 font-heading text-4xl font-bold uppercase tracking-wide">
                {title}
              </h1>
              <div className="mt-3">
                <VehicleStatusBadge status={vehicle.status} variant="overlay" />
              </div>
            </div>
            <VehicleActions
              vehicle={vehicle}
              className="flex shrink-0 flex-wrap justify-end gap-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
