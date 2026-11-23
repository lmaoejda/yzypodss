const ITEMS = [
  "ENVÍO A TODO POSADAS",
  "CONSULTÁ POR WHATSAPP",
  "PEDÍ EN 3 TAPS",
  "ENVÍO A TODO POSADAS",
  "CONSULTÁ POR WHATSAPP",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((text, i) => (
        <span key={i} className="flex items-center whitespace-nowrap font-display text-2xl uppercase tracking-wide sm:text-3xl">
          <span className="px-5">{text}</span>
          <span aria-hidden="true" className="inline-block h-6 w-2 -skew-x-[30deg] bg-red-600" />
        </span>
      ))}
    </div>
  );
}

export function ShippingBanner() {
  return (
    <div className="overflow-hidden border-y-4 border-white bg-black py-3 text-white" role="note" aria-label="Envio a todo Posadas, consultá por WhatsApp">
      <div className="marquee-track flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  );
}
