import { Stack, Button, alpha, useTheme } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const UploadActions = () => {
    const theme = useTheme();

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
            <Button
                variant="contained"
                size="large"
                startIcon={<UploadFileIcon />}
                fullWidth
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
        </Stack>
    );
};

export default UploadActions;
