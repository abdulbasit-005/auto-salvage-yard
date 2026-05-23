import { DashboardHero } from "@/components/layout/dashboard-hero";
import { StatsCards } from "@/components/inventory/stats-cards";
import { RecentSales } from "@/components/inventory/recent-sales";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHero />
      <StatsCards />
      <RecentSales />
    </div>
  );
}
