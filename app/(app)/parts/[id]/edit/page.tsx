"use client";

import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { PartForm } from "@/components/inventory/part-form";
import { ButtonLink } from "@/components/ui/button-link";
import { useInventory } from "@/components/providers/inventory-provider";
import { getPartById } from "@/lib/inventory-store";

export default function EditPartPage() {
  const params = useParams();
  const id = params.id as string;
  const { state } = useInventory();
  const part = getPartById(state, id);

  if (!part) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Part not found.</p>
        <ButtonLink className="mt-4" href="/parts">
          Back to Parts
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Edit Part"
        description={part.name}
        backHref="/parts"
      />
      <PartForm part={part} mode="edit" />
    </div>
  );
}
