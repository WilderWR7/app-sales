import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { StockBadgeComponent } from '../../../components/stock-badge/stock-badge.component';
import { CartStore } from '../../../core/state/cart.store';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CommonModule, StockBadgeComponent],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  private cartStore = inject(CartStore);
  @Input({ required: true }) product!: Product;

  addToCart(): void {
    if (this.product.stock > 0) {
      this.cartStore.addItem(this.product);
    }
  }
}
