import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, InputAdornment, Link as MuiLink } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AuthLayout from './AuthLayout';
import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    console.log('Attempting login with:', { email });

    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password
      });

      const { access_token } = response.data;
      console.log('Login successful, token received');
      localStorage.setItem('token', access_token);
      
      navigate('/admin/albums');
    } catch (err: any) {
      console.error('Login failed:', err);
      const detail = err.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
            size="medium"
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, px: 0.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Password
            </Typography>
            <MuiLink
              href="#"
              sx={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Forgot password?
            </MuiLink>
          </Box>
          <TextField
            fullWidth
            placeholder="••••••••"
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
        <Button
          fullWidth
          variant="contained"
          size="large"
          type="submit"
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
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In to Dashboard'}
        </Button>

        {error && (
          <Typography variant="body2" color="error" sx={{ textAlign: 'center', mt: 1 }}>
            {error}
          </Typography>
        )}

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
            <ErrorOutlineIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
              This account is for <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>album creators and event admins</Box> only. Guests do not need an account to find their photos using facial recognition.
            </Typography>
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
