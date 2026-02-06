import { Box, Typography } from '@mui/material';

const GalleryTab = () => {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>All Photos (Admin View)</Typography>
            <Typography variant="body1">Displaying all uploaded photos with admin controls.</Typography>
            {/* TODO: Reuse Gallery Component logic here */}
        </Box>
    );
};

export default GalleryTab;
