#!/usr/bin/env node
// Draws the placeholder cartoon heads in public/heads/*.svg.
// Each one is a die-cut sticker: white outline, torn crown. Replace any file
// with a fan-edit PNG and point `head` in data/characters.ts at it.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "heads");

const heads = {
  janine: { skin: "#9a6440", shade: "#8a5636", hair: "#2a1a12", style: "puff", mouth: "grin", earrings: "hoops" },
  gregory: { skin: "#7a4b2e", shade: "#6b3f25", hair: "#1c120d", style: "crop", mouth: "flat", beard: "#1c120d", brows: "low" },
  barbara: { skin: "#5c3a24", shade: "#4e301d", hair: "#3b3434", style: "curls", mouth: "smile", earrings: "pearls" },
  melissa: { skin: "#f0c8a8", shade: "#e2b28f", hair: "#5a2a1a", style: "waves", mouth: "smirk", earrings: "hoops", brows: "raised" },
  ava: { skin: "#a8704a", shade: "#965f3b", hair: "#1b1210", style: "sleek", mouth: "grin", earrings: "studs", shades: true, lashes: true },
  jacob: { skin: "#f3cfb0", shade: "#e6b994", hair: "#7a5233", style: "neat", mouth: "smile", glasses: true },
  johnson: { skin: "#5a3622", shade: "#4b2c1b", hair: "#b9b4ab", style: "bald", mouth: "smirk", moustache: "#cfcac0", brows: "low" },
};

const torn = (dy) =>
  `M0 ${90 + dy} L24 ${66 + dy} L44 ${90 + dy} L66 ${60 + dy} L86 ${86 + dy} L110 ${54 + dy} L130 ${82 + dy} L154 ${56 + dy} L176 ${84 + dy} L200 ${52 + dy} L220 ${80 + dy} L244 ${58 + dy} L264 ${88 + dy} L290 ${62 + dy} L320 ${90 + dy} L320 340 L0 340 Z`;

const FACE = "M80 205 Q70 118 160 110 Q250 118 240 205 Q238 300 160 312 Q82 300 80 205Z";

