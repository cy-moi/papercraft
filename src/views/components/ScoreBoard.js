import React, { useEffect, useState } from 'react';
import { Divider, Paper, Typography } from '@mui/material';

/**
 * Shows the current score based on the number of enemies killed
 * @returns {JSX.Element}
 * @constructor
 */
function ScoreBoard() {
  const [shapeStats, setStats] = useState({});
  const [attackerStats, setAttackerStats] = useState({});
  const [timer, setTimer] = useState(0);
  const { playground } = window;

  useEffect(() => {
    setInterval(() => setTimer(timer + 1), 500);
  });

  useEffect(() => {
    const totalAttack = playground.attackers.reduce(
      (harm, cur) => harm + cur.slots.reduce((h, c) => h + c.harm, 0),
      0,
    );

    setAttackerStats({
      'Total Attack': totalAttack,
      'Num of Attackers:': playground.attackers.length,
      'Total Defense': playground.attackers.reduce(
        (health, cur) => health + cur.health,
        0,
      ),
    });
  }, [timer]);

  useEffect(() => {
    const { it } = window;
    if (it && it.health) {
      // console.log('health', window.it.health);
      const attack = it.weapons.reduce((harm, cur) => harm + cur.harm, 0);
      const s = {
        'Total Attack': attack,
        'Total Defense': it.health,
        'Num of Weapon': it.weapons.length,
      };
      setStats(s);
    }
  }, [timer]);

  return (
    <Paper
      sx={{
        width: '100%',
        height: '30%',
        backgroundColor: '#1A2027',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
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

      <Typography
        sx={{ fontSize: 16 }}
        variant="h2"
        component="div"
        color="white"
      >
        Attacker Stats
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
      {Object.keys(attackerStats).map((key, index) => (
        <Typography
          sx={{ fontSize: 10 }}
          variant="h6"
          component="div"
          color="white"
          key={index.toString()}
        >
          {key} :{setAttackerStats[key]}
        </Typography>
      ))}
    </Paper>
  );
}

export default ScoreBoard;
