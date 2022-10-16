import React, { useState } from 'react';
import ShapeCarousel from './ShapeCarousel';
// import StatsCard from './StatsCard';
import SelectMenu from './SelectMenu';
import { Box, Button } from '@mui/material';
import WeaponCarousel from './WeaponCarousel';
import StatsCard from './StatsCard';

function AppLayout() {
  const [dashboard, setDashboard] = useState('Core');

  const changeSession = (e) => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('changeSession', true, true);
    event.eventName = 'changeSession';
    document.dispatchEvent(event);
  };

  return (
    <>
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

      <Box
        // align box to the center right
        sx={{
          display: 'flex',
          position: 'fixed',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          height: '100%',
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
          left: '20px',
        }}
      >
        <SelectMenu onSelectDashboard={setDashboard} />
      </Box>

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
    </>
  );
}

export default AppLayout;
