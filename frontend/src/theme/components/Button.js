import { createTheme } from '@mui/material/styles';

export const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#00A8CC',
          '&:hover': {
            backgroundColor: '#0088AA',
            boxShadow: '0 2px 10px rgba(0, 168, 204, 0.4)'
          },
          '&.Mui-disabled': {
            backgroundColor: '#cccccc',
          },
        },
      },
    },
  },
});
