import React, { useRef, useState } from 'react'
import { useOnClickOutside } from '../../hooks'
import { ICeil } from '../../types'



const Ceil = ({ grid, pozX, pozY, color, size, setGrid, initialGrid }: ICeil) => {
  const [ count, setCount ] = useState(0)
  const [ show, setShow ] = useState(false)
  const refi = useRef(null)
  const [ hover, setHover ] = useState(false)
  const [hoverColor, setHoverColor] = useState("green")


  const handleClick = () => {
    countFields(pozX, pozY, grid)
    setShow(true)
  }

  const handleClickOutside = () => {
    setShow(false)
  }

  const countFields = (pozX: number, pozY: number, grid: number[][]) => {
    let counter = 0;

    const visit = (pozY: number, pozX: number) => {
      if (
        pozY >= 0 &&
        pozX >= 0 &&
        pozY < grid.length &&
        pozX < grid[ pozY ].length &&
        grid[ pozY ][ pozX ] === 1
      ) {
        counter += 1
        grid[ pozY ][ pozX ] = 2;
        visit(pozY + 1, pozX); // top
        visit(pozY, pozX + 1); // right
        visit(pozY - 1, pozX); // bottom
        visit(pozY, pozX - 1); // left
      }
    };

    if (grid[ pozY ][ pozX ] === 1) {
      visit(pozY, pozX);
    }

    return setCount(counter);
  }

  const hoverConectedFields = (pozX: number, pozY: number, grid: number[][], color: string) => {
    const visit = (pozY: number, pozX: number) => {
      if (
        pozY >= 0 &&
        pozX >= 0 &&
        pozY < grid.length &&
        pozX < grid[ pozY ].length &&
        grid[ pozY ][ pozX ] === 1
      ) {
        setHover(true)
        grid[ pozY ][ pozX ] = 3;
        visit(pozY + 1, pozX); // top
        visit(pozY, pozX + 1); // right
        visit(pozY - 1, pozX); // bottom
        visit(pozY, pozX - 1); // left
        
      }
    };

    if (grid[ pozY ][ pozX ] === 1) {
      visit(pozY, pozX);
    }

    return color;
  }

  useOnClickOutside(refi, handleClickOutside)

  const onHover = () => {
    hoverConectedFields(pozX, pozY, grid, color)
  }

  const style = {
    backgroundColor: hover ? hoverColor : color,
    width: `${size}px`,
    height: `${size}px`,
    border: "1px solid gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  return (

    <div ref={refi} {...{ style }} onMouseOver={onHover} onClick={handleClick}>
      {show && count !== 0 && <h3>{count}</h3>}
    </div>
  )
}

export default Ceil
