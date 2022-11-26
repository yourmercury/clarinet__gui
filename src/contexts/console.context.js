import { createContext, useState, useEffect, useRef } from "react";
import { handleAssetsMaps, handleContracts } from "../helpers/outputParser";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

export const terminal = new Terminal();
export const ConsoleContext = createContext();

export default function ConsoleContextProvider({ children }) {
  const [addrs, setAddrs] = useState({
    addresses: [],
    stxBalance: [],
    tokens: {},
    header: [],
  });
  const [selectedAddr, setAddr] = useState("");
  const [editable, setEditable] = useState(false);
  const [loaded, load] = useState(false);
  const loadedTerminal = useRef(false);
  const [output, setOutput] = useState("");
  const [contracts, setContracts] = useState({
    list: [],
    methods: {},
    methodNames: {},
    args: {},
  });
  const [clarinetInput, setClarinetInput] = useState("");
  const [blockHeight, setBlockHeight] = useState(0);

  useEffect(() => {
    if (!loaded) {
      load(true);
      return;
    }

    window.electron.ipcOnGetData((data) => {
      if (data) {
        if (data.includes("command_line_start")) {
          terminal.writeln(data, () => {
           
          });
          console.log(data);
        } else if (data.includes("cli_print_start")) {
          terminal.writeln(data, () => {
            
          });
          console.log(data);
        } else if (data.includes("get_assets_maps_start")) {
          let obj = handleAssetsMaps(data.split("\r\n"));
          obj.addresses = obj.addresses.filter((addr) => addr != undefined);
          obj.stxBalance = obj.stxBalance.filter((addr) => addr != undefined);
          setAddrs(obj);
        } else if (data.includes("get_contracts_start")) {
          let obj = handleContracts(data.split("\r\n"));
          obj.loaded = true;
          setContracts(obj);
        } else if (data.includes("get_block_height_start")){
          let height = data.split('\r\n')[2];
          console.log(height);
          setBlockHeight(height)
        }
      }
    });

    window.electron.ipcOnPrintData((data) => {
      console.log(data);
      let inc = data.includes("command_line_start")
      data = data.replaceAll("clarinet_cli_print_start", "");
      data = data.replaceAll("clarinet_cli_print_end", "");
      data = data.replaceAll("command_line_end", "");
      data = data.replaceAll("command_line_start", "");

      if(inc) terminal.clear();

      terminal.write(data, () => {
        if (inc) {
          // setTimeout(() => {
          //   window.electron.ipcSend("get", null);
          //   window.electron.ipcSend("contracts", null);
          // }, 0);
        }
      });
    });
    // window.electron.ipcSend("execute.command", "clarinet-gui console");
  }, [loaded]);

  useEffect(() => {
    console.log(contracts);
  }, [contracts]);

  useEffect(() => {
    if (!loaded) return;
    let term = document.querySelector("#terminal");
    terminal.options.cursorBlink = true;
    terminal.options.fontSize = 12;
    terminal.options.windowOptions.getCellSizePixels = true;
    console.log(terminal.resize(90, terminal.rows + 10));
    terminal.open(term);
    loadedTerminal.current = true;
    terminal.onData((data) => {});
  }, [loaded]);

  return (
    <ConsoleContext.Provider
      value={{ addrs, contracts, output, clarinetInput, setClarinetInput, blockHeight, selectedAddr, setAddr, editable, setEditable }}
    >
      {children}
    </ConsoleContext.Provider>
  );
}
