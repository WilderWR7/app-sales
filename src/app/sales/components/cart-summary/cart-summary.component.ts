import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from '../../../core/state/cart.store';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html'
})
export class CartSummaryComponent {
  cartStore = inject(CartStore);
  
  @Input() isSubmitting: boolean = false;
  @Output() processSale = new EventEmitter<void>();

  onCheckout(): void {
    this.processSale.emit();
  }
}
