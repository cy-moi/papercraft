import React from 'react';
import { Box, LinearProgress } from '@mui/material';

function AttackHealthbar() {
  const [health, setHealth] = React.useState(100);
  const [buffer, setBuffer] = React.useState(-10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (window.playground.attackers && window.playground.attackers[0]) {
        // console.log('health', window.it.health);
        setBuffer(health);
        setHealth(window.playground.attackers[0].health);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

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
      }}
    >
      <LinearProgress
        variant="buffer"
        color={health < 50 ? 'error' : 'success'}
        value={health}
        valueBuffer={buffer}
        sx={{
          minHeight: '15px',
          minWidth: '500px',
          height: '100%',
          width: '100%',
          borderRadius: 0,
          marginBottom: 2,
          backgroundColor: '#dfdfdf',
          color: 'white',
        }}
      />
    </Box>
  );
}

export default AttackHealthbar;
