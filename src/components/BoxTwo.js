import React from "react";
import AssetsAndMethods from "./AssetAndMethods/AssetsAndMethods.jsx";
import ContentContainer from "./ContentContainer";
import Resources from "./Resources";

export default function BoxTwo() {
  return (
    <ContentContainer
      cls={`h-screen w-full bg-[#1E1E1E] border-l border-[#343434] pt-[100px]`}
    >
      <AssetsAndMethods />
      <Resources />
    </ContentContainer>
  );
}
