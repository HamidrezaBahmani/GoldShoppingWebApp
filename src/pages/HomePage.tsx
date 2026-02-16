import { Grid, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { ProductCard } from "../components/products";
import { useProducts } from "../hooks";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import img1 from "../assets/images/211.jpg";
import img2 from "../assets/images/221.jpg";
import img3 from "../assets/images/223.jpg";

const images = [img1, img2, img3];

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
      {/* Swiper Sectionn */}
      <Box sx={{ mb: 6 }}>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          style={{ width: "100%", height: "600px" }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={src}
                sx={{
                  width: "100%",
                  height: "600px",
                  objectFit: "fit",
                  borderRadius: 2,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

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
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
