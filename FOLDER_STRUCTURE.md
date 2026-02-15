# Parsis Gold – Folder Structure & Conventions

## Project Structure

```
src/
├── api/                    # API layer
│   ├── client.ts           # Axios instance, interceptors, base config
│   └── services/           # API service modules (one per domain)
│       ├── product.service.ts
│       └── index.ts
│
├── components/             # Reusable UI components
│   ├── layout/             # Layout components (Navigation, Layout)
│   │   ├── Layout.tsx
│   │   ├── Navigation.tsx
│   │   └── index.ts
│   └── products/           # Feature-related components
│       ├── ProductCard.tsx
│       └── index.ts
│
├── context/                # React Context providers
│   └── CartContext.tsx     # Cart state (add, remove, update)
│
├── data/                   # Static/mock data
│   └── mockProducts.ts     # Mock products for dev when API unavailable
│
├── hooks/                  # Custom React hooks
│   ├── useProducts.ts      # Fetches all products (React Query)
│   ├── useProduct.ts       # Fetches single product by ID
│   ├── useProductsPaginated.ts
│   ├── useCart.ts          # Re-export from CartContext
│   └── index.ts
│
├── pages/                  # Route-level pages
│   ├── HomePage.tsx
│   ├── CartPage.tsx
│   ├── ProductDetailPage.tsx
│   └── index.ts
│
├── routes/                 # Routing configuration
│   └── index.tsx           # createBrowserRouter, route definitions
│
├── types/                  # TypeScript types
│   ├── product.types.ts
│   ├── cart.types.ts
│   ├── api.types.ts
│   └── index.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

## Data Flow

```
API (Backend) → product.service.ts → useProducts / useProduct hooks → Pages/Components
                                    ↓
                              React Query (caching, loading, errors)
```

## Using the API & Hooks

### 1. API Client (`src/api/client.ts`)

- Single axios instance with `baseURL`, timeout, auth header
- Request/response interceptors for tokens and error handling
- Set `VITE_API_URL` in `.env` for your backend

### 2. Services (`src/api/services/product.service.ts`)

- All product API calls live here
- Functions return typed data (`Product`, `PaginatedResponse`, etc.)
- Uses mock data when `VITE_API_URL` is not set

### 3. Hooks (`src/hooks/`)

- **`useProducts()`** – list all products  
  - `data`, `isLoading`, `error`, `refetch`
- **`useProduct(id)`** – single product by ID  
- **`useProductsPaginated(page, pageSize)`** – paginated list  
- **`useCart()`** – cart state: `items`, `addItem`, `removeItem`, `updateQuantity`, `subtotal`

### 4. Types (`src/types/`)

- `Product`, `CartItem`, `ApiResponse<T>`, `PaginatedResponse<T>`
- Import from `../types` or `../types/product.types`

## Routes

| Path | Page |
|------|------|
| `/` | HomePage (product grid) |
| `/cart` | CartPage |
| `/product/:id` | ProductDetailPage |
| `*` | Redirects to `/` |

## Switching to Real API

1. Create `.env` with `VITE_API_URL=https://your-api.com/v1`
2. Ensure backend responds with `{ data, success, message? }` per `ApiResponse<T>`
3. Update `product.service.ts` endpoints if paths differ
