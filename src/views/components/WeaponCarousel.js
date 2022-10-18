import React, { useState } from 'react';
import { Grid, Slider } from '@mui/material';
import WeaponCard from './WeaponCard';

// weapons array, sliderValue is the angle of the weapons
const weapons = (sliderValue) => [
  {
    value: 'Bullets',
    type: 'bullet',
    slot: 0,
    speed: 5,
    config: {
      radius: 5,
      blurSize: 5,
    },
    direction: sliderValue,
    action: 'keypress',
  },
  {
    value: 'Laser',
    type: 'laser',
    slot: 1,
    speed: 20,
    config: {
      size: { width: 20, height: 2 },
    },
    direction: sliderValue,
    action: 'keypress',
  },
];

/**
 * Shows a carousel of selectable weapons in cards by mapping over the weapons function's output
 * @returns {JSX.Element}
 * @constructor
 */
function WeaponCarousel() {
  const [sliderValue, setSliderValue] = useState(1.57);

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      {weapons(sliderValue).map((value, index) => (
        <WeaponCard weapon={value} key={`${index.toString()}weapon`} />
      ))}
      <Slider
        sx={{
          color: '#1A2027',
          marginTop: '10px',
          // make slider a circle
          borderRadius: '50%',
        }}
        orientation="horizontal"
        defaultValue={1.57}
        min={0}
        max={Math.PI * 2}
        aria-label="Vertical slider"
        getAriaValueText={(value) => value}
        onChange={(event, value) => setSliderValue(value)}
      />
    </Grid>
  );
}

export default WeaponCarousel;
