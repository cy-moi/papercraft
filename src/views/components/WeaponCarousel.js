import React from 'react';
import { Grid } from '@mui/material';
import WeaponCard from './WeaponCard';

// weapons array
const weapons = [
  {
    value: 'Bullets',
    type: 'bullet',
    slot: 0,
    speed: 5,
    config: {
      radius: 10,
      blurSize: 5,
    },
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
    action: 'keypress',
  },
];

function WeaponCarousel() {
  console.log('weapons', weapons);
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      {weapons.map((value, index) => (
        <WeaponCard weapon={value} key={`${index.toString()}weapon`} />
      ))}
    </Grid>
  );
}

export default WeaponCarousel;
