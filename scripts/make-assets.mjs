// Generates raster brand assets from public/logo.svg:
//   public/logo.png, src/app/icon.png, src/app/apple-icon.png, src/app/opengraph-image.png
// Usage: node scripts/make-assets.mjs
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const svg = await readFile(new URL("../public/logo.svg", import.meta.url));

await sharp(svg, { density: 300 }).resize(512, 512).png().toFile("public/logo.png");
await sharp(svg, { density: 300 }).resize(256, 256).png().toFile("src/app/icon.png");
await sharp(svg, { density: 300 }).resize(180, 180).png().toFile("src/app/apple-icon.png");

const logo = await sharp(svg, { density: 300 }).resize(520, 520).png().toBuffer();
const sky = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2f7fe0"/><stop offset=".6" stop-color="#9fcdf7"/><stop offset="1" stop-color="#ffffff"/>
    </linearGradient>
    <radialGradient id="sun" cx=".1" cy="0" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <filter id="b"><feGaussianBlur stdDeviation="22"/></filter>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#sun)"/>
  <g filter="url(#b)" fill="#fff" opacity=".95">
    <ellipse cx="160" cy="560" rx="260" ry="90"/><ellipse cx="520" cy="620" rx="300" ry="80"/>
    <ellipse cx="980" cy="560" rx="300" ry="100"/><ellipse cx="1150" cy="150" rx="160" ry="60"/>
  </g>
  <g font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" fill="#000">
    <text x="640" y="270" font-size="110">YEEZY</text>
    <text x="640" y="380" font-size="110">PODS</text>
  </g>
  <rect x="640" y="410" width="360" height="16" fill="#e10600" transform="skewX(-30)" />
  <text x="640" y="480" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="34" fill="#000">PODS DESCARTABLES · ENVIO A TODO POSADAS</text>
</svg>`);

await sharp(sky)
  .composite([{ input: logo, left: 70, top: 55 }])
  .png()
  .toFile("src/app/opengraph-image.png");

console.log("Assets generated.");
