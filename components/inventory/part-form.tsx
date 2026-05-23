"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useInventory } from "@/components/providers/inventory-provider";
import {
  CONDITIONS,
  PART_CATEGORIES,
  PART_STATUSES,
} from "@/lib/constants";
import type { Part } from "@/lib/types";
import { partFormSchema, type PartFormValues } from "@/lib/validators";

interface PartFormProps {
  part?: Part;
  mode: "create" | "edit";
  defaultVehicleId?: string | null;
}

const defaultValues: PartFormValues = {
  sku: "",
  name: "",
  category: "Engine",
  condition: "Good",
  vehicleId: null,
  quantity: 1,
  unitPrice: 0,
  status: "available",
  notes: "",
};

export function PartForm({ part, mode, defaultVehicleId }: PartFormProps) {
  const router = useRouter();
  const { state, dispatch } = useInventory();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<PartFormValues>(
    part
      ? {
          sku: part.sku,
          name: part.name,
          category: part.category,
          condition: part.condition,
          vehicleId: part.vehicleId,
          quantity: part.quantity,
          unitPrice: part.unitPrice,
          status: part.status,
          notes: part.notes,
        }
      : { ...defaultValues, vehicleId: defaultVehicleId ?? null }
  );

  const activeVehicles = state.vehicles.filter(
    (v) => v.status !== "sold" && v.status !== "scrapped"
  );

  function updateField<K extends keyof PartFormValues>(
    key: K,
    value: PartFormValues[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = partFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0]?.toString();
        if (key) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    if (mode === "create") {
      dispatch({ type: "ADD_PART", payload: result.data });
      router.push("/parts");
    } else if (part) {
      dispatch({ type: "UPDATE_PART", payload: { id: part.id, data: result.data } });
      router.push("/parts");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-border/50 bg-card/80 shadow-lg">
        <CardContent className="grid gap-6 pt-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="sku">SKU *</Label>
            <Input
              id="sku"
              value={form.sku}
              onChange={(e) => updateField("sku", e.target.value)}
            />
            {errors.sku && (
              <p className="text-sm text-destructive">{errors.sku}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Category *</Label>
            <Select
              value={form.category}
              onValueChange={(v) => updateField("category", v ?? "")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PART_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Condition *</Label>
            <Select
              value={form.condition}
              onValueChange={(v) => updateField("condition", v ?? "")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONDITIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Donor Vehicle</Label>
            <Select
              value={form.vehicleId ?? "standalone"}
              onValueChange={(v) =>
                updateField("vehicleId", v === "standalone" ? null : v)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Standalone (no vehicle)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standalone">Standalone stock</SelectItem>
                {activeVehicles.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.year} {v.make} {v.model} ({v.stockNumber})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status *</Label>
            <Select
              value={form.status}
              onValueChange={(v) =>
                updateField("status", v as PartFormValues["status"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PART_STATUSES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={form.quantity}
              onChange={(e) => updateField("quantity", Number(e.target.value))}
            />
            {errors.quantity && (
              <p className="text-sm text-destructive">{errors.quantity}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="unitPrice">Unit Price</Label>
            <Input
              id="unitPrice"
              type="number"
              min={0}
              step="0.01"
              value={form.unitPrice}
              onChange={(e) => updateField("unitPrice", Number(e.target.value))}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex gap-3">
        <Button type="submit">
          {mode === "create" ? "Add Part" : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
