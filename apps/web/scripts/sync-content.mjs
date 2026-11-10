import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..", "..", "..");
const source = path.join(repoRoot, "content");
const target = path.join(__dirname, "..", "src", "content", "docs");

function copyDir(src, dest) {
	fs.mkdirSync(dest, { recursive: true });
	for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
		const from = path.join(src, entry.name);
		const to = path.join(dest, entry.name);
		if (entry.isDirectory()) {
			copyDir(from, to);
		} else {
			fs.copyFileSync(from, to);
		}
	}
}

if (!fs.existsSync(source)) {
	console.error(`Content source not found: ${source}`);
	process.exit(1);
}

if (fs.existsSync(target)) {
	fs.rmSync(target, { recursive: true, force: true });
}

copyDir(source, target);
console.log(`Synced ${source} -> ${target}`);
