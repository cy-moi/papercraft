import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

function ShapeCard({ value, size }) {
  return (
    <Grid item key={value}>
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
        onClick={() => {
          // @ts-ignore
          window.addPolygonCraft(3, size);
        }}
      >
        <img src={`assets/${value}.svg`} width={50} height={60} alt={value} />
        <Typography fontSize={8} variant="h6" component="div" color="white">
          {value}
        </Typography>
      </Box>
    </Grid>
  );
}

export default ShapeCard;
