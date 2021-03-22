import React from 'react'
import Select from "react-dropdown-select";
import { filedColorsOptions, hoverColorsOptions, nullColorsOptions } from '../../data';
import { IGridSettings } from '../../types';


const GridSettings = ({setFiledColor, setNullColor, setHoverColor}: IGridSettings) => {


  return (
    <div className="grid__settings">
      <Select options={filedColorsOptions} onChange={(values) => setFiledColor(values)} />
      <Select options={nullColorsOptions} onChange={(values) => setNullColor(values)} />
      <Select options={hoverColorsOptions} onChange={(values) => setHoverColor(values)} />
      
    </div>
  )
}

export default GridSettings
