// One-off script used during project setup to generate placeholder SVG
// images in the bakery's warm palette. Not needed at build/runtime —
// safe to delete once you swap in real photography.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const PALETTE = {
  creamFrom: "#FBF1E4",
  creamTo: "#F0DAB8",
  brown: "#6B4226",
  brownDark: "#3E2723",
  accent: "#C1663B",
};

function gradientSvg({ width, height, emoji, label, seed }) {
  const angle = (seed * 37) % 360;
  const id = `g${seed}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="${id}" gradientTransform="rotate(${angle})">
      <stop offset="0%" stop-color="${PALETTE.creamFrom}"/>
      <stop offset="100%" stop-color="${PALETTE.creamTo}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${id})"/>
  <circle cx="${width * 0.78}" cy="${height * 0.22}" r="${Math.min(width, height) * 0.22}" fill="${PALETTE.accent}" opacity="0.12"/>
  <circle cx="${width * 0.14}" cy="${height * 0.86}" r="${Math.min(width, height) * 0.3}" fill="${PALETTE.brown}" opacity="0.08"/>
  <text x="50%" y="46%" text-anchor="middle" font-size="${Math.min(width, height) * 0.32}" dominant-baseline="middle">${emoji}</text>
  <text x="50%" y="${height - Math.min(width, height) * 0.09}" text-anchor="middle" font-family="Georgia, 'Playfair Display', serif" font-size="${Math.min(width, height) * 0.075}" fill="${PALETTE.brownDark}" opacity="0.75">${label}</text>
</svg>`;
}

function write(path, svg) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, svg, "utf-8");
  console.log("wrote", path);
}

const slides = [
  { file: "public/images/slides/slide-bread.svg", emoji: "🍞", label: "Fresh Breads", w: 1600, h: 900 },
  { file: "public/images/slides/slide-cake.svg", emoji: "🫓", label: "Toasts & Biscuits", w: 1600, h: 900 },
  { file: "public/images/slides/slide-pastry.svg", emoji: "🥐", label: "Khari & Puffs", w: 1600, h: 900 },
];

const products = [
  { file: "public/images/products/bread.svg", emoji: "🍞", label: "Bread" },
  { file: "public/images/products/ladi-pav.svg", emoji: "🍞", label: "Ladi Pav" },
  { file: "public/images/products/bun.svg", emoji: "🥐", label: "Bun Maska" },
  { file: "public/images/products/toast.svg", emoji: "🫓", label: "Toast" },
  { file: "public/images/products/masala-toast.svg", emoji: "🫓", label: "Masala Toast" },
  { file: "public/images/products/jeera-butter.svg", emoji: "🍪", label: "Jeera Butter" },
  { file: "public/images/products/nan-khatai.svg", emoji: "🍪", label: "Nan Khatai" },
  { file: "public/images/products/osmania-biscuit.svg", emoji: "🍪", label: "Osmania Biscuit" },
  { file: "public/images/products/coconut-biscuit.svg", emoji: "🍪", label: "Coconut Biscuit" },
  { file: "public/images/products/khari.svg", emoji: "🥐", label: "Khari" },
  { file: "public/images/products/veg-puff.svg", emoji: "🥟", label: "Vegetable Puff" },
  { file: "public/images/products/cream-roll.svg", emoji: "🥐", label: "Cream Roll" },
  { file: "public/images/products/fruit-cake.svg", emoji: "🍰", label: "Plain Fruit Cake" },
];

let seed = 0;
for (const s of slides) {
  write(s.file, gradientSvg({ width: s.w, height: s.h, emoji: s.emoji, label: s.label, seed: seed++ }));
}
for (const p of products) {
  write(p.file, gradientSvg({ width: 600, height: 450, emoji: p.emoji, label: p.label, seed: seed++ }));
}

write(
  "public/images/about.svg",
  gradientSvg({ width: 900, height: 700, emoji: "👩‍🍳", label: "Our Story", seed: seed++ })
);

write(
  "public/images/og-image.svg",
  gradientSvg({ width: 1200, height: 630, emoji: "🥐", label: "Milan Bakers", seed: seed++ })
);

console.log("Done generating placeholder images.");
