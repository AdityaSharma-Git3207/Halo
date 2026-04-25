import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("haloAPI", {
  dragWindow: (x, y) => ipcRenderer.send("drag-window", { x, y })
});