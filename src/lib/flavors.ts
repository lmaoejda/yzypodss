/**
 * Flavor -> color mapping used by the procedural 3D pod when there is no image.
 * Known fruit keywords map to a fixed HEX; unknown strings fall back to a
 * deterministic hash -> HSL color so the same flavor always looks the same.
 */

const KEYWORDS: Record<string, string> = {
  strawberry: "#ff1f4b",
  watermelon: "#ff4d6d",
  kiwi: "#69c92b",
  water: "#27b4f2",
  grapefruit: "#ff6a5c",
  pome: "#d81f3a",
  cherry: "#b3103f",
  pineapple: "#ffcf2e",
  bubbaloo: "#ff63b0",
  tutti: "#ff8ad8",
  passion: "#ff9419",
  guava: "#ff4f86",
  berry: "#5a3fd9",
  blueberry: "#3558dd",
  raspberry: "#e0245e",
  mango: "#ffb01f",
  grape: "#7a3fe4",
  peach: "#ffa56e",
  lemon: "#ffe03d",
  lime: "#9be22f",
  orange: "#ff8a1f",
  apple: "#8fd13f",
  banana: "#ffe27a",
  mint: "#25d6a0",
  menthol: "#5fe3d0",
  cola: "#5b2a14",
  coconut: "#f1e4cf",
  melon: "#b8e986",
  lychee: "#ff9fb2",
  vanilla: "#f3d9a6",
};

const SORTED_KEYS = Object.keys(KEYWORDS).sort((a, b) => b.length - a.length);

export type FlavorPalette = { primary: string; secondary: string };

function hslToHex(h: number, s: number, l: number): string {
  const sat = s / 100;
  const lig = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(lig, 1 - lig);
  const f = (n: number) =>
    lig - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

function hashString(input: string): number {
  let h = 5381;
  for (let i = 0; i < input.length; i += 1) {
    h = ((h << 5) + h + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function mixHex(a: string, b: string, t: number): string {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const out = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `#${out.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export function hashColor(input: string): string {
  const h = hashString(input || "yeezy");
  return hslToHex(h % 360, 78, 52);
}

/** Returns a primary (body) and secondary (accent) color for a flavor string. */
export function flavorPalette(flavor: string): FlavorPalette {
  const lower = (flavor || "").toLowerCase();
  let work = lower;
  const found: { index: number; color: string }[] = [];
  for (const key of SORTED_KEYS) {
    const index = work.indexOf(key);
    if (index !== -1) {
      found.push({ index, color: KEYWORDS[key] });
      work = work.slice(0, index) + " ".repeat(key.length) + work.slice(index + key.length);
    }
  }
  found.sort((a, b) => a.index - b.index);

  const hasIce = /\bice\b|hielo|frozen/.test(lower);
  let primary = found[0]?.color ?? hashColor(lower);
  let secondary =
    found.find((f) => f.color !== primary)?.color ??
    mixHex(primary, "#ffffff", 0.45);

  if (hasIce) {
    primary = mixHex(primary, "#bfeaff", 0.18);
    secondary = found.length > 1 ? secondary : "#d8f4ff";
  }
  return { primary, secondary };
}

export function flavorColor(flavor: string): string {
  return flavorPalette(flavor).primary;
}

/** Perceived luminance 0..1 of a #rrggbb color. */
export function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
