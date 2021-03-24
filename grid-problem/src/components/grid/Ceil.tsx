import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useOnClickOutside } from '../../hooks'
import { ICeil } from '../../types'



const Ceil = ({grid ,pozX, pozY, size, value, hoverColor, nullColor, filledColor, setPosition }: ICeil) => {
  const [ count, setCount ] = useState(0)
  const [ show, setShow ] = useState(false)
  const refi = useRef(null)
  const [ backgroundColor, setBackGroundColor ] = useState('')
  // const [columns, setColumns] = useState(value)
 
  
  const changeBg = (value :number, filledColor: string, nullColor: string, hoverColor: string) => {
    if (value === 1) {
      setBackGroundColor(filledColor)
    } else if (value === 0) {
      setBackGroundColor(nullColor)
    }
    else if (value === 2) {
      setBackGroundColor(hoverColor)
    }
  }
  
  useMemo(() => changeBg(value, filledColor, nullColor, hoverColor), [value, filledColor, nullColor, hoverColor])

  // useEffect(() => {

  // },[filledColor, nullColor, hoverColor, value ,grid] )
  
  const countFields = (pozX: number, pozY: number, grid: number[][]) => {
    let counter = 0;

    const visit = (pozY: number, pozX: number) => {
      if (
        pozY >= 0 &&
        pozX >= 0 &&
        pozY < grid.length &&
        pozX < grid[ pozY ].length &&
        grid[ pozY ][ pozX ] === 2
      ) {
        counter += 1
        grid[ pozY ][ pozX ] = 3;
        
        visit(pozY + 1, pozX); // top
        visit(pozY, pozX + 1); // right
        visit(pozY - 1, pozX); // bottom
        visit(pozY, pozX - 1); // left
      }
    };

    if (grid[ pozY ][ pozX ] === 2) {
      visit(pozY, pozX);

    }

    return setCount(counter);
  }

  const handleClick = () => {
    countFields(pozX, pozY, grid)
    setShow(true)

  }

  const handleClickOutside = () => {
    setShow(false)
  }


  useOnClickOutside(refi, handleClickOutside)

  const handleOnHover = () => {
    setPosition(pozX,pozY)
  }

  const style = {
    backgroundColor,
    width: `${size}px`,
    height: `${size}px`,
    border: "1px solid gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  
  // onMouseLeave={handleOnMouseLeave}
  return (
    <div ref={refi}  className={`ceil-${pozX},${pozY}`}  {...{ style }}  onMouseEnter={handleOnHover}  onMouseOver={handleOnHover} onClick={handleClick}>
      {show && count !== 0 && <h3>{count}</h3>}
    </div>
  )
}

export default Ceil
