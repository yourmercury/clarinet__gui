import React, { useContext, useState } from "react";
import Button from "./Button";
import ContentContainer from "./ContentContainer";
import BoldFonts from "./fonts/BoldFonts";
import ExtraLightFonts from "./fonts/ExtraLightFonts";
import Input from "./Input";
import tick from "./assets/Check_round_fill.svg";
import { ConsoleContext } from "../contexts/console.context";

export default function MintBox() {
  const { blockHeight } = useContext(ConsoleContext);
  const [jump, setJump] = useState(0);
  const [addr, setAddr] = useState("");
  const [stx, setStx] = useState("");
  return (
    <ContentContainer cls={`w-full h-[34vh] bg-[#1E1E1E] p-[20px]`}>
      <div className={`flex items-center`}>
        <BoldFonts>Block height: {blockHeight}</BoldFonts>
        <div className={`flex items-center justify-start pl-4 w-[80px]`}>
          {/* <BoldFonts cls={`cursor-default`}>-</BoldFonts> */}
          <input
            className={`bg-white rounded-md text-black w-[30px] px-[5px] mt-0 text-base text-center`}
            value={jump}
            onChange={(e)=>{
              let val = e.target.value;
              setJump(val);
            }}
          />
          <div onClick={()=>{
            window.electron.ipcSend("execute.command", `::advance_chain_tip ${jump}`)
          }}>
            <BoldFonts cls={`cursor-default text-[20px] ml-2`}>+</BoldFonts>
          </div>
        </div>
      </div>
      <div
        className={`flex justify-start items-center my-4`}
      >
        <input
          className="rounded bg-transparent border-[0.5px] flex-1 text-[white] text-[12px] p-1 px-3"
          placeholder="Enter wallet address"
          value={addr}
          onChange={(e)=>{
            let val = e.target.value;
            setAddr(val);
          }}
        />
         <input
          className="rounded bg-transparent border-[0.5px] ml-2 text-[white] text-[12px] p-1 px-3"
          placeholder="Enter amount in uSTX"
          value={stx}
          onChange={(e)=>{
            let val = e.target.value;
            setStx(val);
          }}
        />

        <div onClick={()=>{
          window.electron.ipcSend("execute.command", `::mint_stx ${addr} ${stx}`);
        }}>
        <Button cls={`px-[5px] py-[5px] rounded-[8px] ml-2`}>
          <BoldFonts cls={`text-xs font-normal`}>Mint STX</BoldFonts>
        </Button>
        </div>
      </div>
      {/* <div className={`flex justify-between items-center w-[250px] mt-[15px]`}>
        <Button cls={`px-[5px] py-[8px] rounded-[8px]`}>
          <BoldFonts cls={`text-xs font-normal`}>Check for errors</BoldFonts>
        </Button>
        <Button cls={`px-[5px] py-[8px] rounded-[8px]`}>
          <BoldFonts cls={`text-xs font-normal`}>Run all tests</BoldFonts>
        </Button>
      </div>
      <div className={`flex justify-start items-center my-[15px]`}>
        <img className={`mr-2 w-4 h-4`} src={tick} alt="" />
        <ExtraLightFonts cls={`text-[0.7em]`}>
          Successfully minted STX to ST1GH6KLP008HF55YG16M0K5JMT588
        </ExtraLightFonts>
      </div> */}
    </ContentContainer>
  );
}
