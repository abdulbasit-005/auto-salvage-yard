"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { PartForm } from "@/components/inventory/part-form";

function NewPartContent() {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get("vehicleId");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Add Part"
        description={
          vehicleId
            ? "Add a part from the selected donor vehicle"
            : "Register a new part in inventory"
        }
        backHref={vehicleId ? `/vehicles/${vehicleId}` : "/parts"}
      />
      <PartForm mode="create" defaultVehicleId={vehicleId} />
    </div>
  );
}

export default function NewPartPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <NewPartContent />
    </Suspense>
  );
}
