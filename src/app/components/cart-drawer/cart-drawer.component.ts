import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from '../../core/state/cart.store';
import { SalesService } from '../../sales/services/sales.service';
import {
  CartItem,
  CreateSaleResponse,
  SalePayload,
} from '../../sales/models/sale.model';
import { CartItemRowComponent } from '../../sales/components/cart-item-row/cart-item-row.component';
import { CartSummaryComponent } from '../../sales/components/cart-summary/cart-summary.component';
import { SaleSuccessModalComponent } from '../../sales/components/sale-success-modal/sale-success-modal.component';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [
    CommonModule,
    CartItemRowComponent,
    CartSummaryComponent,
    SaleSuccessModalComponent,
  ],
  templateUrl: './cart-drawer.component.html',
})
export class CartDrawerComponent {
  cartStore = inject(CartStore);
  private salesService = inject(SalesService);

  @Output() saleCompleted = new EventEmitter<void>();

  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successResponse = signal<CreateSaleResponse | null>(null);

  trackByProductId(index: number, item: CartItem): number {
    return item.product.id;
  }

  handleCheckout(): void {
    const items = this.cartStore.cartItems();
    if (items.length === 0) return;

    // Pre-validación cliente: asegurar que ningún ítem supere el stock real antes de realizar la petición HTTP
    const invalidItem = items.find(
      (i) => i.quantity > i.product.stock || i.product.stock <= 0,
    );
    if (invalidItem) {
      this.errorMessage.set(
        `El producto "${invalidItem.product.name}" supera el stock disponible (${invalidItem.product.stock} unidades).`,
      );
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const payload: SalePayload = {
      items: items.map((i) => ({
        product_id: i.product.id,
        quantity: i.quantity,
      })),
    };

    this.salesService.createSale(payload).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.successResponse.set(response);
        this.cartStore.clearCart();
      },
      error: (err) => {
        console.error('Error creating sale', err);
        this.isSubmitting.set(false);
        this.errorMessage.set(
          err?.error?.message ||
            'Error al procesar la venta. Inténtelo de nuevo.',
        );
      },
    });
  }

  closeModal(): void {
    this.successResponse.set(null);
    this.cartStore.closeDrawer();
    this.saleCompleted.emit();
  }
}
