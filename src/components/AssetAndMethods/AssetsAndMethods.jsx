import React from "react";
import { useRef, useEffect, useState, useContext } from "react";
import BoldFonts from "../fonts/BoldFonts";
import ExtraLightFonts from "../fonts/ExtraLightFonts";
import arrow_right from "../assets/Arrow_drop_right.svg";
import arrow_down from "../assets/Arrow_drop_right_down.svg";
import arrowRight from "../assets/Arrow_alt_lright.svg";
import arrowLeft from "../assets/Arrow_alt_left.svg";
import LightFonts from "../fonts/LightFonts";
import { ConsoleContext } from "../../contexts/console.context";
import { AssetMap } from "./AssetAndMethods_old";

export default function AssetsAndMethods() {
  const [active, setActive] = useState(0);
  const { addrs } = useContext(ConsoleContext);

  return (
    <div
      className={`bg-[#252526] pb-[20px] relative ml-[15px] w-11/12 w-full h-[70vh] cursor-default rounded-md`}
    >
      <div className="w-full h-[15%] flex flex-col">
        <div className="flex justify-around flex-1 items-center">
          <div onClick={()=>{
            setActive(0)
          }}>
            <BoldFonts cls={`flex justify-center`}>Assets</BoldFonts>
          </div>

          <div onClick={()=>{
            setActive(1)
          }}>
            <BoldFonts cls={`flex justify-center`}>Tx Log</BoldFonts>
          </div>
        </div>
        <div
          className={`w-full h-[2px] bg-[#343434] rounded-full mb-[25px] relative`}
        >
          <div
            className={`h-[3px] w-[50%] rounded-full bg-[#0075FF] absolute ${
              active == 1 ? "right-[0px]" : "right-[50%]"
            }`}
            style={{
              transition: "all 0.4s ease",
            }}
          ></div>
        </div>
      </div>
      <div className="h-[85%] overflow-y-scroll relative pb-[20px]">
        {active == 0 && (
          <AssetMap active={active} setActive={setActive} addrs={addrs} />
        )}
        {active == 1 && (
          <div className="flex justify-center h-full items-center">
            <BoldFonts cls={`flex justify-center`}>Coming soon</BoldFonts>
          </div>
        )}
      </div>
    </div>
  );
}
