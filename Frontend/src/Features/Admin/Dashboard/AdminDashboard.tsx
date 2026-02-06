import { Box, Container, Typography, Stack, Link as MuiLink } from '@mui/material';
import AlbumHero from './Components/AlbumHero';
import AlbumStats from './Components/AlbumStats';
import AdminPhotoGrid from './Components/AdminPhotoGrid';

const AdminDashboard = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Main Content Area */}
      <Container maxWidth="lg" component="main" sx={{ pt: 4, pb: 8 }}>
        {/* Page Header Section (Hero) */}
        <AlbumHero />

        {/* Stats Row */}
        <AlbumStats />

        {/* Managed Photo Grid (Uploads & Approvals) */}
        <AdminPhotoGrid />

        {/* Usage Policy/Footer Subtle Info */}
        <Box
          component="footer"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            px: 1,
            pb: 4,
            mt: 'auto',
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            © 2026 FaceFindr AI. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            {['Privacy Policy', 'GDPR Compliance', 'API Docs'].map((item) => (
              <MuiLink
                key={item}
                href="#"
                sx={{
                  color: 'text.disabled',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s',
                }}
              >
                {item}
              </MuiLink>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
