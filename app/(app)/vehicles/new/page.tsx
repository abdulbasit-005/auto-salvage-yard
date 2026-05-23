import { PageHeader } from "@/components/layout/page-header";
import { VehicleForm } from "@/components/inventory/vehicle-form";

export default function NewVehiclePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Add Vehicle"
        description="Register a new vehicle in the yard"
        backHref="/vehicles"
      />
      <VehicleForm mode="create" />
    </div>
  );
}
