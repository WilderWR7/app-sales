import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../../sales/models/sale.model';

/**
 * CartStore
 * Store shopping cart state manager using Angular Signals.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class CartStore {
  // Signals State
  readonly cartItems = signal<CartItem[]>([]);
  readonly isOpen = signal<boolean>(false);

  // Computed signals
  readonly totalAmount = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.subtotal, 0)
  );

  readonly totalCount = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  readonly hasItems = computed(() => this.cartItems().length > 0);

  readonly hasInvalidItems = computed(() =>
    this.cartItems().some(i => i.quantity > i.product.stock || i.quantity < 1)
  );

  toggleDrawer(): void {
    this.isOpen.set(!this.isOpen());
  }

  openDrawer(): void {
    this.isOpen.set(true);
  }

  closeDrawer(): void {
    this.isOpen.set(false);
  }

  addItem(product: Product, initialQty: number = 1): void {
    if (product.stock <= 0) return;

    const currentItems = this.cartItems();
    const existingIndex = currentItems.findIndex(i => i.product.id === product.id);

    if (existingIndex > -1) {
      const existingItem = currentItems[existingIndex];
      const newQty = existingItem.quantity + initialQty;
      
      const updatedItems = [...currentItems];
      updatedItems[existingIndex] = {
        ...existingItem,
        quantity: newQty,
        subtotal: newQty * product.price
      };
      this.cartItems.set(updatedItems);
    } else {
      const newItem: CartItem = {
        product,
        quantity: initialQty,
        subtotal: initialQty * product.price
      };
      this.cartItems.set([...currentItems, newItem]);
    }

    this.openDrawer();
  }

  setQuantity(productId: number, desiredQuantity: number): void {
    const currentItems = this.cartItems();
    const index = currentItems.findIndex(i => i.product.id === productId);

    if (index === -1) return;

    const item = currentItems[index];
    const qty = isNaN(desiredQuantity) || desiredQuantity < 1 ? 1 : desiredQuantity;

    const updatedItems = [...currentItems];
    updatedItems[index] = {
      ...item,
      quantity: qty,
      subtotal: qty * item.product.price
    };
    this.cartItems.set(updatedItems);
  }

  updateQuantity(productId: number, delta: number): void {
    const currentItems = this.cartItems();
    const item = currentItems.find(i => i.product.id === productId);
    if (item) {
      this.setQuantity(productId, item.quantity + delta);
    }
  }

  removeItem(productId: number): void {
    this.cartItems.set(this.cartItems().filter(i => i.product.id !== productId));
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}
