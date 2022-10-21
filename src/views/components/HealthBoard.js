import React from 'react';
import { Container, Typography } from '@mui/material';
import Healthbar from './Healthbar';
import AttackHealthbar from './AttackHealthbar';
import ControlPanel from './ControlPanel';
/**
 * Shows the current score based on the number of enemies killed
 * @returns {JSX.Element}
 * @constructor
 */
function HealthBoard({ player }) {
  return (
<Container
  sx={{
        width: '100%',
        height: '30%',
        backgroundColor: 'rgba(0,0,0,0.5);',
        display: 'flex',
        alignItems: 'end',
        flexDirection: 'row',
        padding: 2,
        borderRadius: 4
  }}
  >
    <Container
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 2,
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
    </Container>
        <ControlPanel player={player} />
    </Container>
  );
}

export default HealthBoard;
