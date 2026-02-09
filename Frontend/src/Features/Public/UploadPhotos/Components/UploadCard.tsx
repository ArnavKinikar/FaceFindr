import { Paper } from '@mui/material';
import UploadDropZone from './UploadDropZone';

const UploadCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 6, // Increased to match other pages
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        boxShadow: '0 24px 48px rgba(0,0,0,0.05)', // Unified shadow
      }}
    >
      <UploadDropZone />
    </Paper>
  );
};

export default UploadCard;
