"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useInventory } from "@/components/providers/inventory-provider";
import type { Part } from "@/lib/types";

interface DeletePartButtonProps {
  part: Part;
  redirectTo?: string;
}

export function DeletePartButton({
  part,
  redirectTo = "/parts",
}: DeletePartButtonProps) {
  const router = useRouter();
  const { dispatch } = useInventory();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        <Trash2 className="size-4" />
        Delete
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete part?"
        description={`Remove "${part.name}" (${part.sku}) from inventory? This cannot be undone.`}
        confirmLabel="Delete part"
        variant="destructive"
        onConfirm={() => {
          dispatch({ type: "DELETE_PART", payload: { id: part.id } });
          toast.success("Part removed from inventory");
          router.push(redirectTo);
        }}
      />
    </>
  );
}
