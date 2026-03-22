import { Box, Typography, Paper, Grid } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VerifiedIcon from '@mui/icons-material/Verified';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

interface Photo {
  id: number;
  title: string;
  alt: string;
  src: string;
  pending: boolean;
}

const AlbumStats = ({ photos }: { photos: Photo[] }) => {
  const stats = [
    {
      label: 'Total Images',
      value: photos.length.toLocaleString(),
      icon: <PhotoLibraryIcon sx={{ fontSize: 32 }} />,
      color: 'primary.main',
      bgcolor: 'rgba(19, 127, 236, 0.1)',
    },
    {
      label: 'Approved',
      value: photos.filter(p => !p.pending).length.toLocaleString(),
      icon: <VerifiedIcon sx={{ fontSize: 32 }} />,
      color: 'success.main',
      bgcolor: 'rgba(46, 125, 50, 0.1)',
    },
    {
      label: 'Pending',
      value: photos.filter(p => p.pending).length.toLocaleString(),
      icon: <HourglassEmptyIcon sx={{ fontSize: 32 }} />,
      color: 'warning.main',
      bgcolor: 'rgba(237, 108, 2, 0.1)',
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 6 }}>
      {stats.map((stat) => (
        <Grid size={{ xs: 12, md: 4 }} key={stat.label}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: stat.bgcolor,
                color: stat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {stat.icon}
            </Box>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'text.disabled',
                  display: 'block',
                }}
              >
                {stat.label}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                {stat.value}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default AlbumStats;
