import React from 'react';
import { Box, Typography } from '@mui/material';

interface UploadHeaderProps {
    title: string;
    description: string;
}

const UploadHeader: React.FC<UploadHeaderProps> = ({ title, description }) => {
    return (
        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    mb: 2,
                    color: 'text.primary',
                    fontSize: { xs: '1.75rem', md: '2.25rem' } // Slightly smaller on mobile
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '1rem', md: '1.125rem' }, // Responsive font size
                    maxWidth: '600px',
                    mx: 'auto',
                    px: 2 // Prevent edge touching on small screens
                }}
            >
                {description}
            </Typography>
        </Box>
    );
};

export default UploadHeader;
