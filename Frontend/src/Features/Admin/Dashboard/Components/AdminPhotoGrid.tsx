import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Tabs, Tab, Grid, IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const photos = [
  {
    id: 1,
    title: 'Wedding Couple',
    alt: 'Elegant wedding couple walking through vineyard at sunset',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeYFjhFb5mP_wRlm5TPQ5d6_ZVxmlqx6vs4mdAo8F6xGd5zz_ng3yZ-WAOr22x65OVihOK33IPX0xcGouMMoAhcSCZ9iX_u50n0ve2fJAfDENFgbAu45F5XgA69TL5aNFYOe12liRRAheXsaBF8gONH1rYcqcp5d-eZUDXaEfZSqfkoKloxcx9GfGYlkpP0lLccdIbA8e9c-lBfFSSmPfYgNp3yJascwuHb4R8zh6owNg689XB-xmeKVu3qJXi6oyJpq04y41mJTBv',
    pending: false
  },
  {
    id: 2,
    title: 'Wedding Cake',
    alt: 'Close up of a minimalist white three-tier wedding cake',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwUEFFyUEDzqXCjAAEQNxpqmXRY9q9Y58j_7UfPGB9CFqv2dscCyMhYe2UPk2sdKOAGBVwk2_OP9nDL9CQTPyk5VZXU8kjfGhrdyrHQX9L5cQFIDMhQGBzXvVIr1oCObXwzdNyIqKcjDudWklasQAvj_jcl6sby9lFxTbeFdb1Le5ohOMc3X1pp_yHzN96pUeQlVvLmRVD2htdkRptUoNshTmO0qkVfZ_4_Wa0wgAQ6dr3ZkcNHJgiJRKddc3yhYQ4uJuDFhdg8phW',
    pending: true
  },
  {
    id: 3,
    title: 'Rings',
    alt: 'Wedding rings resting on a bed of fresh roses',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbkdY1XNu_sKqLrjsp5y5NBas3BPzhsPEBzLv_Xqp97urXSsE1I-G89b_G2wYYeKTkiu7uVfQhRwOAj3yaCN2cIFK8Lm8JTKEfCfWmH9QOlJACzaOyy5N6P_uedCv4k3dXBQGmIj7uc1h7yDCLQCMDs3-3RthXb5kZhzV2L4VP_ht-nvBKb34iTuh3Wxko5Uxmd_dQmAtlNRYvsKzociVRITlDmmepWyXnbC2iJ2YpCgPauEAT-eJgh9ex44lS_p9E-EVsWk0nFeqa',
    pending: false
  },
  {
    id: 4,
    title: 'Table Setting',
    alt: 'Luxury outdoor table setting with gold cutlery and floral centerpiece',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8zDLZMWM-mIbfXTgfKtyHJeWrERO80pfE6A5m8Blxp5pbcLVv-n2iwZ6sXNKCBa1Ym4z_6S1aEqVNke8RTi5zjyOYtcNIH2bmgD4niLZr0FrPfQmwqX7phytBmoi6oqpxHqyRLOFSsrZFFPTDB3jETL3spj8P2OTIEMU4uaM6iGNkNVj9NM_O-3YZYUsQIyU0o6xraWo1ckr6NJ3UO4APVdIF78JFhAKvcAjdIB6CmQqiwvGwmsxS2Xm0PBLDfZY_GKOrYbQUpJOq',
    pending: false
  },
  {
    id: 5,
    title: 'Guests',
    alt: 'Candid shot of happy wedding guests laughing during cocktail hour',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASs4w7zXkp90XWmm-5HfFa5GK1ERu9Hr0EGoY0bEx9o9vk1yaQZvq5itrq5K3a9LBSSFJCDjz93Hm4UGVWAQ9V79vuFXWLaPv6RBKxZ1Pv9nVqveAtPy_aPCTH3eFiGl6wnfqlX_r6OjorbDQ5O1SIHfALELjxjz6PVMG5B0H5m61KMEdXeMa-RRBeEsf0Gzgp_Qh9jyCQ59_9FKltWwdPx1h9jLkyBXjN0cFnsZfERHgnFst8VdtT6tDrT0B-X1wOLGhsX9jpbqCp',
    pending: false
  }
];

const AdminPhotoGrid = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const filteredPhotos = activeTab === 0 ? photos.filter(p => !p.pending) : photos.filter(p => p.pending);

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
                  1.2k
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
                  138
                </Box>
              </Box>
            }
          />
        </Tabs>
        <Box sx={{ pb: { xs: 2, sm: 1.5 }, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddPhotoAlternateIcon />}
            onClick={() => navigate('/public/upload')}
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
      <Grid container spacing={2}>
        {filteredPhotos.map((photo) => (
          <Grid size={{ xs: 6, md: 4, lg: 3, xl: 2.4 }} key={photo.id}>
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
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  p: 2,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  {activeTab === 0 ? (
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
      </Grid>

      {/* Load More Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 4 }}>
        <Button
          variant="outlined"
          size="large"
          sx={{
            borderRadius: 3,
            px: 6,
            fontWeight: 700,
            borderColor: 'divider',
            color: 'text.secondary',
            '&:hover': { bgcolor: 'action.hover', borderColor: 'text.disabled' },
          }}
        >
          Load More Images
        </Button>
      </Box>
    </Box>
  );
};

export default AdminPhotoGrid;
