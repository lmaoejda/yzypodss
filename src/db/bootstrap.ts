import { pool } from "./index";

/**
 * Idempotent bootstrap: creates tables (if missing) and seeds the base catalog
 * exactly once. This makes `npm install && npm run dev` work on any empty
 * Postgres (local or Supabase) with no extra step.
 */

const DDL = `
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  model text NOT NULL,
  puffs integer NOT NULL,
  price_ars integer NOT NULL,
  flavors text[] NOT NULL DEFAULT '{}'::text[],
  image_url text,
  render_mode text NOT NULL DEFAULT 'color',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL,
  data bytea NOT NULL,
  source_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS image_search_cache (
  query text PRIMARY KEY,
  image_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS automation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  product_id uuid,
  product_label text NOT NULL,
  status text NOT NULL,
  detail text
);
CREATE TABLE IF NOT EXISTS app_meta (
  key text PRIMARY KEY,
  value text NOT NULL
);
`;

export const SEED_PRODUCTS: {
  brand: string;
  model: string;
  puffs: number;
  priceArs: number;
  flavors: string[];
}[] = [
  {
    brand: "ELFBAR",
    model: "BC 15K",
    puffs: 15000,
    priceArs: 16000,
    flavors: ["Strawberry Kiwi", "Strawberry Water"],
  },
  {
    brand: "LOST MARY",
    model: "DURA 35K",
    puffs: 35000,
    priceArs: 21000,
    flavors: ["Grapefruit Pass", "Pome Cherry Pineapple"],
  },
  {
    brand: "ELFBAR",
    model: "DISP 30K",
    puffs: 30000,
    priceArs: 23000,
    flavors: ["Bubbaloo Tutti", "Pineapple Ice"],
  },
  {
    brand: "IGNITE",
    model: "VMIX 40K",
    puffs: 40000,
    priceArs: 25000,
    flavors: [
      "New Pineapple + Passion Fruit",
      "New Kiwi Passion Guava Ice + Strawberry Ice",
    ],
  },
  {
    brand: "BLACK SHEEP",
    model: "55K",
    puffs: 55000,
    priceArs: 27000,
    flavors: ["Mixed Berry"],
  },
];

async function run() {
  await pool.query(DDL);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(727301)");
    const seeded = await client.query(
      "SELECT 1 FROM app_meta WHERE key = 'seeded'",
    );
    if (seeded.rowCount === 0) {
      const count = await client.query("SELECT count(*)::int AS n FROM products");
      if (count.rows[0].n === 0) {
        for (const p of SEED_PRODUCTS) {
          await client.query(
            `INSERT INTO products (brand, model, puffs, price_ars, flavors, render_mode, active)
             VALUES ($1, $2, $3, $4, $5, 'color', true)`,
            [p.brand, p.model, p.puffs, p.priceArs, p.flavors],
          );
        }
      }
      await client.query(
        "INSERT INTO app_meta (key, value) VALUES ('seeded', 'true') ON CONFLICT DO NOTHING",
      );
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

const g = globalThis as typeof globalThis & { __yeezyBootstrap?: Promise<void> };

export function ensureDb(): Promise<void> {
  if (!g.__yeezyBootstrap) {
    g.__yeezyBootstrap = run().catch((error) => {
      g.__yeezyBootstrap = undefined;
      throw error;
    });
  }
  return g.__yeezyBootstrap;
}
