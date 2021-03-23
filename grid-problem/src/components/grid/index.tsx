import React, { useEffect, useState } from 'react'
import Ceil from './Ceil'
import GridSettings from './GridSettings'


const Grid = () => {
  const [ hoverColor, setHoverColor ] = useState("green")
  const [ filledColor, setFilledColor ] = useState("tomato")
  const [ nullColor, setNullColor ] = useState("white")
  const [ size, setSize ] = useState(100)
  const initialGrid = 5
  const [ NxN, setNxN ] = useState(initialGrid)
  const [ grid, setGrid ] = useState<number[][]>([])
  const [ activeX, setActiveX ] = useState(0)
  const [ activeY, setActiveY ] = useState(0)
  const [hoverOn, setHoverOn] = useState(false)
  // const [conectedFields, setConectedFields] = useState(0)
  // const [ count, setCount ] = useState(0)


  useEffect(() => {
    let array = [] as any;
    for (let i = 0; i < NxN; i++) {
      array[ i ] = []
      for (let j = 0; j < grid.length; j++) {
        array[ i ][ j ] = Math.round(Math.random())
      }
    }
    setGrid(array)
  }, [ NxN, grid.length ])

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

  const resetConectedFields = (pozX: number, pozY: number, grid: number[][]) => {
    const visit = (pozY: number, pozX: number) => {
      if (
        pozY >= 0 &&
        pozX >= 0 &&
        pozY < grid.length &&
        pozX < grid[ pozY ].length &&
        (grid[ pozY ][ pozX ] === 0 )
      ) {
        grid[ pozY ][ pozX ] = 1;
        // setBackGroundColor(filledColor)
        visit(pozY + 1, pozX); // top
        visit(pozY, pozX + 1); // right
        visit(pozY - 1, pozX); // bottom
        visit(pozY, pozX - 1); // left     
      }
    };

    if (grid[ pozY ][ pozX ] === 2 || grid[ pozY ][ pozX ] === 3) {
      visit(pozY, pozX);
    }
  }

 
  console.log(activeX, activeY);
  

  useEffect(() => {
   activeY && activeY && hoverConectedFields(activeX, activeY, grid)
  }, [ activeY, activeX, grid, hoverOn ])
  
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
              {rows.map((cols, pozX) => {
                return (
                  <Ceil {...{ grid ,pozX, pozY, size, key: pozX, cols, hoverColor, nullColor, filledColor, setActiveX, setActiveY, setHoverOn }} />
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

