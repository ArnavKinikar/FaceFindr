import React from 'react';
import { Stack, Typography } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import LockIcon from '@mui/icons-material/Lock';

const UploadSecurityFeatures = () => {
    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 4 }} // Tighter spacing on mobile vertical stack
            justifyContent="center"
            alignItems="center"
            sx={{
                mt: 4,
                color: 'text.secondary',
                fontSize: '0.875rem',
                flexWrap: 'wrap' // Allow wrapping on very small screens
            }}
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
    );
};

export default UploadSecurityFeatures;
