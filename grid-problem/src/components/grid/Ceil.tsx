import React, { useState } from 'react'
import { ICeil } from '../../types'



const Ceil = ({ grid, pozX, pozY, color, size, showCount, setShowCount }: ICeil) => {
  const [ count, setCount ] = useState(0)
  

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

  const handleClick = () => {
    !showCount && countFields(pozX, pozY, grid)
    setShowCount(true)
  }

  const style = {
    backgroundColor: color,
    width: `${size}px`,
    height: `${size}px`,
    border: "1px solid gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  return (

    <div {...{ style }} onClick={handleClick}>
      {showCount && count !== 0 && <h3>{count}</h3>}
    </div>
  )
}

export default Ceil
