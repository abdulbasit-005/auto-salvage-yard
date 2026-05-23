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
import { CONDITIONS, VEHICLE_STATUSES } from "@/lib/constants";
import type { Vehicle } from "@/lib/types";
import { vehicleFormSchema, type VehicleFormValues } from "@/lib/validators";

interface VehicleFormProps {
  vehicle?: Vehicle;
  mode: "create" | "edit";
}

const defaultValues: VehicleFormValues = {
  stockNumber: "",
  vin: "",
  make: "",
  model: "",
  year: new Date().getFullYear(),
  color: "",
  condition: "Good",
  yardLocation: "",
  status: "in_yard",
  purchasePrice: 0,
  listPrice: 0,
  notes: "",
  acquiredAt: new Date().toISOString().split("T")[0],
};

export function VehicleForm({ vehicle, mode }: VehicleFormProps) {
  const router = useRouter();
  const { dispatch } = useInventory();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<VehicleFormValues>(
    vehicle
      ? {
          stockNumber: vehicle.stockNumber,
          vin: vehicle.vin,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          color: vehicle.color,
          condition: vehicle.condition,
          yardLocation: vehicle.yardLocation,
          status: vehicle.status,
          purchasePrice: vehicle.purchasePrice,
          listPrice: vehicle.listPrice,
          notes: vehicle.notes,
          acquiredAt: vehicle.acquiredAt.split("T")[0],
        }
      : defaultValues
  );

  function updateField<K extends keyof VehicleFormValues>(
    key: K,
    value: VehicleFormValues[K]
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
    const result = vehicleFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0]?.toString();
        if (key) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    const data = {
      ...result.data,
      acquiredAt: new Date(result.data.acquiredAt).toISOString(),
    };

    if (mode === "create") {
      dispatch({ type: "ADD_VEHICLE", payload: data });
      router.push("/vehicles");
    } else if (vehicle) {
      dispatch({ type: "UPDATE_VEHICLE", payload: { id: vehicle.id, data } });
      router.push(`/vehicles/${vehicle.id}`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-border/50 bg-card/80 shadow-lg">
        <CardContent className="grid gap-6 pt-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="stockNumber">Stock Number *</Label>
            <Input
              id="stockNumber"
              value={form.stockNumber}
              onChange={(e) => updateField("stockNumber", e.target.value)}
            />
            {errors.stockNumber && (
              <p className="text-sm text-destructive">{errors.stockNumber}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="vin">VIN *</Label>
            <Input
              id="vin"
              value={form.vin}
              onChange={(e) => updateField("vin", e.target.value)}
            />
            {errors.vin && (
              <p className="text-sm text-destructive">{errors.vin}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="make">Make *</Label>
            <Input
              id="make"
              value={form.make}
              onChange={(e) => updateField("make", e.target.value)}
            />
            {errors.make && (
              <p className="text-sm text-destructive">{errors.make}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Model *</Label>
            <Input
              id="model"
              value={form.model}
              onChange={(e) => updateField("model", e.target.value)}
            />
            {errors.model && (
              <p className="text-sm text-destructive">{errors.model}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Year *</Label>
            <Input
              id="year"
              type="number"
              value={form.year}
              onChange={(e) => updateField("year", Number(e.target.value))}
            />
            {errors.year && (
              <p className="text-sm text-destructive">{errors.year}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Color *</Label>
            <Input
              id="color"
              value={form.color}
              onChange={(e) => updateField("color", e.target.value)}
            />
            {errors.color && (
              <p className="text-sm text-destructive">{errors.color}</p>
            )}
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
            <Label>Status *</Label>
            <Select
              value={form.status}
              onValueChange={(v) =>
                updateField("status", v as VehicleFormValues["status"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VEHICLE_STATUSES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="yardLocation">Yard Location *</Label>
            <Input
              id="yardLocation"
              value={form.yardLocation}
              onChange={(e) => updateField("yardLocation", e.target.value)}
              placeholder="e.g. Row A-12"
            />
            {errors.yardLocation && (
              <p className="text-sm text-destructive">{errors.yardLocation}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="acquiredAt">Acquired Date *</Label>
            <Input
              id="acquiredAt"
              type="date"
              value={form.acquiredAt}
              onChange={(e) => updateField("acquiredAt", e.target.value)}
            />
            {errors.acquiredAt && (
              <p className="text-sm text-destructive">{errors.acquiredAt}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchasePrice">Purchase Price</Label>
            <Input
              id="purchasePrice"
              type="number"
              min={0}
              step="0.01"
              value={form.purchasePrice}
              onChange={(e) =>
                updateField("purchasePrice", Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="listPrice">List Price</Label>
            <Input
              id="listPrice"
              type="number"
              min={0}
              step="0.01"
              value={form.listPrice}
              onChange={(e) => updateField("listPrice", Number(e.target.value))}
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
          {mode === "create" ? "Add Vehicle" : "Save Changes"}
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
