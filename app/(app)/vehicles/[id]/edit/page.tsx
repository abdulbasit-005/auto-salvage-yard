"use client";

import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { DeleteVehicleButton } from "@/components/inventory/delete-vehicle-button";
import { VehicleForm } from "@/components/inventory/vehicle-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import { useInventory } from "@/components/providers/inventory-provider";
import { getVehicleById } from "@/lib/inventory-store";

export default function EditVehiclePage() {
  const params = useParams();
  const id = params.id as string;
  const { state } = useInventory();
  const vehicle = getVehicleById(state, id);

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
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Edit Vehicle"
        description={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        backHref={`/vehicles/${vehicle.id}`}
      />
      <VehicleForm vehicle={vehicle} mode="edit" />
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-destructive">
            Danger zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Permanently remove this vehicle from inventory. Linked parts become
            standalone stock.
          </p>
          <DeleteVehicleButton vehicle={vehicle} />
        </CardContent>
      </Card>
    </div>
  );
}
