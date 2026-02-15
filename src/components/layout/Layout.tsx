import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Navigation } from './Navigation';

export function Layout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      <Box
        component="main"
        sx={{
          flex: 1,
          py: 3,
          bgcolor: '#0f0f1a',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
