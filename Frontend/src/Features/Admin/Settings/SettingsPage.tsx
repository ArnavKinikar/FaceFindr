import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Breadcrumbs, Link as MuiLink, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsSections from './Components/SettingsSections';

const SettingsPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                color: 'text.primary',
                py: { xs: 4, md: 8 },
                px: { xs: 2, md: 0 },
            }}
        >
            <Container maxWidth="md">
                <Stack spacing={4}>
                    {/* Breadcrumbs and Header */}
                    <Box>
                        <Breadcrumbs 
                            separator={<NavigateNextIcon fontSize="small" />} 
                            sx={{ mb: 1.5, '& .MuiTypography-root': { fontSize: '0.875rem', fontWeight: 500 } }}
                        >
                            <MuiLink
                                component="button"
                                onClick={() => navigate('/admin/dashboard')}
                                color="inherit"
                                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                            >
                                Albums
                            </MuiLink>
                            <Typography color="text.primary">Settings</Typography>
                        </Breadcrumbs>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 3 }}>
                            <Box sx={{ flex: '1 1 300px' }}>
                                <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5, letterSpacing: '-0.02em' }}>
                                    Album Customization
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Configure your gallery's behavior, aesthetics, and access.
                                </Typography>
                            </Box>
                            <Button
                                variant="outlined"
                                startIcon={<VisibilityIcon />}
                                onClick={() => navigate('/album')}
                                sx={{
                                    borderRadius: 2,
                                    borderColor: 'divider',
                                    color: 'text.primary',
                                    fontWeight: 700,
                                    px: 2.5,
                                    '&:hover': { borderColor: 'primary.main', bgcolor: 'transparent' }
                                }}
                            >
                                Preview Gallery
                            </Button>
                        </Box>
                    </Box>

                    {/* Settings Sections */}
                    <SettingsSections />

                    {/* Footer Action Bar */}
                    <Box 
                        sx={{ 
                            pt: 4, 
                            mt: 2, 
                            borderTop: '1px solid', 
                            borderColor: 'divider', 
                            display: 'flex', 
                            justifyContent: 'flex-end', 
                            gap: 2,
                            pb: 8
                        }}
                    >
                        <Button
                            onClick={() => navigate('/admin/dashboard')}
                            sx={{ color: 'text.secondary', fontWeight: 700, px: 3 }}
                        >
                            Discard changes
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<CheckCircleIcon />}
                            sx={{
                                fontWeight: 800,
                                px: 4,
                                py: 1.25,
                                borderRadius: 2,
                                boxShadow: '0 8px 16px rgba(19, 127, 236, 0.2)',
                            }}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default SettingsPage;
