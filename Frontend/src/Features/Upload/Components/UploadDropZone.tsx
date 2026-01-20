import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadActions from './UploadActions';

const UploadDropZone = () => {
    const theme = useTheme();

    return (
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
                py: { xs: 6, md: 10 }, // Responsive padding
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

            <UploadActions />
        </Box>
    );
};

export default UploadDropZone;
