import { useQuery } from '@tanstack/react-query';
import { productService } from '../api/services';

/**
 * Hook to fetch a single product by ID
 */
export function useProduct(id: string | undefined, enabled = true) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id!),
    enabled: !!id && enabled,
  });
}
