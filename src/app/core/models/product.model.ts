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

export interface PaginatedProductsResponse {
    data:  Product[];
    links: Links;
    meta:  Meta;
}

export interface Links {
    first: string;
    last:  string;
    prev:  null;
    next:  null;
}

export interface Meta {
    current_page: number;
    from:         number;
    last_page:    number;
    links:        Link[];
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}
