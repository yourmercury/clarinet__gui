const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const pty = require("node-pty-prebuilt-multiarch");
const os = require("os");
const fixPath = require("fix-path");

fixPath();

const shell = os.platform() === "win32" ? "powershell.exe" : "bash";
let ptyProcess;

//"start": "concurrently \"cross-env BROWSER=none cross-env TAILWIND_MODE=watch craco start\" \"wait-on http://localhost:3000 && electron .\"",

let win;
const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "build/index.html"));
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  createWindow();

  let _data = "";
  let wholeData = "";
  let command = "";
  let started = false;
  let printing = false;
  let processCommenced = false;
  let exec = false;

  function hault() {
    setTimeout(() => {
      exec = false;
      ptyProcess.write("::get_assets_maps_gui\r");
      ptyProcess.write("::get_contracts_gui\r");
      ptyProcess.write("::get_block_height_gui\r");
    }, 1500);
  }

  function waitForStart() {
    setTimeout(() => {
      exec = false;
    }, 2500);
  }

  function getData(data) {
    console.log(data);
    printing = true;
    let index = false;

    if (!started) {
      index = data.includes("_start");
    }
    if (index && !started) {
      _data = data;
      started = true;
    }

    if (started) {
      _data += data;
    }

    if (_data.includes("_end")) {
      started = false;
      if (
        _data.includes("_contracts_start") ||
        _data.includes("_assets_maps_start") ||
        _data.includes("get_block_height_start")
      ) {
        win.webContents.send("start.render", _data);
      } else {
        win.webContents.send("cli.print", _data);
      }
      _data = "";
      printing = false;
    }
  }

  async function initClarinetGuiProcess(){ 
    let path = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    console.log(path);
    if(path.canceled){
      win.webContents.send("console.error", "Error: Cannot load manifest");
      return;
    }

    ptyProcess = pty.spawn(shell, [], {
      name: "xterm-color",
      cols: 80,
      rows: 30,
      cwd: path.filePaths[0] || process.env.HOME,
      env: process.env,
    });
  
    ptyProcess.onData(function (data) {
      if (exec) {
        win.webContents.send("cli.print", data);
        return;
      }
      getData(data);
    });
  
    ptyProcess.onExit(() => {
      processCommenced = false;
    });
  
    ipcMain.on("get.process", () => {
      win.webContents.send("process.info", {
        pid: ptyProcess.pid,
        process: ptyProcess.process,
      });
    });
  
    ipcMain.on("kill", (event, data)=>{
      ptyProcess.kill();
      if(data){
        ptyProcess.write("clarinet-gui console\r")
      }
    })
  
    ipcMain.on("get", () => {
      if (started || exec) return;
      command = "::get_assets_maps_gui\r";
      ptyProcess.write("::get_assets_maps_gui\r");
    });
  
    ipcMain.on("contracts", () => {
      if (started || exec) return;
      command = "::get_contracts_gui\r";
      ptyProcess.write("::get_contracts_gui\r");
    });
  
    ipcMain.on("execute.command", (event, input) => {
      if (exec) return;
      exec = true;
      ptyProcess.write(input + "\r");
      hault();
    });

    processCommenced = true;
    exec = true;
    hault();
    ptyProcess.write(`clarinet-gui console\r`);
  }

  ipcMain.on("init.console", (event, path)=>{
    ptyProcess && ptyProcess.kill();
    initClarinetGuiProcess();
  });
  

  
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } 
  });
});

app.on("window-all-closed", () => {
  ptyProcess && ptyProcess.kill();
  app.quit();
  // if (process.platform !== "darwin") {
  //   app.quit();
  // }
});
