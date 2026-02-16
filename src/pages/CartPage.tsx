import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../hooks";
import { Link } from "react-router-dom";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

export function CartPage() {
  const { items, subtotal, removeItem, updateQuantity, totalItems } = useCart();

  if (totalItems === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5" sx={{ color: "#aaa", mb: 2 }}>
          سبد شما خالیست
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ bgcolor: "#d4af37", color: "#000" }}
        >
          ادامه خرید
        </Button>
      </Box>
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
          fontFamily: "Georgia, serif",
        }}
      >
        سبد خرید
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "#16213e" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#d4af37", fontWeight: 600 }}>
                محصول
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#d4af37", fontWeight: 600 }}
              >
                قیمت
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#d4af37", fontWeight: 600 }}
              >
                مقدار
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#d4af37", fontWeight: 600 }}
              >
                جمع کل
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(({ product, quantity }) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component="img"
                      src={product.imageUrl}
                      alt={product.name}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                    />
                    <Box>
                      <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#aaa" }}>
                        {product.purity} · {product.weight}g
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ color: "#fff" }}>
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      sx={{ color: "#d4af37" }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ minWidth: 32, color: "#fff" }}>
                      {quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      sx={{ color: "#d4af37" }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "#d4af37", fontWeight: 600 }}
                >
                  {formatPrice(product.price * quantity)}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => removeItem(product.id)}
                    sx={{ color: "#e94560" }}
                    aria-label="Remove"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
        <Paper sx={{ p: 3, bgcolor: "#16213e", minWidth: 280 }}>
          <Typography variant="h6" sx={{ color: "#d4af37", mb: 2 }}>
            جمع کل: {formatPrice(subtotal)}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#d4af37",
              color: "#000",
              "&:hover": { bgcolor: "#b8941f" },
            }}
          >
            تسویه
          </Button>
        </Paper>
      </Grid>
    </Box>
  );
}
