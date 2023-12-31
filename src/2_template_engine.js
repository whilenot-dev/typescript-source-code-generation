#!/usr/bin/env -S node --no-warnings

import path from "path";
import { fileURLToPath } from "url";

import Handlebars from "handlebars";

import data from "../data/input.json" assert { type: "json" };

main();

function main() {
  const source = `{{#data}}
interface SomeInterface{{name}} {
  discriminator: "{{name}}";
  type: {{type}};
}

{{/data}}
export type SomeInterface = {{#data}}{{#if @first}}{{else}} | {{/if}}SomeInterface{{name}}{{/data}};
`;

  const template = Handlebars.compile(source);
  const result = template({ data });

  const scriptFile = fileURLToPath(import.meta.url);
  const projectDir = path.join(scriptFile, "..", "..");
  const scriptFileRel = path.relative(projectDir, scriptFile);
  console.log(`/* autogenerated by ${scriptFileRel} */`);

  console.log(result);
}
