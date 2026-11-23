"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const KEY = "yeezy_age_verified";

/**
 * Blocking +18 modal. Visibility is driven by CSS (html[data-age]) set by an
 * inline script before paint, so there is no flash of unverified content.
 */
export function AgeGate() {
  const router = useRouter();

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* storage unavailable: still let the user in for this session */
    }
    document.documentElement.dataset.age = "ok";
  };

  const deny = () => {
    router.replace("/bloqueado");
  };

  return (
    <div
      className="age-gate fixed inset-0 z-[100] items-center justify-center bg-black/95 p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-title"
    >
      <div className="w-full max-w-md border-4 border-white bg-black p-6 text-center text-white shadow-[8px_8px_0_#e10600]">
        <Image src="/logo.png" alt="YEEZY PODS" width={96} height={96} priority className="mx-auto mb-4 rounded-full" />
        <h2 id="age-title" className="title-reveal slash-cut font-display text-5xl uppercase leading-none">
          ¿Sos mayor de 18?
        </h2>
        <p className="mt-3 text-sm font-bold text-neutral-300">
          Vendemos productos de vapeo. El acceso es solo para mayores de edad.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={accept}
            className="bg-red-600 py-4 font-display text-2xl uppercase tracking-wide text-white transition hover:bg-white hover:text-black"
          >
            Sí, soy +18
          </button>
          <button
            onClick={deny}
            className="border-2 border-white py-4 font-display text-2xl uppercase tracking-wide text-white transition hover:bg-white hover:text-black"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
