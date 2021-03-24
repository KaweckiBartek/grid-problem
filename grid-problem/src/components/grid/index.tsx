import React, { useEffect, useState, useMemo } from 'react'
import Ceil from './Ceil'
import GridSettings from './GridSettings'


const Grid = () => {
  const [ hoverColor, setHoverColor ] = useState("yellow")
  const [ filledColor, setFilledColor ] = useState("tomato")
  const [ nullColor, setNullColor ] = useState("white")
  const [ size, setSize ] = useState(50)
  const [ NxN, setNxN ] = useState(5)
  const [ grid, setGrid ] = useState<number[][]>([])
  const [ initialGrid, setInitialGrid ] = useState<number[][]>([])
  const [ activePosition, setActivePosition ] = useState({ x: 0, y: 0 })
  
  const setPosition = (x: number, y: number) => {
    setActivePosition({ x, y })
  }

  const generateGrid = (NxN: number) => {
    let array = [] as any;
    for (let i = 0; i < NxN; i++) {
      array[ i ] = []
      for (let j = 0; j < NxN; j++) {
        array[ i ][ j ] = Math.round(Math.random())
      }
    }
    setGrid(array)
    setInitialGrid(array)
  }

  useEffect(() => {
    generateGrid(NxN)
  }, [ NxN ])

  const hoverConectedFields = (pozX: number, pozY: number, grid: number[][], initialGrid: number[][]) => {
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
    // const reset = (pozY: number, pozX: number) => {
    //   if (
    //     pozY >= 0 &&
    //     pozX >= 0 &&
    //     pozY < grid.length &&
    //     pozX < grid[ pozY ].length &&
    //     (grid[ pozY ][ pozX ] === 0)
    //   ) {

    //     setGrid(initialGrid)     
    //   }
    //   return setGrid(initialGrid)
    // };

    
    // if (grid[ pozY ][ pozX ] === 0) {
    //   reset(pozY, pozX);
    // }

  }

  // else if (grid[ pozY ][ pozX ] === 0) {
  //   setGrid(initialGrid)
    
  // }

  // const resetGrid = (pozX: number, pozY: number, grid: number[][]) => {
  //   if (
  //     pozY >= 0 &&
  //     pozX >= 0 &&
  //     pozY < grid.length &&
  //     pozX < grid[ pozY ].length &&
  //     (grid[ pozY ][ pozX ] === 0)
  //   ) {
  //     setGrid(initialGrid)
  //   }
  // };


  useEffect(() => {

    activePosition.x && activePosition.y && hoverConectedFields(activePosition.x, activePosition.y, grid, initialGrid);

    
  }, [ activePosition, grid, initialGrid ])
  
  // activePosition.x && activePosition.y && resetGrid(activePosition.x, activePosition.y, grid)
  // useEffect(() => {
  //   activeY && activeY && resetConectedFields(activeX, activeY, grid)
  //  },[activeY, activeX, grid, hoverOn])


  console.log(grid);

  return (
    <div className="grid"
    >
      <>
        {grid.map((rows, pozY) => {
          return (
            <div key={pozY} className="row">
              {rows.map((value, pozX) => {
                return (
                  <Ceil key={`${pozX}${pozY}`} {...{ grid, pozX, pozY, size, value, hoverColor, nullColor, filledColor, setPosition }} />
                )
              })}
            </div>
          )
        })}
      </>
      <GridSettings {...{ filledColor, setFilledColor, nullColor, setNullColor, hoverColor, setHoverColor, setNxN, setSize }} />
    </div>
  )
}



export default Grid

