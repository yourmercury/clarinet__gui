import React, { useContext, useState, useEffect } from "react";
import Button from "./Button";
import ContentContainer from "./ContentContainer";
import DropdownInput, { DropdownOption } from "./DropdownInput";
import BoldFonts from "./fonts/BoldFonts";
import LightFonts from "./fonts/LightFonts";
import Input from "./Input";
import { ConsoleContext } from "../contexts/console.context";
import { buildContractCallInput, driveThrough, parseSyntax, sendInput, validateInputCount } from "../helpers/inputParser";

export default function BoxOne() {
  const { addrs, contracts, setClarinetInput, clarinetInput, selectedAddr, setAddr, editable } = useContext(ConsoleContext);
  const [selectedCont, setCont] = useState("");
  const [selectedMeth, setMeth] = useState("");
  const [selectedMethName, setMethName] = useState("");
  const [contractCall, setContractCall] = useState("");
  const [args, setArgs] = useState([]);
  const [loaded, load] = useState(false);

  useEffect(() => {
    if (!loaded) {
      load(true);
      return;
    }

    (selectedAddr && addrs.addresses.includes(selectedAddr)) || setAddr(addrs.addresses[0] || "");
  }, [addrs]);

  useEffect(() => {
    if (!loaded) {
      load(true);
      return;
    }

    console.log("reload done");

    setArgs([]);
    if(contracts.list.includes(selectedCont)) return;

    setCont(contracts.list[0] || "");
    setMeth(contracts.methodNames[contracts.list[0]][0].signature);
    setMethName(contracts.methodNames[contracts.list[0]][0].name);

  }, [contracts]);

  useEffect(()=>{
    selectedAddr && sendInput(`::set_tx_sender ${selectedAddr}`)
  }, [selectedAddr])

  useEffect(() => {
    console.log(args);
    if(!contracts.loaded) return
    let inputs = []
    args.forEach((arg)=>{
      inputs = [...inputs, ...arg];
    })
    let contractCall = buildContractCallInput(inputs, selectedCont, selectedMethName, contracts.args[selectedMeth]);
    // setContractCall(contractCall);
    console.log(contractCall);
    setClarinetInput(contractCall);
  }, [selectedAddr, selectedCont, args]);

  return (
    <ContentContainer
      cls={`h-screen w-full bg-[#1E1E1E] border-r border-[#343434] pt-[80px] px-[50px]`}
    >
      <div>
        <div>
          <BoldFonts cls={`cursor-default`}>Wallets</BoldFonts>
          <DropdownInput
            onChange={(e) => {
              let val = e.target.value;
              setAddr(val);
            }}
            value={selectedAddr}
          >
            {addrs.addresses.map((addr, index) => (
              <DropdownOption key={index} value={addr}>
                {addr + "  ------>  " + addrs.stxBalance[index] + " uSTX"}
              </DropdownOption>
            ))}
          </DropdownInput>
        </div>
        <div className={`my-[10px]`}>
          <BoldFonts cls={`cursor-default`}>Contract</BoldFonts>
          <DropdownInput
            // value={selectedCont}
            onChange={(e) => {
              let val = e.target.value;
              setCont(val);
              setMeth(contracts.methodNames[val][0].signature);
              setMethName(contracts.methodNames[val][0].name);
              setArgs([]);
            }}
          >
            {contracts.list.map((contract, index) => (
              <DropdownOption key={index} value={contract}>
                {contract.split(".")[1]}
              </DropdownOption>
            ))}
          </DropdownInput>
        </div>
        <div>
          <BoldFonts cls={`cursor-default`}>Method</BoldFonts>
          <DropdownInput
            // value={selectedMethName}
            onChange={(e) => {
              let val = e.target.value.split(",");
              setMeth(val[0]);
              setMethName(val[1]);
              setArgs([]);
            }}
          >
            {(contracts.methodNames[selectedCont] || []).map(
              (methodName, index) => (
                <DropdownOption key={index} value={[methodName.signature, methodName.name]}>
                  {methodName.name}
                </DropdownOption>
              )
            )}
          </DropdownInput>
        </div>
      </div>
      {(Object.keys(contracts.args[selectedMeth] || {}) || []).length > 0 && <div className={`mt-[40px]`}>
        <BoldFonts cls={`cursor-default`}>Arguments</BoldFonts>
        
        {(Object.keys(contracts.args[selectedMeth] || {}) || []).map((arg, index)=>(
            <ArgInput arg={contracts.args[selectedMeth][arg]} key={index} index={index} args={args} setArgs={setArgs} contracts={contracts} />
        ))}
      </div>}
      <div className={`mt-[30px]`} onClick={()=>{
        if(editable) return;
        if(args.length !== (Object.keys(contracts.args[selectedMeth] || {}) || []).length){
          console.log("not long enough")
          return;
        }
        let total = 0;
        let inputs = [];
        args.forEach((arg, index)=>{
          let {count} = validateInputCount((contracts.args[selectedMeth] || {})[index]);
          total+=count;
          inputs = [...inputs, ...arg];
        })

        if(total !== inputs.length) {
          console.log("not long enough");
          return;
        }

        // let contractCall = buildContractCallInput(inputs, selectedCont, selectedMethName, contracts.args[selectedMeth])
        sendInput(clarinetInput);
      }}>
        <div className={`px-[20px] py-[10px] flex justify-center items-center rounded-xl cursor-pointer ${editable? "bg-[grey]" : "bg-[#3652E3]"}`}>
          <BoldFonts>Submit</BoldFonts>
        </div>
      </div>
    </ContentContainer>
  );
}

