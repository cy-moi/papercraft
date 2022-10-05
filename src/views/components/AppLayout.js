import React from 'react';
import ShapeCarousel from './ShapeCarousel';
import StatsCard from './StatsCard';
import SelectMenu from './SelectMenu';
import { Box, Button } from '@mui/material';

function AppLayout() {
  return (
    <>
      <Box
        // align box to the center right
        sx={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <ShapeCarousel />
      </Box>

      <Box
        // align box to the center right
        sx={{
          display: 'flex',
          position: 'fixed',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          height: '100%',
          width: '100%',
          right: '20px',
        }}
      >
        <StatsCard />
      </Box>
      <Box
        // align box to the center right
        sx={{
          position: 'fixed',
          height: '100%',
          width: '100%',
          left: '20px',
        }}
      >
        <SelectMenu />
      </Box>

      <Button
        size="large"
        color="success"
        variant="contained"
        sx={{
          // make button black
          backgroundColor: '#1A2027',
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        Start
      </Button>
    </>
  );
}

export default AppLayout;
