import React, { useState } from 'react';
import { Grid, Slider } from '@mui/material';
import ShapeCard from './ShapeCard';

// create a function to generate a list of shapes with sizes based on the slider value
const shapeList = (sliderValue) => [
  {
    value: 'Triangle',
    type: 'polygon',
    size: {},
    radius: sliderValue,
    sides: 3,
    health: 100 + 0.05 * sliderValue,
  },
  {
    value: 'Rectangle',
    type: 'rectangle',
    size: {
      width: 1.5 * sliderValue,
      height: sliderValue,
    },
    radius: 0,
    sides: 4,
    health: 100 + 0.1 * sliderValue,
  },
  {
    value: 'Circle',
    type: 'circle',
    size: {},
    radius: sliderValue,
    sides: 0,
    health: 100 + 0.15 * sliderValue,
  },
  {
    value: 'Pentagon',
    type: 'polygon',
    size: {
      width: 1.5 * sliderValue,
      height: sliderValue,
    },
    radius: sliderValue,
    sides: 5,
    health: 100 + 0.2 * sliderValue,
  },
  {
    value: 'Decagon',
    type: 'polygon',
    size: {},
    radius: sliderValue,
    sides: 12,
    health: 100 + 0.25 * sliderValue,
  },
];

/**
 * Shows a carousel of selectable shapes in cards by mapping over the shapeList function's output
 * @returns {JSX.Element}
 * @constructor
 */
function ShapeCarousel() {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        overflow: 'hidden',
        flexGrow: 1,
      }}
      // account for grid item spacing so that the slider is centered
      marginRight={2}
    >
      {shapeList(sliderValue).map((value, index) => (
        <ShapeCard shape={value} key={index.toString()} />
      ))}
      <Slider
        sx={{
          color: '#1A2027',
          marginTop: '10px',
        }}
        orientation="horizontal"
        defaultValue={50}
        aria-label="Vertical slider"
        getAriaValueText={(value) => value}
        onChange={(event, value) => setSliderValue(value)}
      />
    </Grid>
  );
}

export default ShapeCarousel;