function ArgInput({ arg, setArgs, args, index, contracts }) {
  const [argg, setArgg] = useState("");
  useEffect(()=>{
    setArgg("");
  }, [contracts])
  //`w-10/12`
  let type;
  if (arg.type != "bool") {
    if(arg.type.includes("<")){
      let frag = arg.type.slice(arg.type.indexOf("<"), arg.type.indexOf(">"));
      let indexOfFrag = arg.type.indexOf(frag);
      let traitType = frag.slice(frag.indexOf("."));
      type = arg.type
      type = type.replace(frag+">", traitType);
    }else {
      type = arg.type;
    }
    return (
      <div className={`my-[10px]`}>
        <LightFonts cls={`cursor-default`}>{arg.name}</LightFonts>
        <Input placeholder={type} cls={"placeholder:text-[red]"} type={type == "uint"? "number": "text"} value={argg} withValue onChange={(e)=>{
          let value = e.target.value;
          args[index] = value.replaceAll(", ", " ");
          args[index] = args[index].replaceAll(",", " ").replaceAll(",  ", " ").replaceAll("  ", " ").split(" ");
          console.log(args[index]);
          setArgs([...args]);
          setArgg(value);
        }}/>
      </div>
    );
  } else {
    return (
      <div>
        <LightFonts cls={`cursor-default`}>{arg.name}</LightFonts>
        <DropdownInput cls={""} onChange={(e)=>{
          let value = e.target.value;
          args[index] = [e.target.value];
        }}>
          <DropdownOption value={"true"}>true</DropdownOption>
          <DropdownOption value={"false"}>false</DropdownOption>
        </DropdownInput>
      </div>
    );
  }
}



  // useEffect(()=>{
  //   console.log(validateInputCount((contracts.args[Object.keys(contracts.args)[0]] || {})[1]))
  //   // let count = {i:0}
  //   contracts.args[Object.keys(contracts.args)[0]] && console.log(driveThrough((contracts.args[Object.keys(contracts.args)[0]] || {}), ["1", "2", "3", "4", "5", "6", "7", "8", "9", "true", "10"]))
  //   contracts.args[Object.keys(contracts.args)[0]] && window.electron.ipcSend("call-contracts", buildContractCallInput(
  //     ["1", "2", "3", "4", "5", "6", "7", "8", "9", "true", "10"],
  //     selectedCont,
  //     "complex-method",
  //     contracts.args[Object.keys(contracts.args)[0]]
  //   ));
  //   // console.log(count);
  // })