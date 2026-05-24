"use client";

import { useParams } from "next/navigation";
import { PartTable } from "@/components/inventory/part-table";
import { VehicleDetailHero } from "@/components/inventory/vehicle-detail-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useInventory } from "@/components/providers/inventory-provider";
import { getPartsForVehicle, getVehicleById } from "@/lib/inventory-store";
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
    <div className="min-w-0 space-y-6">
      <VehicleDetailHero vehicle={vehicle} />

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
