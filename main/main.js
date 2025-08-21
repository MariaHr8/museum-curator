const { app, BrowserWindow } = require("electron");
const serve = require("electron-serve");
const path = require("path");

const loadURL = app.isPackaged
  ? serve({ directory: path.join(__dirname, "../out") })
  : null;

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  if (app.isPackaged) {
    await loadURL(win);
    win.loadURL("app://-/index.html");
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
  }
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
