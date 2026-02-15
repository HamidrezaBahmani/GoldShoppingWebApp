import { useQuery } from '@tanstack/react-query';
import { productService } from '../api/services';

/**
 * Hook to fetch paginated products
 */
export function useProductsPaginated(page = 1, pageSize = 12) {
  return useQuery({
    queryKey: ['products', 'paginated', page, pageSize],
    queryFn: () => productService.getPaginated(page, pageSize),
  });
}
