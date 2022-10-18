import React from 'react';
import { changeSelect } from 'Src/utils/events';
import { Box, Grid, Typography } from '@mui/material';

function WeaponCard({ weapon }) {
  console.log(weapon);
  return (
    <Grid item key={weapon.value}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: 140,
          width: 120,
          backgroundColor: '#1A2027',
          transition: 'transform .2s',
          '&:hover': {
            transform: 'scale(1.25)',
          },
        }}
        /* eslint-disable-next-line max-len */
        onClick={async (e) => {
          await window.equipShoot(
            weapon.type,
            weapon.slot,
            weapon.speed,
            weapon.direction,
            weapon.config,
            weapon.color,
            weapon.action,
          );
          changeSelect(e);
          // console.log(window.it.weapons);
        }}
      >
        <img
          src={`assets/${weapon.value}.svg`}
          width={50}
          height={60}
          alt={weapon.value}
        />
        <Typography fontSize={8} variant="h6" component="div" color="white">
          {weapon.value}
        </Typography>
      </Box>
    </Grid>
  );
}

export default WeaponCard;
