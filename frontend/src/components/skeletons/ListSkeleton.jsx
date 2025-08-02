import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

const ListSkeleton = ({ count = 5, height = 60 }) => {
  return (
    <Stack spacing={2}>
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderRadius: 1,
            backgroundColor: 'background.paper',
          }}
        >
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ mr: 2 }}
          />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="70%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="50%" height={16} />
          </Box>
          <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
        </Box>
      ))}
    </Stack>
  );
};

export default ListSkeleton;
