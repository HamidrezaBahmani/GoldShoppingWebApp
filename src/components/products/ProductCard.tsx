import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import type { Product } from "../../types";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#16213e",
        color: "#eee",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(212, 175, 55, 0.2)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: "cover", cursor: "pointer" }}
        onClick={() => navigate(`/product/${product.id}`)}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          <Chip
            label={product.purity}
            size="small"
            sx={{ bgcolor: "#d4af37", color: "#000" }}
          />
          <Chip
            label={product.category}
            size="small"
            variant="outlined"
            sx={{ borderColor: "#d4af37", color: "#d4af37" }}
          />
        </Box>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{ fontWeight: 600, color: "#fff" }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "#aaa", mb: 1 }}
        >
          {product.weight}g
        </Typography>
        <Typography variant="h6" sx={{ color: "#d4af37", fontWeight: 700 }}>
          {formatPrice(product.price)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          onClick={() => addItem(product)}
          sx={{
            bgcolor: "#d4af37",
            color: "#000",
            "&:hover": { bgcolor: "#b8941f" },
            fontFamily: "iransanswebmedium, Arial, sans-serif",
          }}
        >
          افزودن به سبد
        </Button>
      </CardActions>
    </Card>
  );
}
