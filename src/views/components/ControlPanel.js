import React, {useEffect, useState} from 'react';
import { Typography, CircularProgress, Box} from '@mui/material';

function ControlPanel({player}) {
  
  const [dir, setDir] = useState(player.steerDeg / 360 * 100);
  const [speed, setSpeed] = useState(player.speed);

  // update every 500ms
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDir(window.it.steerDeg / 360 * 100 );
      setSpeed(window.it.speed);
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []); 
 
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: 4
      }}
    >
      <Typography
        sx={{ fontSize: 16 }}
        variant="h2"
        component="div"
        color='white'
      >Steer</Typography>


      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={dir}

      />
        <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{ fontSize: 16 }}
          variant="h2"
          component="div"
          color='white'
        >{`${Math.floor(dir)}°`}</Typography>
      </Box>
      </Box>
      <Typography
        sx={{ fontSize: 16 }}
        variant="h2"
        component="div"
        color='white'
      >Speed: {speed}</Typography>
    </Box>
  );

}

export default ControlPanel;
