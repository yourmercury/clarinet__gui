import React, {createContext, useState, useEffect} from "react";

export const InitContext = createContext();

export default function InitContextProvider({children}){
    const [loaded, load] = useState(false);
    const [path, setPath] = useState("");

    function loadConsole(){
        window.electron.ipcSend("init.console");
        // /Users/macbook/Desktop/BlockChain Projects/STR Project/STRsmartcontracts/clarity-test/contracts
    }

    useEffect(()=>{
        if(!loaded) {
            load(true);
            return;
        }

        return ()=>{
            window.electron.ipcRemoveListeners();
        }
    }, [loaded])

    useEffect(()=>{
        if(!path) return;
    }, [path])

    return (
        <InitContext.Provider value={{path, setPath, loadConsole}}>
            {children}
        </InitContext.Provider>
    )
}