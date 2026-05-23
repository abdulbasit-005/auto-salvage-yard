"use client";

import { Eye, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import type { Vehicle } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { VehicleStatusBadge } from "./status-badge";
import { SellVehicleDialog } from "./sell-vehicle-dialog";

interface VehicleTableProps {
  vehicles: Vehicle[];
}

export function VehicleTable({ vehicles }: VehicleTableProps) {
  if (vehicles.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No parts linked to this vehicle yet.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Stock #</TableHead>
          <TableHead>Vehicle</TableHead>
          <TableHead>VIN</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">List Price</TableHead>
          <TableHead>Acquired</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell className="font-medium">{vehicle.stockNumber}</TableCell>
            <TableCell>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </TableCell>
            <TableCell className="font-mono text-xs">{vehicle.vin}</TableCell>
            <TableCell>{vehicle.yardLocation}</TableCell>
            <TableCell>
              <VehicleStatusBadge status={vehicle.status} />
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(vehicle.listPrice)}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(vehicle.acquiredAt)}
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-1">
                <ButtonLink
                  variant="ghost"
                  size="icon-sm"
                  href={`/vehicles/${vehicle.id}`}
                >
                  <Eye className="size-4" />
                </ButtonLink>
                <ButtonLink
                  variant="ghost"
                  size="icon-sm"
                  href={`/vehicles/${vehicle.id}/edit`}
                >
                  <Pencil className="size-4" />
                </ButtonLink>
                <SellVehicleDialog
                  vehicle={vehicle}
                  trigger={
                    <Button size="sm" variant="outline">
                      Sell
                    </Button>
                  }
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
