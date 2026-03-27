import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, InputAdornment, Link as MuiLink, Alert, Snackbar } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AuthLayout from './AuthLayout';
import { signup } from '../../Services/api';

const SignupPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signup(email, password);
      setSuccess(true);
      // Wait a bit before redirecting so user can see success message
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Box component="form" onSubmit={handleSignup} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Name Field */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mb: 1,
              display: 'block',
              px: 0.5,
            }}
          >
            Full Name
          </Typography>
          <TextField
            fullWidth
            placeholder="John Doe"
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
                borderRadius: 2,
              },
            }}
          />
        </Box>

        {/* Email Field */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mb: 1,
              display: 'block',
              px: 0.5,
            }}
          >
            Email Address
          </Typography>
          <TextField
            fullWidth
            placeholder="name@company.com"
            type="email"
            variant="outlined"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
                borderRadius: 2,
              },
            }}
          />
        </Box>

        {/* Password Field */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mb: 1,
              display: 'block',
              px: 0.5,
            }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            placeholder="Create a password"
            type="password"
            variant="outlined"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
                borderRadius: 2,
              },
            }}
          />
        </Box>

        {/* CTA Button */}
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          disabled={loading}
          sx={{
            py: 1.75,
            fontWeight: 700,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: '0 8px 16px rgba(19, 127, 236, 0.2)',
            mt: 1,
            '&:active': { transform: 'scale(0.98)' },
          }}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <Snackbar 
          open={success} 
          autoHideDuration={6000} 
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: '100%', borderRadius: 2 }}>
            Account created successfully! Redirecting...
          </Alert>
        </Snackbar>

        {/* Footer Contextual Note */}
        <Box sx={{ mt: 2, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
            }}
          >
            <VerifiedUserOutlinedIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
              By signing up, you agree to our <MuiLink href="#" sx={{ color: 'text.primary', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Terms</MuiLink> and <MuiLink href="#" sx={{ color: 'text.primary', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Privacy Policy</MuiLink>.
            </Typography>
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default SignupPage;
