"use client";

import { motion } from "framer-motion";
import { formatARS } from "@/lib/format";
import { INSTAGRAM_URL, whatsappLink } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { Silhouette } from "./Silhouette";

export function Hero({ minPrice }: { minPrice: number | null }) {
  return (
    <section className="relative px-3 pb-5 pt-[4.75rem] sm:px-4 sm:pb-6 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="hero-title font-display text-[clamp(4rem,29vw,13rem)] uppercase leading-[0.84] tracking-tight text-black sm:text-[clamp(6rem,18vw,13rem)]"
          >
            <span className="slash-both">YEEZY</span>
            <br />
            <span className="slash-both relative">
              PODS
            </span>
            <motion.span
              aria-hidden="true"
              className="mt-2 block h-3 w-40 origin-left -skew-x-[35deg] bg-red-600 sm:h-4 sm:w-64"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            />
          </motion.h1>
          <motion.div
            className="hidden shrink-0 md:block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Silhouette className="h-[22rem] w-auto" />
          </motion.div>
        </div>

        <div className="mt-4 md:mt-5">
          <div>
            <p className="hero-copy max-w-xl rounded-none bg-white/90 p-3 text-sm font-extrabold leading-snug text-black sm:text-lg">
              Vapeadores descartables. Hasta <span className="text-red-600">55.000 puffs</span>. Elegí tu sabor, armá el
              pedido y cerralo por WhatsApp.
            </p>
            {minPrice ? (
              <p className="mt-3 inline-block -skew-x-6 bg-red-600 px-4 py-2 font-display text-2xl uppercase text-white sm:text-3xl">
                Desde {formatARS(minPrice)}
              </p>
            ) : null}
            <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:flex sm:flex-wrap">
              <a
                href="#catalogo"
                className="hero-primary col-span-2 min-h-12 bg-black px-4 py-3 text-center font-display text-lg uppercase tracking-wide text-white transition hover:bg-red-600 sm:col-span-1 sm:px-5 sm:text-2xl"
              >
                Ver catálogo
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-secondary flex min-h-12 items-center justify-center gap-1.5 border-2 border-black bg-white px-2 py-2 font-display text-sm uppercase transition hover:bg-black hover:text-white sm:gap-2 sm:px-4 sm:py-3 sm:text-lg"
              >
                <InstagramIcon /> Instagram
              </a>
              <a
                href={whatsappLink("¡Hola YEEZY PODS! Quiero consultar por los pods.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-secondary flex min-h-12 items-center justify-center gap-1.5 border-2 border-black bg-white px-2 py-2 font-display text-sm uppercase transition hover:bg-black hover:text-white sm:gap-2 sm:px-4 sm:py-3 sm:text-lg"
              >
                <WhatsAppIcon /> WhatsApp
              </a>
            </div>
          </div>
          <Silhouette className="mx-auto mt-3 h-28 w-auto sm:hidden" />
        </div>
      </div>
    </section>
  );
}
