import { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { ProductCard } from "../components/products";
import { useProducts } from "../hooks";
import Paper from "@mui/material/Paper";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import img1 from "../assets/images/211.jpg";
import img2 from "../assets/images/221.jpg";
import img3 from "../assets/images/223.jpg";

import Goldbar from "../assets/images/GoldBar.png";
import productionprocess from "../assets/images/productionprocess.png";
import Qualitycontrol from "../assets/images/Qualitycontrol.png";
import Securitypackage from "../assets/images/Securitypackaging.png";
import SilverBar from "../assets/images/SilverBar.png";

const images = [img1, img2, img3];
import { motion } from "framer-motion";

export function HomePage() {
  const { data: products, isLoading, error } = useProducts();
  const [isFlipped, setIsFlipped] = useState(false);

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
      {/* Swiper Sectionnn*/}
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

      <Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              {/* Image */}
              <CardMedia
                component="img"
                height="200"
                image={Goldbar}
                alt="Gold Bar"
                // alt={product.name}
              />

              {/* Button */}
              <CardContent>
                <Button
                  variant="contained"
                  fullWidth
                  // onClick={() => handleAction(product)}
                >
                  اکنون بخرید
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper>2</Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              {/* Image */}
              <CardMedia
                component="img"
                height="200"
                image={SilverBar}
                alt="SilverBar"
                // alt={product.name}
              />

              {/* Button */}
              <CardContent>
                <Button
                  variant="contained"
                  fullWidth
                  // onClick={() => handleAction(product)}
                >
                  اکنون بخرید
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              {/* Image */}
              <CardMedia
                component="img"
                height="200"
                image={productionprocess}
                alt="productionprocess"
                // alt={product.name}
              />

              {/* Button */}
              <CardContent></CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              {/* Image */}
              <CardMedia
                component="img"
                height="200"
                image={Securitypackage}
                alt="Securitypackage"
                // alt={product.name}
              />

              {/* Button */}
              <CardContent></CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              {/* Image */}
              <CardMedia
                component="img"
                height="200"
                image={Qualitycontrol}
                alt="Qualitycontrol"
                // alt={product.name}
              />

              {/* Button */}
              <CardContent></CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: "100px", mb: "50px" }}>
        <Box
          sx={{
            width: 300,
            height: 400,
            perspective: "1000px",
            cursor: "pointer",
          }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front */}
            <Card
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image={Goldbar}
                sx={{ objectFit: "cover" }}
              />
            </Card>

            {/* Back */}
            <Card
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image={SilverBar}
                sx={{ objectFit: "cover" }}
              />
            </Card>
          </motion.div>
        </Box>
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
