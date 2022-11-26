import React from "react";

export default function DropdownInput({ children, cls, onChange, value }) {
  return (
    <select
      value={value}
      onChange={(e) => {
        if (onChange) onChange(e);
      }}
      className={`${cls} border text-white text-xs border-[#9D9D9D] rounded-md p- h-fit mt-[10px] w-full form-select bg-transparent truncate`}
    >
      {children}
    </select>
  );
}

export function DropdownOption({ children, value }) {
  return <option value={value}>{children}</option>;
}
