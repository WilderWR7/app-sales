import { Product } from '../../core/models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface SaleItemPayload {
  product_id: number;
  quantity: number;
}

export interface SalePayload {
  items: SaleItemPayload[];
}

export interface CreateSaleResponse {
  message: string;
  sale_id: number;
  total: number;
  created_at?: string;
}
