import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Acceso bloqueado · YEEZY PODS",
  robots: { index: false, follow: false },
};

export default function BloqueadoPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-black px-5 text-center text-white">
      <Image src="/logo.png" alt="YEEZY PODS" width={120} height={120} className="rounded-full" />
      <p className="mt-6 bg-red-600 px-4 py-1 font-display text-6xl leading-tight">+18</p>
      <h1 className="title-reveal slash-cut mt-4 font-display text-5xl uppercase leading-none sm:text-7xl">Acceso bloqueado</h1>
      <p className="mt-4 max-w-md text-base font-bold text-neutral-300">
        Este sitio vende productos de vapeo y es exclusivo para mayores de 18 años. Volvé cuando cumplas la mayoría de edad.
      </p>
    </main>
  );
}
