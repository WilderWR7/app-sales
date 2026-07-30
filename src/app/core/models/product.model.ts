import { PaginatedResponse } from "./paginate.model";

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  sku?: string;
  image?: string;
  image_url?: string;
  category_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PaginatedProductsResponse extends PaginatedResponse<Product> {}
