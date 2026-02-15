import apiClient from '../client';
import type {
  Product,
  ApiResponse,
  PaginatedResponse,
} from '../../types';
import { mockProducts } from '../../data/mockProducts';

const PRODUCTS_ENDPOINT = '/products';

/** Use mock data when API is unavailable (dev/demo) */
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_API_URL;

/**
 * Product API service - all product-related API calls
 */
export const productService = {
  getAll: async (): Promise<Product[]> => {
    if (USE_MOCK) return Promise.resolve(mockProducts);
    const { data } = await apiClient.get<ApiResponse<Product[]>>(PRODUCTS_ENDPOINT);
    return data.data;
  },

  getPaginated: async (
    page = 1,
    pageSize = 12
  ): Promise<PaginatedResponse<Product>> => {
    if (USE_MOCK) {
      const start = (page - 1) * pageSize;
      const data = mockProducts.slice(start, start + pageSize);
      return { data, total: mockProducts.length, page, pageSize, totalPages: Math.ceil(mockProducts.length / pageSize) };
    }
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
      `${PRODUCTS_ENDPOINT}?page=${page}&pageSize=${pageSize}`
    );
    return data.data;
  },

  getById: async (id: string): Promise<Product> => {
    if (USE_MOCK) {
      const p = mockProducts.find((x) => x.id === id);
      if (!p) throw new Error('Product not found');
      return p;
    }
    const { data } = await apiClient.get<ApiResponse<Product>>(
      `${PRODUCTS_ENDPOINT}/${id}`
    );
    return data.data;
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    if (USE_MOCK) {
      return mockProducts.filter((p) => p.category === category);
    }
    const { data } = await apiClient.get<ApiResponse<Product[]>>(
      `${PRODUCTS_ENDPOINT}?category=${category}`
    );
    return data.data;
  },
};
