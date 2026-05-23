"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PAYMENT_METHODS } from "@/lib/constants";
import type { Sale } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { SaleTypeBadge } from "./status-badge";
import { SaleDetailDialog } from "./sale-detail-dialog";
import { cn } from "@/lib/utils";

interface SalesTableProps {
  sales: Sale[];
}

export function SalesTable({ sales }: SalesTableProps) {
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  if (sales.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No sales recorded yet.
      </p>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent">
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Buyer</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale, i) => (
            <TableRow
              key={sale.id}
              className={cn(
                "cursor-pointer border-border/30 transition-colors hover:bg-muted/30",
                i % 2 === 0 ? "bg-muted/15" : ""
              )}
              onClick={() => setSelectedSale(sale)}
            >
              <TableCell className="text-muted-foreground">
                {formatDateTime(sale.soldAt)}
              </TableCell>
              <TableCell>
                <SaleTypeBadge type={sale.type} />
              </TableCell>
              <TableCell className="max-w-[220px] truncate font-medium">
                {sale.itemLabel}
              </TableCell>
              <TableCell>{sale.buyerName}</TableCell>
              <TableCell className="text-muted-foreground">
                {sale.buyerPhone || "—"}
              </TableCell>
              <TableCell>
                {PAYMENT_METHODS.find((m) => m.value === sale.paymentMethod)
                  ?.label ?? sale.paymentMethod}
              </TableCell>
              <TableCell className="text-right font-semibold text-primary">
                {formatCurrency(sale.amount)}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSale(sale);
                  }}
                >
                  <Eye className="size-4" />
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <SaleDetailDialog
        sale={selectedSale}
        open={selectedSale !== null}
        onOpenChange={(open) => !open && setSelectedSale(null)}
      />
    </>
  );
}
