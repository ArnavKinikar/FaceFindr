import React from 'react';
import { Box, Typography, Button, Paper, Stack, Container, useTheme, alpha } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import LockIcon from '@mui/icons-material/Lock';

const UploadPage = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                py: { xs: 6, md: 10 }
            }}
        >
            <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* Headline and Body */}
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            mb: 2,
                            color: 'text.primary',
                            fontSize: { xs: '2rem', md: '2.25rem' }
                        }}
                    >
                        Upload your first photo
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '1.125rem',
                            maxWidth: '600px',
                            mx: 'auto'
                        }}
                    >
                        Welcome! To get started with your professional gallery, please upload or capture a high-resolution photo.
                    </Typography>
                </Box>

                {/* Upload Zone Container */}
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 3,
                        bgcolor: theme.palette.mode === 'dark' ? '#1a2632' : '#fff', // From provided HTML colors
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'divider',
                        transition: 'all 0.3s ease',
                        boxShadow: 6
                    }}
                >
                    {/* Hover Area / Drop Zone */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 4,
                            borderRadius: 3,
                            border: '2px dashed',
                            borderColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.5) : 'grey.300',
                            bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.05) : 'grey.50',
                            px: 3,
                            py: 10,
                            cursor: 'pointer',
                            transition: 'border-color 0.2s',
                            '&:hover': {
                                borderColor: 'primary.main'
                            }
                        }}
                    >
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <CloudUploadIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                        </Box>

                        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.015em', color: 'text.primary' }}>
                                Drag and drop your files here
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Maximum file size: 10MB. Formats: JPG, PNG, WEBP
                            </Typography>
                        </Box>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: '100%', maxWidth: 400, mt: 1 }}>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<UploadFileIcon />}
                                fullWidth
                                sx={{
                                    height: 48,
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.39)}`
                                }}
                            >
                                Select File
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<CameraAltIcon />}
                                fullWidth
                                sx={{
                                    height: 48,
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    bgcolor: theme.palette.mode === 'dark' ? '#233648' : 'grey.200',
                                    color: theme.palette.mode === 'dark' ? '#fff' : '#111a22',
                                    '&:hover': {
                                        bgcolor: theme.palette.mode === 'dark' ? '#2d465d' : 'grey.300',
                                    },
                                    boxShadow: 'none'
                                }}
                            >
                                Take Photo
                            </Button>
                        </Stack>
                    </Box>
                </Paper>

                {/* Footer Meta */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={4}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: 4, color: 'text.secondary', fontSize: '0.875rem' }}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <VerifiedUserIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>Secure Transfer</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <HighQualityIcon sx={{ color: '#2196f3', fontSize: 20 }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>HD Processing</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <LockIcon sx={{ color: '#9c27b0', fontSize: 20 }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>Private & Encrypted</Typography>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default UploadPage;