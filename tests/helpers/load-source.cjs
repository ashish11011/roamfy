const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const { transform } = require("next/dist/build/swc");

async function loadSource(relativePath, mocks = {}) {
  const filename = path.resolve(__dirname, "../..", relativePath);
  const { code } = await transform(fs.readFileSync(filename, "utf8"), {
    filename,
    jsc: {
      parser: { syntax: "ecmascript", jsx: true },
      transform: { react: { runtime: "automatic" } },
    },
    module: { type: "commonjs" },
  });
  const localRequire = createRequire(filename);
  const module = { exports: {} };
  const requireMock = id => Object.hasOwn(mocks, id) ? mocks[id] : localRequire(id);
  new Function("require", "module", "exports", code)(requireMock, module, module.exports);
  return module.exports;
}

module.exports = { loadSource };
