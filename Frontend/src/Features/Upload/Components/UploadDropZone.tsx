import { Box, Typography, alpha, useTheme, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadActions from './UploadActions';
import { uploadFile } from '../../../Services/api';
import { useState } from 'react';

const UploadDropZone = () => {
    const theme = useTheme();
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
            // Optionally clear the selection or show a success message here
            // setSelectedFile(null); 
            // setPreviewUrl(null);
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
                borderRadius: 3,
                border: '2px dashed',
                borderColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.5) : 'grey.300',
                bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.05) : 'grey.50',
                px: 3,
                py: { xs: 6, md: 10 }, // Responsive padding
                cursor: 'default', // Changed from pointer since we shouldn't trigger file select on the whole box now that we have buttons
                transition: 'border-color 0.2s',
                '&:hover': {
                    borderColor: 'primary.main'
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
                            justifyContent: 'center'
                        }}
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
                            height: 48,
                            fontSize: '1rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            borderRadius: 2,
                            boxShadow: theme.shadows[4]
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
