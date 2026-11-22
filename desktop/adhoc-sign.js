// macOS refuses to open a downloaded app whose signature is missing or broken ("is damaged and can't be opened").
// Without a paid Apple certificate we can still give the app an ad-hoc signature, which makes it a valid bundle.
const { execSync } = require("child_process");
const path = require("path");
exports.default = async function (ctx) {
  if (ctx.electronPlatformName !== "darwin") return;
  const app = path.join(ctx.appOutDir, ctx.packager.appInfo.productFilename + ".app");
  execSync(`codesign --force --deep --sign - "${app}"`, { stdio: "inherit" });
  execSync(`codesign --verify --deep --strict "${app}"`, { stdio: "inherit" });
};
