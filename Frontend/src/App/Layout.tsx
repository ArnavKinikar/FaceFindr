import React from 'react';
import { Box } from '@mui/material';
import UnifiedHeader from '../Components/Header/UnifiedHeader';


type LayoutProps = {
    children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
            <UnifiedHeader />
            <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {children}
            </Box>
        </Box>
    );
}

export default Layout;
