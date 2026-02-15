import type { Product } from './product.types';

/**
 * API response wrappers for consistent data transfer
 */

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type ProductsApiResponse = ApiResponse<Product[]>;
export type ProductApiResponse = ApiResponse<Product>;
export type PaginatedProductsResponse = ApiResponse<PaginatedResponse<Product>>;
