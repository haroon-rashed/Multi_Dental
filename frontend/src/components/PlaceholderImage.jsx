import React from 'react';
import { Box, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

const PlaceholderImage = ({ width = '100%', height = '300px', text = 'No Image Available' }) => {
  return (
    <Box
      sx={{
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        color: '#9e9e9e'
      }}
    >
      <ImageIcon sx={{ fontSize: 48, mb: 1 }} />
      <Typography variant="body2" color="inherit">
        {text}
      </Typography>
    </Box>
  );
};

export default PlaceholderImage;
