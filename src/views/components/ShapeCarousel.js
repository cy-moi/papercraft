import React, { useState } from 'react';
import { Box, Grid, Slider } from '@mui/material';

function ShapeCarousel() {
  const shapeList = ['circle', 'rectangle', 'triangle', 'pentagon', 'decagon'];
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <Grid
      spacing={2}
      sx={{
        // center rows
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        {shapeList.map((value, index) => (
          <Grid key={value} item>
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
                window.addPolygonCraft(3, sliderValue);
              }}
            >
              <img
                src={`assets/${value}.svg`}
                width={50}
                height={60}
                alt={value}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
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
