import { AnimatedHeading } from "./AnimatedHeading";

const STEPS = [
  { n: "01", title: "Elegí", text: "Escogé tu pod y el sabor que más te guste." },
  { n: "02", title: "Agregá", text: "Sumalo al carrito. Podés combinar varios sabores." },
  { n: "03", title: "Pedí", text: "Finalizá por WhatsApp: confirmamos stock, pago y envío." },
];

export function InfoBlock() {
  return (
    <section className="px-3 py-8 sm:px-4 sm:py-10">
      <div className="info-panel mx-auto max-w-6xl border-4 border-black bg-white p-4 shadow-[8px_8px_0_#e10600] sm:p-8">
        <AnimatedHeading className="slash-cut font-display text-4xl uppercase leading-none sm:text-5xl">
          Cómo comprar
        </AnimatedHeading>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="info-step border-l-8 border-red-600 bg-neutral-100 p-3 sm:p-4">
              <p className="font-display text-5xl leading-none text-red-600">{s.n}</p>
              <p className="mt-1 font-display text-2xl uppercase">{s.title}</p>
              <p className="info-step-copy mt-1 text-sm font-bold text-neutral-800">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 bg-black px-3 py-3 text-xs font-extrabold uppercase text-white sm:px-4 sm:text-sm">
          Envío a todo Posadas · Consultá costos y tiempos por WhatsApp · Venta exclusiva a mayores de 18 años
        </p>
      </div>
    </section>
  );
}
