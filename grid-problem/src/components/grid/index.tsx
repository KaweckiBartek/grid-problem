import React, { useEffect, useState } from 'react'
import Ceil from './Ceil'


const Grid = () => {
  const [hoverColor, setHoverColor] = useState("green")
  const [ filedCollor, setFiledCollor ] = useState("tomato")
  const [ nullColor, setNullColor ] = useState("white")
  const [ size, setSize ] = useState(100)

  const initialGrid = [
    [ 0, 0, 0, 0, 1 ],
    [ 1, 1, 0, 0, 0 ],
    [ 1, 1, 0, 1, 1 ],
    [ 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 0, 0 ],
  ]
  
  const [ grid, setGrid ] = useState(initialGrid)

  console.log(grid);


  
  return (
    <div className="grid"
    
    >
      {grid.map((rows, pozY) => {
        return (
          <div key={pozY} className="row">
            {rows.map((cols, pozX) => {
              return (
                <Ceil {...{initialGrid, setGrid, grid, pozX, pozY, size, key: pozX, hoverColor, cols }} color={cols === 1 || cols === 3 ? filedCollor : cols === 2 ? hoverColor : nullColor} />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}



export default Grid

