import { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, Stack, Link as MuiLink } from '@mui/material';
import AlbumHero from './Components/AlbumHero';
import AlbumStats from './Components/AlbumStats';
import AdminPhotoGrid from './Components/AdminPhotoGrid';

export interface PhotoData {
  id: string;
  title: string;
  alt: string;
  src: string;
  pending: boolean;
  filename: string;
}

const API_BASE = 'http://localhost:8000';

const AdminDashboard = () => {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const [allRes, pendingRes] = await Promise.all([
        fetch(`${API_BASE}/photos/all`),
        fetch(`${API_BASE}/photos/pending`)
      ]);

      const allFiles: string[] = await allRes.json();
      const pendingFiles: string[] = await pendingRes.json();

      const allPhotos: PhotoData[] = allFiles.map((file, index) => ({
        id: `approved-${index}`,
        title: file,
        alt: `Approved photo: ${file}`,
        src: `${API_BASE}/images/${file}`,
        pending: false,
        filename: file
      }));

      const pendingPhotos: PhotoData[] = pendingFiles.map((file, index) => ({
        id: `pending-${index}`,
        title: file,
        alt: `Pending photo: ${file}`,
        src: `${API_BASE}/pending-images/${file}`,
        pending: true,
        filename: file
      }));

      setPhotos([...allPhotos, ...pendingPhotos]);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const approvedCount = photos.filter(p => !p.pending).length;
  const pendingCount = photos.filter(p => p.pending).length;
  const totalCount = photos.length;

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
        <AlbumHero />

        {/* Stats Row */}
        <AlbumStats 
          total={totalCount} 
          approved={approvedCount} 
          pending={pendingCount} 
        />

        {/* Managed Photo Grid (Uploads & Approvals) */}
        <AdminPhotoGrid 
          photos={photos} 
          loading={loading} 
          setPhotos={setPhotos} 
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
