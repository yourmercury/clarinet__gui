import React, {useContext} from "react";
import ContentContainer from "./ContentContainer";
import BoldFonts from "./fonts/BoldFonts";
import icon1 from "./assets/Rectangle1.svg";
import icon2 from "./assets/enter_full_screen.svg";
import icon3 from "./assets/edit.svg";
import { ConsoleContext } from "../contexts/console.context";

export default function TerminalHead() {
  const {setEditable, editable} = useContext(ConsoleContext);

  return (
    <ContentContainer
      cls={`w-full h-[100px] bg-[#1E1E1E] border-b border-[#343434] pt-[69px] px-[40px] flex justify-between items-center`}
    >
      <BoldFonts>Terminal</BoldFonts>
      <div className={`flex justify-between items-center w-[80px]`}>
        {/* <img className={``} src={icon2} alt="" /> */}
        <img className={`cursor-default p-[1px]`} src={editable? icon3 : icon1} alt="" onClick={()=>{
          setEditable(!editable);
        }}/>
      </div>
    </ContentContainer>
  );
}
