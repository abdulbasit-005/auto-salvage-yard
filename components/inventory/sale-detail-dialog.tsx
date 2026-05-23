"use client";

import {
  Calendar,
  Car,
  CreditCard,
  ExternalLink,
  Package,
  Phone,
  Printer,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Separator } from "@/components/ui/separator";
import { useInventory } from "@/components/providers/inventory-provider";
import {
  getPartById,
  getVehicleById,
} from "@/lib/inventory-store";
import { PAYMENT_METHODS } from "@/lib/constants";
import type { Sale } from "@/lib/types";
import { printSaleReceipt } from "@/lib/sales-utils";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import { SaleTypeBadge } from "./status-badge";

interface SaleDetailDialogProps {
  sale: Sale | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaleDetailDialog({
  sale,
  open,
  onOpenChange,
}: SaleDetailDialogProps) {
  const { state } = useInventory();

  if (!sale) return null;

  const paymentLabel =
    PAYMENT_METHODS.find((m) => m.value === sale.paymentMethod)?.label ??
    sale.paymentMethod;

  const vehicle =
    sale.type === "vehicle" ? getVehicleById(state, sale.itemId) : undefined;
  const part =
    sale.type === "part" ? getPartById(state, sale.itemId) : undefined;

  const itemHref =
    sale.type === "vehicle" && vehicle
      ? `/vehicles/${vehicle.id}`
      : part
        ? `/parts/${part.id}/edit`
        : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border/50 bg-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl uppercase tracking-wide">
            Sale Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SaleTypeBadge type={sale.type} />
            <p className="font-mono text-xs text-muted-foreground">
              #{sale.id.slice(0, 8).toUpperCase()}
            </p>
          </div>

          <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Item sold
            </p>
            <p className="mt-1 font-medium leading-snug">{sale.itemLabel}</p>
            {itemHref && (
              <ButtonLink
                variant="outline"
                size="sm"
                href={itemHref}
                className="mt-3"
                onClick={() => onOpenChange(false)}
              >
                {sale.type === "vehicle" ? (
                  <Car className="size-3.5" />
                ) : (
                  <Package className="size-3.5" />
                )}
                View {sale.type === "vehicle" ? "vehicle" : "part"}
                <ExternalLink className="size-3" />
              </ButtonLink>
            )}
            {!itemHref && (
              <p className="mt-2 text-xs text-muted-foreground">
                Original inventory record no longer in yard
              </p>
            )}
          </div>

          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Sale amount
            </p>
            <p className="font-heading text-4xl font-bold text-primary">
              {formatCurrency(sale.amount)}
            </p>
          </div>

          <Separator className="bg-border/50" />

          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <User className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Buyer
                </dt>
                <dd className="mt-0.5 font-medium">{sale.buyerName}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Phone
                </dt>
                <dd className="mt-0.5 font-medium">
                  {sale.buyerPhone || "—"}
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <CreditCard className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Payment
                </dt>
                <dd className="mt-0.5 font-medium">{paymentLabel}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Calendar className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Date
                </dt>
                <dd className="mt-0.5 font-medium">{formatDate(sale.soldAt)}</dd>
                <dd className="text-xs text-muted-foreground">
                  {formatDateTime(sale.soldAt)}
                </dd>
              </div>
            </div>
          </dl>

          {vehicle && (
            <div className="rounded-lg border border-border/30 bg-background/50 p-3 text-sm">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Vehicle snapshot
              </p>
              <p className="mt-1">
                {vehicle.year} {vehicle.make} {vehicle.model} ·{" "}
                {vehicle.stockNumber}
              </p>
              <p className="text-muted-foreground">VIN: {vehicle.vin}</p>
            </div>
          )}

          {part && (
            <div className="rounded-lg border border-border/30 bg-background/50 p-3 text-sm">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Part snapshot
              </p>
              <p className="mt-1">{part.name}</p>
              <p className="text-muted-foreground">
                SKU: {part.sku} · {part.category}
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => printSaleReceipt(sale)}
            >
              <Printer className="size-4" />
              Print receipt
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
