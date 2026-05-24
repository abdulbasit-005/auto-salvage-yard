"use client";

import { useMemo, useState } from "react";
import { DollarSign, Download, Receipt, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { SalesTable } from "@/components/inventory/sales-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInventory } from "@/components/providers/inventory-provider";
import {
  exportSalesToCsv,
  filterSales,
  type SalesDateFilter,
} from "@/lib/sales-utils";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export default function SalesPage() {
  const { state } = useInventory();
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<SalesDateFilter>("all");
  const [search, setSearch] = useState("");

  const sortedSales = useMemo(() => {
    const sales = [...state.sales].sort(
      (a, b) => new Date(b.soldAt).getTime() - new Date(a.soldAt).getTime()
    );
    return filterSales(sales, { typeFilter, dateFilter, search });
  }, [state.sales, typeFilter, dateFilter, search]);

  const totalFiltered = sortedSales.reduce((sum, s) => sum + s.amount, 0);
  const totalAll = state.sales.reduce((sum, s) => sum + s.amount, 0);

  function handleExport() {
    if (sortedSales.length === 0) {
      toast.error("No sales to export for the current filters");
      return;
    }
    exportSalesToCsv(sortedSales);
    toast.success(`Exported ${sortedSales.length} sales to CSV`);
  }

  return (
    <div className="min-w-0 space-y-6">
      <PageHeader
        title="Sales History"
        description={`${state.sales.length} transactions — click a row for details`}
        actions={
          <Button variant="outline" onClick={handleExport}>
            <Download className="size-4" />
            Export CSV
          </Button>
        }
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
        <CardContent className="flex flex-col gap-4 pt-6 lg:flex-row lg:flex-wrap lg:items-center">
          <div className="relative min-w-0 w-full flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary/60" />
            <Input
              placeholder="Search buyer, item, phone..."
              className="border-border/50 bg-background/50 pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            value={typeFilter}
            onValueChange={(v) => setTypeFilter(v ?? "all")}
          >
            <SelectTrigger className="w-full border-border/50 bg-background/50 sm:w-40">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="vehicle">Vehicles only</SelectItem>
              <SelectItem value="part">Parts only</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={dateFilter}
            onValueChange={(v) => setDateFilter((v ?? "all") as SalesDateFilter)}
          >
            <SelectTrigger className="w-full border-border/50 bg-background/50 sm:w-44">
              <SelectValue placeholder="All time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="month">This month</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="min-w-0 border-border/50 bg-card/80 shadow-lg">
        <CardContent className="min-w-0 overflow-x-auto pt-6">
          <SalesTable sales={sortedSales} />
        </CardContent>
      </Card>
    </div>
  );
}
