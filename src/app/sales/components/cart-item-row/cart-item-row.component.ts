import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/sale.model';
import { CartStore } from '../../../core/state/cart.store';

@Component({
  selector: 'app-cart-item-row',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-item-row.component.html'
})
export class CartItemRowComponent {
  cartStore = inject(CartStore);
  @Input({ required: true }) item!: CartItem;

  onQuantityChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let value = parseInt(inputElement.value, 10);

    if (!isNaN(value)) {
      this.cartStore.setQuantity(this.item.product.id, value);
    }
  }

  get isExceedingStock(): boolean {
    return this.item.quantity > this.item.product.stock;
  }

  remove(): void {
    this.cartStore.removeItem(this.item.product.id);
  }
}
