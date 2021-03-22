import React, { useEffect, useState } from 'react'
import Ceil from './Ceil'
import GridSettings from './GridSettings'


const Grid = () => {
  const [ hoverColor, setHoverColor ] = useState("green")
  const [ filledColor, setFilledColor ] = useState("tomato")
  const [ nullColor, setNullColor ] = useState("white")
  const [ size, setSize ] = useState(100)
  const initialGrid = 5
  const [NxN, setNxN] = useState(initialGrid)
  const [ grid, setGrid ] = useState<number[][]>([])

  useEffect(() => {
    let array = [] as any;
    for (let i = 0; i < NxN; i++) {
      array[i] = []
      for (let j = 0; j < grid.length; j++) {
        array[ i ][j] = Math.round(Math.random())
      }
    }
    setGrid(array)
}, [NxN, grid.length])

  return (
    <div className="grid"
    >
      <>
        {grid.map((rows, pozY) => {
          return (
            <div key={pozY} className="row">
              {rows.map((cols, pozX) => {
                return (
                  <Ceil {...{ grid, pozX, pozY, size, key: pozX, cols, hoverColor, nullColor, filledColor, }}/>
                )
              })}
            </div>
          )
        })}
      </>
      <GridSettings {...{filledColor, setFilledColor, nullColor, setNullColor, hoverColor , setHoverColor}} />
    </div>
  )
}



export default Grid

