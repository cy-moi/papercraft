import React from 'react';
import { Box, LinearProgress } from '@mui/material';

/**
 * Shows a health bar with a buffer indicator
 * @returns {JSX.Element}
 * @constructor
 */
function Healthbar() {
  const [health, setHealth] = React.useState(100);
  const [buffer, setBuffer] = React.useState(-10);

  const progressRef = React.useRef(() => {});
  // update the current health and show a buffer for the next health (animation)
  React.useEffect(() => {
    progressRef.current = () => {
      if (window.it && window.it.health) {
        setBuffer(health);
        setHealth(window.it.health);
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
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        variant="buffer"
        color={health < 50 ? 'error' : 'success'}
        value={health}
        valueBuffer={buffer}
        sx={{
          height: 15,
          width: 600,
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
