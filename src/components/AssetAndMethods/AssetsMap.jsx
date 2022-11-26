// import React from "react";
// import BoldFonts from "../fonts/BoldFonts";
// import LightFonts from "../fonts/LightFonts";

// export default function AssetMap({active, setActive}){
//     return (
//       <div>
//         <div
//           id="boxes"
//           className={`flex w-full justify-between  pt-[30px] pb-[12px]`}
//         >
//           <div className={`w-6/12 pr-[4%]`}
//             onClick={()=>{
//               setActive(0)
//             }}
//           >
//             <BoldFonts
//               cls={`${
//                 active == 0
//               } text-sm cursor-pointer selection:bg-transparent text-center`}
//             >
//               Asset Map
//             </BoldFonts>
//           </div>
//           <div className={`w-6/12 pl-[4%]`}
//             onClick={()=>{
//               setActive(1)
//             }}
//           >
//             <BoldFonts
//               cls={`${
//                 active == 1
//               } text-sm cursor-pointer selection:bg-transparent text-center`}
//             >
//               Methods
//             </BoldFonts>
//           </div>
//         </div>
//         {/* ${active==1 && "flex flex-row-reverse"} */}
//         <div className={`w-full h-[2px] bg-[#343434] rounded-full mb-[25px] relative`}>
//           <div
//             className={`h-[3px] w-[50%] rounded-full bg-[#0075FF] absolute ${active==1? "right-[0px]" : "right-[50%]"}`}
//             style={{
//               transition: "all 0.4s ease",
//             }}
//           ></div>
//         </div>
//         <div
//           className={`${
//             active == 0 ? "" : "hidden"
//           } pt-[10px] px-[20px] grid grid-cols-2 gap-3`}
//         >
//           <div className={`grid grid-cols-1 gap-2 mx-auto truncate`}>
//             <LightFonts cls={`text-[11px] w-fit flex justify-center`}>
//               Address
//             </LightFonts>
  
//             <Address address={`ST1GH6KLP008HF55YG16M0K5JMT588`} />
//             <Address address={`ST1GH6KLP008HF55YG16M0K5JMT588`} />
//             <Address address={`ST1GH6KLP008HF55YG16M0K5JMT588`} />
//             <Address address={`ST1GH6KLP008HF55YG16M0K5JMT588`} />
//             <Address address={`ST1GH6KLP008HF55YG16M0K5JMT588`} />
//             <Address address={`ST1GH6KLP008HF55YG16M0K5JMT588`} />
//           </div>
//           <div className={`grid grid-cols-1 gap-2 mx-auto truncate`}>
//             <LightFonts cls={`text-[11px] w-fit  flex justify-center`}>
//               STX
//             </LightFonts>
//             <STX STX={`10000000000000`} />
//             <STX STX={`10000000000000`} />
//             <STX STX={`10000000000000`} />
//             <STX STX={`10000000000000`} />
//             <STX STX={`10000000000000`} />
//             <STX STX={`10000000000000`} />
//           </div>
//         </div>
//       </div>
//     )
//   }