import React from "react";

export default function LightFonts({ children, cls }) {
  return (
    <div>
      <h3 className={`${cls} font-light text-sm font-Grotesk text-white`}>
        {children}
      </h3>
    </div>
  );
}
