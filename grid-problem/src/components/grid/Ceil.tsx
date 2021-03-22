import React, { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from '../../hooks'
import { ICeil } from '../../types'



const Ceil = ({ grid, pozX, pozY, size, cols, hoverColor, nullColor, filledColor }: ICeil) => {
  const [ count, setCount ] = useState(0)
  const [ show, setShow ] = useState(false)
  const [hover, setHover] = useState(false)
  const refi = useRef(null)
  const [backgroundColor, setBackGroundColor] = useState('')


  useEffect(() => {
    if (cols === 1 || cols === 3) {
      setBackGroundColor(filledColor)
    } else if (cols === 0) {
      setBackGroundColor(nullColor)
    }
    else if (cols === 2) {
      setBackGroundColor(hoverColor)
    }
    
  },[filledColor, nullColor, hoverColor, cols] )
  
  const handleClick = () => {
    countFields(pozX, pozY, grid)
    setShow(true)
  }

  const handleClickOutside = () => {
    setShow(false)
  }

  const hoverConectedFields = (pozX: number, pozY: number, grid: number[][]) => {
    const visit = (pozY: number, pozX: number) => {
      if (
        pozY >= 0 &&
        pozX >= 0 &&
        pozY < grid.length &&
        pozX < grid[ pozY ].length &&
        ( grid[ pozY ][ pozX ] === 1 )
      ) {
        grid[ pozY ][ pozX ] = 2;
        setBackGroundColor(hoverColor)
        visit(pozY + 1, pozX); // top
        visit(pozY, pozX + 1); // right
        visit(pozY - 1, pozX); // bottom
        visit(pozY, pozX - 1); // left     
      }
    };

    if  ( grid[ pozY ][ pozX ] === 1) {
      visit(pozY, pozX);
      return setBackGroundColor(hoverColor)
    }
  }

  const resetConectedFields = (pozX: number, pozY: number, grid: number[][]) => {
    const visit = (pozY: number, pozX: number) => {
      if (
        pozY >= 0 &&
        pozX >= 0 &&
        pozY < grid.length &&
        pozX < grid[ pozY ].length &&
        (grid[ pozY ][ pozX ] === 2 || grid[ pozY ][ pozX ] === 3)
      ) {
        grid[ pozY ][ pozX ] = 1;
        setHover(false)
        setBackGroundColor(filledColor)
        visit(pozY + 1, pozX); // top
        visit(pozY, pozX + 1); // right
        visit(pozY - 1, pozX); // bottom
        visit(pozY, pozX - 1); // left     
      }
    };

    if  ( grid[ pozY ][ pozX ] === 2 || grid[ pozY ][ pozX ] === 3) {
      visit(pozY, pozX);
    }
  }

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

  useOnClickOutside(refi, handleClickOutside)

  const handleOnHover = () => {
    hoverConectedFields(pozX, pozY, grid)
  }

  const handleOnMouseLeave = () => {
    resetConectedFields(pozX, pozY, grid)
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

  

  return (
    <div ref={refi} {...{ style }} onMouseLeave={handleOnMouseLeave} onMouseOver={handleOnHover} onClick={handleClick}>
      {show && count !== 0 && <h3>{count}</h3>}
    </div>
  )
}

export default Ceil
