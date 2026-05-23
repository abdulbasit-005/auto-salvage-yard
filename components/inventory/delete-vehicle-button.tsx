"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useInventory } from "@/components/providers/inventory-provider";
import { canDeleteVehicle } from "@/lib/inventory-checks";
import type { Vehicle } from "@/lib/types";

interface DeleteVehicleButtonProps {
  vehicle: Vehicle;
  redirectTo?: string;
}

export function DeleteVehicleButton({
  vehicle,
  redirectTo = "/vehicles",
}: DeleteVehicleButtonProps) {
  const router = useRouter();
  const { dispatch } = useInventory();
  const [open, setOpen] = useState(false);
  const check = canDeleteVehicle(vehicle);

  if (!check.ok) {
    return (
      <Button variant="destructive" size="sm" disabled title={check.message}>
        <Trash2 className="size-4" />
        Delete
      </Button>
    );
  }

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        <Trash2 className="size-4" />
        Delete
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete vehicle?"
        description={`Remove ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.stockNumber}) from inventory? Linked parts will become standalone stock.`}
        confirmLabel="Delete vehicle"
        variant="destructive"
        onConfirm={() => {
          dispatch({ type: "DELETE_VEHICLE", payload: { id: vehicle.id } });
          toast.success("Vehicle removed from inventory");
          router.push(redirectTo);
        }}
      />
    </>
  );
}
