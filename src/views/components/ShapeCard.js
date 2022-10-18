import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

// good ol' TypeScript
// interface ShapeCardProps {
//   value: string;
//   type: string;
//   size: any;
//   radius: number;
//   sides: number;
// }

/**
 * Displays a card with a shape in it
 * @param shape follows the ShapeCardProps interface
 * @returns {JSX.Element}
 * @constructor
 */
function ShapeCard({ shape }) {
  return (
    <Grid item key={shape.value}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: 140,
          width: 120,
          backgroundColor: '#1A2027',
          transition: 'transform .2s',
          '&:hover': {
            transform: 'scale(1.25)',
          },
        }}
        onClick={() => {
          // @ts-ignore
          window.selectShape(
            shape.value,
            shape.size,
            shape.radius,
            shape.sides,
            shape.type,
          );
        }}
      >
        <img
          src={`assets/${shape.value}.svg`}
          width={50}
          height={60}
          alt={shape.value}
        />
        <Typography fontSize={8} variant="h6" component="div" color="white">
          {shape.value}
        </Typography>
      </Box>
    </Grid>
  );
}

export default ShapeCard;
