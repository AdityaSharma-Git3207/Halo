import { app, BrowserWindow, ipcMain, globalShortcut } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import Store from "electron-store";

const store = new Store();

let win;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function saveWindowState() {
  if (!win || win.isDestroyed()) return;
  store.set("windowBounds", win.getBounds());
}

function showHalo() {
  if (!win || win.isDestroyed()) return;

  win.showInactive();   // show without stealing focus
  win.moveTop();
  win.blur();
}

function hideHalo() {
  if (!win || win.isDestroyed()) return;
  win.hide();
}

function createWindow() {
  const saved = store.get("windowBounds");

  win = new BrowserWindow({
    width: saved?.width || 420,
    height: saved?.height || 320,
    x: saved?.x,
    y: saved?.y,

    icon: path.join(__dirname, "public/icon.ico"),

    frame: false,
    backgroundColor: "#eee7dc",
    transparent: false,

    resizable: true,
    minWidth: 320,
    minHeight: 240,

    alwaysOnTop: false,
    skipTaskbar: true,
    focusable: true,

    hasShadow: true,
    roundedCorners: true,
    thickFrame: false,

    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.setSkipTaskbar(true);
  win.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: false
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "dist/index.html"));
  } else {
    win.loadURL("http://localhost:5173");
  }

  /* save state */
  win.on("move", saveWindowState);
  win.on("resize", saveWindowState);
  win.on("close", saveWindowState);

  /* PASSIVE MODE:
     if user switches to another app, Halo hides */
  win.on("blur", () => {
    hideHalo();
  });

  /* start visible once */
  showHalo();
}

app.whenReady().then(() => {
  app.setLoginItemSettings({
    openAtLogin: true
  });

  createWindow();

  /* GLOBAL HOTKEY:
     Press Ctrl+Alt+H to show Halo anytime */
  globalShortcut.register("CommandOrControl+Alt+H", () => {
    showHalo();
  });

  ipcMain.on("set-theme", (_, theme) => {
    if (!win || win.isDestroyed()) return;

    win.setBackgroundColor(
      theme === "dark" ? "#11131a" : "#eee7dc"
    );
  });
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});