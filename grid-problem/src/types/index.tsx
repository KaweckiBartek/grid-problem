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
  value: number,
  // count: number,
  setPosition: any,
}

export interface INullCeil {
  pozX: number,
  pozY: number,
  nullColor: string,
  size: number,
}

export interface IGridSettings {
  filledColor: string,
  setFilledColor: (arg: string) => void,
  nullColor: string,
  setNullColor: (arg: string) => void,
  hoverColor: string,
  setHoverColor: (arg: string) => void,
  setNxN: (arg: any) => void,
  setSize: (arg: any) => void,

}

export interface  IGridSlider {
  setNxN: (arg: any) => void
}
export interface  ICeilSlider {
  setSize: (arg: any) => void
}

