import Image from "next/image";
import { redirect } from "next/navigation";
import { authConfigured, isAdmin } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  const configured = authConfigured();

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm border-4 border-black bg-white p-6 shadow-[8px_8px_0_#e10600]">
        <div className="mb-6 flex items-center gap-3">
          <Image src="/logo.png" alt="YEEZY PODS" width={56} height={56} className="rounded-full" />
          <div>
            <p className="title-reveal font-display text-3xl uppercase leading-none">Panel</p>
            <p className="text-xs font-bold uppercase text-neutral-600">Yeezy Pods · Acceso privado</p>
          </div>
        </div>
        {configured ? (
          <LoginForm />
        ) : (
          <p className="border-2 border-red-600 bg-red-50 p-3 text-sm font-bold text-red-700">
            Falta configurar ADMIN_EMAIL y ADMIN_PASSWORD en las variables de entorno.
          </p>
        )}
      </div>
    </main>
  );
}
