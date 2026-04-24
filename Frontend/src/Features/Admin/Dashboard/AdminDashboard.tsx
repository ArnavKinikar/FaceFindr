import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Stack, Link as MuiLink } from '@mui/material';
import AlbumHero from './Components/AlbumHero';
import AlbumStats from './Components/AlbumStats';
import AdminPhotoGrid from './Components/AdminPhotoGrid';

interface Photo {
  id: number;
  title: string;
  alt: string;
  src: string;
  pending: boolean;
}

const AdminDashboard = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState<any>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlbumDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/admin/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAlbum(data);
      }
    } catch (err) {
      console.error("Error fetching album details:", err);
    }
  };

  const fetchPhotos = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    
    // In a real app, the backend would filter by albumId. 
    // For now, we fetch all and can filter locally or update backend.
    
    Promise.all([
      fetch('http://localhost:8000/photos/all', { headers }).then(res => res.json()),
      fetch('http://localhost:8000/photos/pending', { headers }).then(res => res.json())
    ])
      .then(([allData, pendingData]) => {
        const allPhotos: Photo[] = (Array.isArray(allData) ? allData : []).map((filename: string, index: number) => ({
          id: index,
          title: filename,
          alt: filename,
          src: `http://localhost:8000/images/${filename}`,
          pending: false
        }));
        
        const pendingPhotos: Photo[] = (Array.isArray(pendingData) ? pendingData : []).map((filename: string, index: number) => ({
          id: index + 1000000,
          title: filename,
          alt: filename,
          src: `http://localhost:8000/pending-images/${filename}`,
          pending: true
        }));
        
        setPhotos([...pendingPhotos, ...allPhotos]);
      })
      .catch(err => console.error("Error fetching images:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAlbumDetails();
    fetchPhotos();
  }, [albumId]);
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Main Content Area */}
      <Container maxWidth="xl" component="main" sx={{ pt: 4, pb: 8 }}>
        {/* Page Header Section (Hero) */}
        <AlbumHero album={album} />

        {/* Stats Row */}
        <AlbumStats photos={photos} />

        {/* Managed Photo Grid (Uploads & Approvals) */}
        <AdminPhotoGrid 
          photos={photos} 
          setPhotos={setPhotos} 
          loading={loading} 
          onRefresh={fetchPhotos} 
        />

        {/* Usage Policy/Footer Subtle Info */}
        <Box
          component="footer"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            px: 1,
            pb: 4,
            mt: 'auto',
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            © 2026 FaceFindr AI. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            {['Privacy Policy', 'GDPR Compliance', 'API Docs'].map((item) => (
              <MuiLink
                key={item}
                href="#"
                sx={{
                  color: 'text.disabled',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s',
                }}
              >
                {item}
              </MuiLink>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
