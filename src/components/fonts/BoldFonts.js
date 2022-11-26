import React from "react";

export default function BoldFonts({children, cls}) {
  return (
    <div>
      <h3 className={`${cls} font-medium text-sm font-Grotesk text-white`}>{children}</h3>
    </div>
  );
}
