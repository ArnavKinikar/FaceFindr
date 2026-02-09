import { Box, Container, Grid } from '@mui/material';

const images = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBqEH3odnxF2qtKZbTwX53Qh8jyTapSt17ZVCv5t58laKwVb9AanIUQXHgAPpiS24xqjaQbkO5Uf2xb8aCeoQOsxvAsDlcJmV-kvk4Zu-_WQMs5PTiGmf-FX_a7e-QyNlgKjFoAEwMD5Jk-vxeroxpYXldJ2cWoy2hDhLWYhZBa3nXR57VtvsH9y3DGslhDsqAFUNJcF71_mQsO9g7sGZJZ6huefgxlAFzXCm_diiNA3Ff4oeG1In3U920X4VPrZAIeHJq_Tc4sn5ce',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAi6VCSyhB8AU_gwvHu_4GTJ4cUE8ChGD_CusojGDZmbGHOTm1DuO_y2u0UFUJ92rAFMwooNAcYNav0Jh39WJAXxkLOJmA53d0sZ9Fz3gRtDaK2jJ5oz8TBtg-2Y68Yunl0jD_ShrGnrfipVbVoZs-OaZKTcRra8EBZXgsSOXiBWOSe_76JEBR8SRJJAECxEOy1j96JHyQYWuOLdE2w9gaIcEPT6QgYtd1f76esPq6l_R4JtBt89HFMGbgFcDIkBXQfifJsbYmgdu8X',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBKT4baZ0z3kPdSWseztP9zSZfaz_fuN4N4WZVYEPQfbgAiRS1jUjSR7Fpspp7AOSuY9IZdCSzDuTWlWLx8k8RY8hdWWHmkF0kmwDt-Ev5cyh1nPT_SiWNSpUcO9x69NchSsTBPjsh1aIM4SNCY8lLSpX2Drbzwfhuml5fARJ6plTHJX2Kx3C1YykhWeB0TKBXYu4gi80ynb6Kj4sf7aPkaYRLptG4HP1wRnjZvvM35W1eCNo7by55FfJDABBuaGS_9sKv9hUerFwzv',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCIi85ULJXSCNn4SwaLa10JS7gXNr8QSxy6y8bHWcIxOrQeAMWqXwYZOcQvuUc-4Uk64bKCOLFfiZ8mBepkxXN-BEUkv2S_1jLLgGnr61I0m5z9i-81ImgT58WGjFCEm5zGI5Jv58XqlqC3VlzO-SVaX1fAe1eeoxDU_9CXh8n7L63tKwQelwosqUSGvonE3wQGdTIYpYHwV1LG1deQ0u4jCfftaWw4qcgqzUUDq3vRBJ2kqH-zWAuyaRjG5a2eYGctlFm7cDNrg93V',
];

const ShowcaseSection = () => {
  return (
    <Box component="section" sx={{ pb: 15, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {images.map((src, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <Box
                component="img"
                src={src}
                alt="Event showcase"
                sx={{
                  width: '100%',
                  height: index % 2 === 0 ? { xs: 250, md: 250 } : { xs: 250, md: 320 },
                  objectFit: 'cover',
                  borderRadius: 3,
                  boxShadow: 2,
                  filter: 'grayscale(100%)',
                  transition: 'all 0.5s ease',
                  '&:hover': {
                    filter: 'grayscale(0%)',
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ShowcaseSection;
