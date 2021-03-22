// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

export interface ICeil {
  pozX: number,
  pozY: number,
  color: string,
  hoverColor: string,
  size: number,
  grid: number[][],
  cols: number,
  initialGrid: number[][],
  setGrid: (arg: number[][]) => void,
}

export interface IGridSettings {
  setFiledColor: (arg: string) => void,
  setNullColor: (arg: string) => void,
  setHoverColor: (arg: string) => void,

}