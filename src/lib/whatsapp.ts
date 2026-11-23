import { formatARS } from "./format";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5493765100878";

export const INSTAGRAM_URL = "https://www.instagram.com/yzypodss/?hl=en";
export const INSTAGRAM_HANDLE = "@yzypodss";

export function whatsappLink(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export type OrderLine = {
  name: string;
  flavor: string;
  quantity: number;
  unitPrice: number;
};

/** Builds the WhatsApp order summary message. */
export function buildOrderMessage(
  lines: OrderLine[],
  customer: { name: string; zone: string },
): string {
  const total = lines.reduce((acc, l) => acc + l.unitPrice * l.quantity, 0);
  const body = lines
    .map(
      (l) =>
        `• ${l.quantity}x ${l.name} — ${l.flavor} — ${formatARS(l.unitPrice * l.quantity)}`,
    )
    .join("\n");
  return [
    "¡Hola YEEZY PODS! Quiero hacer este pedido:",
    "",
    body,
    "",
    `TOTAL: ${formatARS(total)}`,
    "",
    `Nombre: ${customer.name.trim() || "(te lo paso por acá)"}`,
    `Zona de envío: ${customer.zone.trim() || "(te la paso por acá)"}`,
  ].join("\n");
}
