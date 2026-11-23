import type { AutomationLog } from "@/lib/types";

const LABELS: Record<string, { text: string; cls: string }> = {
  image_found: { text: "imagen encontrada", cls: "bg-black text-white" },
  color_fallback: { text: "fallback color", cls: "bg-yellow-300 text-black" },
  api_error: { text: "error de API", cls: "bg-red-600 text-white" },
};

const dateFmt = new Intl.DateTimeFormat("es-AR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Argentina/Buenos_Aires",
});

export function LogsList({ logs }: { logs: AutomationLog[] }) {
  return (
    <section className="border-4 border-black bg-white p-4">
      <h2 className="font-display text-3xl uppercase">Automatizaciones (últimas 20)</h2>
      {logs.length === 0 ? (
        <p className="mt-2 text-sm font-semibold text-neutral-600">Todavía no hay registros.</p>
      ) : (
        <ul className="mt-3 divide-y-2 divide-black/10">
          {logs.map((log) => {
            const label = LABELS[log.status] ?? { text: log.status, cls: "bg-neutral-300" };
            return (
              <li key={log.id} className="flex flex-col gap-1 py-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="w-32 shrink-0 text-xs font-bold text-neutral-600">
                  {dateFmt.format(new Date(log.createdAt))}
                </span>
                <span className="font-display text-lg uppercase leading-none">{log.productLabel}</span>
                <span className={`w-fit px-2 py-0.5 text-[11px] font-black uppercase ${label.cls}`}>{label.text}</span>
                {log.detail ? <span className="text-xs font-semibold text-neutral-600">{log.detail}</span> : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