function hairBack({ hair, style, skin }) {
  switch (style) {
    case "puff":
      return `<ellipse cx="160" cy="118" rx="124" ry="98" fill="${hair}"/><ellipse cx="72" cy="170" rx="34" ry="62" fill="${hair}"/><ellipse cx="248" cy="170" rx="34" ry="62" fill="${hair}"/>`;
    case "curls": {
      const pts = [[70,150],[60,190],[66,232],[84,262],[100,104],[132,84],[170,78],[206,88],[236,110],[256,148],[262,190],[254,232],[236,262],[86,120],[120,70],[160,62],[200,70],[232,90]];
      return pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="34" fill="${hair}"/>`).join("") +
        `<circle cx="118" cy="96" r="10" fill="#6b6262"/><circle cx="210" cy="84" r="8" fill="#6b6262"/><circle cx="66" cy="196" r="9" fill="#6b6262"/>`;
    }
    case "waves":
      return `<path d="M60 314 Q30 230 56 150 Q80 60 160 58 Q240 60 264 150 Q290 230 260 314 Q236 290 240 250 L80 250 Q84 290 60 314Z" fill="${hair}"/>`;
    case "sleek":
      return `<path d="M64 314 L66 150 Q76 62 160 58 Q244 62 254 150 L256 314 Q232 300 232 260 L88 260 Q88 300 64 314Z" fill="${hair}"/>`;
    case "crop":
      return `<path d="M82 180 Q74 68 160 64 Q246 68 238 180 Q226 126 160 124 Q94 126 82 180Z" fill="${hair}"/>`;
    case "neat":
      return `<path d="M80 186 Q70 64 160 60 Q250 64 240 186 Q236 130 200 118 Q150 134 100 126 Q84 140 80 186Z" fill="${hair}"/>`;
    case "bald":
      return `<ellipse cx="160" cy="150" rx="82" ry="86" fill="${skin}"/><path d="M80 210 Q76 170 88 150 L96 200Z M240 210 Q244 170 232 150 L224 200Z" fill="${hair}"/>`;
  }
}

function hairFront({ hair, style }) {
  switch (style) {
    case "puff":
      return `<path d="M78 150 Q110 94 190 110 Q228 120 228 160 Q200 126 150 130 Q100 134 78 150Z" fill="${hair}"/>`;
    case "waves":
      return `<path d="M78 170 Q90 96 170 100 Q120 120 112 170 Q100 140 78 170Z M170 100 Q236 104 244 176 Q220 132 186 128Z" fill="${hair}"/>`;
    case "sleek":
      return `<path d="M76 190 Q80 100 160 98 Q110 130 100 200Z M160 98 Q240 100 244 190 Q232 130 160 98Z" fill="${hair}"/>`;
    case "neat":
      return `<path d="M88 150 Q120 100 200 112 Q170 120 150 136 Q120 132 88 150Z" fill="${hair}"/>`;
    default:
      return "";
  }
}

function eyes(h) {
  const eye = (x) =>
    `<ellipse cx="${x}" cy="204" rx="11" ry="13" fill="#fff"/><circle cx="${x + 2}" cy="206" r="7" fill="#1a0f0a"/><circle cx="${x + 4}" cy="203" r="2.5" fill="#fff"/>`;
  let s = eye(120) + eye(200);
  if (h.lashes) s += `<path d="M106 194 l-6 -6 M112 190 l-3 -7 M214 194 l6 -6 M208 190 l3 -7" stroke="#1a0f0a" stroke-width="3" stroke-linecap="round"/>`;
  const browY = h.brows === "low" ? 186 : 180;
  const left = `M104 ${browY} q16 -12 32 0`;
  const right = h.brows === "raised" ? `M184 ${browY - 10} q16 -16 32 -4` : `M184 ${browY} q16 -12 32 0`;
  s += `<path d="${left} ${right}" stroke="${h.style === "bald" ? h.hair : h.hair}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  if (h.glasses)
    s += `<g fill="none" stroke="#2b2b2b" stroke-width="5"><circle cx="122" cy="206" r="24"/><circle cx="198" cy="206" r="24"/><path d="M146 204 q14 -8 28 0 M98 202 L82 196 M222 202 L238 196"/></g>`;
  return s;
}

function mouth(kind) {
  switch (kind) {
    case "grin":
      return `<path d="M118 254 Q160 296 202 254 Q160 268 118 254Z" fill="#fff" stroke="#5a2a1a" stroke-width="4" stroke-linejoin="round"/>`;
    case "smile":
      return `<path d="M128 258 Q160 282 192 258" stroke="#5a2a1a" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    case "smirk":
      return `<path d="M130 266 Q170 272 196 252" stroke="#5a2a1a" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    case "flat":
      return `<path d="M134 266 L186 264" stroke="#5a2a1a" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  }
}

function earrings(kind) {
  if (kind === "hoops") return `<circle cx="74" cy="242" r="10" fill="none" stroke="#f2c230" stroke-width="5"/><circle cx="246" cy="242" r="10" fill="none" stroke="#f2c230" stroke-width="5"/>`;
  if (kind === "pearls") return `<circle cx="76" cy="236" r="7" fill="#fbf6ea" stroke="#d8cfb8" stroke-width="2"/><circle cx="244" cy="236" r="7" fill="#fbf6ea" stroke="#d8cfb8" stroke-width="2"/>`;
  if (kind === "studs") return `<circle cx="76" cy="232" r="5" fill="#f2c230"/><circle cx="244" cy="232" r="5" fill="#f2c230"/>`;
  return "";
}

function face(h) {
  let s = hairBack(h);
  s += `<ellipse cx="76" cy="214" rx="12" ry="18" fill="${h.shade}"/><ellipse cx="244" cy="214" rx="12" ry="18" fill="${h.shade}"/>`;
  s += `<path d="${FACE}" fill="${h.skin}"/>`;
  if (h.beard)
    s += `<path d="M84 222 Q92 304 160 314 Q228 304 236 222 Q226 282 160 290 Q94 282 84 222Z" fill="${h.beard}"/><path d="M126 246 Q160 232 194 246 Q160 252 126 246Z" fill="${h.beard}"/>`;
  s += hairFront(h);
  s += eyes(h);
  s += `<path d="M160 214 q-6 22 4 26" stroke="${h.shade}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  s += `<ellipse cx="104" cy="236" rx="14" ry="8" fill="#e98f8f" opacity=".5"/><ellipse cx="216" cy="236" rx="14" ry="8" fill="#e98f8f" opacity=".5"/>`;
  if (h.moustache) s += `<path d="M118 252 Q160 230 202 252 Q182 258 160 248 Q138 258 118 252Z" fill="${h.moustache}"/>`;
  s += mouth(h.mouth);
  s += earrings(h.earrings);
  if (h.shades)
    s += `<g transform="rotate(-6 160 104)"><rect x="96" y="92" width="56" height="30" rx="12" fill="#151515"/><rect x="168" y="92" width="56" height="30" rx="12" fill="#151515"/><path d="M152 104 h16" stroke="#151515" stroke-width="6"/><path d="M104 98 l14 0" stroke="#fff" stroke-opacity=".5" stroke-width="4" stroke-linecap="round"/></g>`;
  return s;
}

function silhouette(h) {
  // Same outline as the face, flattened to white and fattened by a stroke.
  const shapes = face(h)
    .replace(/fill="[^"]*"/g, 'fill="#fff"')
    .replace(/stroke="[^"]*"/g, 'stroke="#fff"')
    .replace(/ (stroke-)?opacity="[^"]*"/g, "");
  return `<g stroke="#fff" stroke-width="18" stroke-linejoin="round" fill="#fff">${shapes}</g>`;
}

mkdirSync(out, { recursive: true });
for (const [id, h] of Object.entries(heads)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 30 344 320" width="344" height="320">
<defs><clipPath id="t"><path d="${torn(0)}"/></clipPath><clipPath id="o"><path d="${torn(-10)}"/></clipPath></defs>
<g clip-path="url(#o)">${silhouette(h)}</g>
<g clip-path="url(#t)">${face(h)}</g>
</svg>
`;
  writeFileSync(join(out, `${id}.svg`), svg);
  console.error(`wrote heads/${id}.svg`);
}
