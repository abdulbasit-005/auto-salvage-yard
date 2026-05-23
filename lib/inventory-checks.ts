import type { InventoryState, Part, Vehicle } from "./types";

const LOW_STOCK_THRESHOLD = 2;

export function getLowStockParts(state: InventoryState): Part[] {
  return state.parts.filter(
    (p) =>
      p.status === "available" &&
      p.quantity > 0 &&
      p.quantity <= LOW_STOCK_THRESHOLD
  );
}

export function findDuplicateVehicle(
  state: InventoryState,
  stockNumber: string,
  vin: string,
  excludeId?: string
): string | null {
  const stock = stockNumber.trim().toLowerCase();
  const vinNorm = vin.trim().toLowerCase();

  for (const v of state.vehicles) {
    if (excludeId && v.id === excludeId) continue;
    if (v.stockNumber.toLowerCase() === stock) {
      return `Stock number "${stockNumber}" is already used by ${v.year} ${v.make} ${v.model}.`;
    }
    if (v.vin.toLowerCase() === vinNorm) {
      return `VIN is already registered to ${v.year} ${v.make} ${v.model}.`;
    }
  }
  return null;
}

export function findDuplicatePartSku(
  state: InventoryState,
  sku: string,
  excludeId?: string
): string | null {
  const skuNorm = sku.trim().toLowerCase();
  const existing = state.parts.find(
    (p) =>
      p.sku.toLowerCase() === skuNorm && (!excludeId || p.id !== excludeId)
  );
  if (existing) {
    return `SKU "${sku}" is already used by "${existing.name}".`;
  }
  return null;
}

export function canDeleteVehicle(vehicle: Vehicle): {
  ok: boolean;
  message?: string;
} {
  if (vehicle.status === "sold") {
    return {
      ok: false,
      message: "Sold vehicles cannot be deleted (sale history is preserved).",
    };
  }
  return { ok: true };
}
