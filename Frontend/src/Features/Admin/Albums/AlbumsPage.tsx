import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Container, Typography, Card, CardContent, CardActionArea, 
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import Grid from '@mui/material/Grid';
import axios from 'axios';

interface Album {
  id: number;
  title: string;
  event_name: string;
  location: string;
  description: string;
}

const AlbumsPage = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newAlbum, setNewAlbum] = useState({ 
    title: '', 
    event_name: '', 
    location: '', 
    description: '' 
  });

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/admin/albums', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlbums(response.data);
    } catch (err) {
      console.error('Error fetching albums:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlbum = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/admin/albums', newAlbum, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOpen(false);
      setNewAlbum({ title: '', event_name: '', location: '', description: '' });
      fetchAlbums();
    } catch (err) {
      console.error('Error creating album:', err);
    }
  };

  const handleDeleteAlbum = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this album?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/admin/albums/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAlbums();
    } catch (err) {
      console.error('Error deleting album:', err);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Your Albums
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Create Album
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {albums.map((album) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={album.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <CardActionArea 
                  onClick={() => navigate(`/admin/dashboard/${album.id}`)}
                  sx={{ flexGrow: 1, p: 2 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'primary.main' }}>
                    <PhotoAlbumIcon sx={{ fontSize: 40 }} />
                  </Box>
                  <CardContent sx={{ p: 0 }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
                      {album.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {album.description || 'No description provided.'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid', borderColor: 'divider' }}>
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={(e) => handleDeleteAlbum(e, album.id)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {albums.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', mt: 8, opacity: 0.6 }}>
            <PhotoAlbumIcon sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h6">No albums found.</Typography>
            <Typography variant="body2">Create your first album to get started!</Typography>
          </Box>
        )}

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>Create New Album</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Album Title"
              fullWidth
              variant="outlined"
              value={newAlbum.title}
              onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
              sx={{ mt: 1 }}
            />
            <TextField
              margin="dense"
              label="Event Name"
              fullWidth
              variant="outlined"
              value={newAlbum.event_name}
              onChange={(e) => setNewAlbum({ ...newAlbum, event_name: e.target.value })}
              sx={{ mt: 2 }}
            />
            <TextField
              margin="dense"
              label="Location"
              fullWidth
              variant="outlined"
              value={newAlbum.location}
              onChange={(e) => setNewAlbum({ ...newAlbum, location: e.target.value })}
              sx={{ mt: 2 }}
            />
            <TextField
              margin="dense"
              label="Description (Optional)"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={newAlbum.description}
              onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
            <Button onClick={handleCreateAlbum} variant="contained" disabled={!newAlbum.title}>
              Create Album
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AlbumsPage;
