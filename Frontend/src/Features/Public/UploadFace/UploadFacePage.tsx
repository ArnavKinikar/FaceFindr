import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Paper, Typography, Button, LinearProgress, Avatar, IconButton, Stack, Tooltip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const UploadFacePage = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [previews, setPreviews] = useState<string[]>([
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDwLOTQRr4izbK3YrqEPCLuI8qTSdPT7pSqVIqPi32uUFUVJiezZyrAvRjBbRLrM153pw_TXRt5nGlW3gYU-teAOoProuGGELAqq_tYagqgkX4Clf8jvfO7bWSY0NfdfsMTGgPG9MKACP35WwAUTUDwLfYQvzpCUkX9_FUOERpdL0PUJPBNIaYn3UFWBrFj4zaQ0CYXkiYloNWnX_yQJHTosW3zDFcxfE12j4IeYqBBNIpVud7_3h9z7_g_LGMXf-cFNh94f2mpbffA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAkTjrCQAPo1KhkijRUbJZBPstEEFiPXWtDfRQYKs4Rq_pdd8TM0bLre5vbKY4IKgh1LmMKv58yLRmy2RwqJe70ymfbMUiCgs6ltjhx281yay9TfX56zwO-P3QYBvt2vtWp8hyQdjRwM8PrymXYDTlC9ZbGBnYazTOPax_BThlR3pc18REdMR16GPHCZmp-ARzsJNqANTc84ZqgbjILynfUnilLOSn1uoevAe8R0GpNZcGoUohuSPoiBGr8ixmBwUneqhXY2Ec6ylM8"
  ]);

  const handleSearch = () => {
    setIsProcessing(true);
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/public/gallery');
    }, 3000);
  };

  const removePreview = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
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
        p: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 6,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            boxShadow: '0 24px 48px rgba(0,0,0,0.05)',
            textAlign: 'center',
          }}
        >
          {/* Header Section */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-0.02em', mb: 2 }}>
              Find Your Memories
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 300, fontSize: '1.125rem' }}>
              Upload a selfie to find all the photos you appear in.
            </Typography>
          </Box>

          {/* Privacy Reassurance Box */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              p: 2.5,
              borderRadius: 4,
              bgcolor: 'primary.main',
              opacity: 0.08,
              position: 'relative',
              mb: 6,
              textAlign: 'left',
            }}
          >
             {/* Text is outside the bg box to keep it readable while the box is low opacity */}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              p: 2.5,
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'primary.main',
              position: 'relative',
              mt: -11, // Offset the dummy box above
              mb: 6,
              textAlign: 'left',
              bgcolor: 'transparent',
              '&::before': {
                 content: '""',
                 position: 'absolute',
                 inset: 0,
                 bgcolor: 'primary.main',
                 opacity: 0.05,
                 zIndex: -1,
                 borderRadius: 4,
              }
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, opacity: 0.2 }}>
              <LockIcon sx={{ color: 'primary.main' }} />
            </Avatar>
            <Box sx={{ position: 'absolute', left: 30, top: 30 }}>
                <LockIcon sx={{ color: 'primary.main', fontSize: 20 }} />
            </Box>
            <Box sx={{ ml: 4 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary' }}>
                Privacy First
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.6, display: 'block' }}>
                Your selfie is only used for face matching and is never stored or shared with third parties.
              </Typography>
            </Box>
          </Box>

          {/* Upload Area */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 4,
              overflow: 'hidden',
              cursor: 'pointer',
              '&:hover .drop-zone': { borderColor: 'primary.main', bgcolor: 'rgba(19, 127, 236, 0.04)' },
              '&:hover .icon-box': { transform: 'scale(1.1)' },
            }}
          >
            <Box
              className="drop-zone"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 4,
                py: 8,
                transition: 'all 0.2s',
              }}
            >
              <Box
                className="icon-box"
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  bgcolor: 'action.hover',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s',
                }}
              >
                <AddAPhotoIcon sx={{ fontSize: 32, color: 'text.disabled' }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
                  Drag & drop or click to upload
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                  Upload 1-3 clear selfies for best results
                </Typography>
              </Box>
            </Box>
            <input
              type="file"
              accept="image/*"
              multiple
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
            />
          </Box>

          {/* Photo Previews */}
          {previews.length > 0 && (
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 5 }}>
              {previews.map((src, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <Avatar
                    src={src}
                    sx={{
                      width: 64,
                      height: 64,
                      border: '2px solid',
                      borderColor: 'primary.main',
                      p: 0.5,
                      bgcolor: 'background.paper',
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => removePreview(index)}
                    sx={{
                      position: 'absolute',
                      top: -4,
                      right: -4,
                      bgcolor: 'background.paper',
                      boxShadow: 2,
                      width: 24,
                      height: 24,
                      '&:hover': { bgcolor: 'error.main', color: 'white' },
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          )}

          {/* Progress Bar Section */}
          {(isProcessing || previews.length > 0) && (
            <Box sx={{ mt: 6, mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase' }}>
                  {isProcessing ? "Analyzing features..." : "Ready to scan"}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled' }}>
                  {isProcessing ? "75%" : "100%"}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={isProcessing ? 75 : 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'action.hover',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 3,
                    boxShadow: '0 0 10px rgba(19, 127, 236, 0.4)',
                  },
                }}
              />
            </Box>
          )}

          {/* Action Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={isProcessing}
            onClick={handleSearch}
            endIcon={!isProcessing && <ChevronRightIcon />}
            sx={{
              py: 2,
              borderRadius: 3,
              fontWeight: 800,
              fontSize: '1.125rem',
              textTransform: 'none',
              boxShadow: '0 8px 16px rgba(19, 127, 236, 0.2)',
              mt: 2,
              '&:active': { transform: 'scale(0.98)' },
            }}
          >
            {isProcessing ? "Searching..." : "Find My Photos"}
          </Button>

          {/* Secondary Help Text */}
          <Typography variant="caption" sx={{ display: 'block', mt: 4, color: 'text.disabled' }}>
            Having trouble? <Button sx={{ minWidth: 0, p: 0, textTransform: 'none', fontWeight: 800, verticalAlign: 'baseline', ml: 0.5 }}>Contact event support</Button>
          </Typography>
        </Paper>

        {/* Minimal Footer */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 500 }}>
            © 2026 FaceFindr Technologies. Premium Event Photo Discovery.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default UploadFacePage;
