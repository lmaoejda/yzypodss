/** Formats an integer as Argentine pesos: 16000 -> "$16.000". */
export function formatARS(value: number): string {
  const n = Math.round(Number.isFinite(value) ? value : 0);
  const sign = n < 0 ? "-" : "";
  return `${sign}$${String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

/** Formats a number with Argentine thousand separators: 15000 -> "15.000". */
export function formatNumber(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
