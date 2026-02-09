import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Paper, Stack } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import GridViewIcon from '@mui/icons-material/GridView';
import UploadIcon from '@mui/icons-material/Upload';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MemoryIcon from '@mui/icons-material/Memory';
import React from 'react';

const AlbumLandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        transition: 'colors 0.3s',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}
    >
      <Container maxWidth="xl" component="main" sx={{ flex: 1, pt: 12, pb: 10 }}>
        {/* Event Identity */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: { xs: '3rem', md: '4.5rem' },
              fontWeight: 500,
              mb: 2,
              color: 'text.primary',
            }}
          >
            The Miller-Chen Wedding
          </Typography>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 800,
              letterSpacing: '0.2em',
              fontSize: '0.875rem',
              mb: 3,
              display: 'block',
            }}
          >
            September 24, 2024 • San Francisco, CA
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              fontSize: '1.125rem',
              color: 'text.secondary',
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            A celebration of love and laughter. We’ve captured so many beautiful moments, and we want to share every smile, dance, and candid joy with you.
          </Typography>
        </Box>

        {/* Call to Action Buttons */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 8 }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<PhotoCameraIcon />}
            onClick={() => navigate('/upload-face')}
            sx={{
              px: 4,
              py: 2,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: '1.125rem',
              boxShadow: '0 8px 24px rgba(19, 127, 236, 0.25)',
              textTransform: 'none',
              '&:active': { transform: 'scale(0.95)' },
            }}
          >
            Find My Photos
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<GridViewIcon />}
            onClick={() => navigate('/public/gallery')}
            sx={{
              px: 4,
              py: 2,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: '1.125rem',
              textTransform: 'none',
              borderColor: 'divider',
              color: 'text.primary',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'transparent' },
              '&:active': { transform: 'scale(0.95)' },
            }}
          >
            View Full Gallery
          </Button>
        </Stack>

        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Button
            variant="text"
            startIcon={<UploadIcon />}
            onClick={() => navigate('/public/upload')}
            sx={{
              color: 'text.secondary',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
              '& .underline': { fontWeight: 800, textDecoration: 'underline', ml: 0.5 },
            }}
          >
            Have your own shots? <Box component="span" className="underline">Upload Your Photos</Box>
          </Button>
        </Box>

        {/* Visual Collage Section */}
        <Grid container spacing={3} sx={{ height: { xs: 400, md: 600 }, mb: 12 }}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                '&:hover img': { transform: 'scale(1.05)' },
                '&:hover .overlay': { bgcolor: 'transparent' },
              }}
            >
              <Box className="overlay" sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.1)', transition: 'background 0.5s', zIndex: 1 }} />
              <Box
                component="img"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6skfkKkP2tFwBQDxzee_Iqtx71syJKoefL2S-VmjCi17BLivMEnSWB5Jsg7_PHt4geg13ygQ2yWcJMp8kPf-slBzQIDFENlhOxQ0mLUmoeFsQXkfzVbA8lb3ZR0KOzsvY-4A_HYyBV5nkJhLWbx0rVPuPLaNTBb5BsI12dt3oobWNIS0keEBTbS4Khy6AGpsCnhltlbfmqXdw--lNQYTuD0hwXaQZp4kE1DRWP-tZ0ZOFTb1sAfZl3KUUoHJF0Vd3sxS82cse0cWb"
                sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Stack spacing={3} sx={{ height: '100%' }}>
              <Box sx={{ flex: 1, borderRadius: 4, overflow: 'hidden' }}>
                <Box
                  component="img"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5BOLoOLHb8oR-dP-mfRwWvldCeqBxxaPBTXEgAVEvkpap2KM7Xsm-4kU8i59wTfa5O9rsexF4Gwxov_OP9fg547lL_JTLwxLLwSfyr5VpqsXo9HZUceMimeCTXxMJJnFCph5m6753IeTLivJOj-j2BEE_coFoTRHLT4dU1mL2j8o54V7y1C6V6FsTeXvJQkKmpA2xJJ3Sf-BhEsRZIW1c0b756JID4O3YSGisr2rmFtQGDxVDfuND0Oqtk4cLTCxUs2XfKG0rmci7"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              <Box sx={{ flex: 1, borderRadius: 4, overflow: 'hidden' }}>
                <Box
                  component="img"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyFxCvG14WP4EYIaXavIopvVXkQJBzYGvZ3qCzU-FH5a9pEJFGrhyqILW6_deTlV1dDoWopId8uvhHSB0Vxc0E_8xa4a1gaaYtkdasUCQ72_bkBlTr4h_1t9GXpFxAu7I58BYhTC6M29WHwNIRNqcTjPzez_x4mevOYyWb3sQVvg-c4ng43hnP1U1b7PAkMMQGjHPO-4GOCTeurNnHSRVTLdhPKY91TMox5bPCe_6elFP8T_tx7f8W_3YorbYpzeRdVjmCbEOZhgdl"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ width: '100%', height: '100%', borderRadius: 4, overflow: 'hidden' }}>
              <Box
                component="img"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQYrXzXQTV-_uaP8M3J4XFjqbWLB5clrRITIfXlITuiKw3wjcc6NWa1Qm4SQajfDXLgIPMU1qUVLgfPd3S3e-ATxCwD4tJQlRUymawWgfNBQfmLJMP8wJX_pJB8CzMJ8ObnIVXkgerQgKqz13ztvzG0iXOTmganXoPWIq0sjcR0TE1j0CkV74tK97plluhsdGi9TfgxiD1nRx8K8321GsppvP9h4vUv_O_ncbTv89sgkKHFFN4ygLVSK0LP-Q1M0voQen7rVz8Uil"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Stack spacing={3} sx={{ height: '100%' }}>
              <Box sx={{ flex: 2, borderRadius: 4, overflow: 'hidden' }}>
                <Box
                  component="img"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGqJyMlYMUQ-KdfIm58KMgppDbjqZ9Kfu0_yEOmhHrNPwxAHOrezcMnsuI6B12qunLcKpokjJ9hxiRcFVUTpaMKmZs4MhAQL-jQ9TB-FL1l5tlEga_TSsElptsxNNekBBy2HGh32elkxKg-Xx80dFh2pLvVVaAEBLTuL7QulLmfthtTQ2fA4l6JSsNgtpwkO-ZPagIs-8okQ6QZPMkKZ0dHJKqprYjJvoUIjb0d0wcu5FmXwO1_pQuSQl7jeJwFRAHI1Ji4DGEO6Ar"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  borderRadius: 4,
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 800 }}>+240</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Magic Discovery Section */}
        <Paper
          elevation={0}
          sx={{
            py: 8,
            px: { xs: 3, md: 6 },
            borderRadius: 8,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
            backdropFilter: 'blur(8px)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.5rem',
              mb: 1,
              color: 'text.primary',
            }}
          >
            Magic Discovery
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 8 }}>
            Powered by advanced facial recognition technology
          </Typography>

          <Grid container spacing={6}>
            {[
              { icon: <AddAPhotoIcon />, title: 'Snap a Selfie', desc: 'Simply upload a quick selfie from your phone’s camera roll.' },
              { icon: <PsychologyIcon />, title: 'AI Scanning', desc: 'Our AI scans thousands of event photos to find your unique face.' },
              { icon: <AutoAwesomeIcon />, title: 'Get Your Moments', desc: 'Instantly see every photo you\'re in. Download or share them directly.' },
            ].map((step, idx) => (
              <Grid size={{ xs: 12, md: 4 }} key={idx}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      opacity: 0.15,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    {/* Re-rendering icon without opacity for clarity */}
                  </Box>
                  <Box sx={{ position: 'relative', mt: -11, mb: 3, color: 'primary.main' }}>
                    {React.cloneElement(step.icon as any, { sx: { fontSize: 32 } })}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 220 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              mt: 8,
              p: 2,
              px: 4,
              borderRadius: 3,
              display: 'inline-block',
              border: '1px solid',
              borderColor: 'primary.main',
              bgcolor: 'rgba(19, 127, 236, 0.05)',
              color: 'text.secondary',
              fontSize: '0.875rem',
              fontStyle: 'italic',
              fontWeight: 500,
            }}
          >
            "Safe, private, and secure. We only use your selfie to find your event photos."
          </Box>
        </Paper>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          py: 6,
          px: { xs: 3, md: 8 },
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
          >
            <Stack direction="row" spacing={4}>
              {['Privacy Policy', 'Terms of Service', 'Support'].map((link) => (
                <Button
                  key={link}
                  variant="text"
                  sx={{
                    color: 'text.disabled',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                  }}
                >
                  {link}
                </Button>
              ))}
            </Stack>
            <Stack direction="column" alignItems={{ xs: 'center', md: 'flex-end' }} spacing={0.5}>
              <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 500 }}>
                Powered by
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ opacity: 0.6 }}>
                <MemoryIcon sx={{ fontSize: 18 }} />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase' }}
                >
                  EVENTSCAN AI
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: 4,
              color: 'text.disabled',
              letterSpacing: '0.05em',
              fontSize: '10px',
              textTransform: 'uppercase',
            }}
          >
            © 2026 FaceFindr Technologies. All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default AlbumLandingPage;
