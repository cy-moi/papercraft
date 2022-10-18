import React, { useState } from 'react';
import ShapeCarousel from './ShapeCarousel';
// import StatsCard from './StatsCard';
import SelectMenu from './SelectMenu';
import { changeSession } from 'Src/utils/events';
import { Box, Button } from '@mui/material';
import WeaponCarousel from './WeaponCarousel';
import StatsCard from './StatsCard';

function AppLayout() {
  const [dashboard, setDashboard] = useState('Core');

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
        {/* select menu */}
        {dashboard === 'Core' && <ShapeCarousel />}
        {dashboard === 'Weapons' && <WeaponCarousel />}
      </Box>

      <Box
        sx={{
          position: 'fixed',
          height: '100%',
          right: '20px',
          marginRight: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <StatsCard />
      </Box>
      <Box
        // align box to the vertical center right
        sx={{
          position: 'fixed',
          height: '100%',
          left: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <SelectMenu onSelectDashboard={setDashboard} />
      </Box>

      <Button
        size="large"
        color="success"
        variant="contained"
        onClick={changeSession}
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
