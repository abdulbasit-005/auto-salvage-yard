"use client";

import { Pencil, Tag } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { useInventory } from "@/components/providers/inventory-provider";
import type { Part } from "@/lib/types";
import { getPartImageUrl } from "@/lib/images";
import { formatCurrency } from "@/lib/utils";
import { PartStatusBadge } from "./status-badge";
import { SellPartDialog } from "./sell-part-dialog";

interface PartCardProps {
  part: Part;
}

export function PartCard({ part }: PartCardProps) {
  const { state } = useInventory();

  const donor = part.vehicleId
    ? state.vehicles.find((v) => v.id === part.vehicleId)
    : null;
  const donorLabel = donor
    ? `${donor.year} ${donor.make} ${donor.model}`
    : "Standalone stock";

  return (
    <Card className="group overflow-hidden border-border/50 bg-card/90 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative">
        <ImageWithFallback
          src={getPartImageUrl(part.category, part.sku, part.name, part.id)}
          alt={part.name}
          containerClassName="aspect-[16/10]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/75 via-black/35 to-transparent" />
        <div className="absolute right-3 top-3 z-10">
          <PartStatusBadge status={part.status} variant="overlay" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-mono text-xs text-muted-foreground">{part.sku}</p>
          <h3 className="line-clamp-2 font-heading text-lg font-bold uppercase tracking-wide">
            {part.name}
          </h3>
        </div>
      </div>
      <CardContent className="space-y-2 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {part.category}
          </span>
          <span className="text-muted-foreground">Qty: {part.quantity}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Tag className="size-3 shrink-0" />
          <span className="truncate">{donorLabel}</span>
        </div>
        <p className="text-lg font-semibold text-primary">
          {formatCurrency(part.unitPrice)}
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            / unit
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 border-t border-border/50 bg-muted/20 pt-4">
        <ButtonLink
          variant="outline"
          size="sm"
          href={`/parts/${part.id}/edit`}
          className="flex-1"
        >
          <Pencil className="size-3.5" />
          Edit
        </ButtonLink>
        <SellPartDialog
          part={part}
          trigger={
            <Button size="sm" className="flex-1">
              Sell
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}
