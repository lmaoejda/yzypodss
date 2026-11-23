"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { INSTAGRAM_URL } from "@/lib/whatsapp";
import { CartIcon, InstagramIcon } from "./icons";
import { useMounted } from "./useMounted";
import { useSyncExternalStore } from "react";

function subscribeTheme(onChange: () => void) {
  window.addEventListener("yeezy-theme-change", onChange);
  return () => window.removeEventListener("yeezy-theme-change", onChange);
}

function getThemeSnapshot() {
  return document.documentElement.dataset.theme === "dark";
}

function getServerThemeSnapshot() {
  return false;
}

function setTheme(dark: boolean) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  window.dispatchEvent(new Event("yeezy-theme-change"));
  try {
    localStorage.setItem("yeezy_theme", dark ? "dark" : "light");
  } catch (error) {
    console.warn("No se pudo guardar la preferencia del tema.", error);
  }
}

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
    </svg>
  );
}

export function Header() {
  const mounted = useMounted();
  const dark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const count = useCart((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  const setOpen = useCart((s) => s.setOpen);
  const shown = mounted ? count : 0;

  const toggleTheme = () => {
    setTheme(!dark);
  };

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40 border-b-4 border-black bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-2.5 sm:px-5">
        <Link href="/" className="flex items-center gap-2" aria-label="YEEZY PODS - inicio">
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-9 w-9 shrink-0 rounded-full sm:h-10 sm:w-10"
          />
          <span className="slash-cut whitespace-nowrap font-display text-xl uppercase leading-none tracking-wide sm:text-2xl">
            Yeezy Pods
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={dark}
            aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}
            title={dark ? "Modo claro" : "Modo oscuro"}
            className="theme-toggle flex h-9 w-9 items-center justify-center border-2 border-black bg-white transition hover:bg-black hover:text-white sm:h-10 sm:w-10"
          >
            <ThemeIcon dark={dark} />
          </button>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de YEEZY PODS"
            className="header-social flex h-9 w-9 items-center justify-center border-2 border-black bg-white transition hover:bg-black hover:text-white sm:h-10 sm:w-10"
          >
            <InstagramIcon />
          </a>
          <button
            onClick={() => setOpen(true)}
            aria-label={`Abrir carrito (${shown} productos)`}
            className="header-cart relative flex h-9 items-center gap-1.5 bg-black px-2.5 font-display text-base uppercase text-white transition hover:bg-red-600 sm:h-10 sm:gap-2 sm:px-3 sm:text-lg"
          >
            <CartIcon />
            <span className="hidden sm:inline">Carrito</span>
            {shown > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center bg-red-600 px-1 text-xs font-black text-white ring-2 ring-white">
                {shown}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}
