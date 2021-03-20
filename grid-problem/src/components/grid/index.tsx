import React, { useEffect, useState } from 'react'
import Ceil from './Ceil'


const Grid = () => {
  const [ filedCollor, setFiledCollor ] = useState("tomato")
  const [ nullColor, setNullColor ] = useState("white")
  const [ size, setSize ] = useState(100)
  const [ showCount, setShowCount ] = useState(false)

  const initialGrid = [
    [ 0, 0, 0, 0, 1 ],
    [ 1, 1, 0, 0, 0 ],
    [ 1, 1, 0, 1, 1 ],
    [ 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 0, 0 ],
  ]

  const [ grid, setGrid ] = useState([
    [ 0, 0, 0, 0, 1 ],
    [ 1, 1, 0, 0, 0 ],
    [ 1, 1, 0, 1, 1 ],
    [ 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 0, 0 ],
  ])

  return (
    <div className="grid"
    onClick={()=> setGrid(initialGrid)}
    >
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

