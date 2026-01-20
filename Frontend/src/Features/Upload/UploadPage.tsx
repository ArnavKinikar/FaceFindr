import React from 'react';
import { Box, Container } from '@mui/material';
import UploadHeader from './Components/UploadHeader';
import UploadCard from './Components/UploadCard';
import UploadSecurityFeatures from './Components/UploadSecurityFeatures';

const UploadPage = () => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                py: { xs: 4, md: 10 } // Optimized padding for mobile (xs: 4)
            }}
        >
            <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column' }}>
                <UploadHeader
                    title="Upload your photo"
                    description="Welcome! To get see and download the event photos please upload or capture a high-resolution photo of yourself."
                />

                <UploadCard />

                <UploadSecurityFeatures />
            </Container>
        </Box>
    );
};

export default UploadPage;