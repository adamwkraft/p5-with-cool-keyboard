#!/usr/bin/env node

const fs = require("fs/promises");

(async () => {
  const files = await fs.readdir(`${__dirname}/../controller/animations`);
  const tsFiles = files.filter((file) => file.endsWith(".ts"));

  console.log(tsFiles);
  const formatted = tsFiles.map((fileName) => {
    const properName = fileName.replace(".ts", "");

    const importString = `import * as ${properName} from "./animations/${properName}";`;
    const animationString = `  { hotCanvas: ${properName}.hotCanvas, name: "${properName}" },`;

    return [importString, animationString];
  });

  const imports = formatted.map(([importString]) => importString);
  const animations = formatted.map(([, animationString]) => animationString);

  const importString = imports.join("\n");
  const animationString = animations.join("\n");

  const output = `${importString}

export const animations = [
${animationString}
];
`;
  return fs.writeFile(`${__dirname}/../controller/index.ts`, output, "utf8");
})();
