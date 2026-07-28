/**
 * One-off build tool: compress the hero/carousel assets to WebP.
 *
 * Background: these images used to be served through ImageKit, which resized
 * and re-encoded them on the fly. When that bandwidth ran out the homepage
 * broke. Rather than move to another metered image host, we pre-generate the
 * exact sizes the page asks for and let Vite fingerprint them, so they are
 * served as immutable static files from the CDN for free.
 *
 * The widths below mirror the srcSet values in src/components/HeroSection.tsx.
 * If you change one, change the other.
 *
 * Originals are never modified -- output goes to src/assets/hero/opt/.
 *
 * Usage:  node scripts/optimize-hero-assets.mjs
 */

import sharp from 'sharp';
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { join, dirname, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(HERE, '..', 'src', 'assets', 'hero');
const OUT_DIR = join(SRC_DIR, 'opt');

/**
 * Which widths to emit per source file, matching HeroSection.tsx:
 *   - bgd10 is the full-bleed background   -> sizes="100vw"
 *   - card1..4 are the carousel cards      -> sizes="(max-width:768px) 90vw, 50vw"
 *
 * quality: cards are UI screenshots with hard edges and text, so they get a
 * slightly higher quality to avoid visible ringing. The background is a photo
 * and compresses well at 76.
 */
const TARGETS = [
  { file: 'bgd10.jpg', widths: [800, 1920], quality: 76 },
  { file: 'card1.png', widths: [400, 800, 1200], quality: 84 },
  { file: 'card2.png', widths: [400, 800, 1200], quality: 84 },
  { file: 'card3.png', widths: [400, 800, 1200], quality: 84 },
  { file: 'card4.png', widths: [400, 800, 1200], quality: 84 },
];

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  let totalBefore = 0;
  let totalAfter = 0;
  const rows = [];

  for (const { file, widths, quality } of TARGETS) {
    const inputPath = join(SRC_DIR, file);

    let originalSize;
    try {
      originalSize = (await stat(inputPath)).size;
    } catch {
      console.error(`  MISSING  ${file} -- skipped`);
      continue;
    }
    totalBefore += originalSize;

    const { name } = parse(file);
    const meta = await sharp(inputPath).metadata();

    for (const width of widths) {
      // Never upscale: if the source is narrower than the target, emit at the
      // source width so we don't invent pixels and inflate the file.
      const targetWidth = Math.min(width, meta.width ?? width);

      const buffer = await sharp(inputPath)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toBuffer();

      const outName = `${name}-${width}.webp`;
      await writeFile(join(OUT_DIR, outName), buffer);

      totalAfter += buffer.length;
      rows.push({ out: outName, from: file, size: buffer.length });
    }

    console.log(`${file.padEnd(12)} ${kb(originalSize).padStart(9)}  ->  ${widths.length} webp variants`);
  }

  console.log('\nGenerated:');
  for (const r of rows) {
    console.log(`  ${r.out.padEnd(20)} ${kb(r.size).padStart(9)}`);
  }

  const saved = totalBefore > 0 ? (1 - totalAfter / totalBefore) * 100 : 0;
  console.log(`\nOriginals total : ${kb(totalBefore)}`);
  console.log(`WebP total      : ${kb(totalAfter)}  (all variants combined)`);
  console.log(`Reduction       : ${saved.toFixed(1)}%`);
  console.log(`\nOutput: ${OUT_DIR}`);

  const written = (await readdir(OUT_DIR)).filter((f) => f.endsWith('.webp'));
  console.log(`Files on disk   : ${written.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
