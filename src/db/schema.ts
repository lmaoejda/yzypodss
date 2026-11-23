import { sql } from "drizzle-orm";
import {
  boolean,
  customType,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  puffs: integer("puffs").notNull(),
  priceArs: integer("price_ars").notNull(),
  flavors: text("flavors")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  imageUrl: text("image_url"),
  renderMode: text("render_mode").notNull().default("color"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** Images downloaded by the automation, served from our own domain. */
export const productImages = pgTable("product_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  contentType: text("content_type").notNull(),
  data: bytea("data").notNull(),
  sourceUrl: text("source_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const imageSearchCache = pgTable("image_search_cache", {
  query: text("query").primaryKey(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const automationLogs = pgTable("automation_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  productId: uuid("product_id"),
  productLabel: text("product_label").notNull(),
  status: text("status").notNull(),
  detail: text("detail"),
});

export const appMeta = pgTable("app_meta", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});
