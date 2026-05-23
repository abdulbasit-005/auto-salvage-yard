"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInventory } from "@/components/providers/inventory-provider";
import { getLowStockParts } from "@/lib/inventory-checks";

export function LowStockAlert() {
  const { state } = useInventory();
  const lowStock = getLowStockParts(state);

  if (lowStock.length === 0) return null;

  return (
    <Card className="border-amber-500/30 bg-amber-500/5 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-heading uppercase tracking-wide text-amber-400">
          <AlertTriangle className="size-5" />
          Low stock alert
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-3 text-sm text-muted-foreground">
          {lowStock.length} part{lowStock.length === 1 ? "" : "s"} with 2 or
          fewer units remaining
        </p>
        <ul className="space-y-2">
          {lowStock.slice(0, 5).map((part) => (
            <li key={part.id}>
              <Link
                href={`/parts/${part.id}/edit`}
                className="flex items-center justify-between rounded-lg border border-amber-500/20 bg-background/50 px-3 py-2 text-sm transition-colors hover:border-amber-500/40"
              >
                <span className="font-medium">{part.name}</span>
                <span className="font-mono text-amber-400">
                  Qty: {part.quantity}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {lowStock.length > 5 && (
          <Link
            href="/parts"
            className="mt-3 inline-block text-sm text-primary hover:underline"
          >
            View all parts →
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
