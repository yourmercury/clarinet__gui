import React from 'react'

export default function Button({children, cls}) {
  return (
    <div
      className={`bg-[#3652E3] px-[20px] py-[10px] flex justify-center items-center rounded-xl cursor-pointer ${cls}`}
    >
      <h4>{children}</h4>
    </div>
  );
}
