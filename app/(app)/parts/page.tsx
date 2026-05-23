"use client";

import { useMemo, useState } from "react";
import { Package, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { PartCard } from "@/components/inventory/part-card";
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
import { PART_CATEGORIES, PART_STATUSES } from "@/lib/constants";

export default function PartsPage() {
  const { state } = useInventory();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = useMemo(() => {
    return state.parts.filter((p) => {
      const matchesStatus =
        statusFilter === "all" || p.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || p.category === categoryFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.sku.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [state.parts, search, statusFilter, categoryFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Parts"
        description={`${state.parts.length} parts in inventory`}
        actions={
          <ButtonLink href="/parts/new">
            <Plus className="size-4" />
            Add Part
          </ButtonLink>
        }
      />
      <Card className="border-border/50 bg-card/80 shadow-md">
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary/60" />
            <Input
              placeholder="Search SKU, name, category..."
              className="border-border/50 bg-background/50 pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v ?? "all")}
          >
            <SelectTrigger className="w-full border-border/50 bg-background/50 sm:w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {PART_STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={categoryFilter}
            onValueChange={(v) => setCategoryFilter(v ?? "all")}
          >
            <SelectTrigger className="w-full border-border/50 bg-background/50 sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {PART_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      {filtered.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No parts found"
          description="Add parts from donor vehicles or as standalone stock."
          actionLabel="Add Part"
          actionHref="/parts/new"
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      )}
    </div>
  );
}
