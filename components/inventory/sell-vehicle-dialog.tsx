"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInventory } from "@/components/providers/inventory-provider";
import { PAYMENT_METHODS } from "@/lib/constants";
import type { Vehicle } from "@/lib/types";
import { sellFormSchema } from "@/lib/validators";
import { formatCurrency } from "@/lib/utils";

interface SellVehicleDialogProps {
  vehicle: Vehicle;
  trigger?: React.ReactNode;
}

export function SellVehicleDialog({ vehicle, trigger }: SellVehicleDialogProps) {
  const { dispatch } = useInventory();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    amount: vehicle.listPrice,
    buyerName: "",
    buyerPhone: "",
    paymentMethod: "cash" as const,
    includeRemainingParts: false,
  });

  function handleSell() {
    const result = sellFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0]?.toString();
        if (key) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    dispatch({
      type: "SELL_VEHICLE",
      payload: {
        vehicleId: vehicle.id,
        amount: result.data.amount,
        buyerName: result.data.buyerName,
        buyerPhone: result.data.buyerPhone ?? "",
        paymentMethod: result.data.paymentMethod,
        includeRemainingParts: form.includeRemainingParts,
      },
    });
    setOpen(false);
  }

  if (vehicle.status === "sold") return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {trigger ?? <Button>Sell Vehicle</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sell Vehicle</DialogTitle>
          <DialogDescription>
            {vehicle.year} {vehicle.make} {vehicle.model} — {vehicle.stockNumber}
            . List price: {formatCurrency(vehicle.listPrice)}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="amount">Sale Amount *</Label>
            <Input
              id="amount"
              type="number"
              min={0}
              step="0.01"
              value={form.amount}
              onChange={(e) =>
                setForm((f) => ({ ...f, amount: Number(e.target.value) }))
              }
            />
            {errors.amount && (
              <p className="text-sm text-destructive">{errors.amount}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="buyerName">Buyer Name *</Label>
            <Input
              id="buyerName"
              value={form.buyerName}
              onChange={(e) =>
                setForm((f) => ({ ...f, buyerName: e.target.value }))
              }
            />
            {errors.buyerName && (
              <p className="text-sm text-destructive">{errors.buyerName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="buyerPhone">Buyer Phone</Label>
            <Input
              id="buyerPhone"
              value={form.buyerPhone}
              onChange={(e) =>
                setForm((f) => ({ ...f, buyerPhone: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select
              value={form.paymentMethod}
              onValueChange={(v) =>
                setForm((f) => ({
                  ...f,
                  paymentMethod: v as typeof form.paymentMethod,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.includeRemainingParts}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  includeRemainingParts: e.target.checked,
                }))
              }
              className="size-4 rounded border"
            />
            Mark all linked parts as sold
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSell}>Complete Sale</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
