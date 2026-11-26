// One Star, Five Stars for the Food — make.fun entry
// Writes a single-sentence alien tourist review of planet Earth to entry.txt.
// The sentence is exactly one sentence, at most 200 characters, and gives
// Earth one star while slipping in a real compliment about the food.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "One star: your gravity bruised all three of my knees, the locals queue for hours to stare at glowing rectangles, yet your noodles alone almost make the abduction worth it.";

// Self-check: exactly one sentence and at most 200 characters.
const terminators = (ENTRY.match(/[.!?]/g) ?? []).length;
if (terminators !== 1) {
  throw new Error(`entry must be exactly one sentence, found ${terminators} sentence terminators`);
}
if (!/[.!?]$/.test(ENTRY)) {
  throw new Error("entry must end with a single sentence terminator");
}
if (ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, over the 200-character limit`);
}
if (/\n/.test(ENTRY) || ENTRY.trim() !== ENTRY) {
  throw new Error("entry must be a single line with no leading or trailing whitespace");
}
if (!/noodles|food|dumpling|pizza|taco|sushi|ramen/i.test(ENTRY)) {
  throw new Error("entry must contain a real compliment about the food");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");

// Verify the written file round-trips byte-identically to the entry.
const { readFileSync } = await import("node:fs");
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== ENTRY + "\n") {
  throw new Error("written entry.txt does not match the entry");
}
console.log(`Wrote entry (${ENTRY.length} chars) to ${join(outDir, "entry.txt")}`);
