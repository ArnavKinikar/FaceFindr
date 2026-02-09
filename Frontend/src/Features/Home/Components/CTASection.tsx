import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <Box component="section" sx={{ py: 12, px: 3 }}>
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: { xs: 6, md: 10 },
            textAlign: 'center',
            borderRadius: 8,
            bgcolor: 'grey.900',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background blobs */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 256,
              height: 256,
              bgcolor: 'primary.main',
              opacity: 0.2,
              borderRadius: '50%',
              filter: 'blur(64px)',
              transform: 'translate(50%, -50%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 192,
              height: 192,
              bgcolor: 'info.main',
              opacity: 0.1,
              borderRadius: '50%',
              filter: 'blur(48px)',
              transform: 'translate(-50%, 50%)',
            }}
          />

          <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, position: 'relative', zIndex: 1 }}>
            Ready to find your best moments?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'grey.400',
              mb: 5,
              fontSize: '1.1rem',
              maxWidth: 500,
              mx: 'auto',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Join thousands of users who have recovered their memories instantly with FaceFindr.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, position: 'relative', zIndex: 1 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/public/upload')}
              sx={{
                px: 5,
                py: 2,
                borderRadius: 3,
                fontWeight: 'bold',
                boxShadow: '0 8px 16px rgba(19, 127, 236, 0.3)',
              }}
            >
              Create an Album
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 5,
                py: 2,
                borderRadius: 3,
                fontWeight: 'bold',
                color: 'white',
                borderColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.3)',
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CTASection;
