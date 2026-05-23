"use client";

import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { DeletePartButton } from "@/components/inventory/delete-part-button";
import { PartForm } from "@/components/inventory/part-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-destructive">
            Danger zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Permanently remove this part from inventory.
          </p>
          <DeletePartButton part={part} />
        </CardContent>
      </Card>
    </div>
  );
}
