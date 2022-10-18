import React from 'react';
import { Paper, Typography } from '@mui/material';
import Healthbar from './Healthbar';
import AttackHealthbar from './AttackHealthbar';

function ScoreBoard({player}) {
  // const [shapeStats, setStats] = useState({});
  // const [attackerStats, setAttackerStats] = useState({});
  // const [timer, setTimer] = useState(0);
  // const { playground } = window;

  // useEffect(() => {
  //   setInterval(() => setTimer(timer + 1), 500);
  // });
  //
  //     (harm, cur) => harm + cur.slots.reduce((h, c) => h + c.harm, 0),
  //     0,
  //   );
  //
  //   setAttackerStats({
  //     'Total Attack': totalAttack,
  //     'Num of Attackers:': playground.attackers.length,
  //     'Total Defense': playground.attackers.reduce(
  //       (health, cur) => health + cur.health,
  //       0,
  //     ),
  //   });
  // }, [timer]);
  //

  //   if (it && it.health) {
  //     // console.log('health', window.it.health);
  //     const attack = it.weapons.reduce((harm, cur) => harm + cur.harm, 0);
  //     const s = {
  //       'Total Attack': attack,
  //       'Total Defense': it.health,
  //       'Num of Weapon': it.weapons.length,
  //     };
  //     setStats(s);
  //   }
  // }, [timer]);
  //
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
        Player Health
      </Typography>
      <Healthbar defaultHealth={player.health} />
      <Typography
        sx={{ fontSize: 16 }}
        variant="h2"
        component="div"
        color="white"
      >
        Attacker Health
      </Typography>
      <AttackHealthbar />
    </Paper>
  );
}

export default ScoreBoard;
