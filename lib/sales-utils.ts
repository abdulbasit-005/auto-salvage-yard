import { PAYMENT_METHODS } from "./constants";
import type { Sale } from "./types";
import { formatCurrency, formatDateTime } from "./utils";

export type SalesDateFilter = "all" | "7d" | "30d" | "month";

export function filterSales(
  sales: Sale[],
  options: {
    typeFilter?: string;
    dateFilter?: SalesDateFilter;
    search?: string;
  }
): Sale[] {
  const { typeFilter = "all", dateFilter = "all", search = "" } = options;
  const now = new Date();
  const q = search.toLowerCase().trim();

  return sales.filter((sale) => {
    if (typeFilter !== "all" && sale.type !== typeFilter) return false;

    if (dateFilter !== "all") {
      const sold = new Date(sale.soldAt);
      if (dateFilter === "7d") {
        const cutoff = new Date(now);
        cutoff.setDate(cutoff.getDate() - 7);
        if (sold < cutoff) return false;
      } else if (dateFilter === "30d") {
        const cutoff = new Date(now);
        cutoff.setDate(cutoff.getDate() - 30);
        if (sold < cutoff) return false;
      } else if (dateFilter === "month") {
        if (
          sold.getMonth() !== now.getMonth() ||
          sold.getFullYear() !== now.getFullYear()
        ) {
          return false;
        }
      }
    }

    if (q) {
      const haystack = [
        sale.itemLabel,
        sale.buyerName,
        sale.buyerPhone,
        sale.id,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

export function exportSalesToCsv(sales: Sale[]): void {
  const headers = [
    "Date",
    "Type",
    "Item",
    "Buyer",
    "Phone",
    "Payment",
    "Amount",
    "Sale ID",
  ];
  const rows = sales.map((s) => {
    const payment =
      PAYMENT_METHODS.find((m) => m.value === s.paymentMethod)?.label ??
      s.paymentMethod;
    return [
      formatDateTime(s.soldAt),
      s.type,
      `"${s.itemLabel.replace(/"/g, '""')}"`,
      `"${s.buyerName.replace(/"/g, '""')}"`,
      s.buyerPhone,
      payment,
      s.amount.toFixed(2),
      s.id,
    ].join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `salvage-yard-sales-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function printSaleReceipt(sale: Sale): void {
  const payment =
    PAYMENT_METHODS.find((m) => m.value === sale.paymentMethod)?.label ??
    sale.paymentMethod;

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Sale Receipt - ${sale.id.slice(0, 8)}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 400px; margin: 40px auto; padding: 24px; }
    h1 { font-size: 1.25rem; margin: 0 0 8px; }
    .muted { color: #666; font-size: 0.875rem; }
    .amount { font-size: 2rem; font-weight: bold; margin: 24px 0; }
    dl { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.9rem; }
    dt { color: #666; margin: 0; }
    dd { margin: 0; font-weight: 500; }
    hr { border: none; border-top: 1px solid #ddd; margin: 24px 0; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <h1>Auto Salvage Yard</h1>
  <p class="muted">Sale receipt · #${sale.id.slice(0, 8).toUpperCase()}</p>
  <hr />
  <p><strong>${sale.type === "vehicle" ? "Vehicle" : "Part"} sale</strong></p>
  <p>${sale.itemLabel}</p>
  <p class="amount">${formatCurrency(sale.amount)}</p>
  <dl>
    <dt>Buyer</dt><dd>${sale.buyerName}</dd>
    <dt>Phone</dt><dd>${sale.buyerPhone || "—"}</dd>
    <dt>Payment</dt><dd>${payment}</dd>
    <dt>Date</dt><dd>${formatDateTime(sale.soldAt)}</dd>
  </dl>
  <hr />
  <p class="muted">Thank you for your business.</p>
  <script>window.onload = () => { window.print(); }</script>
</body>
</html>`;

  const win = window.open("", "_blank", "width=480,height=640");
  if (win) {
    win.document.write(html);
    win.document.close();
  }
}
