import { Box, Typography, alpha, useTheme, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadActions from './UploadActions';
import { uploadFile } from '../../../../Services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadDropZone = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);

    // Create preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);

    // Reset uploading state if a new file is selected
    setIsUploading(false);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    console.log('Submitting file:', selectedFile.name);

    try {
      const response = await uploadFile(selectedFile);
      console.log('File upload successful:', response);
      navigate('/gallery');
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        borderRadius: 4,
        border: '2px dashed',
        borderColor: 'divider',
        bgcolor: 'action.hover',
        px: 3,
        py: { xs: 6, md: 10 },
        cursor: 'default',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'rgba(19, 127, 236, 0.04)',
        },
        '&:hover .icon-box': {
          transform: 'scale(1.1)',
        }
      }}
    >
      {previewUrl ? (
        <Box
          component="img"
          src={previewUrl}
          alt="Selected file preview"
          sx={{
            width: 200,
            height: 200,
            objectFit: 'cover',
            borderRadius: 2,
            mb: 2,
            boxShadow: 3
          }}
        />
      ) : (
        <>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s',
            }}
            className="icon-box"
          >
            <CloudUploadIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          </Box>

          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.015em', color: 'text.primary' }}>
              {selectedFile ? `Selected: ${selectedFile.name}` : "Drag and drop your files here"}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Maximum file size: 10MB. Formats: JPG, PNG, WEBP
            </Typography>
          </Box>
        </>
      )}

      <UploadActions onFileSelect={handleFileSelect} />

      {selectedFile && (
        <Box sx={{ width: '100%', maxWidth: 400, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={isUploading}
            onClick={handleSubmit}
            sx={{
              height: 56, // Slightly taller
              fontSize: '1.125rem',
              fontWeight: 800,
              textTransform: 'none',
              borderRadius: 3,
              boxShadow: '0 8px 16px rgba(19, 127, 236, 0.2)',
            }}
          >
            {isUploading ? 'Uploading...' : 'Submit Photo'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UploadDropZone;
