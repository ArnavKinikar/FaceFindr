import { Box, Typography, Button } from '@mui/material';

const ApprovalsTab = () => {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>Pending Approvals</Typography>
            <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, my: 2 }}>
                <Typography>Photo #1234 - User: John Doe</Typography>
                <Box sx={{ mt: 1 }}>
                    <Button variant="contained" color="success" size="small" sx={{ mr: 1 }}>Approve</Button>
                    <Button variant="contained" color="error" size="small">Reject</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ApprovalsTab;
