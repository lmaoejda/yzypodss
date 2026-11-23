"use client";

import { useState, useTransition, type KeyboardEvent } from "react";
import { createProductAction, type ActionResult } from "./actions";

const inputCls =
  "mt-1 w-full border-2 border-black bg-white px-3 py-3 text-base font-bold outline-none focus:border-red-600";

export function NewProductForm() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [puffs, setPuffs] = useState("");
  const [price, setPrice] = useState("");
  const [flavors, setFlavors] = useState<string[]>([]);
  const [flavorDraft, setFlavorDraft] = useState("");
  const [result, setResult] = useState<ActionResult | null>(null);
  const [pending, startTransition] = useTransition();

  function commitFlavor() {
    const value = flavorDraft.trim().replace(/,$/, "").trim();
    if (value && !flavors.some((f) => f.toLowerCase() === value.toLowerCase())) {
      setFlavors((prev) => [...prev, value]);
    }
    setFlavorDraft("");
  }

  function onFlavorKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitFlavor();
    } else if (e.key === "Backspace" && !flavorDraft && flavors.length) {
      setFlavors((prev) => prev.slice(0, -1));
    }
  }

  function submit() {
    const fd = new FormData();
    fd.set("brand", brand);
    fd.set("model", model);
    fd.set("puffs", puffs);
    fd.set("price", price);
    const all = [...flavors];
    const draft = flavorDraft.trim();
    if (draft && !all.includes(draft)) all.push(draft);
    all.forEach((f) => fd.append("flavors", f));
    setResult(null);
    startTransition(async () => {
      const res = await createProductAction(fd);
      setResult(res);
      if (res.ok) {
        setBrand("");
        setModel("");
        setPuffs("");
        setPrice("");
        setFlavors([]);
        setFlavorDraft("");
      }
    });
  }

  return (
    <section className="border-4 border-black bg-white p-4 shadow-[6px_6px_0_#e10600] sm:p-6">
      <h2 className="font-display text-3xl uppercase">Nuevo producto</h2>
      <p className="mb-4 text-sm font-semibold text-neutral-700">
        Completá estos 5 campos. El sistema busca la imagen, la guarda y genera el modelo 3D solo.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="grid gap-4 sm:grid-cols-2"
      >
        <label className="text-xs font-black uppercase">
          Marca
          <input className={inputCls} value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="VUSE" required />
        </label>
        <label className="text-xs font-black uppercase">
          Modelo
          <input className={inputCls} value={model} onChange={(e) => setModel(e.target.value)} placeholder="GO 20K" required />
        </label>
        <label className="text-xs font-black uppercase">
          Puffs
          <input className={inputCls} inputMode="numeric" value={puffs} onChange={(e) => setPuffs(e.target.value)} placeholder="20000" required />
        </label>
        <label className="text-xs font-black uppercase">
          Precio (ARS)
          <input className={inputCls} inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="18000" required />
        </label>
        <div className="sm:col-span-2">
          <label className="text-xs font-black uppercase" htmlFor="flavor-input">
            Sabores — Enter para agregar cada uno
          </label>
          <div className="mt-1 flex flex-wrap items-center gap-2 border-2 border-black bg-white p-2 focus-within:border-red-600">
            {flavors.map((f) => (
              <span key={f} className="inline-flex items-center gap-1 bg-black px-2 py-1 text-xs font-black uppercase text-white">
                {f}
                <button
                  type="button"
                  aria-label={`Quitar ${f}`}
                  onClick={() => setFlavors((prev) => prev.filter((x) => x !== f))}
                  className="px-1 text-red-500 hover:text-white"
                >
                  ✕
                </button>
              </span>
            ))}
            <input
              id="flavor-input"
              value={flavorDraft}
              onChange={(e) => setFlavorDraft(e.target.value)}
              onKeyDown={onFlavorKey}
              onBlur={commitFlavor}
              placeholder={flavors.length ? "Otro sabor…" : "Strawberry Kiwi"}
              className="min-w-[140px] flex-1 px-1 py-2 text-base font-bold outline-none"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-red-600 py-4 font-display text-2xl uppercase tracking-wide text-white transition hover:bg-black disabled:opacity-70"
          >
            {pending ? "Buscando imagen y generando 3D…" : "Guardar y publicar"}
          </button>
        </div>
      </form>
      {result ? (
        <p
          role="status"
          className={`mt-4 border-2 p-3 text-sm font-bold ${
            result.ok ? "border-black bg-neutral-100" : "border-red-600 bg-red-50 text-red-700"
          }`}
        >
          {result.message}
        </p>
      ) : null}
    </section>
  );
}
