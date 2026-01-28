import React from 'react';
import { AppBar, Toolbar, Typography, Box, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

type LayoutProps = {
    children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
            <AppBar position="fixed" elevation={0} sx={{ height: 56, justifyContent: 'center' }}>
                <Toolbar sx={{ justifyContent: 'space-between', minHeight: 56, px: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 300,
                                letterSpacing: '-0.04em',
                                userSelect: 'none'
                            }}
                        >
                            Face Findr
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={4} alignItems="center">
                        <RouterLink to="/" style={{ textDecoration: 'none' }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'rgba(255,255,255,0.8)',
                                    fontWeight: 500,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    '&:hover': { color: '#fff' },
                                    transition: 'color 0.2s'
                                }}
                            >
                                Home
                            </Typography>
                        </RouterLink>

                        <RouterLink to="/upload" style={{ textDecoration: 'none' }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'rgba(255,255,255,0.8)',
                                    fontWeight: 500,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    '&:hover': { color: '#fff' },
                                    transition: 'color 0.2s'
                                }}
                            >
                                Upload
                            </Typography>
                        </RouterLink>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', pt: '56px' }}>
                {children}
            </Box>

            {/* <Box
                component="footer"
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    bgcolor: 'rgba(19, 127, 236, 0.05)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    py: 3,
                    textAlign: 'center'
                }}
            >
                <Stack spacing={1} alignItems="center">
                    <Typography variant="caption" sx={{ color: 'rgba(19, 127, 236, 0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '10px' }}>
                        Status
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'rgba(19, 127, 236, 0.4)' }}>
                        <LockIcon sx={{ fontSize: 14 }} />
                        <Typography variant="caption" sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '11px' }}>
                            Gallery navigation is locked until first upload
                        </Typography>
                    </Stack>
                </Stack>
            </Box> */}
        </Box>
    );
}

export default Layout;
