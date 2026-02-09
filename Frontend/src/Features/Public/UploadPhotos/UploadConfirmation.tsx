import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const UploadConfirmation = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', bgcolor: 'background.default' }}>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 5, textAlign: 'center' }}>
                    <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
                    <Typography variant="h4" gutterBottom>Upload Successful!</Typography>
                    <Typography paragraph color="text.secondary">
                        Thank you for contributing to the album. Your photos have been submitted for approval.
                    </Typography>
                    <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button variant="contained" onClick={() => navigate('/public/upload')}>Upload More</Button>
                        <Button variant="outlined" onClick={() => navigate('/album')}>Back to Album</Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default UploadConfirmation;
