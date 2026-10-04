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
  { file: "public/images/slides/slide-cake.svg", emoji: "🎂", label: "Celebration Cakes", w: 1600, h: 900 },
  { file: "public/images/slides/slide-pastry.svg", emoji: "🥐", label: "Flaky Pastries", w: 1600, h: 900 },
];

const products = [
  { file: "public/images/products/sourdough.svg", emoji: "🍞", label: "Classic Sourdough" },
  { file: "public/images/products/whole-wheat.svg", emoji: "🍞", label: "Whole Wheat Loaf" },
  { file: "public/images/products/baguette.svg", emoji: "🥖", label: "Garlic Baguette" },
  { file: "public/images/products/chocolate-cake.svg", emoji: "🍫", label: "Chocolate Truffle Cake" },
  { file: "public/images/products/red-velvet.svg", emoji: "🍰", label: "Red Velvet Cake" },
  { file: "public/images/products/black-forest.svg", emoji: "🍒", label: "Black Forest Cake" },
  { file: "public/images/products/croissant.svg", emoji: "🥐", label: "Butter Croissant" },
  { file: "public/images/products/danish.svg", emoji: "🍓", label: "Fruit Danish" },
  { file: "public/images/products/veg-puff.svg", emoji: "🥟", label: "Vegetable Puff" },
  { file: "public/images/products/cookies.svg", emoji: "🍪", label: "Choco-Chip Cookies" },
  { file: "public/images/products/jeera-biscuits.svg", emoji: "🫓", label: "Jeera Biscuits" },
  { file: "public/images/products/coffee.svg", emoji: "☕", label: "Filter Coffee" },
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
