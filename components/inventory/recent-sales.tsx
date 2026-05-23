"use client";

import { Receipt } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import { useInventory } from "@/components/providers/inventory-provider";
import { getDashboardStats } from "@/lib/inventory-store";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { SaleTypeBadge } from "./status-badge";
import { cn } from "@/lib/utils";

export function RecentSales() {
  const { state } = useInventory();
  const { recentSales } = getDashboardStats(state);

  return (
    <Card className="border-border/50 bg-card/80 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
        <CardTitle className="flex items-center gap-2 font-heading text-lg uppercase tracking-wide">
          <Receipt className="size-5 text-primary" />
          Recent Sales
        </CardTitle>
        <ButtonLink variant="outline" size="sm" href="/sales" className="border-primary/20">
          View all
        </ButtonLink>
      </CardHeader>
      <CardContent className="pt-4">
        {recentSales.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No sales recorded yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead>Item</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((sale, i) => (
                <TableRow
                  key={sale.id}
                  className={cn(
                    "border-border/30",
                    i % 2 === 0 ? "bg-muted/20" : ""
                  )}
                >
                  <TableCell className="max-w-[200px] truncate font-medium">
                    {sale.itemLabel}
                  </TableCell>
                  <TableCell>
                    <SaleTypeBadge type={sale.type} />
                  </TableCell>
                  <TableCell>{sale.buyerName}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    {formatCurrency(sale.amount)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatDateTime(sale.soldAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
