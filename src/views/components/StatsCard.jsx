import React from 'react';
import { Divider, Paper, Typography } from '@mui/material';

function StatsCard() {
  const stats = {
    'Total Attack': 100,
    'Total Defence': 100,
    'Fire Rate': 50,
  };

  return (
    <Paper
      sx={{
        width: '10%',
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
      {Object.keys(stats).map((key, index) => (
        <Typography
          sx={{ fontSize: 10 }}
          variant="h6"
          component="div"
          color="white"
          key={index.toString()}
        >
          {key}
          {' '}
          :
          {stats[key]}
        </Typography>
      ))}
    </Paper>
  );
}

export default StatsCard;
