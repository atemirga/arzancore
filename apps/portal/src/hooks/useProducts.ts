import { useQuery } from '@tanstack/react-query';
import { PRODUCTS } from '../lib/constants';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      return PRODUCTS;
    },
    initialData: PRODUCTS,
  });
}

export function useProduct(slug: string | undefined) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const product = PRODUCTS.find((p) => p.id === slug);
      if (!product) throw new Error('Product not found');
      return product;
    },
    enabled: !!slug,
  });
}
