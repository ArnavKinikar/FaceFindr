import { useState, useRef } from 'react';
import { Box, Container, Typography, Paper, Button, Grid, IconButton, LinearProgress, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const BulkUploadPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  
  // Using generic any or a custom File type interface for mock state.
  const [selectedFiles, setSelectedFiles] = useState<{ id: string; url: string; name: string; file: File }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Recursive folder parsing for drag and drop
    const items = Array.from(e.dataTransfer.items);
    const files: File[] = [];
    const queue: any[] = []; // FileSystemEntry

    for (const item of items) {
      if (item.kind === 'file') {
        const entry = item.webkitGetAsEntry?.();
        if (entry) queue.push(entry);
        else {
          const file = item.getAsFile();
          if (file) files.push(file);
        }
      }
    }

    while (queue.length > 0) {
      const entry = queue.shift();
      if (!entry) continue;

      if (entry.isFile) {
        const file = await new Promise<File>((resolve) => {
          (entry as any).file(resolve);
        });
        files.push(file);
      } else if (entry.isDirectory) {
        const reader = (entry as any).createReader();
        const readEntries = async (): Promise<any[]> => {
          return new Promise((resolve, reject) => {
            const allEntries: any[] = [];
            const readBatch = () => {
              reader.readEntries((batch: any[]) => {
                if (batch.length === 0) resolve(allEntries);
                else {
                  allEntries.push(...batch);
                  readBatch();
                }
              }, reject);
            };
            readBatch();
          });
        };
        const dirEntries = await readEntries();
        queue.push(...dirEntries);
      }
    }

    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    // Only accept image files
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    const newFiles = imageFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      name: file.name,
      file: file
    }));
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (idToRemove: string) => {
    setSelectedFiles((prev) => prev.filter(f => f.id !== idToRemove));
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) return;
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    selectedFiles.forEach((item) => {
      formData.append('files', item.file);
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/upload', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setUploadProgress(100);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          setSelectedFiles([]);
          navigate('/admin/dashboard'); // after upload navigate back to dashboard
        }, 1000);
      } else {
        console.error('Upload failed', xhr.responseText);
        setIsUploading(false);
      }
    };

    xhr.onerror = () => {
      console.error('Network error occurred during upload');
      setIsUploading(false);
    };

    xhr.send(formData);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 6, pb: 12 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary', mb: 1 }}>
              Bulk Upload Photos
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Add multiple high-resolution photos to the event gallery.
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/admin/dashboard')}
            sx={{ fontWeight: 'bold', borderRadius: 3, px: 3 }}
          >
            Cancel
          </Button>
        </Box>

        {/* Dropzone area */}
        <Paper
          elevation={0}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          sx={{
            p: 8,
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 6,
            bgcolor: 'background.paper',
            textAlign: 'center',
            transition: 'all 0.2s',
            mb: 6,
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'action.hover'
            }
          }}
        >
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            style={{ display: 'none' }} 
          />
          <input 
            type="file" 
            multiple 
            {...{ webkitdirectory: "", directory: "" }}
            ref={folderInputRef} 
            onChange={handleFileSelect} 
            style={{ display: 'none' }} 
          />
          <CloudUploadIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
            Drag & drop your files and folders here
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
            or pick an option below
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              onClick={() => fileInputRef.current?.click()}
              sx={{ fontWeight: 'bold', borderRadius: 3, px: 4 }}
            >
              Select Files
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => folderInputRef.current?.click()}
              sx={{ fontWeight: 'bold', borderRadius: 3, px: 4 }}
            >
              Select Folder
            </Button>
          </Stack>
        </Paper>

        {/* Preview section */}
        {selectedFiles.length > 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Selected Photos ({selectedFiles.length})
              </Typography>
              <Button 
                variant="text" 
                color="error" 
                onClick={() => setSelectedFiles([])}
                sx={{ fontWeight: 600 }}
              >
                Clear all
              </Button>
            </Box>

            <Grid container spacing={2} sx={{ mb: 6 }}>
              {selectedFiles.map((file) => (
                <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={file.id}>
                  <Box sx={{ position: 'relative', aspectRatio: '1/1', borderRadius: 3, overflow: 'hidden' }}>
                    <Box component="img" src={file.url} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <IconButton 
                      size="small" 
                      onClick={() => removeFile(file.id)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'background.paper',
                        color: 'error.main',
                        '&:hover': { bgcolor: 'error.main', color: 'white' }
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Upload Action */}
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
              {isUploading && (
                <Box sx={{ mb: 3 }}>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Uploading...</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{uploadProgress}%</Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={uploadProgress} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={handleUpload}
                  disabled={isUploading}
                  startIcon={uploadProgress === 100 ? <CheckCircleIcon /> : <CloudUploadIcon />}
                  sx={{
                    px: 6,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 800,
                    boxShadow: '0 8px 16px rgba(19, 127, 236, 0.2)',
                  }}
                >
                  {uploadProgress === 100 ? 'Uploaded successfully' : isUploading ? 'Uploading Photos...' : 'Start Upload'}
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BulkUploadPage;
