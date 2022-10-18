import React, { useEffect, useState } from 'react';
import { Divider, Paper, Typography } from '@mui/material';

/**
 * Show the selected shape's stats (attack, defense, number of weapons) in a card
 * @returns {JSX.Element}
 * @constructor
 */
function StatsCard() {
  const [shapeStats, setStats] = useState({});

  const [it, setIt] = useState(window.it);
  const [numShooter, setNumShooter] = useState(0);

  useEffect(() => {
    function handleChangeShape() {
      setIt(window.it);
      setNumShooter(window.it.weapons.length);
    }
    document.addEventListener('changeShape', handleChangeShape);

    return (_) => {
      document.removeEventListener('changeShape', handleChangeShape);
    };
  });

  React.useEffect(() => {
    // const { it } = window;
    if (it && it.health) {
      // console.log('health', window.it.health);
      const attack = it.weapons.reduce((harm, cur) => harm + cur.harm, 0);
      const s = {
        'Total Attack': attack,
        'Total Defence': it.health,
        'Num of Weapon': it.weapons.length,
      };
      setStats(s);
    }
  }, [it, numShooter]);

  return (
    <Paper
      sx={{
        width: '100%',
        height: '30%',
        backgroundColor: '#1A2027',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        borderRadius: 4,
      }}
    >
      <Typography
        sx={{ fontSize: 16 }}
        variant="h2"
        component="div"
        color="white"
      >
        Player Stats
      </Typography>

      <Divider
        sx={{
          width: '80%',
          height: '1px',
          backgroundColor: 'white',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      />

      {/* iterate through stats and print as typosgraphy */}
      {Object.keys(shapeStats).map((key, index) => (
        <Typography
          sx={{ fontSize: 10 }}
          variant="h6"
          component="div"
          color="white"
          key={index.toString()}
        >
          {key} :{shapeStats[key]}
        </Typography>
      ))}
    </Paper>
  );
}

export default StatsCard;
