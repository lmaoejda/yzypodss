"use client";

import { useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { importProductsAction, type ActionResult } from "./actions";

const SAMPLE = [
  "VUSE | GO 20K | 20000 | 18000 | Strawberry Kiwi, Mango Ice",
  "ELFBAR | BC 15K | 15000 | 16000 | Blue Razz, Watermelon",
].join("\n");

export function BulkProductImport() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ActionResult | null>(null);
  const [pending, startTransition] = useTransition();
  const lineCount = text.split(/\r?\n/).filter((line) => line.trim() && !line.trim().startsWith("#")).length;

  async function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    if (file.size > 100_000) {
      setResult({ ok: false, message: "El archivo supera el límite de 100 KB." });
      event.currentTarget.value = "";
      return;
    }
    try {
      setText(await file.text());
      setResult(null);
    } catch (error) {
      console.error("[admin] could not read product import file", error);
      setResult({ ok: false, message: "No se pudo leer el archivo. Probá pegar su contenido en el campo." });
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);
    startTransition(async () => {
      const response = await importProductsAction(text);
      setResult(response);
      if (response.ok) setText("");
    });
  }

  return (
    <section className="border-4 border-black bg-white p-4 shadow-[6px_6px_0_#111] sm:p-6">
      <h2 className="font-display text-3xl uppercase">Importar varios productos</h2>
      <p className="mt-1 text-sm font-semibold text-neutral-700">
        Subí un archivo .txt o pegá su contenido. Una línea por producto y cinco campos separados por |:
      </p>
      <p className="mt-2 break-all border-l-4 border-red-600 bg-neutral-100 p-3 font-mono text-xs font-bold sm:text-sm">
        Marca | Modelo | Puffs | Precio ARS | Sabor 1, Sabor 2
      </p>
      <p className="mt-2 text-xs font-semibold text-neutral-600">
        Ejemplo: ELFBAR | BC 15K | 15000 | 16000 | Blue Razz, Watermelon. Se admiten hasta 50 productos por archivo.
      </p>

      <label className="mt-4 block text-xs font-black uppercase">
        Archivo TXT
        <input
          type="file"
          accept=".txt,text/plain"
          onChange={onFileChange}
          className="mt-1 block min-h-11 w-full cursor-pointer border-2 border-black bg-white p-2 text-sm file:mr-3 file:border-0 file:bg-black file:px-3 file:py-2 file:font-bold file:uppercase file:text-white"
        />
      </label>

      <form onSubmit={submit} className="mt-4">
        <label htmlFor="bulk-products" className="text-xs font-black uppercase">
          Contenido del archivo
        </label>
        <textarea
          id="bulk-products"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setResult(null);
          }}
          rows={7}
          maxLength={100_000}
          placeholder={SAMPLE}
          className="mt-1 w-full resize-y border-2 border-black bg-white px-3 py-3 font-mono text-sm font-semibold outline-none focus:border-red-600"
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-neutral-600">{lineCount} producto(s) detectados</span>
          <button
            type="button"
            onClick={() => {
              setText(SAMPLE);
              setResult(null);
            }}
            className="min-h-11 border-2 border-black px-3 py-2 text-xs font-black uppercase transition hover:bg-black hover:text-white"
          >
            Cargar ejemplo
          </button>
        </div>
        <button
          type="submit"
          disabled={pending || !text.trim()}
          className="mt-4 min-h-12 w-full bg-red-600 px-4 py-3 font-display text-xl uppercase tracking-wide text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Importando productos…" : `Validar y publicar ${lineCount || ""}`}
        </button>
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
