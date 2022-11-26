import React from "react";
import BoxOne from "./BoxOne";
import BoxTwo from "./BoxTwo";
import MenuBar from "./MenuBar";
import MintBox from "./MintBox";
import SideBar from "./SideBar";
import Terminal from "./Terminal";
import TerminalHead from "./TerminalHead";

export default function MainPage() {
  return (
    <>
      <section className={``}>
        <MenuBar />
      </section>
      <section className={`flex w-screen h-screen`}>
        <section className={`flex w-2/12 min-w-[400px]`}>
          <SideBar />
          <BoxOne />
        </section>
        <section className={`h-screen w-7/12`}>
          <TerminalHead />
          <Terminal />
          <MintBox />
        </section>
        <section className={`h-screen w-3/12`}>
          <BoxTwo />
        </section>
      </section>
    </>
  );
}
