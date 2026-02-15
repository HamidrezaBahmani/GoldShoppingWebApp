/**
 * Core domain types for Parsis Gold shopping app
 */

export type GoldPurity = '18K' | '21K' | '22K' | '24K';
export type ProductCategory = 'necklace' | 'bracelet' | 'ring' | 'earring' | 'coin' | 'bar' | 'other';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number; // in grams
  purity: GoldPurity;
  category: ProductCategory;
  imageUrl: string;
  sku: string;
  inStock: boolean;
  createdAt?: string;
}

export interface ProductListItem extends Product {
  // Extended fields for listing/cards if needed
}
