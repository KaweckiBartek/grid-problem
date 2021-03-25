import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { IGridSlider } from '../../types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 10,
    label: '10x10',
  },
  {
    value: 30,
    label: '30x30',
  },
  {
    value: 50,
    label: '50x50',
  },
]; 

function valuetext(value :number) {
  return `${value}`;
} 


export default function GridSlider({setNxN}: IGridSlider) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-custom" gutterBottom>
        Set grid NxN size
      </Typography>
      <Slider
        max={50}
        min={5}
        defaultValue={5}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={(e, value) => setNxN(value)}
      />
    </div>
  );
}