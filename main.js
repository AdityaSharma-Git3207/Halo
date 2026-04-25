import { app, BrowserWindow } from "electron";
import fs from "fs";
import path from "path";

let win;

const dataPath = path.join(app.getPath("userData"), "halo-position.json");

function getSavedPosition() {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    return data;
  } catch {
    return { x: 100, y: 100 };
  }
}

function savePosition() {
  if (!win) return;

  const [x, y] = win.getPosition();
  fs.writeFileSync(dataPath, JSON.stringify({ x, y }));
}

function createWindow() {
  const pos = getSavedPosition();

  win = new BrowserWindow({
    width: 420,
    height: 320,
    x: pos.x,
    y: pos.y,
    frame: false,
    transparent: true,
    hasShadow: false,
    resizable: false,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    skipTaskbar: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadURL("http://localhost:5173");

  win.on("moved", savePosition);
  win.on("close", savePosition);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});