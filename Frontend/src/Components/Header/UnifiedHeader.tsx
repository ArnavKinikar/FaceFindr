import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Avatar, Container, useTheme, alpha } from '@mui/material';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface UnifiedHeaderProps {
    variant?: 'home' | 'admin' | 'guest' | 'auth';
}

const UnifiedHeader = ({ variant }: UnifiedHeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    
    // Auto-detect variant if not provided
    const activeVariant = variant || (
        location.pathname.startsWith('/admin') ? 'admin' :
        location.pathname.startsWith('/public') || location.pathname.startsWith('/album') || location.pathname.startsWith('/upload-face') ? 'guest' :
        location.pathname.startsWith('/auth') ? 'auth' : 'home'
    );

    if (activeVariant === 'auth') return null; // Auth pages usually have centered logo

    return (
        <AppBar 
            position="sticky" 
            elevation={0}
            sx={{
                bgcolor: alpha(theme.palette.background.default, 0.8),
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid',
                borderColor: 'divider',
                color: 'text.primary',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ height: 64, justifyContent: 'space-between' }}>
                    {/* Logo Section */}
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1.5, 
                            cursor: 'pointer',
                            '&:hover .logo-bg': { transform: 'scale(1.1)' }
                        }}
                        onClick={() => navigate(activeVariant === 'admin' ? '/admin/dashboard' : '/')}
                    >
                        <Box 
                            className="logo-bg"
                            sx={{ 
                                width: 32, 
                                height: 32, 
                                bgcolor: 'primary.main', 
                                borderRadius: 1.5, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                color: 'white',
                                boxShadow: '0 4px 12px rgba(19, 127, 236, 0.2)',
                                transition: 'transform 0.2s'
                            }}
                        >
                            <FaceRetouchingNaturalIcon sx={{ fontSize: 20 }} />
                        </Box>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 800, 
                                letterSpacing: '-0.02em',
                                color: 'text.primary'
                            }}
                        >
                            FaceFindr
                        </Typography>
                    </Box>

                    {/* Navigation / Actions Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 } }}>
                        {activeVariant === 'home' && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Button 
                                    onClick={() => navigate('/auth/login')}
                                    sx={{ 
                                        fontWeight: 700, 
                                        color: 'text.secondary',
                                        '&:hover': { color: 'primary.main' }
                                    }}
                                >
                                    Login
                                </Button>
                                <Button 
                                    variant="contained"
                                    onClick={() => navigate('/auth/signup')}
                                    sx={{ 
                                        bgcolor: 'primary.main', 
                                        color: 'white',
                                        fontWeight: 800,
                                        borderRadius: 2,
                                        px: 3,
                                        boxShadow: '0 8px 16px rgba(19, 127, 236, 0.2)',
                                        '&:hover': { bgcolor: 'primary.dark' }
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        )}

                        {activeVariant === 'admin' && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
                                    <Button 
                                        onClick={() => navigate('/admin/dashboard')}
                                        sx={{ 
                                            fontWeight: location.pathname === '/admin/dashboard' ? 700 : 500, 
                                            color: location.pathname === '/admin/dashboard' ? 'primary.main' : 'text.secondary',
                                            '&:hover': { color: location.pathname === '/admin/dashboard' ? 'primary.main' : 'text.primary' }
                                        }}
                                    >
                                        Albums
                                    </Button>
                                    <Button 
                                        onClick={() => navigate('/admin/settings')}
                                        sx={{ 
                                            fontWeight: location.pathname === '/admin/settings' ? 700 : 500, 
                                            color: location.pathname === '/admin/settings' ? 'primary.main' : 'text.secondary',
                                            '&:hover': { color: location.pathname === '/admin/settings' ? 'primary.main' : 'text.primary' }
                                        }}
                                    >
                                        Settings
                                    </Button>
                                </Box>
                                <IconButton 
                                    onClick={() => navigate('/admin/profile')}
                                    sx={{ p: 0, border: '1px solid', borderColor: 'divider' }}
                                >
                                    <Avatar 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGfPHa_lW0naAYOSgwB4BgKodGyCRSu0_g41b3nDhjPka4QYwIefbOqD0eshugWupcGJi_0wAWl4EewVBXrZW5QAnvNf1UYVK0O_EFOzSq3VjilhlmFTDENt8TFYt8eaDMOHHEyMDpZYMOLuvZRsFzFtxvP0tNdfHuBR5gLl1RUGGCYvBKvTMm9E-nE7KXt7T4K6T-R3Dpzr24CN5Ynl6cclCoU_4uSte4iLINER-3V2icJdMmiMx8khfIsuP6pd0A3lSbu-M4NWBd"
                                        sx={{ width: 32, height: 32 }}
                                    />
                                </IconButton>
                            </Box>
                        )}

                        {activeVariant === 'guest' && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 } }}>
                                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
                                    <Button sx={{ fontWeight: 700, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>Event Details</Button>
                                    <Button sx={{ fontWeight: 700, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>Support</Button>
                                </Box>
                                {location.pathname === '/public/gallery' ? (
                                    <Button 
                                        variant="contained"
                                        startIcon={<CloudDownloadIcon />}
                                        sx={{ 
                                            bgcolor: 'primary.main', 
                                            color: 'white',
                                            fontWeight: 800,
                                            borderRadius: 2,
                                            boxShadow: '0 8px 16px rgba(19, 127, 236, 0.2)',
                                            '&:active': { transform: 'scale(0.95)' }
                                        }}
                                    >
                                        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Download All</Box>
                                    </Button>
                                ) : (
                                    <Button 
                                        variant="outlined"
                                        onClick={() => navigate('/auth/login')}
                                        sx={{ 
                                            fontWeight: 700,
                                            borderRadius: 2,
                                            borderColor: 'divider',
                                            color: 'text.primary',
                                            '&:hover': { borderColor: 'primary.main', bgcolor: 'transparent' }
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                )}
                            </Box>
                        )}
                        
                        {/* Theme Toggle Button */}
                        <IconButton 
                            size="small" 
                            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                        >
                            <DarkModeIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default UnifiedHeader;
