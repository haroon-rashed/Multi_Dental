import React from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

export const BrandLogo = () => {
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  return (
    <Typography
      variant={is480 ? "h6" : "h5"}
      noWrap
      component={Link}
      to="/"
      sx={{
        mr: 2,
        display: "flex",
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".1rem",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      MULTI DENTAL SUPPLY
    </Typography>
  );
};
