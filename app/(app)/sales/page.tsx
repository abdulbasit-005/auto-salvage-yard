"use client";

import { useMemo, useState } from "react";
import { DollarSign, Receipt } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInventory } from "@/components/providers/inventory-provider";
import { PAYMENT_METHODS } from "@/lib/constants";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { SaleTypeBadge } from "@/components/inventory/status-badge";
import { cn } from "@/lib/utils";

export default function SalesPage() {
  const { state } = useInventory();
  const [typeFilter, setTypeFilter] = useState("all");

  const sortedSales = useMemo(() => {
    const sales = [...state.sales].sort(
      (a, b) => new Date(b.soldAt).getTime() - new Date(a.soldAt).getTime()
    );
    if (typeFilter === "all") return sales;
    return sales.filter((s) => s.type === typeFilter);
  }, [state.sales, typeFilter]);

  const totalFiltered = sortedSales.reduce((sum, s) => sum + s.amount, 0);
  const totalAll = state.sales.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales History"
        description={`${state.sales.length} transactions recorded`}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-card shadow-lg">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20">
              <DollarSign className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Total Revenue
              </p>
              <p className="font-heading text-2xl font-bold text-primary">
                {formatCurrency(totalAll)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/80 shadow-lg">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
              <Receipt className="size-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Filtered Total
              </p>
              <p className="font-heading text-2xl font-bold">
                {formatCurrency(totalFiltered)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border-border/50 bg-card/80 shadow-lg">
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Select
            value={typeFilter}
            onValueChange={(v) => setTypeFilter(v ?? "all")}
          >
            <SelectTrigger className="w-full border-border/50 bg-background/50 sm:w-44">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="vehicle">Vehicles only</SelectItem>
              <SelectItem value="part">Parts only</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="border-border/50 bg-card/80 shadow-lg">
        <CardContent className="pt-6">
          {sortedSales.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No sales recorded yet.
            </p>
          ) : (
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSales.map((sale, i) => (
                  <TableRow
                    key={sale.id}
                    className={cn(
                      "border-border/30",
                      i % 2 === 0 ? "bg-muted/15" : ""
                    )}
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
                      {PAYMENT_METHODS.find(
                        (m) => m.value === sale.paymentMethod
                      )?.label ?? sale.paymentMethod}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      {formatCurrency(sale.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
