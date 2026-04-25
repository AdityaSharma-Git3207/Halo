import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

let win;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  win = new BrowserWindow({
    width: 420,
    height: 320,

    frame: false,
    backgroundColor: "#eee7dc",
    transparent: false,

    resizable: false,
    alwaysOnTop: true,
    hasShadow: true,

    roundedCorners: true,
    thickFrame: false,
    titleBarStyle: "hidden",

    maximizable: false,
    minimizable: false,
    fullscreenable: false,

    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on("set-theme", (_, theme) => {
    if (!win) return;

    if (theme === "dark") {
      win.setBackgroundColor("#11131a");
    } else {
      win.setBackgroundColor("#eee7dc");
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});