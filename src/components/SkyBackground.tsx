"use client";

import { useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * "Entrada al cielo": animated sky with
 *  - blue -> white gradient and a sun glow at the top-left,
 *  - god rays falling from the sun (parallax on scroll + mouse),
 *  - 4 cloud layers drifting at different speeds (parallax depth),
 * Everything is decorative: fixed, pointer-events none, GPU transforms only.
 */

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Circle = { x: number; y: number; r: number };

function buildClouds(seed: number, count: number, minW: number, maxW: number, H: number): Circle[] {
  const rand = rng(seed);
  const out: Circle[] = [];
  for (let i = 0; i < count; i += 1) {
    const cx = ((i + 0.2 + rand() * 0.6) / count) * 1600;
    const w = minW + rand() * (maxW - minW);
    const baseY = H * (0.45 + rand() * 0.35);
    const bumps = 7 + Math.floor(rand() * 4);
    for (let j = 0; j < bumps; j += 1) {
      const t = j / (bumps - 1);
      const dome = Math.sin(t * Math.PI);
      const r = w * (0.1 + 0.12 * dome + rand() * 0.04);
      out.push({
        x: cx + (t - 0.5) * w,
        y: baseY - dome * w * 0.16 - rand() * w * 0.05,
        r,
      });
    }
    // flat-ish base
    out.push({ x: cx, y: baseY + w * 0.02, r: w * 0.2 });
  }
  return out;
}

function CloudLayer({
  seed,
  count,
  minW,
  maxW,
  height,
  blur,
  drift,
  opacity,
}: {
  seed: number;
  count: number;
  minW: number;
  maxW: number;
  height: number;
  blur: number;
  drift: number;
  opacity: number;
}) {
  const circles = useMemo(
    () => buildClouds(seed, count, minW, maxW, height),
    [seed, count, minW, maxW, height],
  );
  const gid = `cg-${seed}`;
  const fid = `cf-${seed}`;
  return (
    <div
      className="cloud-drift sky-cloud-layer"
      style={{
        width: "max(2400px, 200vw)",
        ["--drift" as string]: `${drift}s`,
        opacity,
      }}
    >
      <svg viewBox={`0 0 3200 ${height}`} width="100%" style={{ display: "block" }} aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id={gid} cx=".42" cy=".3" r=".78">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset=".55" stopColor="#ffffff" />
            <stop offset="1" stopColor="#bcd6f3" />
          </radialGradient>
          <filter id={fid} x="-5%" y="-20%" width="110%" height="140%">
            <feGaussianBlur stdDeviation={blur} />
          </filter>
        </defs>
        <g filter={`url(#${fid})`} fill={`url(#${gid})`}>
          {[0, 1600].map((dx) =>
            circles.map((c, i) => <circle key={`${dx}-${i}`} cx={c.x + dx} cy={c.y} r={c.r} />),
          )}
        </g>
      </svg>
    </div>
  );
}

// Rays fall from the sun (top-left): conic angle 0deg = up, 90deg = right, 180deg = down.
const RAY_ANGLES: [number, number][] = [
  [98, 3], [106, 2], [113, 4], [121, 2.5], [128, 5], [137, 3], [145, 2], [153, 4], [162, 3], [171, 2],
];
const RAYS = `conic-gradient(from 0deg at 14% -4%, transparent 0deg, ${RAY_ANGLES.map(
  ([a, w]) =>
    `transparent ${a - w}deg, rgba(255,255,255,.7) ${a}deg, transparent ${a + w * 1.4}deg`,
).join(", ")}, transparent 200deg)`;

export function SkyBackground() {
  const reduce = useReducedMotion();
  const animate = !reduce;

  const mx = useSpring(useMotionValue(0), { stiffness: 40, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 40, damping: 18 });
  const { scrollY } = useScroll();

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  // Scroll parallax (different speed per layer) + mouse parallax.
  const raysY = useTransform(scrollY, [0, 3000], [0, -90]);
  const raysX = useTransform(mx, [-0.5, 0.5], [-18, 18]);
  const raysRotate = useTransform(mx, [-0.5, 0.5], [-2, 2]);

  const farY = useTransform(scrollY, [0, 3000], [0, -60]);
  const farX = useTransform(mx, [-0.5, 0.5], [-8, 8]);
  const midY = useTransform(scrollY, [0, 3000], [0, -180]);
  const midX = useTransform(mx, [-0.5, 0.5], [-20, 20]);
  const nearY = useTransform(scrollY, [0, 3000], [0, -420]);
  const nearX = useTransform(mx, [-0.5, 0.5], [-44, 44]);
  const frontY = useTransform(scrollY, [0, 3000], [0, -700]);
  const frontX = useTransform(mx, [-0.5, 0.5], [-70, 70]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* 1. Sky gradient: deep blue -> pale blue -> pure white */}
      <div
        className="sky-gradient absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #2a78dc 0%, #4c9bec 22%, #8fc4f6 52%, #d3e9fc 80%, #ffffff 100%)",
        }}
      />

      {/* 2. Sun glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 14% -2%, rgba(255,255,255,1) 0%, rgba(255,255,255,.85) 6%, rgba(255,247,214,.45) 16%, rgba(255,255,255,0) 42%)",
        }}
      />

      {/* 3. God rays */}
      <motion.div
        className="sky-rays absolute"
        style={{
          inset: "-10%",
          x: raysX,
          y: raysY,
          rotate: raysRotate,
          transformOrigin: "14% 0%",
          backgroundImage: RAYS,
          WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 14% 0%, #000 0%, transparent 75%)",
          maskImage: "radial-gradient(ellipse 90% 85% at 14% 0%, #000 0%, transparent 75%)",
          mixBlendMode: "screen",
        }}
        animate={animate ? { opacity: [0.55, 0.95, 0.55] } : { opacity: 0.75 }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 4. Cloud layers (far -> near) */}
      <motion.div className="absolute left-0 top-[2%]" style={{ x: farX, y: farY }}>
        <CloudLayer seed={11} count={9} minW={160} maxW={260} height={260} blur={5} drift={220} opacity={0.55} />
      </motion.div>
      <motion.div className="absolute left-0 top-[22%]" style={{ x: midX, y: midY }}>
        <CloudLayer seed={23} count={6} minW={280} maxW={420} height={380} blur={7} drift={140} opacity={0.8} />
      </motion.div>
      <motion.div className="absolute left-0 top-[52%]" style={{ x: nearX, y: nearY }}>
        <CloudLayer seed={37} count={5} minW={420} maxW={620} height={520} blur={9} drift={90} opacity={0.95} />
      </motion.div>
      <motion.div className="absolute left-0 top-[78%]" style={{ x: frontX, y: frontY }}>
        <CloudLayer seed={53} count={4} minW={560} maxW={800} height={620} blur={12} drift={65} opacity={1} />
      </motion.div>

      {/* 5. White fade at the bottom: content always sits on clean white */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,.9))" }}
      />
    </div>
  );
}
