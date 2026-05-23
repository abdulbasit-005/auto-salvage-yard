"use client";

import { Car, DollarSign, Package, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useInventory } from "@/components/providers/inventory-provider";
import { getDashboardStats } from "@/lib/inventory-store";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const iconStyles = [
  "bg-amber-500/15 text-amber-400",
  "bg-emerald-500/15 text-emerald-400",
  "bg-blue-500/15 text-blue-400",
  "bg-violet-500/15 text-violet-400",
];

export function StatsCards() {
  const { state } = useInventory();
  const stats = getDashboardStats(state);

  const cards = [
    {
      title: "Vehicles in Yard",
      value: stats.vehiclesInYard.toString(),
      icon: Car,
      description: "In yard or stripped",
    },
    {
      title: "Available Parts",
      value: stats.availableParts.toString(),
      icon: Package,
      description: "Ready to sell",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      description: "All-time sales",
    },
    {
      title: "Total Sales",
      value: state.sales.length.toString(),
      icon: TrendingUp,
      description: "Transactions recorded",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <Card
          key={card.title}
          className="border-border/50 bg-card/80 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
        >
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {card.title}
                </p>
                <p className="mt-2 font-heading text-3xl font-bold tracking-tight">
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {card.description}
                </p>
              </div>
              <div
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl",
                  iconStyles[i]
                )}
              >
                <card.icon className="size-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
