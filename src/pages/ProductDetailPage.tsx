import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Chip,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useProduct } from '../hooks';
import { useCart } from '../hooks/useCart';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id);
  const { addItem } = useCart();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ color: '#d4af37' }} />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Product not found.
      </Alert>
    );
  }

  return (
    <Box>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ color: '#d4af37', mb: 2 }}
      >
        Back to products
      </Button>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={product.imageUrl}
            alt={product.name}
            sx={{ width: '100%', borderRadius: 2, maxHeight: 400, objectFit: 'cover' }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label={product.purity} sx={{ bgcolor: '#d4af37', color: '#000' }} />
            <Chip label={product.category} variant="outlined" sx={{ borderColor: '#d4af37', color: '#d4af37' }} />
          </Box>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>
            {product.name}
          </Typography>
          <Typography variant="h5" sx={{ color: '#d4af37', fontWeight: 700, mb: 2 }}>
            {formatPrice(product.price)}
          </Typography>
          <Typography variant="body1" sx={{ color: '#aaa', mb: 2 }}>
            {product.description}
          </Typography>
          <Paper sx={{ p: 2, bgcolor: '#16213e', mb: 3 }}>
            <Typography variant="body2" sx={{ color: '#aaa' }}>
              Weight: {product.weight}g
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa' }}>
              SKU: {product.sku}
            </Typography>
          </Paper>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => addItem(product)}
            sx={{ bgcolor: '#d4af37', color: '#000', '&:hover': { bgcolor: '#b8941f' } }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
