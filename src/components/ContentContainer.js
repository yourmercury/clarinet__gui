import React from 'react'

export default function ContentContainer({children, cls}) {
  return (
    <div className={`${cls}`}>{children}</div>
  )
} 
