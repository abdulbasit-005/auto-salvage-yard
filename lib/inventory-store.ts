import { STORAGE_KEY } from "./constants";
import { seedData } from "./seed-data";
import type {
  InventoryState,
  Part,
  PartInput,
  Sale,
  SellPartInput,
  SellVehicleInput,
  Vehicle,
  VehicleInput,
} from "./types";
import { generateId } from "./utils";

export type InventoryAction =
  | { type: "HYDRATE"; payload: InventoryState }
  | { type: "RESET" }
  | { type: "ADD_VEHICLE"; payload: VehicleInput }
  | { type: "UPDATE_VEHICLE"; payload: { id: string; data: VehicleInput } }
  | { type: "ADD_PART"; payload: PartInput }
  | { type: "UPDATE_PART"; payload: { id: string; data: PartInput } }
  | { type: "SELL_VEHICLE"; payload: SellVehicleInput }
  | { type: "SELL_PART"; payload: SellPartInput }
  | { type: "DELETE_VEHICLE"; payload: { id: string } }
  | { type: "DELETE_PART"; payload: { id: string } };

export function inventoryReducer(
  state: InventoryState,
  action: InventoryAction
): InventoryState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;
    case "RESET":
      return structuredClone(seedData);
    case "ADD_VEHICLE":
      return {
        ...state,
        vehicles: [
          ...state.vehicles,
          { ...action.payload, id: generateId() },
        ],
      };
    case "UPDATE_VEHICLE":
      return {
        ...state,
        vehicles: state.vehicles.map((v) =>
          v.id === action.payload.id
            ? { ...action.payload.data, id: v.id }
            : v
        ),
      };
    case "ADD_PART":
      return {
        ...state,
        parts: [...state.parts, { ...action.payload, id: generateId() }],
      };
    case "UPDATE_PART":
      return {
        ...state,
        parts: state.parts.map((p) =>
          p.id === action.payload.id
            ? { ...action.payload.data, id: p.id }
            : p
        ),
      };
    case "SELL_VEHICLE": {
      const { vehicleId, includeRemainingParts, ...saleData } =
        action.payload;
      const vehicle = state.vehicles.find((v) => v.id === vehicleId);
      if (!vehicle) return state;

      const sale: Sale = {
        id: generateId(),
        type: "vehicle",
        itemId: vehicleId,
        itemLabel: `${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.stockNumber})`,
        amount: saleData.amount,
        buyerName: saleData.buyerName,
        buyerPhone: saleData.buyerPhone,
        paymentMethod: saleData.paymentMethod,
        soldAt: new Date().toISOString(),
      };

      const updatedVehicles = state.vehicles.map((v) =>
        v.id === vehicleId
          ? { ...v, status: "sold" as const, yardLocation: "Sold" }
          : v
      );

      const updatedParts = includeRemainingParts
        ? state.parts.map((p) =>
            p.vehicleId === vehicleId && p.status !== "sold"
              ? { ...p, status: "sold" as const, quantity: 0 }
              : p
          )
        : state.parts;

      return {
        vehicles: updatedVehicles,
        parts: updatedParts,
        sales: [sale, ...state.sales],
      };
    }
    case "SELL_PART": {
      const { partId, quantity, ...saleData } = action.payload;
      const part = state.parts.find((p) => p.id === partId);
      if (!part || part.quantity < quantity) return state;

      const sale: Sale = {
        id: generateId(),
        type: "part",
        itemId: partId,
        itemLabel: `${part.name} (${part.sku}) x${quantity}`,
        amount: saleData.amount,
        buyerName: saleData.buyerName,
        buyerPhone: saleData.buyerPhone,
        paymentMethod: saleData.paymentMethod,
        soldAt: new Date().toISOString(),
      };

      const updatedParts = state.parts.map((p) => {
        if (p.id !== partId) return p;
        const newQty = p.quantity - quantity;
        return {
          ...p,
          quantity: newQty,
          status: newQty === 0 ? ("sold" as const) : p.status,
        };
      });

      return {
        ...state,
        parts: updatedParts,
        sales: [sale, ...state.sales],
      };
    }
    case "DELETE_VEHICLE": {
      const vehicleId = action.payload.id;
      return {
        ...state,
        vehicles: state.vehicles.filter((v) => v.id !== vehicleId),
        parts: state.parts.map((p) =>
          p.vehicleId === vehicleId ? { ...p, vehicleId: null } : p
        ),
      };
    }
    case "DELETE_PART":
      return {
        ...state,
        parts: state.parts.filter((p) => p.id !== action.payload.id),
      };
    default:
      return state;
  }
}

export function loadFromStorage(): InventoryState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as InventoryState;
  } catch {
    return null;
  }
}

export function saveToStorage(state: InventoryState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getInitialState(): InventoryState {
  return structuredClone(seedData);
}

export function getVehicleById(
  state: InventoryState,
  id: string
): Vehicle | undefined {
  return state.vehicles.find((v) => v.id === id);
}

export function getPartById(
  state: InventoryState,
  id: string
): Part | undefined {
  return state.parts.find((p) => p.id === id);
}

export function getSaleById(
  state: InventoryState,
  id: string
): Sale | undefined {
  return state.sales.find((s) => s.id === id);
}

export function getPartsForVehicle(
  state: InventoryState,
  vehicleId: string
): Part[] {
  return state.parts.filter((p) => p.vehicleId === vehicleId);
}

export function getDashboardStats(state: InventoryState) {
  const vehiclesInYard = state.vehicles.filter(
    (v) => v.status === "in_yard" || v.status === "stripped"
  ).length;
  const availableParts = state.parts.filter(
    (p) => p.status === "available" && p.quantity > 0
  ).length;
  const totalRevenue = state.sales.reduce((sum, s) => sum + s.amount, 0);
  const recentSales = [...state.sales]
    .sort((a, b) => new Date(b.soldAt).getTime() - new Date(a.soldAt).getTime())
    .slice(0, 5);

  return { vehiclesInYard, availableParts, totalRevenue, recentSales };
}
