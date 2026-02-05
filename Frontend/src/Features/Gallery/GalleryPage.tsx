import React from 'react';
import { Box, Container, Typography, Tab, Tabs, useTheme, alpha, IconButton, Stack } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DownloadIcon from '@mui/icons-material/Download';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { fetchYourPhotos, fetchAllPhotos } from '../../Services/api';
import type { Photo } from '../../Services/api';
import { useState, useEffect } from 'react';

const GalleryPage = () => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [photos, setPhotos] = useState<Photo[]>([]);
    // const [loading, setLoading] = useState(false); // Used for future loading state implementation

    useEffect(() => {
        const loadPhotos = async () => {
            // setLoading(true); // Uncomment when implementing loading UI
            try {
                const data = tabValue === 0 ? await fetchYourPhotos() : await fetchAllPhotos();
                setPhotos(data);
            } catch (error) {
                console.error("Failed to load photos", error);
            } finally {
                // setLoading(false);
            }
        };
        loadPhotos();
    }, [tabValue]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: theme.palette.mode === 'dark' ? '#101922' : '#f6f7f8',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Container maxWidth={false} sx={{ maxWidth: '2000px', flex: 1, py: 5, px: { xs: 2, lg: 5 } }}>
                <Box sx={{ 
                    mb: 4, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 3
                }}>
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        sx={{ 
                            fontWeight: 800, 
                            color: theme.palette.text.primary,
                            fontSize: { xs: '2.25rem', md: '3rem' },
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Gallery
                    </Typography>
                    
                    <Tabs 
                        value={tabValue} 
                        onChange={handleTabChange} 
                        sx={{ 
                            '& .MuiTabs-indicator': {
                                height: 3,
                                borderRadius: '3px 3px 0 0',
                                backgroundColor: '#137fec'
                            }
                        }}
                    >
                        <Tab 
                            label="Your Photos" 
                            sx={{ 
                                textTransform: 'none', 
                                fontWeight: 700, 
                                fontSize: '1rem',
                                color: tabValue === 0 ? theme.palette.text.primary : theme.palette.text.secondary,
                                '&.Mui-selected': { color: theme.palette.text.primary }
                            }} 
                        />
                        <Tab 
                            label="All Photos" 
                            sx={{ 
                                textTransform: 'none', 
                                fontWeight: 700, 
                                fontSize: '1rem',
                                color: tabValue === 1 ? theme.palette.text.primary : theme.palette.text.secondary,
                                '&.Mui-selected': { color: theme.palette.text.primary }
                            }} 
                        />
                    </Tabs>
                </Box>

                <Box sx={{ 
                    columnCount: { xs: 1, sm: 2, md: 3, lg: 4 },
                    columnGap: 3
                }}>
                    {photos.map((photo) => (
                        <Box
                            key={photo.id}
                            className="group"
                            sx={{
                                breakInside: 'avoid',
                                mb: 3,
                                position: 'relative',
                                borderRadius: 4,
                                overflow: 'hidden',
                                bgcolor: theme.palette.mode === 'dark' ? 'slate.800' : '#fff',
                                boxShadow: theme.shadows[1],
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: theme.shadows[10],
                                    '& .overlay': { opacity: 1 }
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src={photo.src}
                                alt={photo.title}
                                loading="lazy"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    minHeight: photo.height === 'auto' ? undefined : photo.height
                                }}
                            />
                            
                            <Box
                                className="overlay"
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    bgcolor: 'rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    p: 2,
                                    opacity: 0,
                                    transition: 'opacity 0.2s ease-in-out'
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <IconButton 
                                        size="small"
                                        sx={{ 
                                            bgcolor: 'rgba(255,255,255,0.2)', 
                                            backdropFilter: 'blur(4px)',
                                            color: 'white',
                                            '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' }
                                        }}
                                    >
                                        <MoreHorizIcon fontSize="small" />
                                    </IconButton>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            color: 'white', 
                                            fontWeight: 500,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {photo.title}
                                    </Typography>
                                    <IconButton 
                                        size="small"
                                        sx={{ 
                                            bgcolor: '#137fec', 
                                            color: 'white',
                                            '&:hover': { 
                                                bgcolor: '#137fec',
                                                transform: 'scale(1.05)'
                                            },
                                            transition: 'transform 0.2s'
                                        }}
                                    >
                                        <DownloadIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Box
                        component="button"
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            border: 1,
                            borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'divider',
                            borderRadius: '9999px',
                            bgcolor: 'transparent',
                            color: theme.palette.text.secondary,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': {
                                bgcolor: theme.palette.action.hover,
                                color: theme.palette.text.primary
                            }
                        }}
                    >
                        Load More
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default GalleryPage;
