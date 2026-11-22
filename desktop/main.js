// Desktop wrapper: opens the game from local files, so it runs without a browser and without internet
// (multiplayer still needs a connection). Saves live in this app's own storage.
const { app, BrowserWindow, shell, Menu } = require("electron");
const path = require("path");

app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required"); // the adhan and sounds can start without a click
if (!app.requestSingleInstanceLock()) { app.quit(); }

let win = null;
function create() {
  win = new BrowserWindow({
    width: 1280, height: 780, minWidth: 800, minHeight: 500, backgroundColor: "#0e3836", title: "Ard Blocks",
    icon: path.join(__dirname, "build", "icon.png"), autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, backgroundThrottling: false }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, "app", "index.html"));
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https:/.test(url)) shell.openExternal(url); return { action: "deny" }; });
  win.webContents.on("will-navigate", (e, url) => { if (!url.startsWith("file:")) { e.preventDefault(); if (/^https:/.test(url)) shell.openExternal(url); } });
  win.webContents.on("before-input-event", (e, input) => {
    if (input.type === "keyDown" && input.key === "F11") { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
  });
  win.on("closed", () => { win = null; });
}
app.on("second-instance", () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(() => {
  // the game needs the mouse lock (to look around) and fullscreen; everything else (camera, microphone, location, ...) stays refused
  const ok = perm => perm === "pointerLock" || perm === "fullscreen";
  const ses = require("electron").session.defaultSession;
  ses.setPermissionRequestHandler((wc, perm, cb) => cb(ok(perm)));
  ses.setPermissionCheckHandler((wc, perm) => ok(perm));
  create();
  app.on("activate", () => { if (!BrowserWindow.getAllWindows().length) create(); });
});
app.on("window-all-closed", () => app.quit());
