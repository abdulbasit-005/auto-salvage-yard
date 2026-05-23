import type { PaymentMethod, PartStatus, VehicleStatus } from "./types";

export const VEHICLE_STATUSES: { value: VehicleStatus; label: string }[] = [
  { value: "in_yard", label: "In Yard" },
  { value: "stripped", label: "Stripped" },
  { value: "sold", label: "Sold" },
  { value: "scrapped", label: "Scrapped" },
];

export const PART_STATUSES: { value: PartStatus; label: string }[] = [
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold" },
  { value: "reserved", label: "Reserved" },
];

export const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "cash", label: "Cash" },
  { value: "card", label: "Card" },
  { value: "check", label: "Check" },
  { value: "transfer", label: "Bank Transfer" },
];

export const PART_CATEGORIES = [
  "Engine",
  "Transmission",
  "Body",
  "Electrical",
  "Interior",
  "Suspension",
  "Brakes",
  "Wheels & Tires",
  "Glass",
  "Other",
] as const;

export const CONDITIONS = [
  "Excellent",
  "Good",
  "Fair",
  "Poor",
  "For Parts",
] as const;

export const STORAGE_KEY = "salvage-yard-inventory";
