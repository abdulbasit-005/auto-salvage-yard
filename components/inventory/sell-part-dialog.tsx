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
import type { Part } from "@/lib/types";
import { sellFormSchema } from "@/lib/validators";
import { formatCurrency } from "@/lib/utils";

interface SellPartDialogProps {
  part: Part;
  trigger?: React.ReactNode;
}

export function SellPartDialog({ part, trigger }: SellPartDialogProps) {
  const { dispatch } = useInventory();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    quantity: 1,
    amount: part.unitPrice,
    buyerName: "",
    buyerPhone: "",
    paymentMethod: "cash" as const,
  });

  const canSell =
    part.status !== "sold" && part.quantity > 0;

  function handleSell() {
    const result = sellFormSchema.safeParse({
      ...form,
      includeRemainingParts: undefined,
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0]?.toString();
        if (key) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    if (form.quantity > part.quantity) {
      setErrors({ quantity: `Only ${part.quantity} available` });
      return;
    }

    dispatch({
      type: "SELL_PART",
      payload: {
        partId: part.id,
        quantity: form.quantity,
        amount: result.data.amount,
        buyerName: result.data.buyerName,
        buyerPhone: result.data.buyerPhone ?? "",
        paymentMethod: result.data.paymentMethod,
      },
    });
    setOpen(false);
  }

  if (!canSell) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {trigger ?? (
          <Button size="sm" variant="outline">
            Sell
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sell Part</DialogTitle>
          <DialogDescription>
            {part.name} ({part.sku}) — {formatCurrency(part.unitPrice)} each.
            {part.quantity > 1 && ` ${part.quantity} in stock.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          {part.quantity > 1 && (
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                max={part.quantity}
                value={form.quantity}
                onChange={(e) => {
                  const qty = Number(e.target.value);
                  setForm((f) => ({
                    ...f,
                    quantity: qty,
                    amount: qty * part.unitPrice,
                  }));
                }}
              />
              {errors.quantity && (
                <p className="text-sm text-destructive">{errors.quantity}</p>
              )}
            </div>
          )}
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
