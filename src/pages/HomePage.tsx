import { Grid, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { ProductCard } from "../components/products";
import { useProducts } from "../hooks";

export function HomePage() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress sx={{ color: "#d4af37" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Failed to load products. Please try again later.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: "#d4af37",
          fontWeight: 700,
        }}
      >
        لیست محصولات طلا پارسیس
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "#aaa" }}>
        Discover our curated selection of authentic Persian gold jewelry and
        investment pieces.
      </Typography>
      <Grid container spacing={3}>
        {(products ?? []).map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
