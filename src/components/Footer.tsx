import Image from "next/image";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_NUMBER, whatsappLink } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t-4 border-black bg-black px-4 pb-28 pt-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="YEEZY PODS" width={72} height={72} className="rounded-full" />
          <div>
            <p className="slash-cut font-display text-3xl uppercase leading-none">Yeezy Pods</p>
            <p className="text-xs font-bold uppercase text-neutral-400">Pods descartables · Argentina</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm font-extrabold uppercase sm:items-end">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-500">
            <InstagramIcon /> Instagram {INSTAGRAM_HANDLE}
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-500">
            <WhatsAppIcon /> WhatsApp +{WHATSAPP_NUMBER}
          </a>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-6xl border-t-2 border-white/20 pt-4 text-xs font-extrabold uppercase">
        <span className="mr-2 bg-red-600 px-2 py-1 font-display text-base">+18</span>
        Venta prohibida a menores de 18 años. El vapeo contiene nicotina, sustancia adictiva.
      </p>
    </footer>
  );
}
