import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "YEEZY PODS",
  description:
    "YEEZY PODS — vapeadores descartables (pods). Elegí tu sabor, armá el pedido y cerralo por WhatsApp. Envío a todo Posadas.",
  openGraph: {
    title: "YEEZY PODS",
    description: "Pods descartables. Pedí por WhatsApp. Envío a todo Posadas.",
    type: "website",
    locale: "es_AR",
    siteName: "YEEZY PODS",
  },
  twitter: { card: "summary_large_image", title: "YEEZY PODS" },
};

export const viewport: Viewport = {
  themeColor: "#2f7fe0",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Runs before paint: tells CSS whether the age gate must be shown (no flash).
const AGE_SCRIPT = `try{const t=localStorage.getItem('yeezy_theme');document.documentElement.dataset.theme=t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';document.documentElement.dataset.age=localStorage.getItem('yeezy_age_verified')==='1'?'ok':'no'}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.age='no'}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR" className={`${anton.variable} ${archivo.variable}`} suppressHydrationWarning>
      <head>
        <Script id="initial-site-state" strategy="beforeInteractive">
          {AGE_SCRIPT}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
