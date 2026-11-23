import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __yeezyPool?: Pool;
};

// Supabase (and most hosted Postgres providers) require TLS.
const needsSsl =
  /supabase\.(co|com)|pooler\.supabase|sslmode=require/i.test(databaseUrl);

export const pool =
  globalForDb.__yeezyPool ??
  new Pool({
    connectionString: databaseUrl,
    max: 5,
    ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__yeezyPool = pool;
}

export const db = drizzle(pool, { schema });
