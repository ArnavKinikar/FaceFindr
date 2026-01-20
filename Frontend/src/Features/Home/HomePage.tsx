import { Box, Typography } from '@mui/material';

function HomePage() {
    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2
            }}
        >
            <Typography
                variant="h1"
                component="h1"
                sx={{
                    fontSize: { xs: '80px', md: '120px' },
                    fontWeight: 300,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    userSelect: 'none',
                    textAlign: 'center'
                }}
            >
                Face Findr
            </Typography>
        </Box>
    );
}

export default HomePage;