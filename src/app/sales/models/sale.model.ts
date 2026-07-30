import { PaginatedResponse } from 'src/app/core/models/paginate.model';
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

export interface SaleDetail {
  quantity: number;
  subtotal?: number;
  product: Product;
}

export interface Sale {
  id: number;
  total: number;
  created_at: string;
  user: {
    name: string;
  };
  details?: SaleDetail[];
}

export interface PaginatedSalesResponse extends PaginatedResponse<Sale> {}

export interface TopProductSummary {
  name: string | null;
  total_quantity: number;
}

export interface SalesSummary {
  total_revenue: number;
  total_sales_count: number;
  average_ticket: number;
  total_items_sold: number;
  today_revenue: number;
  cancelled_sales_count: number;
  cancelled_revenue: number;
  top_product?: TopProductSummary | null;
}
