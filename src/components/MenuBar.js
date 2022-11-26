import React, { useContext } from "react";
import ContentContainer from "./ContentContainer";
import BoldFonts from "./fonts/BoldFonts";
import { InitContext } from "../contexts/init.context";
import Button from "./Button";

export default function MenuBar() {
  const { path, setPath, loadConsole } = useContext(InitContext);
  return (
    <ContentContainer
      cls={`bg-[#252526] h-[50px] w-full absolute top-0 left-0 z-10000 px-[50px] pt-[25px] pb-[20px] flex justify-between items-center cursor-default`}
    >
      <div className="flex alig-center">
        <BoldFonts>Clarinet GUI</BoldFonts>
        {/* <input
          className="mx-5 w-[300px] rounded bg-[white] px-3 text-[14px]"
          placeholder="Enter Project Path"
          value={path}
          onChange={(e) => {
            let val = e.target.value;
            setPath(val);
          }}
        /> */}
        <div className="text-white mx-5 text-[14px] bg-[#3652E3] rounded px-3" onClick={loadConsole}>
          Load Console
        </div>
      </div>

      {/* <div className={`flex justify-between items-center w-[250px]`}>
        <BoldFonts cls={`text-[#B3B3B3] font-normal`}>About</BoldFonts>
        <BoldFonts cls={`text-[#B3B3B3] font-normal`}>
          Native Documentation
        </BoldFonts>
      </div> */}
    </ContentContainer>
  );
}
