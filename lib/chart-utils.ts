import type { InventoryState, Sale, SaleType, VehicleStatus } from "@/lib/types";

export interface MonthRevenueBucket {
  key: string;
  label: string;
  revenue: number;
  count: number;
}

export interface LabeledValue {
  name: string;
  value: number;
  fill: string;
}

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

function buildMonthRange(start: Date, end: Date, maxMonths = 12): MonthRevenueBucket[] {
  const buckets: MonthRevenueBucket[] = [];
  const cursor = startOfMonth(start);
  const endMonth = startOfMonth(end);

  while (cursor <= endMonth && buckets.length < maxMonths) {
    buckets.push({
      key: monthKey(cursor),
      label: monthLabel(cursor),
      revenue: 0,
      count: 0,
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return buckets;
}

export function getRevenueByMonth(sales: Sale[]): MonthRevenueBucket[] {
  const now = startOfMonth(new Date());

  if (sales.length === 0) {
    const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    return buildMonthRange(start, now);
  }

  const saleMonths = sales.map((s) => startOfMonth(new Date(s.soldAt)));
  const earliest = new Date(
    Math.min(...saleMonths.map((d) => d.getTime()))
  );
  const latestSale = new Date(Math.max(...saleMonths.map((d) => d.getTime())));
  const end = latestSale > now ? latestSale : now;

  const buckets = buildMonthRange(earliest, end);
  const bucketMap = new Map(buckets.map((b) => [b.key, b]));

  for (const sale of sales) {
    const key = monthKey(new Date(sale.soldAt));
    const bucket = bucketMap.get(key);
    if (bucket) {
      bucket.revenue += sale.amount;
      bucket.count += 1;
    }
  }

  return buckets;
}

export function getSalesByType(sales: Sale[]): LabeledValue[] {
  const totals: Record<SaleType, number> = { vehicle: 0, part: 0 };

  for (const sale of sales) {
    totals[sale.type] += sale.amount;
  }

  return [
    { name: "Vehicles", value: totals.vehicle, fill: CHART_COLORS[0] },
    { name: "Parts", value: totals.part, fill: CHART_COLORS[2] },
  ].filter((item) => item.value > 0);
}

const VEHICLE_STATUS_LABELS: Record<VehicleStatus, string> = {
  in_yard: "In yard",
  stripped: "Stripped",
  sold: "Sold",
  scrapped: "Scrapped",
};

export function getVehiclesByStatus(state: InventoryState): LabeledValue[] {
  const counts: Record<VehicleStatus, number> = {
    in_yard: 0,
    stripped: 0,
    sold: 0,
    scrapped: 0,
  };

  for (const vehicle of state.vehicles) {
    counts[vehicle.status] += 1;
  }

  return (Object.keys(counts) as VehicleStatus[])
    .map((status, index) => ({
      name: VEHICLE_STATUS_LABELS[status],
      value: counts[status],
      fill: CHART_COLORS[index % CHART_COLORS.length],
    }))
    .filter((item) => item.value > 0);
}

export function formatChartCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  }
  return `$${value}`;
}
