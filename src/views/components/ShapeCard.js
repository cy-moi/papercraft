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
          gap: 1,
          backgroundColor: '#1A2027',
          transition: 'transform .2s',
          '&:hover': {
            transform: 'scale(1.25)',
          },
        }}
        onClick={async () => {
          // @ts-ignore
          const { size, radius, sides, type, health } = shape;
          const { playground, addCraft } = window;
          await addCraft({
            id: 'actor',
            model: 'MobileShape',
            host: playground,
            type,
            position: {
              x: 500,
              y: 500,
            },
            size,
            sides,
            health,
            radius,
            isStatic: false,
            debug: true,
          });
        }}
      >
        <img
          src={`assets/${shape.value.toLowerCase()}.svg`}
          width={50}
          height={60}
          alt={shape.value}
        />
        <Typography fontSize={12} variant="h5" component="div" color="white">
          {shape.value}
        </Typography>
        <Typography fontSize={9} variant="h6" component="div" color="white">
          {`health: ${shape.health}`}
        </Typography>
      </Box>
    </Grid>
  );
}

export default ShapeCard;
