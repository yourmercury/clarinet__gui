import React from "react";

export default function Input({ children, placeholder, cls, onChange, type, value, withValue }) {
  if(withValue){
    return (
      <div>
        <input
          className={`border border-[#9D9D9D] rounded-md mt-[10px] ${cls} w-full text-white font-Montserrat text-sm text-ellipsis bg-transparent py-[9px] px-[10px] h-[30px] placeholder:italic placeholder-[
  #939393] placeholder:font-Nunito placeholder:text-[11px]`}
          type={type}
          onChange={(e)=>{
            onChange && onChange(e);
          }}
          value={value}
          name=""
          id=""
          placeholder={placeholder}
          style={{
            fontStyle: "italic",
          }}
        />
      </div>
    );
  }
  return (
    <div>
      <input
        className={`border border-[#9D9D9D] rounded-md mt-[10px] ${cls} w-full text-white font-Montserrat text-sm text-ellipsis bg-transparent py-[9px] px-[10px] h-[30px] placeholder:italic placeholder-[
#939393] placeholder:font-Nunito placeholder:text-[11px]`}
        type={type}
        onChange={(e)=>{
          onChange && onChange(e);
        }}
        name=""
        id=""
        placeholder={placeholder}
        style={{
          fontStyle: "italic",
        }}
      />
    </div>
  );
}
