"use client";

import { Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ButtonLink } from "@/components/ui/button-link";
import { useInventory } from "@/components/providers/inventory-provider";
import type { Part } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { PartStatusBadge } from "./status-badge";
import { SellPartDialog } from "./sell-part-dialog";

interface PartTableProps {
  parts: Part[];
}

export function PartTable({ parts }: PartTableProps) {
  const { state } = useInventory();

  function getDonorLabel(vehicleId: string | null) {
    if (!vehicleId) return "Standalone";
    const vehicle = state.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return "Unknown";
    return `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  }

  if (parts.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No parts found. Add your first part to get started.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>SKU</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Donor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Qty</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parts.map((part) => (
          <TableRow key={part.id}>
            <TableCell className="font-mono text-xs">{part.sku}</TableCell>
            <TableCell className="font-medium">{part.name}</TableCell>
            <TableCell>{part.category}</TableCell>
            <TableCell className="text-muted-foreground">
              {getDonorLabel(part.vehicleId)}
            </TableCell>
            <TableCell>
              <PartStatusBadge status={part.status} />
            </TableCell>
            <TableCell className="text-right">{part.quantity}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(part.unitPrice)}
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-1">
                <ButtonLink
                  variant="ghost"
                  size="icon-sm"
                  href={`/parts/${part.id}/edit`}
                >
                  <Pencil className="size-4" />
                </ButtonLink>
                <SellPartDialog part={part} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
