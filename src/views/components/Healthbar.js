import React from 'react';
import { Box, LinearProgress } from '@mui/material';

/**
 * Shows a health bar with a buffer indicator
 * @returns {JSX.Element}
 * @constructor
 */
function Healthbar({ defaultHealth }) {
  const [health, setHealth] = React.useState(0);
  const [fullHealth] = React.useState(defaultHealth);
  const [buffer, setBuffer] = React.useState(-10);

  const progressRef = React.useRef(() => {});
  // update the current health and show a buffer for the next health (animation)
  React.useEffect(() => {
    progressRef.current = () => {
      if (window.it && window.it.health) {
        console.log('health', window.it.health, fullHealth);
        setBuffer(health);
        setHealth((window.it.health / fullHealth) * 100);
      }
    };
  });

  // update every 500ms
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

export default Healthbar;
