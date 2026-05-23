import { DashboardHero } from "@/components/layout/dashboard-hero";
import { DashboardCharts } from "@/components/inventory/dashboard-charts";
import { LowStockAlert } from "@/components/inventory/low-stock-alert";
import { StatsCards } from "@/components/inventory/stats-cards";
import { RecentSales } from "@/components/inventory/recent-sales";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHero />
      <StatsCards />
      <DashboardCharts />
      <LowStockAlert />
      <RecentSales />
    </div>
  );
}
