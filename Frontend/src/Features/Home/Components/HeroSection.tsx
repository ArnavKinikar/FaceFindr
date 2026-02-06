import { Box, Container, Typography, Chip, Grid } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 10, md: 15 },
        pb: { xs: 12, md: 20 },
        px: 3,
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at top left, #1a237e 0%, #101922 50%, #283593 100%)'
            : 'radial-gradient(circle at top left, #f0f7ff 0%, #ffffff 50%, #fdf2f8 100%)',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Chip
          label="AI-Powered Facial Recognition"
          color="primary"
          size="small"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            bgcolor: 'primary.main',
            opacity: 0.9,
          }}
        />
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4.5rem' },
            fontWeight: 900,
            lineHeight: 1.1,
            mb: 4,
            color: 'text.primary',
          }}
        >
          Find yourself in event photos using AI
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            color: 'text.secondary',
            mb: 6,
            maxWidth: '650px',
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Upload a selfie to instantly discover every photo you appear in across the entire event gallery. No more manual scrolling.
        </Typography>

        {/* Decorative Elements */}
        <Grid
          container
          spacing={3}
          sx={{
            position: 'absolute',
            bottom: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '1100px',
            opacity: 0.2,
            filter: 'blur(2px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        >
          <Grid size={{ xs: 4 }}>
            <Box
              component="img"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuACgNO9NNcLjHTb-jVBbL6j-OIR-7LfpwkOktNmOtpEoMLODllk-0GspXSMcBAcdedQMGL26DxeC0_w4PM0ynnblh9VnZ-vI-6IVrx-WOme9FBIgBKFfkkERyUUe-mZJGFl_9DbMLltVXTXdP7-qjQMD-ZAOgL2WJg7FxItTD6xERblgyNHvGZL8uUuul7mjHxrzMV5ZULP8qsHtvDxXgHfmQiZPi3GUTNAH86ctFZZALGgYcJX08wbQ4ikfxzdGuExbYj2c9CEq19u"
              sx={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 4, transform: 'translateY(40px)' }}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Box
              component="img"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUxT_XF50uFfWT5sT0gceh6HKMmlnzsD64YgnzQaw1_QAdzRNuln1csgZx8AGJBiAdQXvDyISGEkuLJC6A6HfwxmFCdyTp8yVYP9fQ9TgQEUVfIRxFwh4Zy9wCHrVZ7vcBZznwCJFF5D6wYN7rf-LUf-7IzDvtd-1Sh44Z1OXUPZu6Tn5kSVpgffQGQ_zRFNjcs1-Qzg06nLl_UnMsz3WuMkfiZr_3_KRwD69Tvwg6mPAL6IF7YFp_9Ax4ETYaVvXEUbTowP9bE63r"
              sx={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 4, transform: 'translateY(80px)' }}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Box
              component="img"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC642FJMdehQ12CY4wDfDsJvjnNLoVN87nv0JdiQ2CN8gLdFDHHHX5D8-lsSvJ3vJAqtMqTd_vvGZW4qIjAVPOHt4eWYQuVCFxBj14bt-lX5kfWzV7qFRAT2AIvxg5IC3Xn4dV7qi8kpAe_R3-lSbFtkCFczbDp5-ZOcdAostp0CL61WmxnXfqGhUv0QmaWMZ_GD3sAsrWWZJ6kLmT9oQqpTWHczJVqadHhHTGQf_Y_iv1QkplvyPxImf9CNx2k-XeI__w9LIO3xkI5"
              sx={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 4, transform: 'translateY(40px)' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
