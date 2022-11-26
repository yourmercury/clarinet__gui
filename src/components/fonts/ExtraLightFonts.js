import React from 'react'

export default function ExtraLightFonts({children, cls}) {
  return (
    <div>
      <h3 className={`${cls} font-light text-base font-Montserrat text-white`}>
        {children}
      </h3>
    </div>
  );
}
