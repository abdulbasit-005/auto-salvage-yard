"use client";

import { useParams } from "next/navigation";
import { Plus, Pencil } from "lucide-react";
import { PartTable } from "@/components/inventory/part-table";
import { SellVehicleDialog } from "@/components/inventory/sell-vehicle-dialog";
import { VehicleStatusBadge } from "@/components/inventory/status-badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { useInventory } from "@/components/providers/inventory-provider";
import { getPartsForVehicle, getVehicleById } from "@/lib/inventory-store";
import { getVehicleImageUrl } from "@/lib/images";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function VehicleDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { state } = useInventory();
  const vehicle = getVehicleById(state, id);
  const parts = getPartsForVehicle(state, id);

  if (!vehicle) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Vehicle not found.</p>
        <ButtonLink className="mt-4" href="/vehicles">
          Back to Vehicles
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
        <ImageWithFallback
          src={getVehicleImageUrl(vehicle.make, vehicle.model)}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          containerClassName="aspect-[21/9] min-h-[220px]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-sm text-primary">
                {vehicle.stockNumber}
              </p>
              <h1 className="font-heading text-3xl font-bold uppercase tracking-wide sm:text-4xl">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <div className="mt-3">
                <VehicleStatusBadge status={vehicle.status} variant="overlay" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {vehicle.status !== "sold" && (
                <SellVehicleDialog vehicle={vehicle} />
              )}
              <ButtonLink
                variant="outline"
                href={`/vehicles/${vehicle.id}/edit`}
                className="border-primary/30 bg-background/50 backdrop-blur-sm"
              >
                <Pencil className="size-4" />
                Edit
              </ButtonLink>
              <ButtonLink href={`/parts/new?vehicleId=${vehicle.id}`}>
                <Plus className="size-4" />
                Add Part
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 bg-card/80 shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading uppercase tracking-wide">
              Vehicle Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                VIN
              </span>
              <p className="mt-1 font-mono">{vehicle.vin}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Color
              </span>
              <p className="mt-1">{vehicle.color}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Condition
              </span>
              <p className="mt-1">{vehicle.condition}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Yard Location
              </span>
              <p className="mt-1">{vehicle.yardLocation}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Purchase Price
              </span>
              <p className="mt-1">{formatCurrency(vehicle.purchasePrice)}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                List Price
              </span>
              <p className="mt-1 text-lg font-semibold text-primary">
                {formatCurrency(vehicle.listPrice)}
              </p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Acquired
              </span>
              <p className="mt-1">{formatDate(vehicle.acquiredAt)}</p>
            </div>
            {vehicle.notes && (
              <div className="sm:col-span-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Notes
                </span>
                <p className="mt-1">{vehicle.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/80 shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading uppercase tracking-wide">
              Parts Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-4xl font-bold text-primary">
              {parts.length}
            </p>
            <p className="text-sm text-muted-foreground">
              parts linked to this donor
            </p>
            <Separator className="my-4" />
            <p className="text-sm">
              <span className="text-muted-foreground">Available: </span>
              <span className="font-semibold text-emerald-400">
                {
                  parts.filter(
                    (p) => p.status === "available" && p.quantity > 0
                  ).length
                }
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/80 shadow-lg">
        <CardHeader>
          <CardTitle className="font-heading uppercase tracking-wide">
            Linked Parts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PartTable parts={parts} />
        </CardContent>
      </Card>
    </div>
  );
}
