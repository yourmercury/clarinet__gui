const { ipcRenderer, contextBridge, dialog } = require("electron");

contextBridge.exposeInMainWorld('electron', {
    ipcSend: (event, data) => ipcRenderer.send(event, data),
    ipcOnGetData: (callback)=> {
        ipcRenderer.on("start.render", (event, data)=>{
            callback(data);
        })
    },
    ipcOnPrintData: (callback)=> {
        ipcRenderer.on("cli.print", (event, data)=>{
            callback(data);
        })
    },
    ipcGetProcess: (callback)=> {
        ipcRenderer.on("process.info", (event, data)=>{
            callback(data);
        })
    },
    ipcRemoveListeners: (event)=>{
        ipcRenderer.removeAllListeners("start.render");
        ipcRenderer.removeAllListeners("cli.print");
        ipcRenderer.removeAllListeners("process.info");
    }
})

window.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

// window.addEventListener("DOMContentLoaded", () => {
//   ipcRenderer.send("start", "clarinet-gui console\r");

// //   ipcRenderer.send("get", "::get_assets_maps\r");

// //   ipcRenderer.send("contracts", "::get_assets_maps\r");

//   ipcRenderer.on("start.render", (event, data) => {
//       console.log(data); return;
//     if (data) {
//       if (data.includes("get_assets_maps_start")) {
//         console.log(handleAssetsMaps(data.split("\r\n")));
//       } else if (data.includes("get_contracts_start")) {
//         console.log(handleContracts(data.split("\r\n")));
//       }
//       data = "";
//     }
//   });
// });
