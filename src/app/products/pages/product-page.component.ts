import { Component, inject, OnInit, signal, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ProductService } from '../services/product.service';
import {
  Product,
  PaginatedProductsResponse,
} from '../../core/models/product.model';

import { ProductHeaderComponent } from '../components/product-header/product-header.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ProductSkeletonComponent } from '../components/product-skeleton/product-skeleton.component';
import { ErrorAlert } from '../../components/error-alert/error-alert.component';
import { ProductEmptyStateComponent } from '../components/product-empty-state/product-empty-state.component';
import { CartDrawerComponent } from '../../components/cart-drawer/cart-drawer.component';
import { CartStore } from '../../core/state/cart.store';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductHeaderComponent,
    ProductCardComponent,
    PaginationComponent,
    ProductSkeletonComponent,
    ErrorAlert,
    ProductEmptyStateComponent,
    CartDrawerComponent
  ],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {
  private productService = inject(ProductService);
  cartStore = inject(CartStore);

  // State Signals
  products = signal<Product[]>([]);
  pagination = signal<PaginatedProductsResponse | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  // Controls
  searchControl = new FormControl('');
  currentPage = signal<number>(1);
  perPage = 10;

  // Computed state
  hasProducts = computed(() => this.products().length > 0);
  totalPages = computed(() => {
    const pag = this.pagination() as any;
    if (!pag) return 1;
    return pag.last_page ?? pag.meta?.last_page ?? 1;
  });
  totalItems = computed(() => {
    return this.pagination()?.data.length ?? 0;
  });

  ngOnInit(): void {
    this.loadProducts();

    // Listen for changes in the search bar
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.currentPage.set(1);
        this.loadProducts(searchTerm || undefined);
      });
  }

  loadProducts(searchTerm?: string): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const term =
      searchTerm !== undefined
        ? searchTerm
        : this.searchControl.value || undefined;

    this.productService
      .getProducts(this.currentPage(), this.perPage, term)
      .subscribe({
        next: (response: any) => {
          const dataList = Array.isArray(response)
            ? response
            : response?.data || [];
          this.products.set(dataList);
          this.pagination.set(Array.isArray(response) ? null : response);
          this.isLoading.set(false);
        },
        error: (err: any) => {
          console.error('Error loading products', err);
          this.errorMessage.set(
            'An error occurred while loading the product catalog.',
          );
          this.isLoading.set(false);
        },
      });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.currentPage.set(page);
      this.loadProducts();
    }
  }
}
