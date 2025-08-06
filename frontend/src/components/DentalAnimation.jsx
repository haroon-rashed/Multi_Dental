import React from 'react';
import Lottie from 'lottie-react';
import { Box } from '@mui/material';
import { dentalToolsAnimation } from '../assets';

const DentalAnimation = ({ width = '100%', height = 'auto' }) => {
  return (
    <Box 
      sx={{ 
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        '& > div': {
          width: '100% !important',
          height: 'auto !important'
        }
      }}
    >
      <Lottie
        animationData={dentalToolsAnimation}
        loop={true}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block'
        }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice'
        }}
      />
    </Box>
  );
};

export default DentalAnimation;
