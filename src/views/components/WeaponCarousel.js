import React, { useState } from 'react';
import { Grid, Slider } from '@mui/material';
import WeaponCard from './WeaponCard';

// weapons array, sliderValue is the angle of the weapons
const weapons = (sliderValue) => [
  {
    value: 'Bullets',
    type: 'bullet',
    slot: 0,
    speed: 20,
    config: {
      radius: 5,
      blurSize: 5,
    },
    direction: sliderValue,
    action: 'keypress',
    lifeSpan: 30,
  },
  {
    value: 'Laser',
    type: 'laser',
    slot: 1,
    speed: 40,
    config: {
      size: { width: 20, height: 2 },
    },
    direction: sliderValue,
    action: 'keypress',
    lifeSpan: 5,
  },
  {
    value: 'Stone',
    type: 'bullet',
    slot: 2,
    speed: 5,
    config: {
      radius: 15,
      blurSize: 5,
    },
    direction: sliderValue,
    action: 'keypress',
    lifeSpan: 150,
  },
];

/**
 * Shows a carousel of selectable weapons in cards by mapping over the weapons function's output
 * @returns {JSX.Element}
 * @constructor
 */
function WeaponCarousel() {
  const [sliderValue, setSliderValue] = useState(1.57);
  const marks = [
    {
      value: 0,
      label: '0°',
    },
    {
      value: Math.PI / 4.0,
      label: '45°',
    },
    {
      value: Math.PI / 2.0,
      label: '90°',
    },
    {
      value: Math.PI,
      label: '180°',
    },
    {
      value: Math.PI * 2.0,
      label: '360°',
    },
  ];

  const valueLabelFormat = (value) =>
    marks.findIndex((mark) => mark.value === value) + 1;
  // console.log('weapons', weapons);
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }} marginRight={2}>
      {weapons(sliderValue).map((value, index) => (
        <WeaponCard weapon={value} key={`${index.toString()}weapon`} />
      ))}
      <Slider
        // TODO: Make this a circle
        sx={{
          color: '#1A2027',
          marginTop: '10px',
        }}
        orientation="horizontal"
        defaultValue={1.57}
        min={0}
        max={Math.PI * 2}
        aria-label="Vertical slider"
        valueLabelFormat={valueLabelFormat}
        marks={marks}
        getAriaValueText={(value) => `${value}°`}
        onChange={(event, value) => setSliderValue(value)}
      />
    </Grid>
  );
}

export default WeaponCarousel;
