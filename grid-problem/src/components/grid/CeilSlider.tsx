import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { ICeilSlider } from '../../types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 30,
    label: '30x30',
  },
  {
    value: 50,
    label: '50x50',
  },
  {
    value: 75,
    label: '75x75',
  },
  {
    value: 100,
    label: '100x100',
  },
  {
    value: 150,
    label: '150x150',
  },
  {
    value: 200,
    label: '200x200',
  },
];

function valuetext(value :number) {
  return `${value}px`;
}


export default function CeilSlider({setSize}: ICeilSlider) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-custom" gutterBottom>
        Set Ceil size in px
      </Typography>
      <Slider
        defaultValue={50}
        max={200}
        min={30}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={10}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={(e, value) => setSize(value)}
      />
    </div>
  );
}