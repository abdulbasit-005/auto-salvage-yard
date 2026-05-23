export type VehicleStatus = "in_yard" | "stripped" | "sold" | "scrapped";
export type PartStatus = "available" | "sold" | "reserved";
export type SaleType = "vehicle" | "part";
export type PaymentMethod = "cash" | "card" | "check" | "transfer";

export interface Vehicle {
  id: string;
  stockNumber: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  color: string;
  condition: string;
  yardLocation: string;
  status: VehicleStatus;
  purchasePrice: number;
  listPrice: number;
  notes: string;
  acquiredAt: string;
}

export interface Part {
  id: string;
  sku: string;
  name: string;
  category: string;
  condition: string;
  vehicleId: string | null;
  quantity: number;
  unitPrice: number;
  status: PartStatus;
  notes: string;
}

export interface Sale {
  id: string;
  type: SaleType;
  itemId: string;
  itemLabel: string;
  amount: number;
  buyerName: string;
  buyerPhone: string;
  paymentMethod: PaymentMethod;
  soldAt: string;
}

export interface InventoryState {
  vehicles: Vehicle[];
  parts: Part[];
  sales: Sale[];
}

export type VehicleInput = Omit<Vehicle, "id">;
export type PartInput = Omit<Part, "id">;

export interface SellVehicleInput {
  vehicleId: string;
  amount: number;
  buyerName: string;
  buyerPhone: string;
  paymentMethod: PaymentMethod;
  includeRemainingParts: boolean;
}

export interface SellPartInput {
  partId: string;
  quantity: number;
  amount: number;
  buyerName: string;
  buyerPhone: string;
  paymentMethod: PaymentMethod;
}
