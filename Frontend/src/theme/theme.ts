import { createTheme, type ThemeOptions } from '@mui/material/styles';

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: '#197fe6',
    },
    ...(mode === 'light'
      ? {
          // palette values for light mode
          background: {
            default: '#f8fafc',
            paper: '#ffffff',
          },
          text: {
            primary: '#0f172a',
            secondary: '#475569',
          },
        }
      : {
          // palette values for dark mode
          background: {
            default: '#101922',
            paper: '#101922',
          },
          text: {
            primary: '#f8fafc',
            secondary: '#94a3b8',
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 900,
      letterSpacing: '-0.02em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? 'rgba(16, 25, 34, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid',
          borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          boxShadow: 'none',
          color: mode === 'dark' ? '#f8fafc' : '#0f172a',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: mode === 'dark' ? "#6b6b6b #2b2b2b" : "#cfcfcf #f1f1f1",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: mode === 'dark' ? "#2b2b2b" : "#f1f1f1",
            width: '8px',
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: mode === 'dark' ? "#6b6b6b" : "#cfcfcf",
            minHeight: 24,
            border: mode === 'dark' ? "3px solid #2b2b2b" : "3px solid #f1f1f1",
          },
        },
      },
    },
  },
});

// For now, defaulting to dark as it's the "premium" look of the app
export const theme = createTheme(getDesignTokens('dark'));
export { getDesignTokens };
