"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, { error: null });

  return (
    <form action={action} className="space-y-4">
      <label className="block text-xs font-black uppercase">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1 w-full border-2 border-black px-3 py-3 text-base font-bold outline-none focus:border-red-600"
        />
      </label>
      <label className="block text-xs font-black uppercase">
        Contraseña
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full border-2 border-black px-3 py-3 text-base font-bold outline-none focus:border-red-600"
        />
      </label>
      {state.error ? (
        <p role="alert" className="text-sm font-bold text-red-600">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-black py-3 font-display text-xl uppercase tracking-wide text-white transition hover:bg-red-600 disabled:opacity-60"
      >
        {pending ? "Ingresando…" : "Ingresar"}
      </button>
    </form>
  );
}
