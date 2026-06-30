import { copyFileSync, cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const builtHtml = join(root, "dist", "index.dev.html");
const distHtml = join(root, "dist", "index.html");
const rootHtml = join(root, "index.html");

if (!existsSync(builtHtml)) {
  throw new Error("Expected dist/index.dev.html after Vite build.");
}

copyFileSync(builtHtml, distHtml);
copyFileSync(builtHtml, rootHtml);

for (const [sourceDir, targetDir] of [
  [join(root, "dist", "assets"), join(root, "assets")],
  [join(root, "dist", "documents"), join(root, "documents")]
]) {
  if (existsSync(sourceDir)) {
    mkdirSync(dirname(targetDir), { recursive: true });
    cpSync(sourceDir, targetDir, { recursive: true, force: true });
  }
}