"use client";

import { Eye, MapPin, Pencil } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import type { Vehicle } from "@/lib/types";
import { getVehicleImageUrl } from "@/lib/images";
import { formatCurrency } from "@/lib/utils";
import { VehicleStatusBadge } from "./status-badge";
import { SellVehicleDialog } from "./sell-vehicle-dialog";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="group overflow-hidden border-border/50 bg-card/90 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative">
        <ImageWithFallback
          src={getVehicleImageUrl(vehicle.make, vehicle.model)}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          containerClassName="aspect-[16/10]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/75 via-black/35 to-transparent" />
        <div className="absolute right-3 top-3 z-10">
          <VehicleStatusBadge status={vehicle.status} variant="overlay" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-mono text-xs text-primary">{vehicle.stockNumber}</p>
          <h3 className="font-heading text-xl font-bold uppercase tracking-wide">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
        </div>
      </div>
      <CardContent className="space-y-2 pt-4">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-primary/80" />
          {vehicle.yardLocation}
        </div>
        <p className="text-lg font-semibold text-primary">
          {formatCurrency(vehicle.listPrice)}
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            list
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 border-t border-border/50 bg-muted/20 pt-4">
        <ButtonLink
          variant="outline"
          size="sm"
          href={`/vehicles/${vehicle.id}`}
          className="flex-1"
        >
          <Eye className="size-3.5" />
          View
        </ButtonLink>
        <ButtonLink
          variant="ghost"
          size="icon-sm"
          href={`/vehicles/${vehicle.id}/edit`}
        >
          <Pencil className="size-3.5" />
        </ButtonLink>
        <SellVehicleDialog
          vehicle={vehicle}
          trigger={
            <Button size="sm" className="flex-1">
              Sell
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}
