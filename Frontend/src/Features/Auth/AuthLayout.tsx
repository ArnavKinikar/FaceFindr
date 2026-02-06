import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Box, Typography, Paper, Tab, Tabs, Link as MuiLink } from '@mui/material';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/auth/login';

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      navigate('/auth/login');
    } else {
      navigate('/auth/signup');
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient Background */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(19, 127, 236, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header Logo Area */}
      <Box component="header" sx={{ mb: 8, textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: 'primary.main',
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 8px 16px rgba(19, 127, 236, 0.2)',
            }}
          >
            <FaceRetouchingNaturalIcon sx={{ fontSize: 30 }} />
          </Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              mt: 2,
              color: 'text.primary',
            }}
          >
            FaceFindr
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: 'text.disabled',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Admin Portal
          </Typography>
        </Box>
      </Box>

      {/* Authentication Card */}
      <Box component="main" sx={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 10 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            bgcolor: 'background.paper',
          }}
        >
          {/* Tabs System */}
          <Tabs
            value={isLogin ? 0 : 1}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              '& .MuiTab-root': {
                py: 2,
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'none',
              },
            }}
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>

          {/* Form Content */}
          <Box sx={{ p: 4 }}>
            {children}
          </Box>
        </Paper>

        {/* External Link */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            Are you a guest?
            <MuiLink
              component={Link}
              to="/album"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Find your photos <ArrowForwardIcon sx={{ fontSize: 16, ml: 0.5 }} />
            </MuiLink>
          </Typography>
        </Box>
      </Box>

      {/* Design Visual Element (Bottom Right) */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          display: { xs: 'none', lg: 'block' },
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 192,
            height: 128,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            boxShadow: 10,
            opacity: 0.5,
          }}
        >
          <Box
            component="img"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb1EFuJbgsCujf_ZVS2bUK5jU8gVLGE48aBimYlFtBtooGUG3fvnh5w402jKgexb-m3CFchTREGWa8cOlZWX83g-R6J6-dxFNcSneM5G3MRoknmWGsttVWxAen5DAi3h4uT2jfQrX6_bcyy24XnBna4YFB3p-lyrbjhuB3SwE_3aT0cXEQTyqW9Lyhu-ObTC2n-IIBxjRQ4uHz8z47MPnON3SkGCApE9SNridDUyx_KKeHZ9KWt7ItN6ShFt3LM_TFE8MYdtRmZT27"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
              display: 'flex',
              alignItems: 'flex-end',
              p: 1.5,
            }}
          >
            <Typography variant="caption" sx={{ color: 'white', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px' }}>
              Premium Events
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
