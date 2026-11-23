"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { flavorPalette, luminance, mixHex, type FlavorPalette } from "@/lib/flavors";
import type { PodInput, PodSceneProps } from "./pod-types";

/**
 * 100% procedural disposable-vape model (no .glb/.gltf, no 3D downloads):
 * rounded-prism body (extruded rounded rectangle), glossy mouthpiece, LED.
 *  - with image: the photo is the texture of the front/back faces;
 *  - without image (or if the texture fails to load): a generated label
 *    painted with the flavor color. Never a black/broken model.
 */

const W = 1.1;
const H = 2.25;
const D = 0.5;
const R = 0.32;
const BEVEL_T = 0.07;
const BEVEL_S = 0.05;

function createBodyGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const x = -W / 2;
  const y = -H / 2;
  shape.moveTo(x + R, y);
  shape.lineTo(x + W - R, y);
  shape.absarc(x + W - R, y + R, R, -Math.PI / 2, 0, false);
  shape.lineTo(x + W, y + H - R);
  shape.absarc(x + W - R, y + H - R, R, 0, Math.PI / 2, false);
  shape.lineTo(x + R, y + H);
  shape.absarc(x + R, y + H - R, R, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + R);
  shape.absarc(x + R, y + R, R, Math.PI, Math.PI * 1.5, false);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: D,
    bevelEnabled: true,
    bevelThickness: BEVEL_T,
    bevelSize: BEVEL_S,
    bevelSegments: 6,
    curveSegments: 24,
  });
  geo.translate(0, 0, -D / 2);

  // Normalize UVs so the front/back lids map the texture 0..1.
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i += 1) {
    uv.setXY(i, (pos.getX(i) + W / 2) / W, (pos.getY(i) + H / 2) / H);
  }
  uv.needsUpdate = true;
  return geo;
}

/** Loads the photo; on any error returns null so the caller falls back to color. */
function useImageTexture(url: string | null): THREE.Texture | null {
  const [loaded, setLoaded] = useState<{ url: string; tex: THREE.Texture } | null>(null);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    let created: THREE.Texture | null = null;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      url,
      (tex) => {
        if (cancelled) {
          tex.dispose();
          return;
        }
        const img = tex.image as { width: number; height: number };
        if (!img?.width || !img?.height) {
          tex.dispose();
          return;
        }
        // Preserve the uploaded photo's aspect ratio inside the exact 1:2
        // front-face proportions of the 3D pod instead of stretching or cropping it.
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 1024;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          tex.dispose();
          return;
        }
        ctx.fillStyle = "#111111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const width = img.width * scale;
        const height = img.height * scale;
        ctx.drawImage(
          tex.image as HTMLImageElement | HTMLCanvasElement | ImageBitmap,
          (canvas.width - width) / 2,
          (canvas.height - height) / 2,
          width,
          height,
        );
        const fitted = new THREE.CanvasTexture(canvas);
        tex.dispose();
        fitted.colorSpace = THREE.SRGBColorSpace;
        fitted.anisotropy = 4;
        created = fitted;
        setLoaded({ url, tex: fitted });
      },
      undefined,
      () => {
        /* texture failed -> keep the flavor-colored label (graceful fallback) */
      },
    );
    return () => {
      cancelled = true;
      created?.dispose();
    };
  }, [url]);

  return url && loaded && loaded.url === url ? loaded.tex : null;
}

function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, start: number) {
  let size = start;
  do {
    ctx.font = `900 ${size}px Impact, "Arial Black", "Arial Narrow", sans-serif`;
    size -= 4;
  } while (ctx.measureText(text).width > maxWidth && size > 24);
}

