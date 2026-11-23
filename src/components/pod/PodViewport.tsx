"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { flavorPalette } from "@/lib/flavors";
import type { PodInput } from "./pod-types";

type Props = {
  imageUrl: string | null;
  flavor: string;
  brand: string;
  model: string;
  puffs: number;
  detail?: boolean;
  paused?: boolean;
};

/** CSS-only pod: loading state and last-resort fallback (no WebGL). */
function FlatPod({ flavor }: { flavor: string }) {
  const { primary, secondary } = flavorPalette(flavor);
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
      <div className="relative">
        <div className="mx-auto h-6 w-10 rounded-t-xl bg-black" />
        <div
          className="h-48 w-24 rounded-3xl border-2 border-black shadow-lg"
          style={{ background: `linear-gradient(160deg, ${primary}, ${secondary})` }}
        />
      </div>
    </div>
  );
}

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

// three.js is code-split and only loaded on the client.
const PodScene = dynamic(() => import("./PodScene"), { ssr: false });

/**
 * One lazy R3F canvas per card: mounted when near the viewport, rendering is
 * paused (frameloop "never") whenever it leaves the viewport.
 */
export function PodViewport({ paused = false, ...props }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const input = useRef<PodInput>({ px: 0, py: 0, hover: false, dragging: false, dx: 0, lastX: 0 });
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting && !paused);
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [paused]);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const i = input.current;
    i.px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    i.py = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    if (i.dragging) {
      i.dx += e.clientX - i.lastX;
      i.lastX = e.clientX;
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full cursor-grab select-none active:cursor-grabbing"
      style={{ touchAction: "pan-y" }}
      onPointerEnter={() => (input.current.hover = true)}
      onPointerMove={move}
      onPointerLeave={() => {
        const i = input.current;
        i.hover = false;
        i.dragging = false;
        i.px = 0;
        i.py = 0;
      }}
      onPointerDown={(e) => {
        const i = input.current;
        i.dragging = true;
        i.lastX = e.clientX;
        i.hover = true;
      }}
      onPointerUp={() => (input.current.dragging = false)}
      onPointerCancel={() => (input.current.dragging = false)}
    >
      {near ? (
        <Boundary fallback={<FlatPod flavor={props.flavor} />}>
          <PodScene input={input} visible={visible} {...props} />
        </Boundary>
      ) : (
        <FlatPod flavor={props.flavor} />
      )}
    </div>
  );
}
