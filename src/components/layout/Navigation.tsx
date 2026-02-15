import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { useCart } from '../../hooks/useCart';

export function Navigation() {
  const { pathname } = useLocation();
  const { totalItems } = useCart();

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#1a1a2e' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: '#d4af37',
            fontWeight: 700,
            fontFamily: 'Georgia, serif',
          }}
        >
          Parsis Gold
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            startIcon={<HomeIcon />}
            sx={{
              color: pathname === '/' ? '#d4af37' : 'rgba(255,255,255,0.9)',
              fontWeight: pathname === '/' ? 600 : 400,
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/cart"
            color="inherit"
            sx={{
              color: pathname === '/cart' ? '#d4af37' : 'rgba(255,255,255,0.9)',
              fontWeight: pathname === '/cart' ? 600 : 400,
            }}
          >
            Cart
          </Button>
          <IconButton
            component={Link}
            to="/cart"
            color="inherit"
            aria-label="Shopping cart"
          >
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