function makeLabelTexture(
  brand: string,
  model: string,
  puffs: number,
  pal: FlavorPalette,
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createLinearGradient(0, 0, 0, 1024);
    g.addColorStop(0, mixHex(pal.primary, "#ffffff", 0.35));
    g.addColorStop(0.45, pal.primary);
    g.addColorStop(1, mixHex(pal.primary, "#000000", 0.45));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 1024);

    // slash stripes in the secondary color
    ctx.fillStyle = pal.secondary;
    ctx.beginPath();
    ctx.moveTo(0, 650);
    ctx.lineTo(512, 540);
    ctx.lineTo(512, 600);
    ctx.lineTo(0, 716);
    ctx.fill();
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.moveTo(0, 730);
    ctx.lineTo(512, 616);
    ctx.lineTo(512, 640);
    ctx.lineTo(0, 756);
    ctx.fill();
    ctx.globalAlpha = 1;

    const light = luminance(pal.primary) > 0.62;
    const ink = light ? "#0a0a0a" : "#ffffff";
    ctx.fillStyle = ink;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    fitText(ctx, brand, 400, 96);
    ctx.fillText(brand, 256, 250);
    fitText(ctx, model, 420, 170);
    ctx.fillText(model, 256, 400);

    // puffs chip
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(86, 850, 340, 90);
    ctx.fillStyle = "#ffffff";
    const k = puffs >= 1000 ? `${Math.round(puffs / 1000)}K` : String(puffs);
    fitText(ctx, `${k} PUFFS`, 300, 64);
    ctx.fillText(`${k} PUFFS`, 256, 897);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function Pod({
  input,
  imageUrl,
  flavor,
  brand,
  model,
  puffs,
}: Omit<PodSceneProps, "visible">) {
  const spin = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const ledMat = useRef<THREE.MeshStandardMaterial>(null);
  const extra = useRef(0);
  const consumedDx = useRef(0);

  const palette = useMemo(() => flavorPalette(flavor), [flavor]);
  const geometry = useMemo(() => createBodyGeometry(), []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const photo = useImageTexture(imageUrl);
  const label = useMemo(
    () => (photo ? null : makeLabelTexture(brand, model, puffs, palette)),
    [photo, brand, model, puffs, palette],
  );
  useEffect(() => () => label?.dispose(), [label]);

  const map = photo ?? label;
  const sideColor = photo ? "#111111" : palette.primary;
  const ledColor = photo ? "#ff2a2a" : palette.secondary;

  useFrame((state, delta) => {
    const inp: PodInput = input.current;
    const s = spin.current;
    const t = tilt.current;
    if (!s || !t) return;

    if (inp.dragging) {
      const d = (inp.dx - consumedDx.current) * 0.012;
      s.rotation.y += d;
      extra.current = Math.max(-10, Math.min(10, d / Math.max(delta, 0.008)));
      consumedDx.current = inp.dx;
    } else {
      consumedDx.current = inp.dx;
      extra.current *= 0.94;
      s.rotation.y += (0.7 + extra.current) * delta;
    }

    const targetX = inp.hover ? -inp.py * 0.35 : 0;
    const targetZ = inp.hover ? -inp.px * 0.18 : 0;
    t.rotation.x += (targetX - t.rotation.x) * 0.1;
    t.rotation.z += (targetZ - t.rotation.z) * 0.1;
    t.position.y = -0.24 + Math.sin(state.clock.elapsedTime * 1.4) * 0.04;

    if (ledMat.current) {
      ledMat.current.emissiveIntensity = 1.8 + Math.sin(state.clock.elapsedTime * 3) * 0.9;
    }
  });

  const ledZ = D / 2 + BEVEL_T;

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <mesh geometry={geometry}>
          <meshPhysicalMaterial
            key={photo ? "photo" : "label"}
            attach="material-0"
            map={map}
            color="#ffffff"
            roughness={0.28}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.06}
          />
          <meshPhysicalMaterial
            attach="material-1"
            color={sideColor}
            roughness={0.22}
            metalness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* mouthpiece */}
        <mesh position={[0, H / 2 + BEVEL_S + 0.02, 0]} scale={[1, 1, 0.55]}>
          <cylinderGeometry args={[0.27, 0.3, 0.14, 40]} />
          <meshPhysicalMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} clearcoat={0.6} />
        </mesh>
        <mesh position={[0, H / 2 + BEVEL_S + 0.26, 0]} scale={[1.55, 1, 0.8]}>
          <capsuleGeometry args={[0.16, 0.2, 8, 24]} />
          <meshPhysicalMaterial color="#0c0c0c" roughness={0.15} metalness={0.2} clearcoat={1} clearcoatRoughness={0.04} />
        </mesh>

        {/* LEDs (front + back) */}
        {[ledZ, -ledZ].map((z) => (
          <mesh key={z} position={[0, -H / 2 + 0.28, z]}>
            <sphereGeometry args={[0.055, 20, 20]} />
            <meshStandardMaterial
              ref={z > 0 ? ledMat : undefined}
              color="#ffffff"
              emissive={ledColor}
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function PodScene(props: PodSceneProps) {
  const { visible, detail = false, ...rest } = props;
  return (
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={[1, detail ? 2 : 1.5]}
      camera={{ position: [0, 0, detail ? 5.8 : 7.2], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "default" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-4, -1, 3]} intensity={0.9} color="#bcd8ff" />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={4} position={[0, 4, 3]} scale={[7, 3, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[-5, 1, 2]} scale={[3, 6, 1]} />
        <Lightformer form="rect" intensity={2} position={[5, 0, -2]} scale={[3, 6, 1]} />
      </Environment>
      <Pod {...rest} />
    </Canvas>
  );
}
