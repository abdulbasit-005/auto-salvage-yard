"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3, Car, PieChart as PieChartIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useInventory } from "@/components/providers/inventory-provider";
import {
  formatChartCurrency,
  getRevenueByMonth,
  getSalesByType,
  getVehiclesByStatus,
} from "@/lib/chart-utils";
import { formatCurrency } from "@/lib/utils";

const revenueConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
};

function ChartsSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="h-[320px] animate-pulse rounded-xl border border-border/50 bg-muted/30 lg:col-span-2" />
      <div className="h-[320px] animate-pulse rounded-xl border border-border/50 bg-muted/30" />
      <div className="h-[240px] animate-pulse rounded-xl border border-border/50 bg-muted/30 lg:col-span-3" />
    </div>
  );
}

export function DashboardCharts() {
  const [mounted, setMounted] = useState(false);
  const { state } = useInventory();

  useEffect(() => {
    setMounted(true);
  }, []);

  const revenueData = getRevenueByMonth(state.sales);
  const salesByType = getSalesByType(state.sales);
  const vehiclesByStatus = getVehiclesByStatus(state);
  const hasRevenue = state.sales.length > 0;
  const totalInRange = revenueData.reduce((sum, m) => sum + m.revenue, 0);

  if (!mounted) {
    return <ChartsSkeleton />;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="border-border/50 bg-card/80 shadow-lg lg:col-span-2">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="flex items-center justify-between gap-2 font-heading text-lg uppercase tracking-wide">
            <span className="flex items-center gap-2">
              <BarChart3 className="size-5 text-primary" />
              Revenue by month
            </span>
            {hasRevenue ? (
              <span className="font-sans text-sm font-normal normal-case tracking-normal text-muted-foreground">
                {formatCurrency(totalInRange)} total
              </span>
            ) : null}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {!hasRevenue ? (
            <p className="flex aspect-[2/1] items-center justify-center text-sm text-muted-foreground">
              Record a sale to see revenue trends.
            </p>
          ) : (
            <ChartContainer config={revenueConfig} className="aspect-[2/1] w-full">
              <BarChart data={revenueData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={formatChartCurrency}
                  width={48}
                />
                <ChartTooltip
                  content={({ active, payload, label }) => (
                    <ChartTooltipContent
                      active={active}
                      label={label != null ? String(label) : undefined}
                      payload={
                        payload?.map((p) => ({
                          name: "Revenue",
                          value: p.value as number,
                          color: "var(--chart-1)",
                        })) ?? []
                      }
                      valueFormatter={(v) => formatCurrency(v)}
                    />
                  )}
                />
                <Bar
                  dataKey="revenue"
                  fill="var(--chart-1)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={56}
                />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 shadow-lg">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="flex items-center gap-2 font-heading text-lg uppercase tracking-wide">
            <PieChartIcon className="size-5 text-primary" />
            Sales mix
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {salesByType.length === 0 ? (
            <p className="flex aspect-square max-h-[280px] items-center justify-center text-sm text-muted-foreground">
              No sales yet.
            </p>
          ) : (
            <ChartContainer
              config={Object.fromEntries(
                salesByType.map((d) => [d.name, { label: d.name, color: d.fill }])
              )}
              className="mx-auto aspect-square max-h-[280px] w-full"
            >
              <PieChart>
                <ChartTooltip
                  content={({ active, payload }) => (
                    <ChartTooltipContent
                      active={active}
                      payload={
                        payload?.map((p) => ({
                          name: p.name != null ? String(p.name) : undefined,
                          value: p.value as number,
                          color: p.payload?.fill as string | undefined,
                        })) ?? []
                      }
                      valueFormatter={(v) => formatCurrency(v)}
                    />
                  )}
                />
                <Pie
                  data={salesByType}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="55%"
                  outerRadius="85%"
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {salesByType.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend content={<ChartLegend />} />
              </PieChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 shadow-lg lg:col-span-3">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="flex items-center gap-2 font-heading text-lg uppercase tracking-wide">
            <Car className="size-5 text-primary" />
            Fleet by status
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {vehiclesByStatus.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No vehicles in inventory.
            </p>
          ) : (
            <ChartContainer
              config={Object.fromEntries(
                vehiclesByStatus.map((d) => [d.name, { label: d.name, color: d.fill }])
              )}
              className="aspect-[3/1] w-full min-h-[200px]"
            >
              <BarChart
                data={vehiclesByStatus}
                layout="vertical"
                margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
              >
                <CartesianGrid horizontal={false} strokeDasharray="4 4" />
                <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  width={72}
                />
                <ChartTooltip
                  content={({ active, payload }) => (
                    <ChartTooltipContent
                      active={active}
                      payload={
                        payload?.map((p) => ({
                          name: "Vehicles",
                          value: p.value as number,
                          color: p.payload?.fill,
                        })) ?? []
                      }
                    />
                  )}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={32}>
                  {vehiclesByStatus.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
