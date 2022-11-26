import React from "react";
import ContentContainer from "./ContentContainer";
import file from "./assets/File_dock_light.svg";

export default function SideBar() {
  return (
    <ContentContainer cls={`h-screen w-[50px] bg-[#252526] pt-[80px]`}>
      <img src={file} alt="" />
    </ContentContainer>
  );
}
