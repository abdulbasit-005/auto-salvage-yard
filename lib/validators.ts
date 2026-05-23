import { z } from "zod";

const currentYear = new Date().getFullYear();

export const vehicleFormSchema = z.object({
  stockNumber: z.string().min(1, "Stock number is required"),
  vin: z.string().min(1, "VIN is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce
    .number()
    .int()
    .min(1900, "Year must be 1900 or later")
    .max(currentYear + 1, `Year cannot exceed ${currentYear + 1}`),
  color: z.string().min(1, "Color is required"),
  condition: z.string().min(1, "Condition is required"),
  yardLocation: z.string().min(1, "Yard location is required"),
  status: z.enum(["in_yard", "stripped", "sold", "scrapped"]),
  purchasePrice: z.coerce.number().min(0, "Must be 0 or greater"),
  listPrice: z.coerce.number().min(0, "Must be 0 or greater"),
  notes: z.string(),
  acquiredAt: z.string().min(1, "Acquisition date is required"),
});

export const partFormSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  condition: z.string().min(1, "Condition is required"),
  vehicleId: z.string().nullable(),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  unitPrice: z.coerce.number().min(0, "Price must be 0 or greater"),
  status: z.enum(["available", "sold", "reserved"]),
  notes: z.string(),
});

export const sellFormSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  buyerName: z.string().min(1, "Buyer name is required"),
  buyerPhone: z.string(),
  paymentMethod: z.enum(["cash", "card", "check", "transfer"]),
  includeRemainingParts: z.boolean().optional(),
  quantity: z.coerce.number().int().min(1).optional(),
});

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;
export type PartFormValues = z.infer<typeof partFormSchema>;
export type SellFormValues = z.infer<typeof sellFormSchema>;
