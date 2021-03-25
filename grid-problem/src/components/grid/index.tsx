//@ts-ign
import React, { useEffect, useState, useMemo, useRef } from 'react'
import { CSSPlugin, gsap } from 'gsap';
import { motion } from 'framer-motion';
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
  const [ show, setShow ] = useState(false)
  

  useEffect(() => {
    setShow(true)
    CSSPlugin.useSVGTransformAttr = true;
    function getRandom(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const tl = gsap.timeline()
    const elements = document.querySelectorAll(".ceil");
    
    Array.from(elements).forEach((ceil) => {
      tl.set(ceil, {
        x: '+=' + getRandom(-500, 500),
        y: '+=' + getRandom(-500, 500),
        rotation: '+=' + getRandom(-720, 720),
        scale: 0,
        opacity: 0,
      });
    });

    gsap.to(elements, {
      duration: 0.5,
      yoyo: true,
      repeat: 0,
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      ease: "power2",
      stagger: 0.0125
    })
     

    setTimeout(() => {
      setShow(false)
    }, 6000)

    return () => {
      CSSPlugin.useSVGTransformAttr = false;
      setShow(false)
    }
  }, [NxN])

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

  const generateInitialGrid = useRef(()=>{})

  generateInitialGrid.current = () => {
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
    generateInitialGrid.current()
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
      <motion.div
        className="slowMo-btn"
        initial={{ opacity: 0, zIndex: 11 }}
          animate={{
            opacity: show ? 1 : 0,
            zIndex: show ? 11 : -11,
          }}
          transition={{
            opacity: { duration: 0.6 },
            zIndex: { delay: !show ? 0.6 : 0 },
          }}
      
        onTouchStart={() => gsap.globalTimeline.timeScale(0.15)}
        onTouchMove={() => gsap.globalTimeline.timeScale(0.15)}
        onTouchCancel={() => gsap.globalTimeline.timeScale(1)}
        onTouchEnd={() => gsap.globalTimeline.timeScale(1)}
        onMouseOver={() => gsap.globalTimeline.timeScale(0.15)}
        onMouseLeave={() => gsap.globalTimeline.timeScale(1)}
      >
        Hover to Slow Motion</motion.div>
      
      <GridSettings {...{ filledColor, setFilledColor, nullColor, setNullColor, hoverColor, setHoverColor, setNxN, setSize }} />

    </div>
  )
}



export default Grid

