import { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const AlbumHero = () => {
  const [copied, setCopied] = useState(false);
  const albumUrl = "https://visionary.events/p/smith-wedding-24";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(albumUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'flex-end' },
        justifyContent: 'space-between',
        gap: 3,
        mb: 6,
        mt: 2,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: 'text.primary',
            mb: 1,
          }}
        >
          The Smith Wedding
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <LocationOnIcon color="primary" sx={{ fontSize: 24 }} />
          Sunset Ridge Estate, Napa Valley
        </Typography>
      </Box>

      <Box sx={{ width: { xs: '100%', md: 320 } }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'text.disabled',
            mb: 1,
            display: 'block',
            pl: 0.5,
          }}
        >
          Public Album URL
        </Typography>
        <TextField
          fullWidth
          value={albumUrl}
          variant="outlined"
          size="small"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={copied ? "Copied!" : "Copy URL"} placement="top">
                  <IconButton onClick={copyToClipboard} size="small" edge="end">
                    {copied ? (
                      <CheckIcon sx={{ fontSize: 18, color: 'success.main' }} />
                    ) : (
                      <ContentCopyIcon sx={{ fontSize: 18 }} />
                    )}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'background.paper',
              borderRadius: 3,
              fontSize: '0.875rem',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AlbumHero;
