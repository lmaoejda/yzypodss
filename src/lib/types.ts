export type RenderMode = "texture" | "color";

/** Product shape exposed to the browser (no secrets, no internal fields). */
export type PublicProduct = {
  id: string;
  brand: string;
  model: string;
  puffs: number;
  priceArs: number;
  flavors: string[];
  imageUrl: string | null;
  renderMode: RenderMode;
};

export type AdminProduct = PublicProduct & {
  active: boolean;
  createdAt: string;
};

export type AutomationStatus = "image_found" | "color_fallback" | "api_error";

export type AutomationLog = {
  id: string;
  createdAt: string;
  productLabel: string;
  status: AutomationStatus | string;
  detail: string | null;
};
