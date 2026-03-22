import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Tabs, Tab, Grid, IconButton, CircularProgress, Typography, Pagination } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = 'http://localhost:8000';

interface Photo {
  id: number;
  title: string;
  alt: string;
  src: string;
  pending: boolean;
}

interface AdminPhotoGridProps {
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  loading: boolean;
  onRefresh: () => void;
}

const AdminPhotoGrid = ({ photos, setPhotos, loading, onRefresh }: AdminPhotoGridProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 50;
  const navigate = useNavigate();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setPage(1);
  };

  const handleApprove = async (id: number, filename: string) => {
    setProcessingId(id);
    try {
      const response = await fetch(`${API_BASE}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      });

      if (response.ok) {
        // Optimistically update and then refresh from server to sync counts
        setPhotos(prev => prev.map(p => 
          p.id === id ? { ...p, pending: false, src: `${API_BASE}/images/${filename}` } : p
        ));
        await onRefresh();
      } else {
        console.error('Approval failed');
      }
    } catch (error) {
      console.error('Error approving photo:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = (id: number) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const filteredPhotos = activeTab === 0 ? photos.filter(p => !p.pending) : photos.filter(p => p.pending);

  const pageCount = Math.ceil(filteredPhotos.length / itemsPerPage);
  const paginatedPhotos = filteredPhotos.slice((page - 1) * itemsPerPage, page * itemsPerPage);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 10 }}>
      {/* Navigation Tabs & Primary Action */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
          mb: 4,
          gap: 2,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            minHeight: 0,
            '& .MuiTab-root': {
              pb: 2,
              minHeight: 0,
              fontSize: '0.875rem',
              fontWeight: 700,
              textTransform: 'none',
              px: { xs: 1, sm: 2 },
            },
          }}
        >
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                All Photos
                <Box
                  sx={{
                    fontSize: '10px',
                    px: 1,
                    py: 0.25,
                    borderRadius: 10,
                    bgcolor: activeTab === 0 ? 'primary.main' : 'action.selected',
                    color: activeTab === 0 ? 'white' : 'text.secondary',
                  }}
                >
                  {photos.length}
                </Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Pending Approvals
                <Box
                  sx={{
                    fontSize: '10px',
                    px: 1,
                    py: 0.25,
                    borderRadius: 10,
                    bgcolor: activeTab === 1 ? 'primary.main' : 'action.selected',
                    color: activeTab === 1 ? 'white' : 'text.secondary',
                  }}
                >
                  {photos.filter(p => p.pending).length}
                </Box>
              </Box>
            }
          />
        </Tabs>
        <Box sx={{ pb: { xs: 2, sm: 1.5 }, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddPhotoAlternateIcon />}
            onClick={() => navigate('/admin/upload')}
            sx={{
              borderRadius: 3,
              px: 3,
              fontWeight: 700,
              boxShadow: '0 8px 16px rgba(19, 127, 236, 0.2)',
            }}
          >
            Upload New Photos
          </Button>
        </Box>
      </Box>

      {/* Photo Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : paginatedPhotos.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10, color: 'text.secondary' }}>
          <Typography variant="h6">No photos found in this category.</Typography>
        </Box>
      ) : (
        <Grid container spacing={2} component={motion.div} layout>
          <AnimatePresence mode="popLayout">
            {paginatedPhotos.map((photo) => (
              <Grid 
                size={{ xs: 6, md: 4, lg: 3, xl: 2.4 }} 
                key={photo.id}
                component={motion.div}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    aspectRatio: '1/1',
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: 'action.hover',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover .overlay': { opacity: 1 },
                    '&:hover img': { transform: 'scale(1.1)' },
                  }}
                >
                  <Box
                    component="img"
                    src={photo.src}
                    alt={photo.alt}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />

                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      opacity: processingId === photo.id ? 1 : 0,
                      transition: 'opacity 0.3s',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      p: 2,
                      bgcolor: processingId === photo.id ? 'rgba(0,0,0,0.4)' : 'transparent',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      {processingId === photo.id ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : activeTab === 0 ? (
                        <>
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.2)',
                              backdropFilter: 'blur(8px)',
                              color: 'white',
                              '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                            }}
                          >
                            <DownloadIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleReject(photo.id)}
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.2)',
                              backdropFilter: 'blur(8px)',
                              color: 'white',
                              '&:hover': { bgcolor: 'error.main' },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            size="small"
                            onClick={() => handleApprove(photo.id, photo.title)}
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.2)',
                              backdropFilter: 'blur(8px)',
                              color: 'white',
                              '&:hover': { bgcolor: 'success.main' },
                            }}
                          >
                            <CheckIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleReject(photo.id)}
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.2)',
                              backdropFilter: 'blur(8px)',
                              color: 'white',
                              '&:hover': { bgcolor: 'error.main' },
                            }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      )}

      {/* Pagination Section */}
      {!loading && pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 4 }}>
          <Pagination 
            count={pageCount} 
            page={page} 
            onChange={(_, value) => setPage(value)} 
            color="primary" 
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};

export default AdminPhotoGrid;
