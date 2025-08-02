import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          sx={{
            maxWidth: 345,
            m: 1,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ borderRadius: '8px 8px 0 0' }}
          />
          <CardContent>
            <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Skeleton variant="text" width="40%" height={28} />
              <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 1 }} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default CardSkeleton;
