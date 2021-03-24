import React from 'react'
import { INullCeil } from '../../types'

const NullCeil = ({pozX, pozY, size, nullColor }: INullCeil) => {

  const style = {
    backgroundColor: nullColor,
    width: `${size}px`,
    height: `${size}px`,
    border: "1px solid gray",
  }

  // onMouseEnter={handleOnHover}
  // onMouseLeave={handleOnMouseLeave}
  return (
    <div className={`ceil ceil-${pozX},${pozY}`} {...{ style }} >  
    </div>
  )
}

export default NullCeil
