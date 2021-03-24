import React from 'react'
import { INullCeil } from '../../types'

const NullCeil = ({pozX, pozY, size, nullColor, resetGrid }: INullCeil) => {

  const style = {
    backgroundColor: nullColor,
    width: `${size}px`,
    height: `${size}px`,
    border: "1px solid gray",
  }
 
  const handleHover = () => {
    resetGrid()
  }
  
  return (
    <div  onMouseEnter={handleHover} onMouseOver={handleHover} className={`ceil ceil-${pozX},${pozY}`} {...{ style }} >  
    </div>
  )
}

export default NullCeil
