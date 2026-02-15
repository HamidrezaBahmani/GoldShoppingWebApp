import { useQuery } from '@tanstack/react-query';
import { productService } from '../api/services';

/**
 * Hook to fetch all products
 * Uses React Query for caching, loading states, error handling
 */
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll(),
  });
}
