import React, { useEffect, useState, useMemo } from 'react'
import cloneDeep from 'lodash/cloneDeep';
import Ceil from './Ceil'
import GridSettings from './GridSettings'
import NullCeil from './NullCeil'

const Grid = () => {
  const [ hoverColor, setHoverColor ] = useState("yellow")
  const [ filledColor, setFilledColor ] = useState("tomato")
  const [ nullColor, setNullColor ] = useState("white")
  const [ size, setSize ] = useState(30)
  const [ NxN, setNxN ] = useState(15)
  const [ grid, setGrid ] = useState<number[][]>([])
  const [ initialGrid, setInitialGrid ] = useState<number[][]>([])
  const [ activePosition, setActivePosition ] = useState({ x: 0, y: 0 })

  const generateGrid = (NxN: number) => {
    let array = [] as any;
    for (let i = 0; i < NxN; i++) {
      array[ i ] = []
      for (let j = 0; j < NxN; j++) {
        array[ i ][ j ] = Math.round(Math.random())
      }
    }
    return setGrid(array)
  }

  const generateInitialGrid = () => {
    const initialGrid = cloneDeep(grid)
    return setInitialGrid(initialGrid)
  }

  const resetGrid = () => {
    let initial = cloneDeep(initialGrid);
    return setGrid(initial)
  };

  const hoverConectedFields = (pozX: number, pozY: number, grid: number[][]) => {
    const visit = (pozY: number, pozX: number) => {
      if (
        pozY >= 0 &&
        pozX >= 0 &&
        pozY < grid.length &&
        pozX < grid[ pozY ].length &&
        (grid[ pozY ][ pozX ] === 1)
      ) {
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

  }

  const setPosition = (x: number, y: number) => {
    setActivePosition({ x, y })
  }

  useMemo(() => generateGrid(NxN), [ NxN ])

  useEffect(() => {
    generateInitialGrid()
  }, [ NxN ])


  useMemo(() => {
    activePosition.x && activePosition.y && hoverConectedFields(activePosition.x, activePosition.y, grid)
  }, [ activePosition.x, activePosition.y, grid ])

  return (
    <div className="grid"
    >
      <>
        {grid.map((rows, pozY) => {
          return (
            <div key={pozY} className="row">
              <>
                {rows.map((value, pozX) => {
                  return (
                    value === 0 ?
                      <NullCeil key={`${pozX}${pozY}`} {...{ pozX, pozY, size, nullColor, resetGrid}} />
                      :
                      <Ceil key={`${pozX}${pozY}`} {...{ grid, pozX, pozY, size, value, hoverColor, nullColor, filledColor, setPosition, resetGrid }} />
                  )
                })}
              </>
            </div>
          )
        })}
      </>
      <GridSettings {...{ filledColor, setFilledColor, nullColor, setNullColor, hoverColor, setHoverColor, setNxN, setSize }} />
    </div>
  )
}



export default Grid

