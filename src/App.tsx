import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./context/CartContext";
import { AppRouter } from "./routes";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
