import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogActions, Button, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CameraIcon from '@mui/icons-material/Camera';

interface CameraCaptureModalProps {
    open: boolean;
    onClose: () => void;
    onCapture: (file: File) => void;
}

const CameraCaptureModal = ({ open, onClose, onCapture }: CameraCaptureModalProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        let currentStream: MediaStream | null = null;

        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user' }
                });
                currentStream = mediaStream;
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
                setError('');
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError('Could not access camera. Please check permissions.');
            }
        };

        if (open) {
            startCamera();
        }

        return () => {
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [open]);

    const handleClose = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        onClose();
    };

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], `camera-capture-${Date.now()}.png`, { type: 'image/png' });
                        onCapture(file);
                        handleClose();
                    }
                }, 'image/png');
            }
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3, overflow: 'hidden' }
            }}
        >
            <Box sx={{
                position: 'relative',
                bgcolor: 'black',
                width: '100%',
                aspectRatio: '1 / 1', // Force square shape - USER REQUEST
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden' // Ensure video doesn't bleed out
            }}>
                {error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                )}

                <IconButton
                    onClick={handleClose}
                    sx={{ position: 'absolute', top: 10, right: 10, color: 'white', bgcolor: 'rgba(0,0,0,0.5)', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            <DialogActions sx={{ p: 2, justifyContent: 'center', bgcolor: 'background.paper' }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<CameraIcon />}
                    onClick={handleCapture}
                    disabled={!!error}
                    sx={{ borderRadius: 28, px: 4 }}
                >
                    Capture Photo
                </Button>
            </DialogActions>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </Dialog>
    );
};

export default CameraCaptureModal;
