import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

/**
 * Minimal single-admin auth: only ADMIN_EMAIL + ADMIN_PASSWORD can sign in.
 * The session is a signed, httpOnly JWT cookie. Every admin Server Action
 * calls requireAdmin() again, so protection never relies on the UI alone.
 */

const COOKIE = "yeezy_admin";
const MAX_AGE = 60 * 60 * 24 * 7;

function secretKey(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) return null;
  return new TextEncoder().encode(`yeezy-pods:${secret}`);
}

function adminEmail(): string {
  return (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
}

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

export function authConfigured(): boolean {
  return Boolean(adminEmail() && process.env.ADMIN_PASSWORD && secretKey());
}

export function verifyCredentials(email: string, password: string): boolean {
  if (!authConfigured()) return false;
  const emailOk = timingSafeEqual(
    digest(email.trim().toLowerCase()),
    digest(adminEmail()),
  );
  const passOk = timingSafeEqual(
    digest(password),
    digest(process.env.ADMIN_PASSWORD as string),
  );
  return emailOk && passOk;
}

export async function createSession(): Promise<void> {
  const key = secretKey();
  if (!key) throw new Error("Auth is not configured");
  const token = await new SignJWT({ email: adminEmail() })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(key);
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const key = secretKey();
  if (!key) return false;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, key);
    return (
      typeof payload.email === "string" &&
      payload.email.toLowerCase() === adminEmail()
    );
  } catch {
    return false;
  }
}

/** Redirects to /admin/login when there is no valid admin session. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}
