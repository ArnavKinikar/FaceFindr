import { useState } from 'react';
import { Box, Typography, TextField, Switch, Paper, Button, alpha, useTheme, Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import LinkIcon from '@mui/icons-material/Link';
import PaletteIcon from '@mui/icons-material/Palette';
import SecurityIcon from '@mui/icons-material/Security';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const SettingsSections = () => {
    const theme = useTheme();
    const [allowUploads, setAllowUploads] = useState(true);
    const [allowViewAll, setAllowViewAll] = useState(false);
    const [passwordProtected, setPasswordProtected] = useState(false);
    const [mode, setMode] = useState<'light' | 'dark'>('dark');

    const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
        <Box sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Icon color="primary" sx={{ fontSize: 20 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{title}</Typography>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Album Details Section */}
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4, overflow: 'hidden' }}>
                <SectionHeader icon={InfoIcon} title="Album Details" />
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', color: 'text.secondary', textTransform: 'uppercase' }}>Album Name</Typography>
                            <TextField fullWidth defaultValue="Summer Gala 2024" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', color: 'text.secondary', textTransform: 'uppercase' }}>Event Name</Typography>
                            <TextField fullWidth defaultValue="Annual Charity Fundraiser" />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {/* Public URL Section */}
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4, overflow: 'hidden' }}>
                <SectionHeader icon={LinkIcon} title="Public URL" />
                <Box sx={{ p: 3 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', color: 'text.secondary', textTransform: 'uppercase' }}>Custom Slug</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ bgcolor: 'action.hover', px: 2, py: 1, border: '1px solid', borderRight: 0, borderColor: 'divider', borderRadius: '8px 0 0 8px', color: 'text.disabled', fontSize: '0.875rem' }}>
                            gallery.evently.com/
                        </Box>
                        <TextField 
                            defaultValue="summer-gala-2024" 
                            fullWidth 
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0 8px 8px 0' } }}
                        />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        Preview: <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>https://gallery.evently.com/summer-gala-2024</Box>
                    </Typography>
                </Box>
            </Paper>

            {/* Theme Selection Section */}
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4, overflow: 'hidden' }}>
                <SectionHeader icon={PaletteIcon} title="Theme Selection" />
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 2, display: 'block', color: 'text.secondary', textTransform: 'uppercase' }}>Interface Mode</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    fullWidth
                                    variant={mode === 'light' ? 'contained' : 'outlined'}
                                    onClick={() => setMode('light')}
                                    startIcon={<LightModeIcon />}
                                    sx={{ 
                                        flexDirection: 'column', 
                                        py: 2, 
                                        borderRadius: 3,
                                        bgcolor: mode === 'light' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                        borderColor: mode === 'light' ? 'primary.main' : 'divider',
                                        color: mode === 'light' ? 'primary.main' : 'text.secondary',
                                        '&:hover': { bgcolor: mode === 'light' ? alpha(theme.palette.primary.main, 0.15) : 'action.hover' }
                                    }}
                                >
                                    Light Mode
                                </Button>
                                <Button
                                    fullWidth
                                    variant={mode === 'dark' ? 'contained' : 'outlined'}
                                    onClick={() => setMode('dark')}
                                    startIcon={<DarkModeIcon />}
                                    sx={{ 
                                        flexDirection: 'column', 
                                        py: 2, 
                                        borderRadius: 3,
                                        bgcolor: mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                        borderColor: mode === 'dark' ? 'primary.main' : 'divider',
                                        color: mode === 'dark' ? 'primary.main' : 'text.secondary',
                                        '&:hover': { bgcolor: mode === 'dark' ? alpha(theme.palette.primary.main, 0.15) : 'action.hover' }
                                    }}
                                >
                                    Dark Mode
                                </Button>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 2, display: 'block', color: 'text.secondary', textTransform: 'uppercase' }}>Custom Accent Color</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'primary.main', border: '4px solid', borderColor: 'background.paper', boxShadow: 2 }} />
                                <TextField fullWidth defaultValue="#197FE6" sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {/* Privacy & Permissions Section */}
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4, overflow: 'hidden' }}>
                <SectionHeader icon={SecurityIcon} title="Privacy & Permissions" />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                        { 
                            title: 'Allow guest photo uploads', 
                            desc: 'Enable guests to contribute photos to this album via QR code or direct link.', 
                            state: allowUploads, 
                            handler: setAllowUploads 
                        },
                        { 
                            title: 'Allow guests to view full gallery', 
                            desc: 'If off, guests only see photos they are tagged in via facial recognition.', 
                            state: allowViewAll, 
                            handler: setAllowViewAll 
                        },
                        { 
                            title: 'Password Protection', 
                            desc: 'Require guests to enter a passcode before accessing the album.', 
                            state: passwordProtected, 
                            handler: setPasswordProtected 
                        }
                    ].map((item, idx) => (
                        <Box key={idx} sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: idx === 2 ? 0 : '1px solid', borderColor: 'divider' }}>
                            <Box sx={{ pr: 2 }}>
                                <Typography sx={{ fontWeight: 700 }}>{item.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                            </Box>
                            <Switch checked={item.state} onChange={() => item.handler(!item.state)} color="primary" />
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Box>
    );
};

export default SettingsSections;
