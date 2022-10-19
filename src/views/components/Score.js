import React from 'react';
import { Box } from '@mui/material';

function ScoreCard() {
  const [score, setScore] = React.useState(0);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (window.it && window.it.score) {
        setScore(window.it.score);
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
        // fixed on top right corner of the screen
        position: 'fixed',
        display: 'flex',
        direction: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        top: 20,
        left: 20,
        width: 100,
        height: 100,
        color: 'white',
        bold: 'bold',
        fontSize: '2rem',
        borderRadius: 5,
        backgroundColor: '#1A2027',
      }}
    >
      {score}
    </Box>
  );
}

export default ScoreCard;
