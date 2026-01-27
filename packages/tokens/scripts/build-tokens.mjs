import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const source = resolve("src/tokens.css");
const destination = resolve("dist/tokens.css");

mkdirSync(dirname(destination), { recursive: true });
copyFileSync(source, destination);
