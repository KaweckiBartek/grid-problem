// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

export interface ICeil {
  pozX: number,
  pozY: number,
  hoverColor: string,
  nullColor: string,
  filledColor: string,
  size: number,
  grid: number[][],
  cols: number,
}

export interface IGridSettings {
  filledColor: string,
  setFilledColor: (arg: string) => void,
  nullColor: string,
  setNullColor: (arg: string) => void,
  hoverColor: string,
  setHoverColor: (arg: string) => void,

}