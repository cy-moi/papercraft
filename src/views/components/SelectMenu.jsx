import React from 'react';
import { Box, Chip } from '@mui/material';

function SelectMenu({ onSelectDashboard }) {
  // returns a select menu
  const changeData = (event) => {
    onSelectDashboard(event.target.textContent.toString());
    console.log();
  };

  return (
    <Box
      sx={{
        width: '10%',
        height: '30%',
        backgroundColor: '#1A2027',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 2,
        borderRadius: 4,
      }}
      onClick={changeData}
    >
      <Chip
        clickable
        label="Core"
        variant="outlined"
        color="primary"
        sx={{ marginBottom: '15px' }}
        onClick={changeData}
      />
      <Chip
        clickable
        label="Weapons"
        variant="outlined"
        color="primary"
        sx={{ marginBottom: '15px' }}
      />
      <Chip clickable label="Modules" variant="outlined" color="primary" />
    </Box>
  );
}

export default SelectMenu;
