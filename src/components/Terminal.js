import React, { useContext, useEffect } from "react";
import ContentContainer from "./ContentContainer";
import svg from "./assets/CLI.svg"
import { ConsoleContext } from "../contexts/console.context";
import { sendInput } from "../helpers/inputParser";

export default function Terminal() {
  let {output, clarinetInput, setClarinetInput, editable} = useContext(ConsoleContext);
  // canEditTerminal = true;
  useEffect(()=>{
  
  }, [output])
  return (
    <ContentContainer
      cls={`w-full h-[62vh] bg-[#1E1E1E] border-b border-[#343434] p-5 overflow-y-scroll flex flex-col`}
    >
      <div id="terminal" className="w-full text-[white] flex-1 bg-black overflow-hidden p-4"></div>
      <div className="bg-black border-t-[0.5px] flex justify-start align-start text-white p-2 py-1">
        <span className="text-[11px]">{">"}</span>
        {editable && <input className="bg-transparent px-2 w-full outline-none text-[11px]"
          value={clarinetInput}
          readOnly={!editable}
          onChange={(e)=>{
            let val = e.target.value;
            setClarinetInput(val);
          }}
          onKeyUp={(e)=>{
            if(e.key == "Enter"){
              sendInput(clarinetInput);
              setClarinetInput("");
            }
          }}
        />}
        {!editable && <div className="px-2 max-h-[200px] overflow-y-scroll text-[11px]">
            {clarinetInput}
        </div>}
      </div>
    </ContentContainer>
  );
}
