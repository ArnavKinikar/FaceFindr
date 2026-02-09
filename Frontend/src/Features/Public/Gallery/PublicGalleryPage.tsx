import { useState, useEffect } from 'react';
import { fetchYourPhotos, fetchAllPhotos } from '../../../Services/api';
import type { Photo } from '../../../Services/api';
import { Box, Container, Typography, Tab, Tabs, Paper, IconButton, CircularProgress, Button, Stack, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

const PublicGalleryPage = () => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState(0); // 0 for mine, 1 for all
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      try {
        const data = viewMode === 0 ? await fetchYourPhotos() : await fetchAllPhotos();
        setPhotos(data);
      } catch (error) {
        console.error("Failed to load photos", error);
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, [viewMode]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setViewMode(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background-color 0.3s',
      }}
    >
      <Container maxWidth="xl" component="main" sx={{ flex: 1, py: 6 }}>
        {/* Hero Title & Count */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            justifyContent: 'space-between',
            gap: 4,
            mb: 8,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: 'inline-flex',
                px: 1.5,
                py: 0.5,
                borderRadius: 5,
                bgcolor: 'primary.main',
                color: 'white',
                opacity: 0.15,
                mb: 2,
              }}
            >
               {/* Wrapper for text color */}
            </Box>
            <Box sx={{ position: 'relative', mt: -5, mb: 1, display: 'inline-block' }}>
                <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'primary.main' }}>
                    Facial Recognition Result
                </Typography>
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 1 }}>
              Found You!
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
              We discovered <Box component="span" sx={{ color: 'text.primary', fontWeight: 800 }}>{photos.length} photos</Box> of you from the <Box component="span" sx={{ fontStyle: 'italic' }}>Miller-Chen Wedding</Box>.
            </Typography>
          </Box>

          {/* Toggle Switch (Tabs) */}
          <Paper
            elevation={0}
            sx={{
              p: 0.5,
              borderRadius: 3,
              bgcolor: 'action.hover',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Tabs
              value={viewMode}
              onChange={handleTabChange}
              sx={{
                minHeight: 0,
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
                '& .MuiTab-root': {
                  minHeight: 40,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  color: 'text.secondary',
                  transition: 'all 0.2s',
                  '&.Mui-selected': {
                    bgcolor: 'background.paper',
                    color: 'primary.main',
                    boxShadow: 1,
                  },
                },
              }}
            >
              <Tab label="My Photos" />
              <Tab label="Event Gallery" />
            </Tabs>
          </Paper>
        </Box>

        {/* Photo Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
            <CircularProgress thickness={5} size={48} />
          </Box>
        ) : (
          <Box
            sx={{
              columnCount: { xs: 1, sm: 2, md: 3, lg: 4 },
              columnGap: 2,
              '& > div': {
                breakInside: 'avoid',
                mb: 2,
              },
            }}
          >
            {photos.map((photo) => (
              <Box
                key={photo.id}
                sx={{
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  bgcolor: 'action.hover',
                  cursor: 'pointer',
                  '&:hover img': { transform: 'scale(1.05)' },
                  '&:hover .overlay': { opacity: 1 },
                }}
              >
                <Box
                  component="img"
                  src={photo.src}
                  alt={photo.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 2,
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(8px)',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.main', color: 'text.primary' },
                      }}
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(8px)',
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                      }}
                    >
                      <ZoomInIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Load More or End State */}
        {!loading && photos.length > 0 && (
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.disabled', fontStyle: 'italic', mb: 3 }}>
              Showing all {photos.length} matches found for your profile
            </Typography>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                borderColor: 'divider',
                color: 'text.secondary',
                '&:hover': { bgcolor: 'action.hover', borderColor: 'text.disabled' },
              }}
            >
              Refresh Results
            </Button>
          </Box>
        )}
      </Container>

      {/* Fixed Bottom Action Bar for Mobile */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'sticky',
          bottom: 0,
          width: '100%',
          p: 2,
          bgcolor: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid',
          borderColor: 'divider',
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<DownloadForOfflineIcon />}
          sx={{
            height: 56,
            borderRadius: 3,
            fontWeight: 800,
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: '0 8px 32px rgba(19, 127, 236, 0.3)',
          }}
        >
          Download All ({photos.length})
        </Button>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          py: 6,
          mt: 8,
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ opacity: 0.5 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: 'text.primary',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'background.default',
                }}
              >
                <FaceRetouchingNaturalIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                PhotoFinder AI
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'center' }}>
              © 2026 FaceFindr discovery engine. All photographs are property of the event organizers.
            </Typography>
            <Stack direction="row" spacing={3}>
              <Button
                sx={{
                  minWidth: 0,
                  p: 0,
                  fontSize: '0.75rem',
                  color: 'text.disabled',
                  textTransform: 'none',
                  textDecoration: 'underline',
                  '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                }}
              >
                Privacy Policy
              </Button>
              <Button
                sx={{
                  minWidth: 0,
                  p: 0,
                  fontSize: '0.75rem',
                  color: 'text.disabled',
                  textTransform: 'none',
                  textDecoration: 'underline',
                  '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                }}
              >
                Terms of Service
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default PublicGalleryPage;
