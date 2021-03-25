import React from 'react'
import { SketchPicker } from 'react-color';
import { IGridSettings } from '../../types';
import CeilSlider from './CeilSlider';
import GridSlider from './GridSlider'


const GridSettings = ({ filledColor, setFilledColor, nullColor, setNullColor, hoverColor, setHoverColor, setNxN, setSize }: IGridSettings) => {

  return (
    <div className="grid__settings">
      <div className="grid__slider">
        <GridSlider {...{setNxN}}/>
        <CeilSlider {...{setSize}}/>
      </div>
      <div className="colorPickers">
        <div className="colorPicker">
          <p className="pickerTitle">Choose filled color</p>
          <SketchPicker
            color={filledColor}
            onChangeComplete={(color) => setFilledColor(color.hex)}
          />

        </div>
        <div className="colorPicker">
          <p className="pickerTitle">Choose null color</p>
          <SketchPicker
            color={nullColor}
            onChangeComplete={(color) => setNullColor(color.hex)}
          />

        </div>
        <div className="colorPicker">
          <p className="pickerTitle">Choose hover color</p>
          <SketchPicker
            color={hoverColor}
            onChangeComplete={(color) => setHoverColor(color.hex)}
          />
        </div>
      </div>
      
    </div>
  )
}

export default GridSettings
