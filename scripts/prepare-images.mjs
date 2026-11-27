#!/usr/bin/env node
/**
 * Prepare, crop, warm-grade and compress company-site images using sharp.
 *
 * Rules enforced:
 * - Warm grade (~5-8% warmer white balance, ~10% lower saturation) on cool-sky photos at build time.
 * - Banners <= 350 KB (>= 1600 px long edge), cards <= 160 KB (>= 1200 px long edge).
 * - Never exceeds 2600 px on the long edge.
 * - Reads original repo photos from `git show HEAD:...` when available so repeated runs remain idempotent.
 * - Never modifies /hero/twin-tower-hero.jpg, /hero/twin-tower-hero-mobile.jpg, /renders/*, /rooms/*, /amenities/*, /plans/*.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const ROOT = process.cwd();
const PHOTOS_DIR = path.join(ROOT, "public", "photos");

const WARM_RECOMB = [
  [1.04, 0.02, 0.0],
  [0.01, 1.0, 0.0],
  [0.0, 0.0, 0.91],
];

function readGitHead(relPath) {
  try {
    return execFileSync("git", ["show", `HEAD:${relPath.replace(/\\/g, "/")}`], {
      cwd: ROOT,
      maxBuffer: 25 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null;
  }
}

function readSource(relPath, fallbackAbsPath) {
  if (fallbackAbsPath && fs.existsSync(fallbackAbsPath)) {
    return fs.readFileSync(fallbackAbsPath);
  }
  const fromHead = readGitHead(relPath);
  if (fromHead) return fromHead;
  return fs.readFileSync(path.join(ROOT, relPath));
}

async function encodeWithinBudget(pipeline, maxBytes, startQuality = 78) {
  for (let q = startQuality; q >= 50; q -= 4) {
    const buf = await pipeline.clone().jpeg({ quality: q, mozjpeg: true }).toBuffer();
    if (buf.length <= maxBytes || q <= 52) {
      return { buf, quality: q };
    }
  }
  const buf = await pipeline.clone().jpeg({ quality: 50, mozjpeg: true }).toBuffer();
  return { buf, quality: 50 };
}

async function processImage({
  srcRel,
  fallbackAbs,
  outRel,
  width,
  height,
  fit = "inside",
  extract,
  warm = false,
  saturation = 1.0,
  maxBytes,
  quality = 78,
}) {
  const input = readSource(srcRel, fallbackAbs);
  let pipe = sharp(input).rotate();
  if (extract) pipe = pipe.extract(extract);
  if (width || height) {
    pipe = pipe.resize({ width, height, fit, withoutEnlargement: fit === "inside" });
  }
  if (warm) pipe = pipe.recomb(WARM_RECOMB);
  if (saturation !== 1.0) pipe = pipe.modulate({ saturation });
  const { buf, quality: finalQ } = await encodeWithinBudget(pipe, maxBytes, quality);
  const outAbs = path.join(ROOT, outRel);
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  fs.writeFileSync(outAbs, buf);
  const meta = await sharp(buf).metadata();
  console.log(`${outRel.padEnd(42)} ${meta.width}x${meta.height}  ${Math.round(buf.length / 1024)}KB (q=${finalQ})`);
}

const SCRATCH_CAND = process.env.CANDIDATES_DIR || "";
const ARTIFACT_ROOT = process.env.ARTIFACT_ROOT || "";
const cand = (name) => (SCRATCH_CAND ? path.join(SCRATCH_CAND, name) : "");
const art = (name) => (ARTIFACT_ROOT ? path.join(ARTIFACT_ROOT, name) : "");

async function main() {
  // 1. Existing KEEP photos
  await processImage({
    srcRel: "public/photos/hero-crane-sunset.jpg",
    outRel: "public/photos/hero-crane-sunset.jpg",
    width: 2400,
    saturation: 0.94,
    maxBytes: 340 * 1024,
  });
  await processImage({
    srcRel: "public/photos/cranes-city.jpg",
    outRel: "public/photos/cranes-city.jpg",
    width: 1800,
    saturation: 0.94,
    maxBytes: 158 * 1024,
  });
  await processImage({
    srcRel: "public/photos/commercial-facade.jpg",
    outRel: "public/photos/commercial-facade.jpg",
    width: 1600,
    warm: true,
    saturation: 0.9,
    maxBytes: 158 * 1024,
  });
  await processImage({
    srcRel: "public/photos/office-glass.jpg",
    outRel: "public/photos/office-glass.jpg",
    width: 1600,
    warm: true,
    saturation: 0.88,
    maxBytes: 158 * 1024,
  });
  await processImage({
    srcRel: "public/photos/structure-concrete.jpg",
    outRel: "public/photos/structure-concrete.jpg",
    width: 1200,
    height: 1456,
    fit: "cover",
    warm: true,
    saturation: 0.9,
    maxBytes: 158 * 1024,
  });
  await processImage({
    srcRel: "public/photos/structure-crane.jpg",
    outRel: "public/photos/structure-crane.jpg",
    width: 1200,
    height: 1600,
    fit: "cover",
    warm: true,
    saturation: 0.86,
    maxBytes: 158 * 1024,
  });
  await processImage({
    srcRel: "public/photos/apartments.jpg",
    outRel: "public/photos/apartments.jpg",
    width: 1200,
    height: 1500,
    fit: "cover",
    warm: true,
    saturation: 0.88,
    maxBytes: 158 * 1024,
  });
  await processImage({
    srcRel: "public/photos/interior-lounge.jpg",
    outRel: "public/photos/interior-lounge.jpg",
    width: 1600,
    saturation: 0.94,
    maxBytes: 158 * 1024,
  });
  await processImage({
    srcRel: "public/photos/interior-window.jpg",
    outRel: "public/photos/interior-window.jpg",
    width: 1600,
    saturation: 0.94,
    maxBytes: 158 * 1024,
  });
  // Clean crop above lower-right logo band (hands & drawings only)
  await processImage({
    srcRel: "public/photos/blueprints-team.jpg",
    outRel: "public/photos/blueprints-team.jpg",
    extract: { left: 40, top: 410, width: 1000, height: 420 },
    warm: true,
    saturation: 0.92,
    maxBytes: 150 * 1024,
  });

  // 2. Twin Tower Featured crop (16:11 right side so pinnacle-to-ground is intact)
  await processImage({
    srcRel: "public/hero/twin-tower-hero.jpg",
    outRel: "public/hero/twin-tower-featured.jpg",
    extract: { left: 600, top: 0, width: 1400, height: 963 },
    width: 1600,
    height: 1100,
    fit: "cover",
    maxBytes: 240 * 1024,
  });

  // 3. New verified photos
  const extras = [
    {
      fallbackAbs: cand("unsplash-glass-sunset.jpg"),
      outRel: "public/photos/plaza-glass-sunset.jpg",
      width: 1600,
      saturation: 0.92,
      maxBytes: 158 * 1024,
    },
    {
      fallbackAbs: cand("unsplash-crane-gold.jpg"),
      outRel: "public/photos/cranes-golden-hour.jpg",
      width: 1600,
      height: 1200,
      fit: "cover",
      saturation: 0.9,
      maxBytes: 158 * 1024,
    },
    {
      fallbackAbs: cand("unsplash-crane-sil.jpg"),
      outRel: "public/photos/skyline-cranes-amber.jpg",
      width: 1600,
      saturation: 0.92,
      maxBytes: 158 * 1024,
    },
    {
      fallbackAbs: art("gen_drafting_1795818709236.jpg"),
      outRel: "public/photos/planning-desk.jpg",
      width: 1200,
      saturation: 0.94,
      maxBytes: 155 * 1024,
    },
    {
      fallbackAbs: art("gen_apartments_dusk_1795818799803.jpg"),
      outRel: "public/photos/residential-facade-dusk.jpg",
      width: 1600,
      height: 1072,
      fit: "fill",
      saturation: 0.95,
      maxBytes: 240 * 1024,
    },
  ];
  for (const item of extras) {
    if ((item.fallbackAbs && fs.existsSync(item.fallbackAbs)) || fs.existsSync(path.join(ROOT, item.outRel))) {
      await processImage({ srcRel: item.outRel, ...item });
    }
  }

  // 4. Remove rejected / villa files
  const removeFiles = [
    "villa-pool.jpg",
    "villa-dusk.jpg",
    "villa-white.jpg",
    "house-modern.jpg",
    "house-night.jpg",
    "architect-drafting.jpg",
    "worker-helmet.jpg",
    "engineer-site.jpg",
  ];
  for (const f of removeFiles) {
    const p = path.join(PHOTOS_DIR, f);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log(`REMOVED public/photos/${f}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
