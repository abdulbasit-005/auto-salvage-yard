"use client";

import { useMemo, useState } from "react";
import { Car, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { VehicleCard } from "@/components/inventory/vehicle-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { useInventory } from "@/components/providers/inventory-provider";
import { VEHICLE_STATUSES } from "@/lib/constants";

export default function VehiclesPage() {
  const { state } = useInventory();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return state.vehicles.filter((v) => {
      const matchesStatus =
        statusFilter === "all" || v.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        v.stockNumber.toLowerCase().includes(q) ||
        v.vin.toLowerCase().includes(q) ||
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        `${v.year}`.includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [state.vehicles, search, statusFilter]);

  return (
    <div className="min-w-0 space-y-6">
      <PageHeader
        title="Vehicles"
        description={`${state.vehicles.length} vehicles in inventory`}
        actions={
          <ButtonLink href="/vehicles/new">
            <Plus className="size-4" />
            Add Vehicle
          </ButtonLink>
        }
      />
      <Card className="border-border/50 bg-card/80 shadow-md">
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary/60" />
            <Input
              placeholder="Search stock #, VIN, make, model..."
              className="border-border/50 bg-background/50 pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v ?? "all")}
          >
            <SelectTrigger className="w-full border-border/50 bg-background/50 sm:w-44">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {VEHICLE_STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      {filtered.length === 0 ? (
        <EmptyState
          icon={Car}
          title="No vehicles found"
          description="Add your first vehicle to the yard or adjust your search filters."
          actionLabel="Add Vehicle"
          actionHref="/vehicles/new"
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
}
