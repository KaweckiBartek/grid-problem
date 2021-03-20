import React, { useEffect, useState } from 'react'
import Ceil from './Ceil'


const Grid = () => {
  const [ filedCollor, setFiledCollor ] = useState("tomato")
  const [ nullColor, setNullColor ] = useState("white")
  const [ size, setSize ] = useState(100)
  const [ showCount, setShowCount ] = useState(false)

  const [initialGrid, setInitialGrid] = useState([
    [ 0, 0, 0, 0, 1 ],
    [ 1, 1, 0, 0, 0 ],
    [ 1, 1, 0, 1, 1 ],
    [ 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 0, 0 ],
  ])

  const [ grid, setGrid ] = useState(initialGrid)

  console.log(grid);
  console.log(initialGrid);

  useEffect(() => {
    setGrid(initialGrid)
  },[initialGrid])
  
  
  return (
    <div className="grid">
      {grid.map((rows, pozY) => {
        return (
          <div key={pozY} className="row">
            {rows.map((cols, pozX) => {
              return (
                <Ceil {...{initialGrid, setGrid, grid, pozX, pozY, size, key: pozX }} color={cols === 1 || cols === 2 ? filedCollor : nullColor} />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}



export default Grid

