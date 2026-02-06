import { Box, Container, Typography, Paper, Avatar, Grid } from '@mui/material';
import { CameraAlt, Search, CloudDownload } from '@mui/icons-material';

const steps = [
  {
    icon: <CameraAlt fontSize="large" />,
    title: 'Upload a Selfie',
    description: 'Snap or upload a clear photo of yourself to begin the discovery process across thousands of photos.',
  },
  {
    icon: <Search fontSize="large" />,
    title: 'AI Scans Gallery',
    description: 'Our advanced facial recognition identifies you across the entire event gallery in a matter of seconds.',
  },
  {
    icon: <CloudDownload fontSize="large" />,
    title: 'Download Memories',
    description: 'Access your personalized gallery and download your high-resolution memories to share instantly.',
  },
];

const HowItWorksSection = () => {
  return (
    <Box component="section" sx={{ py: 15, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
            Relive the moments that matter
          </Typography>
          <Box sx={{ width: 48, h: 4, bgcolor: 'primary.main', mx: 'auto', borderRadius: 2 }} />
        </Box>

        <Grid container spacing={6}>
          {steps.map((step, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  textAlign: 'center',
                  bgcolor: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: 4,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'),
                    borderColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
                    boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(19, 127, 236, 0.15)' : 'rgba(19, 127, 236, 0.1)'),
                    mx: 'auto',
                    mb: 4,
                    color: 'primary.main',
                  }}
                >
                  {step.icon}
                </Avatar>

                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                  {step.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
