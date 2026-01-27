import { Stack, Button, alpha, useTheme } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useRef, type ChangeEvent, useState } from 'react';
import CameraCaptureModal from './CameraCaptureModal';

interface UploadActionsProps {
    onFileSelect: (file: File) => void;
}

const UploadActions = ({ onFileSelect }: UploadActionsProps) => {
    const theme = useTheme();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const handlePickClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
        // Reset input value to allow selecting the same file again if needed
        event.target.value = '';
    };

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
                width: '100%',
                maxWidth: 400,
                mt: 1
            }}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
            />
            <Button
                variant="contained"
                size="large"
                startIcon={<UploadFileIcon />}
                fullWidth
                onClick={handlePickClick}
                sx={{
                    height: 48,
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.39)}`
                }}
            >
                Select File
            </Button>
            <Button
                variant="contained"
                size="large"
                startIcon={<CameraAltIcon />}
                fullWidth
                onClick={() => setIsCameraOpen(true)}
                sx={{
                    height: 48,
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: 2,
                    bgcolor: theme.palette.mode === 'dark' ? '#233648' : 'grey.200',
                    color: theme.palette.mode === 'dark' ? '#fff' : '#111a22',
                    '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' ? '#2d465d' : 'grey.300',
                    },
                    boxShadow: 'none'
                }}
            >
                Take Photo
            </Button>

            <CameraCaptureModal
                open={isCameraOpen}
                onClose={() => setIsCameraOpen(false)}
                onCapture={onFileSelect}
            />
        </Stack>
    );
};

export default UploadActions;
