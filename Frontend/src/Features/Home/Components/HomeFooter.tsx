import { Box, Container, Typography, Stack, Link as MuiLink, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const HomeFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        pt: 10,
        pb: 6,
        px: 3,
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
        >
          <Stack alignItems={{ xs: 'center', md: 'flex-start' }} spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: 'primary.main',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                FaceFindr
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Discovering memories with precision.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={4}>
            {['Privacy', 'Terms', 'Security', 'Contact'].map((item) => (
              <MuiLink
                key={item}
                component={Link}
                to={`/${item.toLowerCase()}`}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {item}
              </MuiLink>
            ))}
          </Stack>

          <Typography variant="caption" color="text.disabled">
            © 2026 FaceFindr AI. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomeFooter;
