import React from 'react'
import ContentContainer from './ContentContainer'
import gmail from "./assets/Gmail.svg"
import youtube from "./assets/YouTube WC.svg"
import github from "./assets/GitHub WC.svg"
import discord from "./assets/Discord WC.svg"
import twitter from "./assets/Twitter WC.svg"

export default function Resources() {
  return (
    <div className={`w-11/12 max-w-[500px] flex justify-end pt-20`}>
      <ContentContainer
        cls={`flex justify-between items-center w-7/12 max-w-[200px]`}
      >
        <img src={gmail} alt="" />
        <img src={youtube} alt="" />
        <img src={github} alt="" />
        <img src={discord} alt="" />
        <img src={twitter} alt="" />
      </ContentContainer>
    </div>
  );
}
