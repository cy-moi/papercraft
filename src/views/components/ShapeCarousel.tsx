import React, { useState } from 'react';
import { Box, Grid, Slider } from '@mui/material';
import ShapeCard from './ShapeCard';

function ShapeCarousel() {
  const shapeList = ['circle', 'rectangle', 'triangle', 'pentagon', 'decagon'];
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      {shapeList.map((value, index) => (
        <ShapeCard value={value} size={sliderValue} />
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
