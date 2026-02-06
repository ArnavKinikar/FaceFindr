import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper, Avatar, Stack, Grid, IconButton, alpha, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EmailIcon from '@mui/icons-material/Email';
import ShieldIcon from '@mui/icons-material/Shield';

const ProfilePage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.default', color: 'text.primary', py: { xs: 4, md: 8 } }}>
            <Container maxWidth="md">
                <Button 
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/admin/dashboard')} 
                    sx={{ mb: 4, color: 'text.secondary', fontWeight: 700 }}
                >
                    Back to Dashboard
                </Button>
                
                <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 6, border: '1px solid', borderColor: 'divider' }}>
                    <Stack spacing={6}>
                        {/* Profile Header */}
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'flex-start' }, gap: 4 }}>
                            <Box sx={{ position: 'relative' }}>
                                <Avatar 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGfPHa_lW0naAYOSgwB4BgKodGyCRSu0_g41b3nDhjPka4QYwIefbOqD0eshugWupcGJi_0wAWl4EewVBXrZW5QAnvNf1UYVK0O_EFOzSq3VjilhlmFTDENt8TFYt8eaDMOHHEyMDpZYMOLuvZRsFzFtxvP0tNdfHuBR5gLl1RUGGCYvBKvTMm9E-nE7KXt7T4K6T-R3Dpzr24CN5Ynl6cclCoU_4uSte4iLINER-3V2icJdMmiMx8khfIsuP6pd0A3lSbu-M4NWBd"
                                    sx={{ width: 128, height: 128, border: '4px solid', borderColor: 'background.paper', boxShadow: 4 }}
                                />
                                <IconButton 
                                    sx={{ 
                                        position: 'absolute', 
                                        bottom: 4, 
                                        right: 4, 
                                        bgcolor: 'primary.main', 
                                        color: 'white',
                                        '&:hover': { bgcolor: 'primary.dark' }
                                    }}
                                >
                                    <CameraAltIcon fontSize="small" />
                                </IconButton>
                            </Box>
                            
                            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flexGrow: 1 }}>
                                <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-0.02em', mb: 1 }}>
                                    Alex Thompson
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                    Event Administrator • Member since Jan 2024
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    startIcon={<EditIcon />}
                                    sx={{ borderRadius: 2, fontWeight: 700, px: 3 }}
                                >
                                    Edit Profile
                                </Button>
                            </Box>
                        </Box>

                        <Divider />

                        {/* Account Details */}
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 1.5, display: 'block' }}>
                                            Contact Information
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: 'action.hover', borderRadius: 3 }}>
                                            <EmailIcon color="primary" />
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>alex.thompson@evently.com</Typography>
                                                <Typography variant="caption" color="text.secondary">Primary Email</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Grid>
                            
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 1.5, display: 'block' }}>
                                            Security Status
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: alpha('#4caf50', 0.1), borderRadius: 3 }}>
                                            <ShieldIcon sx={{ color: '#4caf50' }} />
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#4caf50' }}>Verified Account</Typography>
                                                <Typography variant="caption" color="text.secondary">Two-factor auth enabled</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>

                        {/* Danger Zone */}
                        <Box sx={{ mt: 2, p: 3, border: '1px solid', borderColor: alpha('#f44336', 0.2), borderRadius: 4, bgcolor: alpha('#f44336', 0.02) }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'error.main', mb: 1 }}>Danger Zone</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Permanent actions that cannot be undone. Account deletion will remove all your albums and data.
                            </Typography>
                            <Button variant="outlined" color="error" sx={{ fontWeight: 700, borderRadius: 2 }}>
                                Delete Account
                            </Button>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default ProfilePage;
