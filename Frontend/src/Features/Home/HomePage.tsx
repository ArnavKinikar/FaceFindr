import { Box, CssBaseline } from '@mui/material';
import HeroSection from './Components/HeroSection';
import HowItWorksSection from './Components/HowItWorksSection';
import ShowcaseSection from './Components/ShowcaseSection';
import CTASection from './Components/CTASection';
import HomeFooter from './Components/HomeFooter';

function HomePage() {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
      <CssBaseline />
      
      <HeroSection />
      
      <HowItWorksSection />
      
      <ShowcaseSection />
      
      <CTASection />
      
      <HomeFooter />
    </Box>
  );
}

export default HomePage;