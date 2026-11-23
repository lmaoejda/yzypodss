(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/pod/PodScene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PodScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-e51d7528.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Environment.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Lightformer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flavors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/flavors.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
/**
 * 100% procedural disposable-vape model (no .glb/.gltf, no 3D downloads):
 * rounded-prism body (extruded rounded rectangle), glossy mouthpiece, LED.
 *  - with image: the photo is the texture of the front/back faces;
 *  - without image (or if the texture fails to load): a generated label
 *    painted with the flavor color. Never a black/broken model.
 */ const W = 1.1;
const H = 2.25;
const D = 0.5;
const R = 0.32;
const BEVEL_T = 0.07;
const BEVEL_S = 0.05;
function createBodyGeometry() {
    const shape = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Shape"]();
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
    const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtrudeGeometry"](shape, {
        depth: D,
        bevelEnabled: true,
        bevelThickness: BEVEL_T,
        bevelSize: BEVEL_S,
        bevelSegments: 6,
        curveSegments: 24
    });
    geo.translate(0, 0, -D / 2);
    // Normalize UVs so the front/back lids map the texture 0..1.
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    for(let i = 0; i < pos.count; i += 1){
        uv.setXY(i, (pos.getX(i) + W / 2) / W, (pos.getY(i) + H / 2) / H);
    }
    uv.needsUpdate = true;
    return geo;
}
/** Loads the photo; on any error returns null so the caller falls back to color. */ function useImageTexture(url) {
    _s();
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useImageTexture.useEffect": ()=>{
            if (!url) return;
            let cancelled = false;
            let created = null;
            const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextureLoader"]();
            loader.setCrossOrigin("anonymous");
            loader.load(url, {
                "useImageTexture.useEffect": (tex)=>{
                    if (cancelled) {
                        tex.dispose();
                        return;
                    }
                    const img = tex.image;
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
                    ctx.drawImage(tex.image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
                    const fitted = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
                    tex.dispose();
                    fitted.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
                    fitted.anisotropy = 4;
                    created = fitted;
                    setLoaded({
                        url,
                        tex: fitted
                    });
                }
            }["useImageTexture.useEffect"], undefined, {
                "useImageTexture.useEffect": ()=>{
                /* texture failed -> keep the flavor-colored label (graceful fallback) */ }
            }["useImageTexture.useEffect"]);
            return ({
                "useImageTexture.useEffect": ()=>{
                    cancelled = true;
                    created?.dispose();
                }
            })["useImageTexture.useEffect"];
        }
    }["useImageTexture.useEffect"], [
        url
    ]);
    return url && loaded && loaded.url === url ? loaded.tex : null;
}
_s(useImageTexture, "t8wQi0jscww/hrcKAaZRAfoHuBQ=");
function fitText(ctx, text, maxWidth, start) {
    let size = start;
    do {
        ctx.font = `900 ${size}px Impact, "Arial Black", "Arial Narrow", sans-serif`;
        size -= 4;
    }while (ctx.measureText(text).width > maxWidth && size > 24)
}
function makeLabelTexture(brand, model, puffs, pal) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (ctx) {
        const g = ctx.createLinearGradient(0, 0, 0, 1024);
        g.addColorStop(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flavors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixHex"])(pal.primary, "#ffffff", 0.35));
        g.addColorStop(0.45, pal.primary);
        g.addColorStop(1, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flavors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixHex"])(pal.primary, "#000000", 0.45));
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
        const light = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flavors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["luminance"])(pal.primary) > 0.62;
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
    const tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
    tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    tex.anisotropy = 4;
    return tex;
}
function Pod({ input, imageUrl, flavor, brand, model, puffs }) {
    _s1();
    const spin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tilt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ledMat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const extra = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const consumedDx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const palette = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Pod.useMemo[palette]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flavors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flavorPalette"])(flavor)
    }["Pod.useMemo[palette]"], [
        flavor
    ]);
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Pod.useMemo[geometry]": ()=>createBodyGeometry()
    }["Pod.useMemo[geometry]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Pod.useEffect": ()=>({
                "Pod.useEffect": ()=>geometry.dispose()
            })["Pod.useEffect"]
    }["Pod.useEffect"], [
        geometry
    ]);
    const photo = useImageTexture(imageUrl);
    const label = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Pod.useMemo[label]": ()=>photo ? null : makeLabelTexture(brand, model, puffs, palette)
    }["Pod.useMemo[label]"], [
        photo,
        brand,
        model,
        puffs,
        palette
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Pod.useEffect": ()=>({
                "Pod.useEffect": ()=>label?.dispose()
            })["Pod.useEffect"]
    }["Pod.useEffect"], [
        label
    ]);
    const map = photo ?? label;
    const sideColor = photo ? "#111111" : palette.primary;
    const ledColor = photo ? "#ff2a2a" : palette.secondary;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "Pod.useFrame": (state, delta)=>{
            const inp = input.current;
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
        }
    }["Pod.useFrame"]);
    const ledZ = D / 2 + BEVEL_T;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: tilt,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
            ref: spin,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    geometry: geometry,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                            attach: "material-0",
                            map: map,
                            color: "#ffffff",
                            roughness: 0.28,
                            metalness: 0.05,
                            clearcoat: 1,
                            clearcoatRoughness: 0.06
                        }, photo ? "photo" : "label", false, {
                            fileName: "[project]/src/components/pod/PodScene.tsx",
                            lineNumber: 254,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                            attach: "material-1",
                            color: sideColor,
                            roughness: 0.22,
                            metalness: 0.15,
                            clearcoat: 1,
                            clearcoatRoughness: 0.05
                        }, void 0, false, {
                            fileName: "[project]/src/components/pod/PodScene.tsx",
                            lineNumber: 264,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pod/PodScene.tsx",
                    lineNumber: 253,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        0,
                        H / 2 + BEVEL_S + 0.02,
                        0
                    ],
                    scale: [
                        1,
                        1,
                        0.55
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                            args: [
                                0.27,
                                0.3,
                                0.14,
                                40
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/pod/PodScene.tsx",
                            lineNumber: 276,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                            color: "#1a1a1a",
                            roughness: 0.3,
                            metalness: 0.7,
                            clearcoat: 0.6
                        }, void 0, false, {
                            fileName: "[project]/src/components/pod/PodScene.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pod/PodScene.tsx",
                    lineNumber: 275,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        0,
                        H / 2 + BEVEL_S + 0.26,
                        0
                    ],
                    scale: [
                        1.55,
                        1,
                        0.8
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("capsuleGeometry", {
                            args: [
                                0.16,
                                0.2,
                                8,
                                24
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/pod/PodScene.tsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                            color: "#0c0c0c",
                            roughness: 0.15,
                            metalness: 0.2,
                            clearcoat: 1,
                            clearcoatRoughness: 0.04
                        }, void 0, false, {
                            fileName: "[project]/src/components/pod/PodScene.tsx",
                            lineNumber: 281,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pod/PodScene.tsx",
                    lineNumber: 279,
                    columnNumber: 9
                }, this),
                [
                    ledZ,
                    -ledZ
                ].map((z)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            -H / 2 + 0.28,
                            z
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                args: [
                                    0.055,
                                    20,
                                    20
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/pod/PodScene.tsx",
                                lineNumber: 287,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                ref: z > 0 ? ledMat : undefined,
                                color: "#ffffff",
                                emissive: ledColor,
                                emissiveIntensity: 2,
                                toneMapped: false
                            }, void 0, false, {
                                fileName: "[project]/src/components/pod/PodScene.tsx",
                                lineNumber: 288,
                                columnNumber: 13
                            }, this)
                        ]
                    }, z, true, {
                        fileName: "[project]/src/components/pod/PodScene.tsx",
                        lineNumber: 286,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/pod/PodScene.tsx",
            lineNumber: 252,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/pod/PodScene.tsx",
        lineNumber: 251,
        columnNumber: 5
    }, this);
}
_s1(Pod, "s9DJI0n9MT/KdHGSr6lC2izJS0w=", false, function() {
    return [
        useImageTexture,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Pod;
function PodScene(props) {
    const { visible, detail = false, ...rest } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
        frameloop: visible ? "always" : "never",
        dpr: [
            1,
            detail ? 2 : 1.5
        ],
        camera: {
            position: [
                0,
                0,
                detail ? 5.8 : 7.2
            ],
            fov: 30
        },
        gl: {
            antialias: true,
            alpha: true,
            powerPreference: "default"
        },
        style: {
            pointerEvents: "none"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.55
            }, void 0, false, {
                fileName: "[project]/src/components/pod/PodScene.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    3,
                    4,
                    5
                ],
                intensity: 2.2
            }, void 0, false, {
                fileName: "[project]/src/components/pod/PodScene.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    -4,
                    -1,
                    3
                ],
                intensity: 0.9,
                color: "#bcd8ff"
            }, void 0, false, {
                fileName: "[project]/src/components/pod/PodScene.tsx",
                lineNumber: 314,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Environment"], {
                resolution: 64,
                frames: 1,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightformer"], {
                        form: "rect",
                        intensity: 4,
                        position: [
                            0,
                            4,
                            3
                        ],
                        scale: [
                            7,
                            3,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/pod/PodScene.tsx",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightformer"], {
                        form: "rect",
                        intensity: 2.5,
                        position: [
                            -5,
                            1,
                            2
                        ],
                        scale: [
                            3,
                            6,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/pod/PodScene.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightformer"], {
                        form: "rect",
                        intensity: 2,
                        position: [
                            5,
                            0,
                            -2
                        ],
                        scale: [
                            3,
                            6,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/pod/PodScene.tsx",
                        lineNumber: 318,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pod/PodScene.tsx",
                lineNumber: 315,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pod, {
                ...rest
            }, void 0, false, {
                fileName: "[project]/src/components/pod/PodScene.tsx",
                lineNumber: 320,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pod/PodScene.tsx",
        lineNumber: 305,
        columnNumber: 5
    }, this);
}
_c1 = PodScene;
var _c, _c1;
__turbopack_context__.k.register(_c, "Pod");
__turbopack_context__.k.register(_c1, "PodScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/pod/PodScene.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/pod/PodScene.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_pod_PodScene_tsx_1srhxrweri4-i._.js.map