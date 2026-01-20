import React from 'react';
import { Paper, useTheme } from '@mui/material';
import UploadDropZone from './UploadDropZone';

const UploadCard = () => {
    const theme = useTheme();

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                bgcolor: theme.palette.mode === 'dark' ? '#1a2632' : '#fff',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'divider',
                transition: 'all 0.3s ease',
                boxShadow: 6
            }}
        >
            <UploadDropZone />
        </Paper>
    );
};

export default UploadCard;
