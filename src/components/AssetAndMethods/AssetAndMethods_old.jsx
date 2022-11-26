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

export default function AssetsAndMethods() {
  const [active, setActive] = useState(1);
  const { addrs } = useContext(ConsoleContext);

  return (
    <div
      className={`bg-[#252526] flex flex-col relative overflow-y-scroll pb-[30px] ml-[15px]  w-11/12 max-w-[500px] h-[70vh] cursor-default rounded-md`}
    >
      <div
        id="boxes"
        className={`flex w-full justify-between h-[10%] items-center`}
      >
        <div
          className={`w-6/12 pr-[4%]`}
          onClick={() => {
            setActive(0);
          }}
        >
          <BoldFonts
            cls={`${
              active == 0
            } text-sm cursor-pointer selection:bg-transparent text-center`}
          >
            Asset Map
          </BoldFonts>
        </div>
        <div
          className={`w-6/12 pl-[4%]`}
          onClick={() => {
            setActive(1);
          }}
        >
          <BoldFonts
            cls={`${
              active == 1
            } text-sm cursor-pointer selection:bg-transparent text-center`}
          >
            Methods
          </BoldFonts>
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
      <div className="">
        <AssetMap active={active} setActive={setActive} addrs={addrs} />

        <Methods active={active} setActive={setActive} />
      </div>
    </div>
  );
}

function Methods({ active, setActive }) {
  return (
    <div className={`${active == 1 ? "" : "hidden"}`}>
      <Contracts contract={`raider-nft`} />
      <Contracts contract={`ghost-in-the-shell-nft`} />
      <Contracts contract={`arcade-nft`} />
      <Contracts contract={`expensive-petroleum-nft`} />
      <Contracts contract={`ian-fleming-nft`} />
      <Contracts contract={`raider-nft`} />
    </div>
  );
}

export function AssetMap({ active, setActive, addrs }) {
  const [opened, openAsset] = useState(null);

  return (
    <>
      <div className={`${active == 0 ? "" : "hidden"} h-[100%] relative`}>
        {opened === null && (
          <div className="">
            <div className={`py-3 flex justify-around w-full px-[20px]`}>
              <LightFonts cls={`flex justify-center`}>Address</LightFonts>

              <LightFonts cls={`flex justify-center`}>uSTX</LightFonts>
            </div>
            <div className={`px-[20px] flex justify-between`}>
              <div className={``}>
                {addrs.addresses.map((address, index) => (
                  <Address address={address} key={index} />
                ))}
              </div>
              <div className={``}>
                {addrs.stxBalance.map((balance, index) => (
                  <STX
                    STX={balance}
                    index={index}
                    key={index}
                    openAsset={openAsset}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {opened !== null && (
          <Assets openAsset={openAsset} addrs={addrs} opened={opened} />
        )}
      </div>
    </>
  );
}

function Assets({ openAsset, addrs, opened }) {
  let adr = addrs.addresses[opened];
  return (
    <div className={`flex justify-start px-[20px] mt-[20px]`}>
      <div
        className={`mr-3 pt-1
          `}
      >
        <img
          className={`h-4 w-4`}
          onClick={() => {
            openAsset(null);
          }}
          src={arrowLeft}
          alt=""
        />
      </div>
      <div className={`grid grid-cols-1`}>
        <div className={`text-center mb-4`}>
          <Address address={adr} full />
        </div>
        <div className={`grid grid-cols-2 gap-4`}>
          <div className={`grid grid-cols-1`}>
            <ExtraLightFonts cls={`text-[15px] font-semiboldb mb-4`}>
              Tokens
            </ExtraLightFonts>
            <Asset asset={"STX"} />
            {addrs.header.map((title, index) => {
              if ((addrs.tokens[adr] || [])[index] == 0) return null;
              return <Asset asset={title} key={index} />;
            })}
          </div>
          <div className={`grid grid-cols-1`}>
            <ExtraLightFonts cls={`text-right text-[15px] font-semibold mb-4`}>
              Balance
            </ExtraLightFonts>
            <Balance balance={addrs.stxBalance[opened]} />
            {(addrs.tokens[adr] || []).map((token, index) => {
              if (token == 0) return null;
              return <Balance balance={token} key={index} />;
            })}

            {/* <Balance balance={`1`} />
            <Balance balance={`10`} />
            <Balance balance={`100`} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function Contracts({ contract }) {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div>
      <div
        className={`w-full h-[40px] bg-[#343434] my-[4px] px-[10px] truncate flex justify-start items-center cursor-pointer`}
        onClick={() => {
          setDropDown(!dropDown);
        }}
      >
        <img src={dropDown ? arrow_down : arrow_right} alt="" />
        <ExtraLightFonts cls={`text-[13px] font-semibold`}>
          {contract}
        </ExtraLightFonts>
      </div>
      <div className={`${dropDown || "hidden"} transition-all ease-in-out`}>
        <Method method={`get balance`} />
        <Method method={`get owner`} />
        <Method method={`get-token-uri`} />
      </div>
    </div>
  );
}

function Method({ method }) {
  return (
    <ExtraLightFonts
      cls={`text-[0.6em] font-medium cursor-default w-full h-[10px] px-[20px] py-[15px] hover:bg-[#3652E3] flex justify-start items-center truncate`}
    >
      {method}
    </ExtraLightFonts>
  );
}

function Address({ address, full }) {
  let s_ = address.slice(0, 4);
  let _e = address.slice(-4);
  return (
    <div
      className="relative"
      onClick={() => {
        navigator.clipboard.writeText(address);
      }}
    >
      <ExtraLightFonts cls={`text-[11px] tw-full truncate`}>
        {full ? address : s_ + "..." + _e}
      </ExtraLightFonts>
    </div>
  );
}
function STX({ STX, openAsset, index }) {
  return (
    <div className={`w-fit truncate flex items-center justify-end`}>
      <ExtraLightFonts cls={`text-[11px]`}>{STX}</ExtraLightFonts>
      <img
        className={`h-4 w-8 ml-2`}
        src={arrowRight}
        alt=""
        onClick={() => {
          openAsset(index);
        }}
      />
    </div>
  );
}

function Asset({ asset }) {
  return (
    <ExtraLightFonts cls={`text-[12px] truncate`}>{asset}</ExtraLightFonts>
  );
}

function Balance({ balance }) {
  return (
    <ExtraLightFonts cls={`text-[12px] italic text-[#939393] text-right`}>
      {balance}
    </ExtraLightFonts>
  );
}

// function AddressAndSTX({ address, STX }) {
//   return (
//     <div className={`w-full flex items-center px-[15px]`}>
//       <div className={`grid grid-cols-2 gap-3 w-fit items-center truncate`}>
//         <ExtraLightFonts cls={`text-[11px] truncate`}>
//           {address}
//         </ExtraLightFonts>
//         <div className={`flex justify-start truncate`}>
//           <ExtraLightFonts cls={`text-[11px] flex w-fit`}>
//             {STX}
//           </ExtraLightFonts>
//         </div>
//       </div>
//       <img className={`h-4 w-4`} src={arrowRight} alt="" />
//     </div>
//   );
// }
